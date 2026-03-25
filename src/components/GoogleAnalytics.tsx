import Script from "next/script";
import { getIntegrationSettings } from "@/lib/db/settings";

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
