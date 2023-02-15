import React, { useEffect } from 'react';
import { useStyletron } from 'styletron-react';
import { borderRadius } from 'polished';
import { ReactComponent as HomeSvg } from '../../assets/svgs/home.svg';
import { ReactComponent as ScrapSvg } from '../../assets/svgs/scrap.svg';
import { useNavigate } from 'react-router-dom';
import { changeTab, SelectedUnion } from '../../store/article/tab';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { Button } from '../atoms/button';

const TabPanel = () => {
  const [css] = useStyletron();
  const navigate = useNavigate();
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.pathname.indexOf('scrap') !== -1) {
      dispatch(changeTab({ selectedTab: 'scrap' }));
    } else {
      dispatch(changeTab({ selectedTab: 'home' }));
    }
  }, [tab]);

  return (
    <article
      className={css({
        width: '100%',
        height: '85px',
        position: 'fixed',
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        backgroundColor: '#000000',
        ...borderRadius('top', '30px'),
      })}
    >
      <Button
        onClick={(e) => {
          e.preventDefault();
          dispatch(changeTab({ selectedTab: 'home' }));
          navigate('/');
        }}
        overrides={{
          Root: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: '9px',
            },
          },
        }}
      >
        <HomeSvg width="24px" height="24px" fill={tab === 'home' ? '#ffffff' : '#6d6d6d'} />
        <b
          className={css({
            fontSize: '10px',
            lineHeight: '12px',
            color: tab === 'home' ? '#ffffff' : '#6d6d6d',
          })}
        >
          홈
        </b>
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          dispatch(changeTab({ selectedTab: 'scrap' }));
          navigate('/scrap');
        }}
        overrides={{
          Root: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              rowGap: '9px',
            },
          },
        }}
      >
        <ScrapSvg width="24px" height="24px" stroke={tab === 'scrap' ? '#ffffff' : '#6d6d6d'} />
        <b
          className={css({
            fontSize: '10px',
            lineHeight: '12px',
            color: tab === 'scrap' ? '#ffffff' : '#6d6d6d',
          })}
        >
          스크랩
        </b>
      </Button>
    </article>
  );
};

export { TabPanel };
