import { Properties } from 'csstype';
import { isNumber } from 'lodash';
import { StyleObject } from 'styletron-react';

const breakingSpace = (
  propertyName: keyof Properties,
  originalValue: number | string,
  containerValue: number | string,
) => {
  const unit = /font-size|line-height/.test(propertyName) ? 'vw' : '%';

  return isNumber(originalValue) && isNumber(containerValue)
    ? (originalValue / containerValue) * 100 + unit
    : `calc(${originalValue} / ${containerValue} * 100${unit})`;
};

const ONE_PERCENT_RATIO = 0.01;
const calculateAlternativeViewportUnit = () => {
  /* some mobile browsers have different viewport unit calculation strategy for native ui (controller, scrollbar and etc) */
  document.documentElement.style.setProperty(
    '--1vh-as-px',
    `${window.innerHeight * ONE_PERCENT_RATIO}px`,
  );
  document.documentElement.style.setProperty(
    '--1vw-as-px',
    `${window.innerWidth * ONE_PERCENT_RATIO}px`,
  );
};

// ratio = ((height / width) * 100)
export const aspectRatioPolyfill = (ratio: number): StyleObject => ({
  '::before': {
    float: 'left',
    paddingTop: `${ratio}%`,
    content: '""',
  },
  '::after': {
    display: 'block',
    content: '""',
    clear: 'both',
  },
});
export { breakingSpace, calculateAlternativeViewportUnit };
