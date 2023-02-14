import React from 'react';
import { useStyletron } from 'styletron-react';
import { border, padding } from 'polished';
import { HeaderButton } from '../molecules/headerButton';
import { ReactComponent as SearchSvg } from '../../assets/svgs/search.svg';
import { ReactComponent as CalendarSvg } from '../../assets/svgs/calendar.svg';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { CheckboxDataInterface } from '../molecules/checkboxPanel';

const Header = () => {
  const [css] = useStyletron();
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
        hasFilter={Boolean(filterHeadline)}
        icon={<SearchSvg fill={filterHeadline ? '#3478f6' : ''} />}
        text={filterHeadline || '전체 헤드라인'}
      />
      <HeaderButton
        hasFilter={Boolean(filterPubDate)}
        icon={<CalendarSvg fill={filterPubDate ? '#3478f6' : ''} />}
        text={filterPubDate || '전체 날짜'}
      />
      <HeaderButton
        hasFilter={Boolean(filterCountry.length)}
        text={
          filterCountry.length
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
