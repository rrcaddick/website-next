import { getPageContent, getSiteContent } from '@/lib/content';
import { ListingPagesDocument, SiteDocument } from '@tina/__generated__/types';
import ListingTemplateClient from '@/features/listing/ListingTemplateClient';

export async function generateMetadata() {
  const site = await getSiteContent();
  return {
    title: site.seo.home.title,
    description: site.seo.home.description,
  };
}

export default async function Home() {
  const [data, site] = await Promise.all([getPageContent('home'), getSiteContent()]);
  return (
    <ListingTemplateClient
      data={data}
      query={ListingPagesDocument}
      variables={{ relativePath: 'home.json' }}
      site={site}
      siteQuery={SiteDocument}
      siteVariables={{ relativePath: 'site.json' }}
    />
  );
}
