import * as React from 'react';
import { Flex, NavBar, Badge, Popover, Icon } from 'antd-mobile';
import http from '../../common/api';
import style from './mainwindow.scss';

const Item = Popover.Item;
interface StateTable {
total_count?: number,
visible?: boolean,
selected?: string,
imageUrl?: any,
}

export interface PropsConfigure {
collapsed?: boolean;
defaultKey?: string;
}

export class ContentCreat extends React.Component<PropsConfigure, StateTable> {
constructor(props: PropsConfigure) {
    super(props)
    this.state = {
        total_count:  0,
        visible: false,
        selected: '',
        imageUrl: ''
    }
}
fecth = () => {
    http.postReq(
        '/f/wechatapi/',
        {mtd: 'gcha', right: -1, uid: 2, usid: 1},
        (data) => {
            if (data.rtn.count) {
                this.setState({ total_count: data.rtn.count});
            }
            if (data.rtn.url) {
                this.setState({ imageUrl: data.rtn.url});
            }
        }
    )
}
getImage = () => {
    let png_url_ = require('../../image/public.png');
    if (this.state.imageUrl !== '') {
        png_url_ = '/h5/static/image/' + this.state.imageUrl + '';
        
    }
    return png_url_;
}
_DoItemClick1 = (event) => {
    window.location.href = './stationdataair.html';
};
_DoItemClick2 = (event) => {
    window.location.href = './stationwarnair.html';
};
_DoItemClick3 = (event) => {
    window.location.href = './h5splayer.html';
};
_DoItemClick4 = (event) => {
    window.location.href = './stationcontrol.html';
};
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
componentDidMount() {
    this.fecth();
}
render() {
    let win_ = {
        height: window.innerHeight,
        width: window.innerWidth
    };
    let item_height_ = Number(win_.height * 0.15) + 'px';
    let echarts_height_ = Number(win_.height * 0.4) + 'px';
    let isTrue = true;
    return (
        <div 
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <NavBar
                mode="dark"
                rightContent={
                    <Popover 
                        mask={isTrue}
                        // overlayClassName="fortest"
                        // overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={<Item key="4" data-seed="logId">安全退出</Item>}
                        // align={{
                        //     overflow: { adjustY: 0, adjustX: 0 },
                        //     offset: [-10, 0],
                        // }}
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
                        <Icon type="ellipsis" />
                        </div>
                    </Popover>
                }
            >
                在线监控
            </NavBar>
            <Flex direction="column">
                <img 
                    src={this.getImage()} 
                    style={{margin: '5px', height: echarts_height_, width: '100%'}} 
                />
                <div style={{height: '12px', backgroundColor: '#F7F7F7', width: '100%'}} />
                <Flex wrap="wrap" className={style.classify}>
                    <div className={style.alike_flex}>
                        <div 
                            className={style.top_left}
                            style={{
                                height: item_height_,
                                backgroundSize: '100%'
                            }}
                            onClick={this._DoItemClick1} 
                        /> 
                        <div 
                            className={style.top_right}
                            style={{
                                height: item_height_,
                                backgroundSize: '100%',
                                position: 'relative'
                            }}
                            onClick={this._DoItemClick2} 
                        >
                            <Badge 
                                text={this.state.total_count}
                                overflowCount={999}
                                style={{ 
                                    marginLeft: '40vw',
                                    background: 'rgb(0, 188, 212)',
                                }} 
                            />
                        </div>
                    </div>
                    <div className={style.alike_flex}>
                        <div 
                            className={style.bottom_left}
                            style={{
                                height: item_height_,
                                backgroundSize: '100%'
                            }}
                            onClick={this._DoItemClick3} 
                        />
                        <div 
                            className={style.bottom_right}
                            style={{
                                height: item_height_,
                                backgroundSize: '100%'
                            }}
                            onClick={this._DoItemClick4} 
                        />
                    </div>
                    {/* <Flex.Item className={style.alike_flex}>
                        
                    </Flex.Item>
                    <Flex.Item className={style.alike_flex}>
                        
                    </Flex.Item> */}
                </Flex>
            </Flex>
            <div 
                style={{
                    width: '100%',
                    backgroundColor: 'rgb(247, 247, 247)',
                    textAlign: 'center',
                    height: '65px'
                }}
            >
                <p className={style.foot}>
                    Copyright© Nanjing Zitu Co.,Ltd.
                    <br />
                    All Right Reserved 2010-2016
                </p>
            </div>
        </div>
            
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(ContentCreat)
registerServiceWorker()