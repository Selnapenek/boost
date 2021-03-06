// @flow

import React, { PureComponent } from 'react';
import fp from 'lodash/fp';
import { compose, setDisplayName } from 'recompose';
import { createThemeTag } from '../../theme/createThemeTag';

import { withTabsContext } from './TabsContext';

/**
 * @prop {*} children component to be displayed in Tab
 * @prop {*} disabled if true, element is disabled
 * @prop {*} tabId ID of Tab element
 */

type TabTitleProps = {|
  children: React$Node | ({ selected: boolean, disabled: boolean }) => React$Node,
  disabled?: boolean,
  forceRender?: boolean,
  tabId: string,
|}

const [TabTitleTag] = createThemeTag('tabTitle', {});

const tabTitleEnhancer: HOC<*, TabTitleProps> = compose(
  (setDisplayName: any)('TabTitle'),
  withTabsContext,
);

type TabTitleBaseProps = HOCBase<typeof tabTitleEnhancer>

class TabTitleBase extends PureComponent<TabTitleBaseProps> {
  passSelectedTabId = () => {
    const { tabId, tabs: { onSelect }} = this.props;

    onSelect && onSelect(tabId);
  }

  getChildren = () => {
    const { children, tabId, disabled, tabs: { selectedTabId }} = this.props;
    const selected = selectedTabId === tabId;

    return typeof children === 'function'
      ? children({ selected, disabled: !!disabled })
      : children;
  }

  render() {
    const rest = fp.omit(['children', 'disabled', 'tabId', 'tabs'], this.props);

    return (
      <TabTitleTag { ...rest } onClick={ this.passSelectedTabId } tagName="div">
        { this.getChildren() }
      </TabTitleTag>
    );
  }
}

const TabTitle = tabTitleEnhancer(TabTitleBase);

export { TabTitle };
