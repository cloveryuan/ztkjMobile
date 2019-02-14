import * as React from 'react';
import { Icon, Spin } from 'antd';
import { NavBar, Popover, Toast } from 'antd-mobile';
import * as echarts from 'echarts';
import http from '../../common/api';
import style from './stationdataair.scss';
import { Station }  from './component/doRenderStation'
import { Equipment }  from './component/doRenderEquipment'
import { Signals }  from './component/doRenderSignals'
import { Chart }  from './modal/doRenderChart'

const Item = Popover.Item;
interface StateTable {
total_count?: number;
visible?: boolean;
selected?: string;
equipment_name?: string;
station_name?: string;
data?: any;
show?: boolean;
select_depth?: number;
G_height?: string;
children?: any;
sidShow?: boolean;
eidShow?: boolean;
chartShow?: boolean;
loading?: boolean;
sid?: string;
eid?: string;
cid?: string;
sigShow?: boolean;
nav_left?: boolean;
signal_data?: any;
equipment_data?: any;
box?: any;
sid_scrollTop?: any;
eid_scrollTop?: any;
isTrue?: boolean;
}

export interface PropsConfigure {
collapsed?: boolean;
defaultKey?: string;
scrollTop?: any;
}

export class ContentCreat extends React.Component<PropsConfigure, StateTable> {
    private scrollTop: any = null;
    constructor(props: PropsConfigure) {
        super(props)
        this.state = {
            isTrue: false,
            total_count:  0,
            visible: false,
            sidShow: false,
            eidShow: false,
            sigShow: false,
            chartShow: false,
            loading: false,
            selected: '',
            station_name: '局站', // 定位局站名称
            equipment_name: '', // 设备名称
            data: [], // Grid 数据
            select_depth: 0,
            children: [],
            sid: '',
            eid: '',
            cid: '',
            nav_left: true,
            signal_data: [],
            equipment_data: [],
            box: 'box1',
            sid_scrollTop: '',
            eid_scrollTop: '',
        }
    }
// 退出
onSelect = (opt) => {
    this.setState({visible: false, selected: opt.props.value}, () => {
        window.location.href = './index.html';
    });
  };
//   遮罩
handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
// 定位名称
GetSubHeaderTitle = () => {
    let header_title_ = [this.state.station_name, this.state.equipment_name];
    return header_title_.join(' >> ');
}
// 返回主页
doGoBack = () => {
    let back_tag_ = this.state.select_depth - 2;
    switch (back_tag_) {
        case -2:
            window.location.href = './index.html';
            break;
        case 0:
            this.setState(
                {
                    eidShow: false, 
                    sidShow: true, 
                    sigShow: false, 
                    select_depth: 1,
                    station_name: '局站',
                    equipment_name: ''
                },
                () => {
                    document.querySelector('.box').scrollTop = this.state.sid_scrollTop;
                }
            );
            break;
        case 1:
            this.setState(
                {
                    eidShow: true, 
                    sidShow: false, 
                    sigShow: false, 
                    select_depth: 2,
                    equipment_name: '',
                },
                () => {
                    let key = {key: this.state.sid, text: this.state.station_name}
                    this.stationClick(key)
                    document.querySelector('.box').scrollTop = this.state.eid_scrollTop;
                }
            );
            break;
        default:
            window.location.href = './mainwindow.html';
            break;
    }
}
// 获取局站列表
getStationGridData = () => {
    http.postReq(
        '/f/wechatapi/',
        {mtd: 'lsta', right: -1, uid: 2, usid: 1},
        (data) => {
            if (data.rtn === 1) {
                let depth = 1;
                const data1 = Array.from(data.lsta[0].children.map((_val, i) => (
                    _val.state === 1 ?  
                        {
                            key: _val.value,
                            icon: require('../../image/s_ic_tongyong02.png'),
                            text: _val.text,
                        } : {
                            key: _val.value,
                            icon: require('../../image/s_ic_tongyong03.png'),
                            text: _val.text,
                        }   
                    )));
                this.setState({
                    data: data1,
                    select_depth: depth, 
                    sidShow: true
                })
            } else {
                Toast.fail(data.rtn, 3);
            }
        }
    )
}
// 获取设备的图片判断
getEquipmentPngUrl = (tag) => {

    let png_url_ = require('../../image/sb_ic_qit_n.png');
    switch (Number.parseInt(tag, 10)) {
        case 11:
        case 12:
        case 21:
        case 23: {
            png_url_ = require('../../image/sb_ic_peidian_n.png');
            break;
        }
        case 13: {
            png_url_ = require('../../image/sb_ic_fadian_n.png');
            break;
        }
        case 22: {
            png_url_ = require('../../image/sb_ic_ups_n.png');
            break;
        }
        case 24: {
            png_url_ = require('../../image/sb_ic_chudian_n.png');
            break;
        }
        case 41:
        case 42:
        case 43:
        case 44:
        case 45: {
            png_url_ = require('../../image/sb_ic_kongtiao_n.png');
            break;
        }
        case 51:
        case 52:
        case 53: {
            png_url_ = require('../../image/sb_ic_huanj_n.png');
            break;
        }
        case 62: {
            png_url_ = require('../../image/sb_ic_feiji_n.png');
            break;
        }
        default: {
            break;
        }
    }
    return png_url_;
}
// 点击局站
stationClick = (el) => {
    http.postReq(
        '/f/wechatapi/',
        {mtd: 'lequ', sid: el.key, right: -1, uid: 2, usid: 1},
        (data) => {
            let depth = 2;
            let scrollTop = this.scrollTop; 
            const data1 = Array.from(data.lequ.map((_val, i) => (
                    {
                        key: _val.value,
                        icon: this.getEquipmentPngUrl(Number.parseInt(_val.value, 10) / 10000),
                        text: _val.text,
                    }  
                )));
            
            this.setState({
                    equipment_data: data1, 
                    select_depth: depth,
                    eidShow: true,
                    sidShow: false,
                    sid_scrollTop: scrollTop
                })
        }
    )
    this.setState({
        station_name: el.text,
        nav_left: false,
        sid: el.key
    })
}
// 点击设备
equipmentClick = (el, index) => {
    console.log(el)
    let datas = {
        mtd: 'lcha', 
        sid: this.state.sid, 
        eid: el.key, 
        right: -1, 
        uid: 2, 
        usid: 1
    } 
    http.postReq(
        '/f/wechatapi/',
        datas,
        (data) => {
            let depth = 3;
            let scrollTop = this.scrollTop;    
            this.setState({
                signal_data: data,
                select_depth: depth,
                eidShow: false,
                sigShow: true,
                equipment_name: el.text,
                eid: el.key,
                eid_scrollTop: scrollTop
            })
        }
    )
}
// 点击信号
signalsClick = (index) => {
    let data = {
        mtd: 'scha', 
        sid: this.state.sid, 
        eid: this.state.eid, 
        cid: index,
        right: -1, 
        uid: 2, 
        usid: 1
    }
    this.setState({loading: true})
    http.postReq(
        '/f/wechatapi/',
        data,
        (res) => {
            if (res.rtn === 1) {
                if (res.scha.hasOwnProperty('grid')) {
                    this.setState({chartShow: true, loading: false}, () => {
                        let myChart = echarts.init(document.getElementById('main') as HTMLElement);
                        // 绘制图表
                        myChart.setOption({
                            title: res.scha.title,
                            legend: res.scha.legend,
                            toolbox: res.scha.toolbox,
                            series: res.scha.series,
                            grid: res.scha.grid,
                            xAxis: res.scha.xAxis,
                            yAxis: res.scha.yAxis
                        });
                    })
                }
            } else {
                Toast.fail(res.rtn, 3);
                this.setState({loading: false})
            }            
        }
    )
}
// 图表关闭
onClose = () => {
    this.setState({
      chartShow: false,
    });
}
// 获取鼠标滚动的高度
handleScroll = () => {
    this.scrollTop = document.querySelector('.box').scrollTop;
}
// 查询调用
search = () => {
    if (this.state.sigShow) {
        let datas = {
            mtd: 'lcha', 
            sid: this.state.sid, 
            eid: this.state.eid, 
            right: -1, 
            uid: 2, 
            usid: 1
        }
        http.postReq(
            '/f/wechatapi/',
            datas,
            (data) => {           
                this.setState({
                    signal_data: data,
                })
            }
        )
    }
    
}
getScan = (arr, depth) => {
    if (arr[1].length > 6) {
        let sid = arr[1].substring(0, 6);
        let eid = arr[1].substring(6, 12);
        let datas = {
            mtd: 'lcha', 
            sid: sid.replace(/\b(0+)/gi, ''), 
            eid: eid, 
            right: -1, 
            uid: 2, 
            usid: 1
        } 
        http.postReq(
            '/f/wechatapi/',
            datas,
            (data) => {    
                this.setState({
                    signal_data: data,
                    select_depth: depth,
                    sidShow: false,
                    sigShow: true,
                    sid: data.station_id,
                    eid: data.equipment_id,
                    equipment_name: data.equipment,
                    station_name: data.station
                })
            }
        )
    } else {
        http.postReq(
            '/f/wechatapi/',
            {mtd: 'lequ', sid: arr[1].replace(/\b(0+)/gi, ''), right: -1, uid: 2, usid: 1},
            (data) => {
                const data1 = Array.from(data.lequ.map((_val, i) => (
                        {
                            key: _val.value,
                            icon: this.getEquipmentPngUrl(Number.parseInt(_val.value, 10) / 10000),
                            text: _val.text,
                        }  
                    )));
                
                this.setState({
                        equipment_data: data1, 
                        select_depth: depth,
                        eidShow: true,
                        sidShow: false,
                        sid: arr[1].replace(/\b(0+)/gi, ''),
                        station_name: data.station
                    })
            }
        )
    }
}
// 扫一扫
isScan = (href) => {
    let str = window.location.href;
    if (str.indexOf('=') !== -1) {
        let arr = str.split('=');
        let depth = 0;
        this.getScan(arr, depth)
    } else if (str.indexOf('&') !== -1) {
        let arr = str.split('&');
        let depth = 3;
        this.getScan(arr, depth)
    }
    
}
componentDidMount() {
    this.getStationGridData();
    this.isScan(window.location.href);
    setInterval(() => { this.search() }, 20000)
}

render() {
    let isTrue = true;
    return (
        <div 
            className={style.main}
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
                leftContent={
                    this.state.select_depth < 2 ? <Icon type="home" style={{fontSize: '22px'}} />
                    : <Icon type="left" style={{fontSize: '22px'}} />}
                onLeftClick={this.doGoBack}
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
                实时数据
            </NavBar>
            <div className={style.main_title} >{this.GetSubHeaderTitle()}</div>
            
            <div 
                style={{overflowY: 'scroll', width: '100%', flex: 1, position: 'relative'}} 
                className="box" 
                onScroll={this.handleScroll}
            >
                <Spin spinning={this.state.loading} size="large">
                    <Station 
                        {...this.state}
                        stationClick={this.stationClick}
                    />
                    <Equipment 
                        {...this.state}
                        equipmentClick={this.equipmentClick}
                    />
                    <Signals 
                        {...this.state}
                        signalsClick={this.signalsClick}
                        search={this.search}
                    />
                    <Chart
                        {...this.state}
                        onClose={this.onClose}
                    /> 
                </Spin>
            </div>
            
        </div>
            
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(ContentCreat)
registerServiceWorker()