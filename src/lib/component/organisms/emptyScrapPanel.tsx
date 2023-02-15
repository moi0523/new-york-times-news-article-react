import React from 'react';
import { useStyletron } from 'styletron-react';
import { ReactComponent as ScrapSvg } from '../../assets/svgs/scrap.svg';
import { borderRadius, margin, padding } from 'polished';
import { Button } from '../atoms/button';
import { changeTab } from '../../store/article/tab';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EmptyScrapPanel = () => {
  const [css] = useStyletron();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <article
      className={css({
        zIndex: 1,
        height: 'calc(100vh - 85px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f1f4',
      })}
    >
      <ScrapSvg width="24px" height="24px" stroke="#6d6d6d" />
      <b
        className={css({
          fontSize: '18px',
          lineHeight: '28px',
          letterSpacing: '-0.05em',
          color: '#6d6d6d',
          ...margin('8px', '', '20px'),
        })}
      >
        저장된 스크랩이 없습니다.
      </b>
      <Button
        onClick={() => {
          dispatch(changeTab({ selectedTab: 'home' }));
          navigate('/');
        }}
        overrides={{
          Root: {
            style: {
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3478f6',
              ...borderRadius('top', '16px'),
              ...borderRadius('bottom', '16px'),
              ...padding('16px', '70px'),
            },
          },
        }}
      >
        <b
          className={css({
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '-0.05em',
            color: '#ffffff',
          })}
        >
          스크랩 하러 가기
        </b>
      </Button>
    </article>
  );
};

export { EmptyScrapPanel };
