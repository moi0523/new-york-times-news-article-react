import React, { ReactNode, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { border, borderRadius, padding } from 'polished';
import { Button } from '../atoms/button';
import { FilterModal } from '../organisms/filterModal';
import { WithPortal } from '../../HOC/withPortal';

interface HeaderButtonProps {
  icon?: ReactNode;
  text: string;
}

const HeaderButton = ({ icon, text }: HeaderButtonProps) => {
  const [css] = useStyletron();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenPopup(true);
        }}
        overrides={{
          Root: {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '4px',
              ...border('1px', 'solid', '#c4c4c4'),
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
            color: '#6d6d6d',
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
