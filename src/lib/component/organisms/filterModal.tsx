import React, { useState } from 'react';
import { useStyletron } from 'styletron-react';
import { border, borderRadius, padding } from 'polished';
import { FilterModalPanel } from '../molecules/filterModalPanel';
import { Input } from '../atoms/input';
import { ReactComponent as CalendarSvg } from '../../assets/svgs/calendar.svg';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckboxPanel } from '../molecules/checkboxPanel';
import { Button } from '../atoms/button';

const dummyData = [
  {
    text: '대한민국',
    value: '대한민국',
  },
  {
    text: '중국',
    value: '중국',
  },
  {
    text: '일본',
    value: '일본',
  },
  {
    text: '미국',
    value: '미국',
  },
  {
    text: '북한',
    value: '북한',
  },
  {
    text: '러시아',
    value: '러시아',
  },
  {
    text: '프랑스',
    value: '프랑스',
  },
  {
    text: '영국',
    value: '영국',
  },
];

const FilterModal = () => {
  const [css] = useStyletron();
  const [selectedDate, setSelectedDate] = useState<Date | null>();

  return (
    <article
      className={css({
        width: '100%',
        display: 'grid',
        rowGap: '40px',
        zIndex: 1,
        backgroundColor: '#ffffff',
        ...borderRadius('top', '16px'),
        ...borderRadius('bottom', '16px'),
        ...padding('20px'),
      })}
    >
      <FilterModalPanel title="헤드라인">
        <Input
          type="text"
          placeholder="검색하실 헤드라인을 입력해주세요."
          overrides={{
            Root: {
              style: {
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '14px',
                lineHeight: '24px',

                ...border('1px', 'solid', '#c4c4c4'),
                ...borderRadius('top', '8px'),
                ...borderRadius('bottom', '8px'),
                ...padding('10px', '20px'),
              },
            },
          }}
        />
      </FilterModalPanel>
      <FilterModalPanel title="날짜">
        <div
          className={css({
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'calc(100% - 16px) 16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...border('1px', 'solid', '#c4c4c4'),
            ...borderRadius('top', '8px'),
            ...borderRadius('bottom', '8px'),
            ...padding('10px', '20px'),
          })}
        >
          <DatePicker
            selected={selectedDate}
            placeholderText="날짜를 선택해주세요."
            dateFormat="yyyy.MM.dd"
            maxDate={new Date()}
            locale={ko}
            onChange={(date) => setSelectedDate(date)}
            className={css({
              display: 'flex',
              justifyContent: 'center',
              fontSize: '14px',
              lineHeight: '24px',
              border: 'unset',
              backgroundColor: 'unset',
            })}
          />
          <CalendarSvg
            width="16px"
            height="16px"
            className={css({
              fill: '#c4c4c4',
              position: 'absolute',
              right: '20px',
            })}
          />
        </div>
      </FilterModalPanel>
      <FilterModalPanel title="국가">
        <CheckboxPanel data={dummyData} groupName="checkboxPanel" />
      </FilterModalPanel>
      <Button
        onClick={() => {
          console.log('save');
        }}
        overrides={{
          Root: {
            style: {
              width: '100%',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3478f6',
              ...borderRadius('top', '16px'),
              ...borderRadius('bottom', '16px'),
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
          필터 적용하기
        </b>
      </Button>
    </article>
  );
};

export { FilterModal };
