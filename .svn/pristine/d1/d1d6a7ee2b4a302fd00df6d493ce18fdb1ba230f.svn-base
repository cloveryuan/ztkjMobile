import * as React from 'react';
import { Icon } from 'antd';
import { NavBar, Popover, Modal, Toast } from 'antd-mobile';
import http from '../../common/api';
import { Station }  from './component/doRenderStation'
import { Equipment }  from './component/doRenderEquipment'
import { Signals }  from './component/doRenderSignals'
import style from './stationcontrol.scss';

const Item = Popover.Item;
const prompt = Modal.prompt;

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
    sidShow?: boolean;
    eidShow?: boolean;
    sid?: string;
    eid?: string;
    cid?: string;
    sigShow?: boolean;
    signal_data?: any;
    equipment_data?: any;
    sel?: any;
    scrollTop?: any;
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
            selected: '',
            station_name: '局站', // 定位局站名称
            equipment_name: '', // 设备名称
            data: [], // Grid 数据
            select_depth: 0,
            sid: '',
            eid: '',
            cid: '',
            equipment_data: [],
            signal_data: [], 
            sel: {},
            scrollTop: ''
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
        console.log(back_tag_)
        switch (back_tag_) {
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
                        document.querySelector('.box').scrollTop = this.state.scrollTop;
                    }
                );
                break;
            case 1:
                this.setState({
                    eidShow: true, 
                    sidShow: false, 
                    sigShow: false, 
                    select_depth: 2,
                    equipment_name: '',
                });
                break;
            case 2:
                // this.setState({eidShow: false, sigShow: true})
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
    stationClick = (el, index) => {
        http.postReq(
            '/f/wechatapi/',
            {mtd: 'lequ', sid: el.key, right: -1, uid: 2, usid: 1},
            (data) => {
                let depth = 2;
                let scrollTop = this.scrollTop; 
                const data1 = Array.from(data.lequ.map((_val, i) => (
                        {
                            key: _val.value,
                            icon: this.getEquipmentPngUrl(_val.value / 10000),
                            text: _val.text,
                        }  
                    )));
                
                this.setState({
                    equipment_data: data1, 
                    select_depth: depth,
                    eidShow: true,
                    sidShow: false,
                    scrollTop: scrollTop
                })
            }
        )
        this.setState({
            station_name: el.text,
            sid: el.key
        })
    }
    // 点击设备
    equipmentClick = (el, index) => {
        http.postReq(
            '/f/wechatapi/',
            {mtd: 'lcha', sid: this.state.sid, eid: el.key, right: -1, uid: 2, usid: 1},
            (data) => {
                let depth = 3;            
                this.setState({
                    signal_data: data,
                    select_depth: depth,
                    eidShow: false,
                    sigShow: true,
                    equipment_name: el.text,
                    eid: el.key
                })
            }
        )
    }
    // 控制确定
    onOK = (controlvalue, password) => {
        let data = {
            mtd: 'csig', 
            sid: this.state.sid, 
            eid: this.state.eid, 
            cid: this.state.cid,
            password: password,
            controlvalue: controlvalue,
            // right: -1, 
            // uid: 2, 
            // usid: 1
        }
        http.postReq(
            '/f/api/rcontrol',
            data,
            (res) => {
                if (res.rtn === '1') {
                    Toast.success('控制成功', 3);
                } else {
                    Toast.fail(res.rtn, 3);
                }
            }
        )
    }
    // 点击信号
    signalsClick = (value) => {
        this.setState({cid: value})
        prompt(
            '远程控制',
            null,
            this.onOK,
            'login-password',
            null,
            ['信号控制值', '当前用户密码'],
        )
        
    }
    handleScroll = () => {
        this.scrollTop = document.querySelector('.box').scrollTop;
    }
    // 查询调用
    search = () => {
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
    componentDidMount() {
        this.getStationGridData();
        setInterval(() => { this.search() }, 20000)
    }
    componentWillUnmount() {
        this.getStationGridData();
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
                        <Icon type="ellipsis" style={{fontSize: '28px', fontWeight: 700}}/>
                        </div>
                    </Popover>
                }
            >
                远程控制
            </NavBar>
            <div className={style.main_title} >{this.GetSubHeaderTitle()}</div>
            <div style={{overflowY: 'scroll', width: '100%', flex: 1}} className="box" onScroll={this.handleScroll}>
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
                />
            </div>
        </div>
            
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(ContentCreat)
registerServiceWorker()