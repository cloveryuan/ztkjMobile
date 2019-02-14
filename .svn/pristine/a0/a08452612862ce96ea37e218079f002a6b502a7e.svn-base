import * as React from 'react';
import { Icon, Checkbox } from 'antd';
import { NavBar, List, Drawer, WhiteSpace, Menu, Card } from 'antd-mobile';
import http from '../../common/api';
import './stationwarnair.scss';
import Cookies from 'js-cookie'

const L_Item = List.Item;

interface StateTable {
total_count?: number;
visible?: boolean;
selected?: string;
data?: any;
open?: boolean;
checked?: boolean;
loader_state?: boolean;
expanded?: boolean;
check_state?: number;
update_expanded_state?: boolean;
alarm_filter_tag?: number;
Svalue?: any;
alarm_value?: any;
checkAll?: boolean;
checkedList?: any;
currentIndex?: Number;
confirmer?: any;
select_depth?: any;
}

export interface PropsConfigure {
collapsed?: boolean;
defaultKey?: string;
}
const data1 = {
    children: [
        {
          label: '浏览',
          value: '10',
        },
        {
          label: '全选',
          value: '12',
        }, {
          label: '反选',
          value: '13',
        }],
    children1: [
        {
            label: '全部警告',
            value: '41',
        },
        {
            label: '未复归警告',
            value: '42',
        }, {
            label: '已结束告警',
            value: '43',
        }],
    children2: [
        {
            label: '全部展开',
            value: '21',
        },
        {
            label: '全部收起',
            value: '22',
        }],
    children3: [
        {
            label: '告警确认',
            value: '31',
        },
        {
            label: '强制确认',
            value: '32',
        }]
    };
export class ContentCreat extends React.Component<PropsConfigure, StateTable> {
constructor(props: PropsConfigure) {
    super(props)
    this.state = {
        visible: false,
        selected: '',
        data: [],
        open: false,
        checked: false,
        Svalue: ['10'],
        alarm_value: ['41'],
        check_state: 0,
        checkAll: false,
        alarm_filter_tag: 41,
        expanded: true,
        update_expanded_state: false,
        loader_state: true,
        currentIndex: 0,
        confirmer: Cookies.get('username'),
        select_depth: ''
    }
}

// 点击按钮，告警选项出现消失
onSelect = () => {
    this.setState({open: !this.state.open})
  };
//   返回主页
doGoBack = () => {
    let back_tag_ = this.state.select_depth - 2;
    switch (back_tag_) {
        case 0:
            window.location.href = './index.html';
            break;
        default:
            window.location.href = './mainwindow.html';
            break;
    }
}
// 点击告警list的回调函数
onChange = (key) => {
    console.log(key)
}
onClickList = (sid, eid) => {
    let id = sid + eid;
    let data = (Array(12).join('0') + id).slice(-12)
    window.location.href = './stationdataair.html?id&' + data;
}
// Drawer点击出现，消失
onOpenChange = (...args) => {
    this.setState({ open: !this.state.open });
}
// 浏览
onBrowse = () => {
    this.setState({})
}
// 点击单个CheckBox
checkchange = (check) => {
    let check_body = document.querySelector('.' + check).firstChild as HTMLElement;
    if ( check_body.className.indexOf('ant-checkbox-checked') > -1) {
        check_body.classList.remove('ant-checkbox-checked')
    } else {
        check_body.classList.add('ant-checkbox-checked')
    }
}
// 全选
onSelectAll = () => {
    let inputs = document.getElementsByTagName('input');
    this.setState({}, () => {
        for (let i = 0 ; i < inputs.length; i++) {
            inputs[i].checked = true;
        }
    })
    
}
// 反选
onReverse = () => {
    let inputs = document.getElementsByTagName('input');
    this.setState({}, () => {
        for (let i = 0 ; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
    })
}
// 点击展开图标
iconClick = (iconfont, card) => {
    let card_body = document.querySelector('.' + card) as HTMLElement
    let icon = document.querySelector('.' + iconfont) as HTMLElement
    if ( card_body.style.display === 'none') {
        card_body.style.display = 'block';
        icon.classList.remove('anticon-down')
        icon.classList.add('anticon-up')
    } else {
        card_body.style.display = 'none';
        icon.classList.remove('anticon-up')
        icon.classList.add('anticon-down')
    }
}
// 全部展开
expanded_all = () => {
    let card_body = document.querySelectorAll('.am-card-body') as NodeListOf<HTMLElement>;
    let icon = document.querySelectorAll('.anticon') as NodeListOf<HTMLElement>;
    for ( let i = 0; i < card_body.length; i++) {
        if ( card_body[i].style.display === 'none') {
            for ( let j = 0; j < icon.length; j++) {
                card_body[i].style.display = 'block';
                icon[j].classList.remove('anticon-down')
                icon[j].classList.add('anticon-up')
            }
            
        }
    }
    
}
// 全部收回
retract_add = () => {
    let card_body = document.querySelectorAll('.am-card-body') as NodeListOf<HTMLElement>;
    let icon = document.querySelectorAll('.anticon') as NodeListOf<HTMLElement>;
    for ( let i = 0; i < card_body.length; i++) {
        if ( card_body[i].style.display = 'bolck') {
            for ( let j = 0; j < icon.length; j++) {
                card_body[i].style.display = 'none';
                icon[j].classList.remove('anticon-up')
                icon[j].classList.add('anticon-down')
            }
        }
    }
}
// 点击告警选项
onChangeMenu = (item) => {
    let loader_state_ = this.state.loader_state;
    let select_tag_ = this.state.check_state;
    let alarm_filter_tag = this.state.alarm_filter_tag;
    let force_tag_ = 0;
    switch (Number(item)) {
        case 10:
            select_tag_ = 0;
            this.onBrowse();
            break;
        case 12:
            select_tag_ = 2;
            break;
        case 13:
            select_tag_ = 3;
            break;
        case 21:
            this.expanded_all();
            break;
        case 22:
            this.retract_add();
            break;
        case 31:
            force_tag_ = 1;
            break;
        case 32:
            force_tag_ = 2;
            break;
        case 41:
        case 42:
        case 43:
            alarm_filter_tag = Number(item);
            break;
        default:
            return;
    }
    if (force_tag_) {
        let update_list_ = [];
        let inputs = document.querySelectorAll('.ant-checkbox-checked input') as NodeListOf<HTMLElement>;
        for ( let i = 0; i < inputs.length; i++) {
                update_list_.push(inputs[i].getAttribute('value'));
        }
        if (update_list_.length) {
            loader_state_ = true;
            select_tag_ = 0;
            let data = {
                'mtd': 'uwar',
                'confirmer': this.state.confirmer,
                'ftag': force_tag_ - 1,
                'nolist': update_list_.join(':')
            }
            http.postReq(
                '/f/wechatapi/',
                data,
                (res) => {
                    this.setState({Svalue: ['10'], alarm_value: ['41']}, () => {
                        this.doRenderDataSource(window.location.href);
                    })
                }
            )
        }
    }
    this.setState({
        open: false,
        check_state: select_tag_,
        alarm_filter_tag: alarm_filter_tag,
        loader_state: loader_state_
    });
};
// 未复归，已结束，全部
isIncludeNode = (child) => {
    let result_ = true;
    switch (this.state.alarm_filter_tag) {
        case 42: // still
            if (child.endtime) {
                result_ = false;
            }
            break;
        case 43: // end
            if (0 === child.endtime.length) {
                result_ = false;
            }
            break;
        default:
            break;
    }
    return result_;
}
// 根据状态获取颜色
getStateColor = (alarm_tag) => {
    let result_color_ = '#F44336';
    switch (alarm_tag) {
        case 1:
            result_color_ = '#FF9800';
            break;
        case 2:
            result_color_ = '#9C27B0';
            break;
        default:
            result_color_ = '#F44336';
            break;
    }
    return result_color_;
};
// 获取告警数据
doRenderDataSource = (href) => {
    let str = window.location.href;
    if (str.indexOf('=') !== -1) {
        let arr = str.split('=');
        if (arr[1].length > 6) {
            let sid = arr[1].substring(0, 6);
            let eid = arr[1].substring(6, 12);
            http.postReq(
                '/f/wechatapi/',
                {mtd: 'lwar', sid: sid.replace(/\b(0+)/gi, ''), eid: eid, right: -1, uid: 2, usid: 1},
                (data) => {
                    let depth = 2;
                    if (data.hasOwnProperty('lwar')) {
                        this.setState({data: data.lwar, select_depth: depth})
                    }
                }
            )
        } else {
            http.postReq(
                '/f/wechatapi/',
                {mtd: 'lwar', sid: arr[1].replace(/\b(0+)/gi, ''), right: -1, uid: 2, usid: 1},
                (data) => {
                    let depth = 2;
                    if (data.hasOwnProperty('lwar')) {
                        this.setState({data: data.lwar, select_depth: depth})
                    }
                }
            )
        }
    } else {
        http.postReq(
            '/f/wechatapi/',
            {mtd: 'lwar', right: -1, uid: 2, usid: 1},
            (data) => {
                let depth = 1;  
                if (data.hasOwnProperty('lwar')) {
                    this.setState({data: data.lwar, select_depth: depth})
                }
            }
        )
    }
};
// 渲染到页面
doRenderData = () => {
    const { data } = this.state;
    const child_components_ = [];
    data.map((item, index) => {
        if (this.isIncludeNode(item)) {
            let tag_color_ = this.getStateColor(item.alarmgrade);
            let default_check_ = null;
            if (2 === this.state.check_state) {
                default_check_ = true;
            } else if (3 === this.state.check_state) {
                default_check_ = false;
            }
            let component_ = (
                    <L_Item 
                        key={index} 
                        thumb={this.state.check_state > 0
                        ? <Checkbox 
                            value={item.alarmno}
                            className={'check' + index}
                            checked={default_check_}
                            onChange={() => this.checkchange('check' + index)}
                        /> : null}
                    >
                        <Card>
                            <Card.Header
                                title={
                                    <span 
                                        style={{color: tag_color_, fontSize: '15px'}}
                                        onClick={() => this.onClickList(item.stationid, item.equipmentid)}
                                    >{item.stationname + '' + item.equipmentname}
                                    </span>}
                                extra={
                                    <div style={{color: tag_color_, position: 'relative'}}>
                                        <span>{item.signalname}</span>
                                        <br />
                                        <span>{'开始时间：' + item.starttime}</span>
                                        <Icon 
                                            className={'iconfont' + index}
                                            type={this.state.expanded ? 'down' : 'up'} 
                                            style={{
                                                fontSize: '18px', 
                                                color: 'rgba(0, 0, 0, 0.87)',
                                                position: 'absolute',
                                                right: '-60px',
                                                top: '-20px',
                                                zIndex: 10000,
                                                width: 50,
                                                height: 50
                                            }}
                                            onClick={() => this.iconClick('iconfont' + index, 'card' + index)}
                                        />
                                        
                                    </div>}
                            />
                            <Card.Body style={{color: tag_color_, display: 'none'}} className={'card' + index}>
                                <span> {item.meanings + ', 触发值： ' + item.triggervalue}</span>
                                <br />
                                <span>{'结束时间： ' + item.endtime}</span>
                            </Card.Body>
                        </Card>                             
                    </L_Item> 
                )
            child_components_.push(component_);
        }
    })
    return child_components_;
};
componentDidMount() {
    this.doRenderDataSource(window.location.href);
}
render() {
    const sidebar = (
        <div>
            <List className="my-list">
                <div style={{backgroundColor: 'rgb(0, 188, 212)', lineHeight: '45px', textAlign: 'center'}}>
                    <h3 style={{fontWeight: 'bold', color: 'white'}}>
                        告警选项
                    </h3>
                </div>
            </List>
            <List className="my-list">
                <Menu
                    className="single-foo-menu"
                    data={data1.children}
                    value={this.state.Svalue}
                    level={1}
                    onChange={this.onChangeMenu}
                />
            </List>
            <WhiteSpace size="sm" />
            <List className="my-list">
                <Menu
                    className="single-foo-menu"
                    data={data1.children1}
                    value={this.state.alarm_value}
                    level={1}
                    onChange={this.onChangeMenu}
                />
            </List>
            <WhiteSpace size="sm" />
            <List className="my-list">
                <Menu
                    className="single-foo-menu"
                    data={data1.children2}
                    value={[]}
                    level={1}
                    onChange={this.onChangeMenu}
                />
            </List>
            <WhiteSpace size="sm" />
            <List className="my-list">
                <Menu
                    className="single-foo-menu"
                    data={data1.children3}
                    value={[]}
                    level={1}
                    onChange={this.onChangeMenu}
                />
            </List>
        </div>
        
      )
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
                onLeftClick={this.doGoBack}
                rightContent={
                    <div 
                        style={{
                            height: '100%',
                            padding: '0 15px',
                            marginRight: '-15px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onClick={this.onSelect}
                    >
                    <Icon type="ellipsis" style={{fontSize: '28px', fontWeight: 700}}/>
                    </div>
                }
            >
                实时告警
            </NavBar>
            <div style={{overflowY: 'scroll', width: '100%', flex: 1, position: 'relative'}}>
                <List>{this.doRenderData()}</List>
            </div>
            <Drawer
                style={{height: document.documentElement.clientHeight}}
                className="my-drawer"
                contentStyle={{ color: '#A6A6A6', textAlign: 'center'}}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
                position={'right'}
            />   
        </div>      
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'
DomRender(ContentCreat)
registerServiceWorker()