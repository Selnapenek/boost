// @flow

import React from 'react';
import ReactSelect from 'react-select';

import { SelectTag } from './Select.theme';
import { PALETTE, Z_INDEX } from '../../theme';

type SelectProps = {|
  options: Array<{ label: mixed, value: string }>,
  onChange: (selectedValue: mixed, event?: SyntheticInputEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: Object,
  loading?: boolean,
  disabled?: boolean,
  multiple?: boolean,
  clearable?: boolean,
  hasError?: boolean,
  zIndex?: string | number,
  valueComponent?: React$Node,
|};

const customStyles = ({ hasError, zIndex = Z_INDEX.DROPDOWN }) => ({
  control: (style, { isFocused }) => ({
    ...style,
    maxHeight: '36px',
    minHeight: '36px',
    backgroundColor: PALETTE.WHITE,
    borderColor: hasError ? PALETTE.DANGER : (isFocused ? PALETTE.PRIMARY : PALETTE.LIGHT_GRAY1),
    boxShadow: null,
    '&:hover': {
      borderColor: isFocused ? PALETTE.PRIMARY : PALETTE.LIGHT_GRAY1,
    },
  }),
  menuPortal: (style) => ({
    ...style,
    zIndex,
  }),
  placeholder: (style) => ({
    ...style,
    color: PALETTE.LIGHT_GRAY1,
    whiteSpace: 'nowrap',
  }),
  indicatorSeparator: (style) => ({
    ...style,
    backgroundColor: PALETTE.WHITE,
  }),
  multiValue: (style) => ({
    ...style,
    borderRadius: '12px',
    padding: '0 8px',
    color: '#878c93',
    border: '1px solid #d0d7dd',
    backgroundColor: '#fff',
  }),
  multiValueLabel: (style) => ({
    ...style,
    color: 'inherit',
  }),
  multiValueRemove: (style) => ({
    ...style,
    color: 'inherit',
    '&:hover': {
      backgroundColor: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
    },
  }),
});

const Select = ({ value, loading, clearable, disabled, multiple, options, onChange, placeholder, valueComponent, ...props }: SelectProps) => (
  <SelectTag { ...props }>
    <ReactSelect
      isClearable={ clearable }
      isDisabled={ disabled }
      isLoading={ loading }
      isMulti={ multiple }
      menuPlacement="auto"
      menuPortalTarget={ document.body }
      onChange={ onChange }
      options={ options }
      placeholder={ placeholder }
      valueComponent={ valueComponent }
      styles={ customStyles(props) }
      value={ value }
    />
  </SelectTag>
);

export { Select };
