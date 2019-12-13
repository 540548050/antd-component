import React, { Component } from 'react';
import { getPrefix } from '../_util';
import { CSSTransition } from 'react-transition-group';
interface NoticeProps {
  children: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  closeIcon?: React.ReactNode;
}
export default class extends Component<NoticeProps> {
  timer = null;
  componentDidMount() {
    this.startTimer();
  }
  startTimer = () => {
    let { duration } = this.props;
    if (duration) {
      this.timer = setTimeout(() => {
        this.close();
      }, duration * 1000);
    }
  };
  close = () => {
    this.closeTimer();
    this.props.onClose();
  };
  componentWillUnmount() {
    this.closeTimer();
  }
  closeTimer = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };
  render() {
    const { children, closeIcon } = this.props;
    let prefixCls = getPrefix('notification-notice');
    return (
      <div
        onMouseEnter={this.closeTimer}
        onMouseLeave={this.startTimer}
        className={prefixCls}
      >
        <div className={`${prefixCls}-content`}>{children}</div>
        <div onClick={this.close} className={`${prefixCls}-close`}>
          {closeIcon ? closeIcon : 'X'}
        </div>
      </div>
    );
  }
}
