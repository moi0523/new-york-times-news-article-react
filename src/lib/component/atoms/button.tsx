import { get, merge } from 'lodash';
import React, { ReactNode, SyntheticEvent } from 'react';
import { useStyletron } from 'styletron-react';
import { OverrideObject } from '../../style/component.types';
import { getOverrideStyle } from '../../helper/common';

type ButtonOverrides = {
  Root?: Omit<OverrideObject<ButtonProps>, 'component'>;
};

interface ButtonProps {
  /**
   * atom component has no component overriding
   * */
  overrides?: ButtonOverrides;
  disabled?: boolean;
  /** Show loading button style and spinner. */
  isLoading?: boolean;
  /** Defines the kind (purpose) of a button */
  onClick?: (e: SyntheticEvent) => void;
  onMouseDown?: (e: SyntheticEvent) => void;
  type?: 'submit' | 'reset' | 'button';
  children?: ReactNode;
}

const Button = ({
  overrides,
  onClick,
  onMouseDown,
  isLoading,
  children,
  ...props
}: ButtonProps) => {
  const [css] = useStyletron();
  const internalOnClickHandler = (e: SyntheticEvent) => {
    if (!isLoading) {
      onClick?.(e);
    }
  };
  const internalOnMouseDownHandler = (e: SyntheticEvent) => {
    if (!isLoading) {
      onMouseDown?.(e);
    }
  };

  return (
    <button
      onClick={internalOnClickHandler}
      onMouseDown={internalOnMouseDownHandler}
      className={css(getOverrideStyle<ButtonProps>(overrides))}
      {...merge(props, get(overrides, 'Root.props', {}))}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps, ButtonOverrides };
