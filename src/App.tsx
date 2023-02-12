import React from 'react';
import { Header } from './lib/component/organisms/header';
import { useEvent, useMount } from 'react-use';
import { calculateAlternativeViewportUnit } from './lib/style/mixin';
import { debounce } from 'lodash';
import { ArticlePanel } from './lib/component/organisms/articlePanel';
import { TabPanel } from './lib/component/organisms/tabPanel';
import { BrowserRouter as Router } from 'react-router-dom';

const debouncedCalculateAlternativeViewportUnit = debounce(calculateAlternativeViewportUnit, 600);
function App() {
  useMount(() => {
    calculateAlternativeViewportUnit();
  });

  useEvent('resize', debouncedCalculateAlternativeViewportUnit);

  return (
    <>
      <Router>
        <Header />
        <ArticlePanel />
        <TabPanel />
      </Router>
    </>
  );
}

export default App;
