import { redirect } from "next/navigation";

// Redirect /blog → /tin-tuc (SEO 301)
export default function BlogRedirect() {
    redirect("/tin-tuc");
}
