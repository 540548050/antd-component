import React, { Component } from 'react';
import { tuple } from '../utils';
import { getPrefix } from '../utils';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';
const types = tuple('danger', 'warn', 'secondary');
type TextType = (typeof types)[number];
export interface BaseProps {
  children?: React.ReactNode;
  delete?: boolean;
  mark?: boolean;
  underline?: boolean;
  strong?: boolean;
  code?: boolean;
  type?: TextType;
  disabled?: boolean;
  copyable?: boolean;
  component?: string;
}
//创建对应标签包裹内容
function wrapperContent(
  { mark, delete: del, underline, code, strong }: BaseProps,
  content: React.ReactNode
) {
  let currentContent = content;
  function wrap(needWrap: boolean | undefined, tag: string) {
    if (!needWrap) return;
    currentContent = React.createElement(tag, {
      children: currentContent
    });
  }
  wrap(mark, 'mark');
  wrap(del, 'del');
  wrap(underline, 'u');
  wrap(code, 'code');
  wrap(strong, 'strong');
  return currentContent;
}
export default class extends Component<BaseProps> {
  static defaultProps = {
    delete: false,
    mark: false,
    underline: false,
    strong: false,
    code: false,
    component: 'span'
  };
  copy = () => {
    let { children } = this.props;
    copy(children as string);
  };
  renderCopy = (classes, children) => {
    const { component } = this.props;
    const Component = component as any;
    const ele = (
      <Component onClick={this.copy} className={classes}>
        {children}
      </Component>
    );
    return ele;
  };
  render() {
    let { children, type, disabled, copyable, component } = this.props;
    const prefixCls = getPrefix('typography');
    const Component = component as any;
    const classes = classNames({
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-disabled`]: disabled
    });
    children = wrapperContent(this.props, children);
    return copyable ? (
      this.renderCopy(classes, children)
    ) : (
      <Component className={classes}>{children}</Component>
    );
  }
}
