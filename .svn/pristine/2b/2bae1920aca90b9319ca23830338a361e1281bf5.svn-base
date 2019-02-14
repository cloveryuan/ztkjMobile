import * as React from 'react';
import { Icon } from 'antd';
import { NavBar, Popover } from 'antd-mobile';
import './m3u8.css'
import './systemanalysis.scss';

const Item = Popover.Item;
interface StateTable {
    visible?: boolean;
    selected?: string;
}

export interface PropsConfigure {
collapsed?: boolean;
defaultKey?: string;
scrollTop?: any;
}

export class M3u8 extends React.Component<PropsConfigure, StateTable> {
    constructor(props: PropsConfigure) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
    }
    onSelect = (opt) => {
        // console.log(opt.props.value);
        this.setState({visible: false, selected: opt.props.value}, () => {
            window.location.href = './index.html';
        });
      };
    handleVisibleChange = (visible) => {
        this.setState({
          visible,
        });
      };
    onIndex = () => {
        window.location.href = './mainwindow.html';
    }

render() {
    let isTrue = true;
    return (
        <div 
            style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                overflow: 'hidden',
                display: 'flex'
            }}
        >
            <NavBar
                mode="dark"
                leftContent={<Icon type="home" style={{fontSize: '22px'}} />}
                onLeftClick={this.onIndex}
                rightContent={
                    <Popover 
                        mask={isTrue}
                        visible={this.state.visible}
                        overlay={<Item key="4" data-seed="logId">安全退出</Item>}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.onSelect}
                    >
                        <div 
                            style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                        <Icon type="ellipsis" style={{fontSize: '28px', fontWeight: 700}}/>
                        </div>
                    </Popover>
                }
            >
                实时监控
            </NavBar>
            <div style={{overflowY: 'auto', width: '100%', flex: 1}}>
                <div className="h5videodiv">
                    <video autoPlay={true} controls={true} className="h5video" id="h5sVideo1">
                        <source src="http://hls.open.ys7.com/openlive/f4529bcff56f4e0bba5bd1b1813658da.m3u8" />
                    </video>
                </div>
            </div>
        </div> 
            
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(M3u8)
registerServiceWorker()