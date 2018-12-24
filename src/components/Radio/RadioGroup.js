// @flow
import React, { PureComponent } from 'react';
import { FlexLayout } from '../FlexLayout';
import { RadioItem } from './RadioItem';
import type { PropSizes } from '../../types';


type RadioProps = {
  children?: React$Node,
  /** optional name of the group */
  name?: string,
  /** selected value */
  value?: string | number,
  /** offset between radio items */
  gap?: PropSizes,
  /** direction of the radio items */
  direction?: 'row' | 'column',
  /** callback to change the radio state */
  onChange?: (string | number, SyntheticInputEvent<HTMLInputElement>) => void,
  /** then true when show error styles */
  hasError?: boolean,
  /** options to define radio items */
  options?: Array<({ value: any, label: string })>,
}

class RadioGroup extends PureComponent<RadioProps> {
  static instanceCounter = 0;

  static defaultProps = {
    direction: 'column',
    gap: 'md',
  }

  componentWillMount() {
    RadioGroup.instanceCounter++;
  }

  getGroupName = () => {
    const { name } = this.props;

    return name || `radio-group-${RadioGroup.instanceCounter}`;
  }

  renderChildren = () => {
    const { options, children } = this.props;

    return !options
      ? children
      : options.map(({ value, label }) => (
        <RadioItem key={ value } label={ label } value={ value } />
      ));
  }

  render() {
    const { children, value, direction, gap, onChange, hasError, ...rest } = this.props;

    return (
      <FlexLayout { ...rest } direction={ direction } gap={ gap }>
        {
          React.Children.map(this.renderChildren(), child =>
            React.cloneElement(child, {
              onChange,
              selectedValue: value,
              name: this.getGroupName(),
              hasError,
            }))
        }
      </FlexLayout>
    );
  }
}

export { RadioGroup };
