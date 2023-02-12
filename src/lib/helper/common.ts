import { get, isArray, isString } from 'lodash';
import { StyleOverride } from '../style/component.types';
import { StyleObject } from 'styletron-react';

const isBrowserContext = () => typeof window !== 'undefined';
const getOnlyFirstString = (value?: string | string[]) => (isArray(value) ? value[0] : value) ?? '';

const getSearchParams = (name: string) =>
  isBrowserContext() ? new URLSearchParams(location.search).get(name) : undefined;

const getRefreshTokenFromLocalStorage = () => {
  if (isBrowserContext()) {
    const value = localStorage.getItem('refreshToken');

    return value ?? '';
  } else {
    return '';
  }
};

const getFirstOneFromUnion = (value: string | string[]): string =>
  (isArray(value) ? value[0] : value) ?? '';

const getArrayFromUnion = (value: string | string[]): string[] =>
  (isString(value) ? [value] : value) ?? [];

interface OverridesProps<Props> {
  Root?: {
    style?: StyleOverride<Props>;
  };
}

const getOverrideStyle = <T>(overrides?: OverridesProps<T>) =>
  get(overrides, 'Root.style', {}) as StyleObject;

export {
  getSearchParams,
  isBrowserContext,
  getOnlyFirstString,
  getRefreshTokenFromLocalStorage,
  getFirstOneFromUnion,
  getArrayFromUnion,
  getOverrideStyle,
};
