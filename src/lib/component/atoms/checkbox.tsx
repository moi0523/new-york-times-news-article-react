import React, { Dispatch, ReactNode, SetStateAction, SyntheticEvent } from 'react';
import { useStyletron } from 'styletron-react';

interface CheckboxProps {
  index: number;
  groupName: string;
  selectedCheckbox: string[];
  setSelectedCheckbox: Dispatch<SetStateAction<string[]>>;
  value: string;
  callback?: (e: SyntheticEvent<Element, Event>) => void;
  children: ReactNode;
}

const Checkbox = ({
  index,
  groupName,
  selectedCheckbox,
  setSelectedCheckbox,
  value,
  callback,
  children,
}: CheckboxProps) => {
  const [css] = useStyletron();

  return (
    <label
      htmlFor={`${groupName}-${index}`}
      className={css({
        position: 'relative',
      })}
    >
      <input
        type="checkbox"
        id={`${groupName}-${index}`}
        name={groupName}
        value={value}
        checked={selectedCheckbox.indexOf(value) !== -1}
        onChange={(e) => {
          setSelectedCheckbox((prev) => {
            if (prev.indexOf(value) !== -1) {
              return prev.filter((item) => item !== value);
            }

            return [...prev, value];
          });

          callback?.(e);
        }}
        className={css({
          position: 'absolute',
        })}
      />
      {children}
    </label>
  );
};

export { Checkbox };
export type { CheckboxProps };
