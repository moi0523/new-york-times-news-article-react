import React from 'react';
import { useStyletron } from 'styletron-react';
import { border, padding } from 'polished';
import { HeaderButton } from '../molecules/headerButton';
import { ReactComponent as SearchSvg } from '../../assets/svgs/search.svg';
import { ReactComponent as CalendarSvg } from '../../assets/svgs/calendar.svg';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { CheckboxDataInterface } from '../molecules/checkboxPanel';
import { SelectedUnion } from '../../store/article/tab';

const Header = () => {
  const [css] = useStyletron();
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);
  const filterHeadline = useSelector<ReducerType, string>((state) => state.articleFilter.headline);
  const filterPubDate = useSelector<ReducerType, string>((state) => state.articleFilter.pubDate);
  const filterCountry = useSelector<ReducerType, CheckboxDataInterface[]>(
    (state) => state.articleFilter.country,
  );

  return (
    <article
      className={css({
        display: 'flex',
        alignItems: 'center',
        columnGap: '7px',
        backgroundColor: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        ...padding('13px', '20px'),
        ...border('bottom', '1px', 'solid', '#c4c4c4'),
      })}
    >
      <HeaderButton
        hasFilter={Boolean(tab !== 'scrap' && filterHeadline)}
        icon={<SearchSvg fill={tab !== 'scrap' && filterHeadline ? '#3478f6' : ''} />}
        text={tab === 'scrap' ? '전체 헤드라인' : filterHeadline || '전체 헤드라인'}
      />
      <HeaderButton
        hasFilter={Boolean(tab !== 'scrap' && filterPubDate)}
        icon={<CalendarSvg fill={tab !== 'scrap' && filterPubDate ? '#3478f6' : ''} />}
        text={tab === 'scrap' ? '전체 날짜' : filterPubDate || '전체 날짜'}
      />
      <HeaderButton
        hasFilter={Boolean(tab !== 'scrap' && filterCountry.length)}
        text={
          tab !== 'scrap' && filterCountry.length
            ? filterCountry.length === 1
              ? filterCountry[0].text
              : `${filterCountry[0].text} 외 ${filterCountry.length - 1}`
            : '전체 국가'
        }
      />
    </article>
  );
};

export { Header };
