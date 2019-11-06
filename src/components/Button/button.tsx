import React, { Component } from 'react';
import { tuple } from '../utils';
import classNames from 'classnames';
import { getPrefix } from '../utils';
import './style/index.scss';
import Group from './button-group';
const ButtonTypes = tuple('default', 'primary', 'danger', 'success');
export type ButtonType = (typeof ButtonTypes)[number];
const ButtonShapes = tuple('round');
export type ButtonShape = (typeof ButtonShapes)[number];
const ButtonSizes = tuple('large', 'default', 'small');
export type ButtonSize = (typeof ButtonSizes)[number];
interface BaseButtonProps {
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: React.MouseEventHandler;
  className?: string;
  delay?: number;
  block?: boolean;
}
interface ButtonState {
  clicked: boolean;
}
export default class extends Component<BaseButtonProps, ButtonState> {
  static Group = Group;
  static defaultProps = {
    type: 'default',
    size: 'default'
  };
  state = {
    clicked: false
  };
  handleClick = e => {
    let { loading, onClick } = this.props;
    if (loading) return;
    onClick && onClick(e);
    this.setClicked();
  };
  setClicked = () => {
    this.setState(
      {
        clicked: true
      },
      () => {
        let timer = setTimeout(() => {
          this.setState(
            {
              clicked: false
            },
            () => {
              clearInterval(timer);
            }
          );
        }, 300);
      }
    );
  };
  render() {
    let {
      type,
      children,
      shape,
      size,
      className,
      loading: pLoading,
      loading,
      block,
      ...rest
    } = this.props;
    let { clicked } = this.state;
    const prefixCls = getPrefix('btn');
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-size-${size}`]: size,
      [`${prefixCls}-size-${size}-${shape}`]: shape,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-block`]: block
    });
    return (
      <button {...rest} className={classes} onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}
