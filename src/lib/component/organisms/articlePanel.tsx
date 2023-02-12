import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { Article } from '../molecules/article';
import { padding } from 'polished';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { SelectedUnion } from '../../store/article/tab';

interface DummyDataInterface {
  id: number;
  title: string;
  companyName: string;
  writer: string;
  isScraped: boolean;
  createdAt: string;
}

const dummyData: DummyDataInterface[] = [
  {
    id: 1,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: true,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 2,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 3,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: true,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 4,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 5,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 6,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: true,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 7,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 8,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 9,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 10,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
  {
    id: 11,
    title: '국방부 “北, 화성-17 실패 만회하려 영상 짜깁기… 성공 조작”',
    companyName: '조선일보',
    writer: '김정확 기자',
    isScraped: false,
    createdAt: '2021.3.15. (목)',
  },
];

const ArticlePanel = () => {
  const [css] = useStyletron();
  const [articleData, setArticleData] = useState(dummyData);
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);

  useEffect(() => {
    if (tab === 'scrap') {
      setArticleData((prev) => prev.filter((item) => item.isScraped));
    } else {
      setArticleData(dummyData);
    }
  }, [tab]);

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
          key={`${tab}-${item.id}`}
          idx={item.id}
          title={item.title}
          companyName={item.companyName}
          writer={item.writer}
          isScraped={item.isScraped}
          createdAt={item.createdAt}
        />
      ))}
    </article>
  );
};

export { ArticlePanel };
