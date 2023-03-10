import React, { LegacyRef, useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { Article } from '../molecules/article';
import { padding } from 'polished';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { SelectedUnion } from '../../store/article/tab';
import { getNewsArticleList } from '../../service/api/getNewsArticleList';
import { processedArticle, ProcessedArticleData } from '../../helper/processedArticle';
import { useInfiniteScroll } from '../../hook/useInfiniteScroll';
import { debounce } from 'lodash';
import { addArticleList, addArticlePage } from '../../store/article/articleList';
import { CheckboxDataInterface } from '../molecules/checkboxPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EmptyScrapPanel } from './emptyScrapPanel';

const ArticlePanel = () => {
  const [css] = useStyletron();
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);
  const scrapArticles = useSelector<ReducerType, ProcessedArticleData[]>(
    (state) => state.scrap.scrapArticle,
  );
  const articlePage = useSelector<ReducerType, number>((state) => state.articleList.page);
  const articleList = useSelector<ReducerType, ProcessedArticleData[]>(
    (state) => state.articleList.list,
  );
  const filterHeadline = useSelector<ReducerType, string>((state) => state.articleFilter.headline);
  const filterPubDate = useSelector<ReducerType, string>((state) => state.articleFilter.pubDate);
  const filterCountry = useSelector<ReducerType, CheckboxDataInterface[]>(
    (state) => state.articleFilter.country,
  );
  const [articleData, setArticleData] = useState<ProcessedArticleData[]>();
  const [target, setTarget] = useState(null);
  const [isPendingInfiniteScroll, setIsPendingInfiniteScroll] = useState(true);
  const [isBlockedApi, setIsBlockedApi] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const pub_date = filterPubDate.replace(/\./g, '-');

    const glocations = filterCountry
      .map((item, index) => {
        if (filterCountry.length - 1 === index) {
          return `"${item.value}"`;
        }

        return `"${item.value}", `;
      })
      .toString()
      .replace(/,/g, '');

    getNewsArticleList({
      page: articlePage,
      headline: filterHeadline,
      pub_date,
      glocations,
    }).then((data) => {
      const { docs: articles } = data.response;

      dispatch(addArticleList(processedArticle(articles)));
    });

    if (tab === 'home') {
      if (isPendingInfiniteScroll) {
        window.setTimeout(() => {
          setIsPendingInfiniteScroll(false);
        }, 1500);
      }
    }
  }, [filterHeadline, filterPubDate, filterCountry]);

  useEffect(() => {
    switch (tab) {
      case 'home':
        setArticleData(articleList);
        setIsBlockedApi(false);
        break;

      case 'scrap':
        setArticleData(scrapArticles);
        setIsBlockedApi(true);
        break;

      default:
        break;
    }
  }, [tab, scrapArticles]);

  useEffect(() => {
    if (tab === 'home') {
      setArticleData(articleList);
    }
  }, [articleList]);

  useInfiniteScroll({
    isPending: isPendingInfiniteScroll || tab === 'scrap',
    target: target as unknown as HTMLElement,
    onIntersect: debounce(([{ isIntersecting }]) => {
      if (isIntersecting && !isBlockedApi && articleList.length) {
        setIsBlockedApi(true);

        const pub_date = filterPubDate.replace(/\./g, '-');
        const glocations = filterCountry
          .map((item, index) => {
            if (filterCountry.length - 1 === index) {
              return `"${item.value}"`;
            }

            return `"${item.value}", `;
          })
          .toString()
          .replace(/,/g, '');

        getNewsArticleList({
          page: articlePage + 1,
          headline: filterHeadline,
          pub_date,
          glocations,
        })
          .then((data) => {
            const { docs: articles } = data.response;

            dispatch(addArticleList(processedArticle(articles)));
            dispatch(addArticlePage());

            if (!articles.length) {
              setIsBlockedApi(true);
            } else {
              setIsBlockedApi(false);
            }
          })
          .catch((error) => {
            console.log('error: ', error);

            setIsBlockedApi(false);
          });
      }
    }, 100),
  });

  if (tab === 'scrap' && !scrapArticles.length) {
    return <EmptyScrapPanel />;
  }

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
        ...padding('80px', '20px', '105px'),
      })}
    >
      {articleData?.map((item) => (
        <Article
          url={item.url}
          id={`${item.headline} ${item.writer}`}
          key={`${item.headline} ${item.writer}`}
          title={item.headline}
          companyName={item.source}
          writer={item.writer}
          createdAt={item.pubDate}
        />
      ))}
      <div ref={setTarget as LegacyRef<HTMLDivElement>} />
      <ToastContainer
        position="top-right"
        autoClose={300}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </article>
  );
};

export { ArticlePanel };
