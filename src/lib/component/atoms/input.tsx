import { get, merge } from 'lodash';
import React, { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';
import { useStyletron } from 'styletron-react';
import { OverrideObject } from '../../style/component.types';
import { getOverrideStyle } from '../../helper/common';

type InputOverrides = {
  Root?: Omit<OverrideObject<InputProps>, 'component'>;
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  overrides?: InputOverrides;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  id?: string;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  // onClick?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  overrides,
  onChange,
  value,
  placeholder,
  disabled,
  id,
  onFocus,
  onBlur,
  type = 'text',
  ...props
}: InputProps) => {
  const [css] = useStyletron();

  const internalOnchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const internalOnFocusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onFocus?.(e);
  };

  const internalOnBlurHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onBlur?.(e);
  };

  return (
    <input
      autoComplete={'off'}
      onChange={internalOnchangeHandler}
      onFocus={internalOnFocusHandler}
      onBlur={internalOnBlurHandler}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      id={id}
      type={type}
      className={css(getOverrideStyle(overrides))}
      {...merge(props, get(overrides, 'Root.props', {}))}
    />
  );
};

export { Input };
export type { InputProps, InputOverrides };
