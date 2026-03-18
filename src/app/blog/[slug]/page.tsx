import { redirect } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

// Redirect /blog/[slug] → /[slug] (SEO 301)
export default async function BlogPostRedirect({ params }: Props) {
    const { slug } = await params;
    redirect(`/${slug}`);
}
