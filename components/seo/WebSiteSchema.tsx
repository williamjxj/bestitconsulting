import { websiteSchema, structuredDataScript } from '@/lib/structured-data';

/**
 * WebSite structured data component
 * Use on home page only to enable sitelinks search box in Google
 */
export function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: structuredDataScript(websiteSchema),
      }}
    />
  );
}
