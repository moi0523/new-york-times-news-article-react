import React from 'react';
import { useStyletron } from 'styletron-react';
import { borderRadius, padding } from 'polished';
import { ReactComponent as StarFillSvg } from '../../assets/svgs/star_fill.svg';
import { ReactComponent as StarEmptySvg } from '../../assets/svgs/star_empty.svg';
import { addScrap, deleteScrap } from '../../store/article/scrap';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { ProcessedArticleData } from '../../helper/processedArticle';

interface ArticleProps {
  url: string;
  id: string;
  title: string;
  companyName: string;
  writer: string;
  createdAt: string;
}

const Article = ({ url, id, title, companyName, writer, createdAt }: ArticleProps) => {
  const [css] = useStyletron();
  const dispatch = useDispatch();
  const scrapArticles = useSelector<ReducerType, ProcessedArticleData[]>(
    (state) => state.scrap.scrapArticle,
  );

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        columnGap: '8px',
        backgroundColor: '#fefefe',
        ...padding('20px'),
        ...borderRadius('top', '8px'),
        ...borderRadius('bottom', '8px'),
      })}
    >
      <div
        className={css({
          display: 'flex',
          columnGap: '15px',
        })}
      >
        <b
          className={css({
            width: 'calc(100% - 31px)',
            fontSize: '18px',
            lineHeight: '28px',
            letterSpacing: '-0.05em',
            color: '#000000',
          })}
        >
          {title}
        </b>
        {scrapArticles.some((article) => article.headline === title) ? (
          <StarFillSvg
            className={css({
              marginTop: '4px',
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteScrap({ headline: title }));
            }}
          />
        ) : (
          <StarEmptySvg
            className={css({
              marginTop: '4px',
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addScrap({
                  url,
                  source: companyName,
                  headline: title,
                  pubDate: createdAt,
                  writer: writer,
                }),
              );
            }}
          />
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '8px',
          })}
        >
          <span
            className={css({
              fontSize: '13px',
              lineHeight: '20px',
              letterSpace: '-0.05em',
              color: '#000000',
            })}
          >
            {companyName}
          </span>
          <span
            className={css({
              fontSize: '13px',
              lineHeight: '20px',
              letterSpace: '-0.05em',
              color: '#000000',
            })}
          >
            {writer}
          </span>
        </div>
        <span
          className={css({
            fontSize: '13px',
            lineHeight: '20px',
            letterSpacing: '-0.05em',
            color: '#6d6d6d',
          })}
        >
          {createdAt}
        </span>
      </div>
    </article>
  );
};

export type { ArticleProps };
export { Article };
