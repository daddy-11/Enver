import { useEffect } from "react";

export interface PageMetaOptions {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  scrollToTop?: boolean;
}

/**
 * Custom hook to dynamically manage per-page document title and Open Graph meta tags.
 */
export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  scrollToTop = true,
}: PageMetaOptions) {
  useEffect(() => {
    // 1. Set Document Title
    const formattedTitle = title
      ? `${title} | Enver AI Tech`
      : "Enver AI Tech — Enterprise AI Operations & Engineering";
    document.title = formattedTitle;

    // 2. Set Meta Description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // 3. Set Open Graph Title
    const fullOgTitle = ogTitle ? `${ogTitle} | Enver AI Tech` : formattedTitle;
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute("content", fullOgTitle);
    }

    // 4. Set Open Graph Description
    const fullOgDesc = ogDescription || description;
    if (fullOgDesc) {
      let ogDescTag = document.querySelector('meta[property="og:description"]');
      if (ogDescTag) {
        ogDescTag.setAttribute("content", fullOgDesc);
      }
    }

    // 5. Set Twitter Card Title and Description
    let twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute("content", fullOgTitle);
    }
    if (fullOgDesc) {
      let twitterDescTag = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescTag) {
        twitterDescTag.setAttribute("content", fullOgDesc);
      }
    }

    // 6. Scroll to top on page mount
    if (scrollToTop && typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [title, description, ogTitle, ogDescription, scrollToTop]);
}
