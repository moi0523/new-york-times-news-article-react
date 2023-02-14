import React, { Dispatch, SetStateAction, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { border, borderRadius, padding } from 'polished';
import { FilterModalPanel } from '../molecules/filterModalPanel';
import { Input } from '../atoms/input';
import { ReactComponent as CalendarSvg } from '../../assets/svgs/calendar.svg';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckboxDataInterface, CheckboxPanel } from '../molecules/checkboxPanel';
import { Button } from '../atoms/button';
import { setCountry, setHeadline, setPubDate } from '../../store/article/filter';
import { setClearArticleList } from '../../store/article/articleList';
import { useDispatch, useSelector } from 'react-redux';
import { reducePubDate } from '../../helper/processedArticle';
import { ReducerType } from '../../store/store';

const countryData = [
  {
    text: '대한민국',
    value: 'korea',
  },
  {
    text: '중국',
    value: 'china',
  },
  {
    text: '일본',
    value: 'japan',
  },
  {
    text: '미국',
    value: 'u.s.',
  },
  {
    text: '북한',
    value: 'north korea',
  },
  {
    text: '러시아',
    value: 'russia',
  },
  {
    text: '프랑스',
    value: 'france',
  },
  {
    text: '영국',
    value: 'england',
  },
];

interface FilterModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const FilterModal = ({ setIsOpen }: FilterModalProps) => {
  const [css] = useStyletron();
  const filterHeadline = useSelector<ReducerType, string>((state) => state.articleFilter.headline);
  const filterPubDate = useSelector<ReducerType, string>((state) => state.articleFilter.pubDate);
  const filterCountry = useSelector<ReducerType, CheckboxDataInterface[]>(
    (state) => state.articleFilter.country,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [headlineText, setHeadlineText] = useState<string>(filterHeadline);
  const [selectedCountry, setSelectedCountry] = useState<typeof countryData>([]);
  const dispatch = useDispatch();

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
          onChange={(e) => {
            setHeadlineText(e.target.value);
          }}
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
          {...(headlineText ? { defaultValue: headlineText } : {})}
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
        <CheckboxPanel
          value={filterCountry.map((item) => item.value)}
          data={countryData}
          groupName="checkboxPanel"
          setSelectedItem={setSelectedCountry}
        />
      </FilterModalPanel>
      <Button
        onClick={() => {
          if (headlineText) {
            dispatch(setHeadline(headlineText));
          }

          if (selectedDate) {
            dispatch(setPubDate(reducePubDate(selectedDate)));
          }

          if (selectedCountry) {
            dispatch(setCountry(selectedCountry));
          }

          dispatch(setClearArticleList());

          setIsOpen(false);
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

export type { FilterModalProps };
export { FilterModal };
