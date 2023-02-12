import React, { LegacyRef, useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { Article } from '../molecules/article';
import { padding } from 'polished';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { SelectedUnion } from '../../store/article/tab';
import { getNewsArticleList } from '../../service/api/getNewsArticleList';
import { processedArticle, ProcessedArticleData } from '../../helper/processedArticle';
import { useInfiniteScroll } from '../../hook/useInfiniteScroll';

const ArticlePanel = () => {
  const [css] = useStyletron();
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);
  const [articleList, setArticleList] = useState<ProcessedArticleData[]>([]);
  const [articlePage, setArticlePage] = useState<number>(0);
  const [articleData, setArticleData] = useState<ProcessedArticleData[]>(articleList);
  const [target, setTarget] = useState(null);

  useEffect(() => {
    getNewsArticleList({
      page: articlePage,
    }).then((data) => {
      const { docs: articles } = data.response;

      setArticleList(processedArticle(articles));
      setArticlePage((prev) => prev + 1);
    });
  }, []);

  useInfiniteScroll({
    target: target as unknown as HTMLElement,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        getNewsArticleList({
          page: articlePage,
        }).then((data) => {
          const { docs: articles } = data.response;

          setArticleList((prev) => [...prev, ...processedArticle(articles)]);
        });
      }
    },
  });

  useEffect(() => {
    if (tab === 'scrap') {
      setArticleData((prev) => prev.filter((item) => item.isScraped));
    } else {
      setArticleData(articleList);
    }
  }, [tab, articleList]);

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
        ...padding('80px', '20px', '105px'),
      })}
    >
      {articleData.map((item) => (
        <Article
          id={`${tab}-${item.headline}`}
          key={`${tab}-${item.headline}`}
          title={item.headline}
          companyName={item.source}
          writer={item.writer}
          isScraped={item.isScraped || false}
          createdAt={item.pubDate}
        />
      ))}
      <div ref={setTarget as LegacyRef<HTMLDivElement>} />
    </article>
  );
};

export { ArticlePanel };
