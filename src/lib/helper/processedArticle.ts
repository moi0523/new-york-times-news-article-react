import { NewsArticleInterface } from '../service/api/getNewsArticleList';

interface ProcessedArticleData {
  url: string;
  source: string;
  headline: string;
  pubDate: string;
  writer: string;
  isScraped?: boolean;
}

const processedArticle: (data: NewsArticleInterface[]) => ProcessedArticleData[] = (data) => {
  return data.map((article) => ({
    url: article.web_url,
    source: article.source,
    headline: article.headline.main,
    pubDate: article.pub_date,
    writer: article.byline.original,
  }));
};

export type { ProcessedArticleData };
export { processedArticle };
