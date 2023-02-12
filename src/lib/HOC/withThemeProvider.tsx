import React, { ReactNode } from 'react';
import { useStyletron } from 'styletron-react';

interface ThemeChangerProps {
  children: ReactNode;
}

const WithThemeProvider = ({ children }: ThemeChangerProps) => {
  const [css] = useStyletron();

  return (
    <div
      id="variableWrapper"
      className={css({
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        backgroundColor: '#f0f1f4',
        color: '#333333',
        width: 'inherit',
        height: 'inherit',
      })}
    >
      <main
        id="AppContainer"
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: 'inherit',
          height: 'inherit',
        })}
      >
        {children}
      </main>
      <div id="LayersContainer" />
    </div>
  );
};

export { WithThemeProvider };
