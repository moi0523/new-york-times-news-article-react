import React from 'react';
import { useStyletron } from 'styletron-react';
import { border, padding } from 'polished';
import { HeaderButton } from '../molecules/headerButton';
import { ReactComponent as SearchSvg } from '../../assets/svgs/search.svg';
import { ReactComponent as CalendarSvg } from '../../assets/svgs/calendar.svg';

const Header = () => {
  const [css] = useStyletron();

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
      <HeaderButton icon={<SearchSvg />} text="전체 헤드라인" />
      <HeaderButton icon={<CalendarSvg />} text="전체 날짜" />
      <HeaderButton text="전체 국가" />
    </article>
  );
};

export { Header };
