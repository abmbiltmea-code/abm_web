import type { Metadata } from "next";

export interface ItemSeo {
  metaTitle?: string;
  metaDescription?: string;
}

/**
 * Builds page metadata from CMS SEO fields.
 * Empty fields fall back to `fallback`, then to the root layout's defaults.
 */
export function buildMetadata(
  seo: ItemSeo | null | undefined,
  fallback: { title?: string; description?: string } = {},
): Metadata {
  const title = seo?.metaTitle?.trim() || fallback.title;
  const description = seo?.metaDescription?.trim() || fallback.description;

  return {
    ...(title && { title }),
    ...(description && { description }),
  };
}
