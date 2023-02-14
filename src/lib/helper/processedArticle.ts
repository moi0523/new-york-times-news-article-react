import { NewsArticleInterface } from '../service/api/getNewsArticleList';
import { isString } from 'lodash';
import dayjs from 'dayjs';

interface ProcessedArticleData {
  url: string;
  source: string;
  headline: string;
  pubDate: string;
  writer: string;
}

const reduceSource = (source: string) =>
  source.indexOf('New York Times') !== -1 ? 'nytimes' : source;

const reducePubDate = (pubDate: Date) => dayjs(pubDate).format('YYYY.MM.DD');

const reduceWriter = (writer: string) => {
  const writerName = writer?.split('By ')[1];

  if (isString(writerName) && writerName?.indexOf('and') !== -1) {
    return `${writerName.split(' and ')[0]} and ...`;
  }

  return writerName;
};

const processedArticle: (data: NewsArticleInterface[]) => ProcessedArticleData[] = (data) => {
  return data.map((article) => ({
    url: article.web_url,
    source: reduceSource(article.source),
    headline: article.headline.main,
    pubDate: reducePubDate(article.pub_date),
    writer: reduceWriter(article.byline.original),
  }));
};

export type { ProcessedArticleData };
export { processedArticle, reduceSource, reducePubDate, reduceWriter };
