import React, { Component } from 'react';
import { getPrefix, toggleArray } from '../_util';
import './style/index.scss';
import Panel from './Panel';
import classNames from 'classnames';
const prefixCls = getPrefix('collapse');
interface IProps {
  defaultActiveKey?: Array<string | number>;
  activeKey?: Array<string | number>;
  expandIconPosition?: 'left' | 'right';
  accordion?: boolean;
}
interface IState {
  activeKey?: Array<string | number>;
}
export default class extends Component<IProps, IState> {
  static Panel = Panel;
  static getDerivedStateFromProps = nextProps => {
    if ('activeKey' in nextProps) {
      return {
        activeKey: nextProps.activeKey
      };
    }
    return null;
  };
  static defaultProps: Partial<IProps> = {
    expandIconPosition: 'right',
    accordion: false
  };
  constructor(props) {
    super(props);
    let activeKey = props.activeKey ? props.activeKey : props.defaultActiveKey;
    this.state = {
      activeKey: activeKey || []
    };
  }
  getActiveKey = key => {
    let { accordion } = this.props;
    let { activeKey } = this.state;
    //使用手风琴模式 ， 至多开启一个项目
    if (accordion) {
      //当前key在列表中
      let exist = activeKey.indexOf(key) !== -1;
      activeKey = [];
      if (!exist) activeKey.push(key);
    } else {
      activeKey = toggleArray(activeKey, key);
    }
    return activeKey;
  };
  panelChange = (key, onChange) => {
    let activeKey = this.getActiveKey(key);
    if (onChange && 'activeKey' in this.props) {
      onChange(activeKey);
    } else {
      this.setState({ activeKey });
    }
  };
  render() {
    const { activeKey } = this.state;
    const { children, expandIconPosition } = this.props;
    const classes = classNames(prefixCls, {
      [`${prefixCls}-${expandIconPosition}`]: true
    });
    return (
      <div className={classes}>
        {React.Children.map(children, child => {
          //@ts-ignore
          let { key } = child;
          return React.cloneElement(child as React.ReactElement, {
            active: activeKey.indexOf(key) !== -1,
            onClick: this.panelChange,
            activeKey: key
          });
        })}
      </div>
    );
  }
}
