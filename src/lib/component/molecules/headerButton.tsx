import React, { ReactNode, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { border, borderRadius, padding } from 'polished';
import { Button } from '../atoms/button';
import { FilterModal } from '../organisms/filterModal';
import { WithPortal } from '../../HOC/withPortal';
import { useSelector } from 'react-redux';
import { ReducerType } from '../../store/store';
import { SelectedUnion } from '../../store/article/tab';

interface HeaderButtonProps {
  hasFilter?: boolean;
  icon?: ReactNode;
  text: string;
}

const HeaderButton = ({ hasFilter, icon, text }: HeaderButtonProps) => {
  const [css] = useStyletron();
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const tab = useSelector<ReducerType, SelectedUnion>((state) => state.tab.selectedTab);

  return (
    <>
      <Button
        onClick={() => {
          if (tab !== 'scrap') {
            setIsOpenPopup(true);
          }
        }}
        overrides={{
          Root: {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '4px',
              ...border('1px', 'solid', hasFilter ? '#82b0f4' : '#c4c4c4'),
              ...borderRadius('top', '30px'),
              ...borderRadius('bottom', '30px'),
              ...padding('6px', '12px', '4px'),
            },
          },
        }}
      >
        {icon}
        <span
          className={css({
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '-0.04em',
            color: hasFilter ? '#3478f6' : '#6d6d6d',
          })}
        >
          {text}
        </span>
      </Button>
      <WithPortal
        isOpen={isOpenPopup}
        setIsOpen={setIsOpenPopup}
        overrides={{
          Root: {
            style: {
              display: 'flex',
              userSelect: 'none',
              ...padding('', '20px'),
            },
          },
        }}
      >
        <FilterModal setIsOpen={setIsOpenPopup} />
      </WithPortal>
    </>
  );
};

export type { HeaderButtonProps };
export { HeaderButton };
