import React, { ReactNode } from 'react';
import { useStyletron } from 'styletron-react';

interface FilterModalPanelProps {
  title: string;
  children: ReactNode;
}

const FilterModalPanel = ({ title, children }: FilterModalPanelProps) => {
  const [css] = useStyletron();

  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        rowGap: '8px',
      })}
    >
      <b
        className={css({
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '-0.05em',
        })}
      >
        {title}
      </b>
      {children}
    </article>
  );
};

export type { FilterModalPanelProps };
export { FilterModalPanel };
