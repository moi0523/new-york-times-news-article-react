import React from 'react';
import { useStyletron } from 'styletron-react';
import { borderRadius, padding } from 'polished';
import { ReactComponent as StarFillSvg } from '../../assets/svgs/star_fill.svg';
import { ReactComponent as StarEmptySvg } from '../../assets/svgs/star_empty.svg';
import { addScrap, deleteScrap } from '../../store/article/scrap';
import { useDispatch } from 'react-redux';

interface ArticleProps {
  idx: number;
  title: string;
  companyName: string;
  writer: string;
  isScraped: boolean;
  createdAt: string;
}

const Article = ({ idx, title, companyName, writer, isScraped, createdAt }: ArticleProps) => {
  const [css] = useStyletron();
  const dispatch = useDispatch();

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
        {isScraped ? (
          <StarFillSvg
            className={css({
              marginTop: '4px',
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addScrap({
                  idx,
                  title,
                  companyName,
                  writer,
                  isScraped,
                  createdAt,
                }),
              );
            }}
          />
        ) : (
          <StarEmptySvg
            className={css({
              marginTop: '4px',
            })}
            onClick={(e) => {
              e.preventDefault();
              dispatch(deleteScrap({ idx }));
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
