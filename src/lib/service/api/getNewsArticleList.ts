import { getData } from '../getData';

interface NewsArticleInterface {
  web_url: string;
  source: string;
  headline: {
    main: string;
  };
  pub_date: string;
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
  query?: string;
  filterQuery?: string;
}

const getNewsArticleList: ({
  page,
  query,
  filterQuery,
}: GetNewsArticleListProps) => Promise<NewsArticleListResponseInterface> = ({
  page,
  query,
  filterQuery,
}: GetNewsArticleListProps) => {
  const queryParams = query ? `&q=${query}` : '';
  const filterQueryParams = filterQuery ? `&q=${filterQuery}` : '';

  return getData(
    'https://api.nytimes.com/svc/search/v2/articlesearch.json' +
      `?page=${page}` +
      `${queryParams}` +
      `${filterQueryParams}` +
      '&api-key=3rcojQQJubybL3sZIqeSEDxAFJAZauj9',
  );
};

export type { NewsArticleInterface, GetNewsArticleListProps, NewsArticleListResponseInterface };
export { getNewsArticleList };
