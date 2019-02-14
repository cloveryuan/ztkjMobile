import * as React from 'react';
import { Icon } from 'antd';
import { NavBar, Popover, List, Badge } from 'antd-mobile';
import reqwest from 'reqwest';
import * as echarts from 'echarts';
import style from './systemanalysis.scss';

const L_Item = List.Item;
const Item = Popover.Item;
interface StateTable {
total_count?: number;
visible?: boolean;
selected?: string;
equipment_name?: string;
station_name?: string;
data?: any
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
        data: {},
    }
}
fecth = () => {
    reqwest({
        url: 'https://www.easy-mock.com/mock/5a4212fee78cd0222f00fffc/example/ha',
        data: {},
        method: 'post',
        success: (data) => {
            this.setState({data: data}, () => {
                this.doRenderstations_chart();
                this.doRenderequipments_chart();
            })
        }
    })
}
// 退出
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
//   进入主页
onIndex = () => {
    window.location.href = './mainwindow.html';
}
componentDidMount() {
    this.fecth();
}
// 显示局站设备信号数
repeatTotalComponent = () =>  {
    let num_ = 3;
    let result_ = [];
    let captions_ = ['局站（区域）', '设备（种类）', '信号（数量）'];
    let cls_name_ = style.border_r;
    let {station_count, equipment_count, signal_count} = this.state.data;
    let show_data_ = [station_count, equipment_count, signal_count];
    for (let i_ = 1; i_ < num_ + 1; i_++) {
        if (i_ >= num_) {
            cls_name_ = style.div_lr;
        }
        result_.push(
            <L_Item style={{width: '33.33%'}}>
                <div className={cls_name_}>
                    <p className={style.h_font}>{captions_[i_ - 1]}</p>
                    <div className={style.div_top}>
                        <p className={style.h1_font}>{show_data_[i_ - 1]}</p>
                        <p className={style.h2_font}>units</p>
                    </div>
                </div>
                
            </L_Item>);
    }
    return result_;
}
// 显示告警数据
repeatAlarmComponent = () => {
    let num_ = 3;
    let result_ = [];
    let captions_ = ['紧急告警', '重要告警', '一般告警'];
    let div_style_ = style.border_r;
    let {alarm_1_count, alarm_2_count, alarm_3_count} = this.state.data;
    let show_data_ = [alarm_1_count, alarm_2_count, alarm_3_count];
    for (let i_ = 1; i_ < num_ + 1; i_++) {
        if (i_ >= num_) {
            div_style_ = style.div_lr;
        }
        let img_src_url_ = require('../../image/w0' + (3 - i_ + 1) + '.png');
        result_.push(
            <L_Item style={{width: '33.33%', margin: '16px 0'}}>
                <div className={div_style_}>
                    <div style={{textAlign: 'center'}}>
                        <img className={style.img_size} src={img_src_url_} />
                        <p className={style.h_font}>{captions_[i_ - 1]}</p>
                    </div>
                    <div className={style.div_radius}>
                        <Badge text={show_data_[i_ - 1]} overflowCount={1000}/>
                    </div>
                </div>
                
            </L_Item>
        );
    }
    return result_;
}
doRenderstations_chart = () => {
    if (this.state.data.stations_chart.hasOwnProperty('grid')) {
        let myChart = echarts.init(document.querySelector('.stations_chart') as HTMLElement);
        // 绘制图表
        myChart.setOption({
            title: this.state.data.stations_chart.title,
            legend: this.state.data.stations_chart.legend,
            toolbox: this.state.data.stations_chart.toolbox,
            series: this.state.data.stations_chart.series,
            grid: this.state.data.stations_chart.grid,
            color: this.state.data.stations_chart.color
        });
    }
}
doRenderequipments_chart = () => {
    if (this.state.data.equipments_chart.hasOwnProperty('grid')) {
        let myChart = echarts.init(document.querySelector('.equipments_chart') as HTMLElement);
        // 绘制图表
        myChart.setOption({
            title: this.state.data.equipments_chart.title,
            legend: this.state.data.equipments_chart.legend,
            toolbox: this.state.data.equipments_chart.toolbox,
            series: this.state.data.equipments_chart.series,
            grid: this.state.data.equipments_chart.grid,
            color: this.state.data.equipments_chart.color
        });
    }
}
repeatSignalComponents = () => {
    let result_ = [];
    console.log(this.state.data)
    if (this.state.data.hasOwnProperty('stations')) {
        for (let i = 0; i <= this.state.data.stations.length; i++) {
            let title_ = '局站 ' + this.state.data.stations[i].station_name + ' 信号告警分布：';
            // if (stations[i].alarms_chart.hasOwnProperty('grid')) {
            result_.push(
            <div style={{marginTop: '215px'}}>
                <div className={style.echarts_font}>{title_}</div> 
                <List className="my-list">
                    <L_Item className={'alarms_chart' + i} style={{ height: 200, width: '100%'}} />                  
                </List>     
            </div>);
            // }
            
        }
    }
    console.log(result_)
    return result_
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
                在线分析
            </NavBar>
            <div style={{overflowY: 'auto', width: '100%', flex: 1}}>
                <List className="my-list">
                    {this.repeatTotalComponent()}
                </List>
                <List className="my-list">
                    {this.repeatAlarmComponent()}
                </List>
                <div>
                    <div className={style.echarts_font}>局站（区域）告警分布：</div> 
                    <List className="my-list">
                        <L_Item className="stations_chart" style={{ height: 200, width: '100%'}} />                  
                    </List>
                </div>
                <div style={{marginTop: '215px'}}>
                    <div className={style.echarts_font}>设备（种类）告警分布：</div> 
                    <List className="my-list">
                        <L_Item className="equipments_chart" style={{ height: 200, width: '100%'}} />                  
                    </List>
                </div>
                {this.repeatSignalComponents()}
                
            </div>
        </div>
            
    )
}
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(ContentCreat)
registerServiceWorker()