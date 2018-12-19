// @flow

import React, { PureComponent } from 'react';
import fp from 'lodash/fp';
import InputMask from 'react-input-mask';
import { InputWrapperTag, InputTag, InputIndicatorTag, InputRightIconTag, InputLeftIconTag } from './Input.theme';

type InputCommonProps = {
  /** field placeholder */
  placeholder?: string,
  /** html auto-complete representation */
  autoComplete?: boolean,
  /** disabled */
  disabled?: boolean,
  /** when true then stretch to the maximal width */
  stretch?: boolean,
  /** when true then don't show error indicator  */
  hideErrorIndicator?: boolean,
  /** align of the input value */
  align?: 'center' | 'left' | 'right',
  /** left icon componen */
  leftIcon?: React$Node,
  /** right icon componen */
  rightIcon?: React$Node,
  /** max symbols in the input value*/
  maxLength?: number,
  /** callback to set input ref */
  insideRef?:(HTMLInputElement) => void,
  /** kind of the input */
  kind?: 'bordered' | 'underline',
  /** readonly */
  readOnly?: boolean,
};

type InputProps = {
  /** input name */
  name?: string,
  /** input value */
  value?: ?string | ?number,
  /** possible input types */
  type?: 'text' | 'number' | 'password' | 'email' | 'url',
  /** then true when show error styles */
  hasError?: boolean,
  /** text of the error */
  errorText?: string,
  /** mask string in the react-input-mask format */
  mask?: string,
  /** set custom input width in rem */
  width?: number,
  /** callback to change input value */
  onChange?: (value?: string | ?number, event?: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (?SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (?SyntheticFocusEvent<HTMLInputElement>) => void,
} & InputCommonProps;

class Input extends PureComponent<InputProps> {
  static defaultProps = {
    align: 'left',
    autoComplete: false,
    hasError: false,
    hideErrorIndicator: false,
    stretch: true,
    type: 'text',
    kind: 'bordered',
  }

  onChange = (event: *) => {
    const { onChange, type, maxLength } = this.props;
    const { value } = event.target;
    const hasNotMaxLength = maxLength === undefined;

    if (value.toString().length <= maxLength || hasNotMaxLength) {
      if (type === 'number') {
        onChange && onChange(!value ? value : Number(value), event);
      }
      else {
        onChange && onChange(value, event);
      }
    }
  }

  render() {
    const {
      align,
      autoComplete,
      errorText,
      hasError,
      hideErrorIndicator,
      insideRef,
      leftIcon,
      mask,
      onBlur,
      onFocus,
      placeholder,
      rightIcon,
      width,
      stretch,
      type,
      value,
      name,
      kind,
      disabled,
      readOnly,
      ...rest
    } = this.props;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    const inputProps = {
      align,
      autoComplete: autoComplete ? 'on' : 'off',
      hasError,
      hasLeftIcon,
      hasRightIcon,
      onBlur,
      onChange: this.onChange,
      onFocus,
      placeholder,
      width,
      type,
      value,
      insideRef,
      name,
      kind,
      disabled,
      readOnly,
    };

    return (
      <InputWrapperTag { ...fp.omit(['onChange'], rest) } stretch={ stretch } width={ width } tagName="div">
        <Choose>
          <When condition={ !mask }>
            <InputTag
              { ...inputProps }
              tagName="input"
            />
          </When>
          <Otherwise >
            <InputTag
              { ...inputProps }
              mask={ mask }
              tagName={ InputMask }
            />
          </Otherwise>
        </Choose>
        <If condition={ !!hasError && !hideErrorIndicator }>
          <InputIndicatorTag hasError={ hasError } tagName="div" />
        </If>
        <If condition={ hasLeftIcon }>
          <InputLeftIconTag tagName="div">{ leftIcon }</InputLeftIconTag>
        </If>
        <If condition={ hasRightIcon }>
          <InputRightIconTag tagName="div">{ rightIcon }</InputRightIconTag>
        </If>
      </InputWrapperTag>
    );
  }
}

export { Input };
export type { InputCommonProps };