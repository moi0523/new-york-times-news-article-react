import { getData } from '../getData';

interface NewsArticleInterface {
  web_url: string;
  source: string;
  headline: {
    main: string;
  };
  pub_date: Date;
  byline: {
    original: string;
  };
}

interface NewsArticleListResponseInterface {
  response: {
    docs: NewsArticleInterface[];
  };
}

interface GetNewsArticleListProps {
  page: number;
  headline?: string;
  pub_date?: string;
  glocations?: string;
}

const getNewsArticleList: ({
  page,
  headline,
  pub_date,
  glocations,
}: GetNewsArticleListProps) => Promise<NewsArticleListResponseInterface> = ({
  page,
  headline,
  pub_date,
  glocations,
}: GetNewsArticleListProps) => {
  const filterQueryData: string[] = [];
  if (headline) {
    filterQueryData.push(`headline:("${headline}")`);
  }

  if (pub_date) {
    filterQueryData.push(`pub_date:("${pub_date}")`);
  }

  if (glocations) {
    filterQueryData.push(`glocations:("${glocations}")`);
  }

  const filterQueryParams = filterQueryData
    .map((filterQueryItem, index) => {
      if (index === filterQueryData.length - 1) {
        return `${filterQueryItem}`;
      }

      return `${filterQueryItem} AND `;
    })
    .toString()
    .replace(/,/g, '');

  return getData(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
      `?page=${page}` +
      `${filterQueryParams ? `&fq=${filterQueryParams}` : ''}` +
      '&api-key=3rcojQQJubybL3sZIqeSEDxAFJAZauj9',
  );
};

export type { NewsArticleInterface, GetNewsArticleListProps, NewsArticleListResponseInterface };
export { getNewsArticleList };
