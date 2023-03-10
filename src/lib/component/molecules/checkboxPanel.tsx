import React, { Dispatch, SetStateAction, useState } from 'react';
import { useStyletron } from 'styletron-react';
import { Checkbox } from '../atoms/checkbox';
import { border, borderRadius, padding } from 'polished';

interface CheckboxDataInterface {
  text: string;
  value: string;
}
interface CheckboxPanelPanelProps {
  value: string[];
  data: CheckboxDataInterface[];
  groupName?: string;
  setSelectedItem?: Dispatch<SetStateAction<CheckboxDataInterface[]>>;
}

const CheckboxPanel = ({ value, data, groupName, setSelectedItem }: CheckboxPanelPanelProps) => {
  const [css] = useStyletron();
  const [selectedCheckbox, setSelectedCheckbox] = useState<string[]>(value);

  return (
    <article
      className={css({
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      })}
    >
      {data.map((item, index) => {
        const isChecked = selectedCheckbox.indexOf(item.value) !== -1;

        return (
          <Checkbox
            key={`${item.text}-${item.value}`}
            index={index}
            groupName={groupName || ''}
            selectedCheckbox={selectedCheckbox}
            setSelectedCheckbox={setSelectedCheckbox}
            value={item.value}
            callback={(e) => {
              const { checked } = e.target as HTMLInputElement;

              if (checked) {
                setSelectedItem?.((prev) => [
                  ...prev,
                  ...data.filter((countryItem) => countryItem.value === item.value),
                ]);
              } else {
                setSelectedItem?.((prev) =>
                  prev.filter((prevItem) => prevItem.value !== item.value),
                );
              }
            }}
          >
            <div
              className={css({
                display: 'inline-flex',
                backgroundColor: isChecked ? '#82b0f4' : '#ffffff',
                ...border('1px', 'solid', '#f2f2f2'),
                ...borderRadius('top', '30px'),
                ...borderRadius('bottom', '30px'),
                ...padding('6px', '12px', '4px'),
              })}
            >
              <span
                className={css({
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '-0.04em',
                  color: isChecked ? '#ffffff' : '#6d6d6d',
                })}
              >
                {item.text}
              </span>
            </div>
          </Checkbox>
        );
      })}
    </article>
  );
};

export type { CheckboxDataInterface, CheckboxPanelPanelProps };
export { CheckboxPanel };
