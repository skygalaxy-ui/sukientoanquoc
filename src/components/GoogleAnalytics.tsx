import Script from "next/script";
import { supabase } from "@/lib/supabase";

interface IntegrationSettings {
    ga4_measurement_id: string;
    gsc_verification_code: string;
    ga4_enabled: boolean;
    gsc_enabled: boolean;
}

async function getIntegrationSettings(): Promise<IntegrationSettings | null> {
    try {
        const { data } = await supabase
            .from("site_settings")
            .select("value")
            .eq("key", "integrations")
            .single();

        if (data?.value) {
            return typeof data.value === "string" ? JSON.parse(data.value) : data.value;
        }
    } catch {
        /* ignore */
    }
    return null;
}

export default async function GoogleAnalytics() {
    const settings = await getIntegrationSettings();

    if (!settings) return null;

    const ga4Id = settings.ga4_enabled ? settings.ga4_measurement_id : null;
    const isGA4Valid = ga4Id && /^G-[A-Z0-9]+$/.test(ga4Id);

    if (!isGA4Valid) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${ga4Id}');
                `}
            </Script>
        </>
    );
}

export async function GoogleSearchConsoleVerification() {
    const settings = await getIntegrationSettings();

    if (!settings?.gsc_enabled || !settings.gsc_verification_code) return null;

    return (
        <meta
            name="google-site-verification"
            content={settings.gsc_verification_code}
        />
    );
}
