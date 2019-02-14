import * as React from 'react';
import { List } from 'antd-mobile';
import '../stationcontrol.scss';
const Item = List.Item;
const Brief = Item.Brief;

export class Signals extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    getStateColor = (alarm_tag) => {
        let result_color_ = '#4CAF50';
        switch (alarm_tag) {
            case 1:
                result_color_ = '#F44336';
                break;
            case 2:
                result_color_ = '#9E9E9E';
                break;
            default:
                result_color_ = '#4CAF50';
                break;
        }
        return result_color_;
    }
    getSignalPngUrl = (state) => {
        let png_url_ = require('./../../../image/jf_ic_hui01.png');
        if (state > 1) {
            png_url_ = require('./../../../image/jf_ic_hui02.png');
        }
        return png_url_;
    }
    render() {
        const { signal_data } = this.state;
        return (
            <List style={{ display: this.state.sigShow ? 'block' : 'none'}} className="my-list">
                {
                     signal_data.hasOwnProperty('signals') ? signal_data.signals.map((item, index) => {
                        let tag_color_ = this.getStateColor(item.state);
                        let img_src_ = this.getSignalPngUrl(item.state);
                        let display_value_ = item.value;
                        if (item.meanings) {
                            display_value_ = item.meanings;
                        } else {
                            display_value_ += item.unit;
                        }
                        if (item.control) {
                            return (
                                <Item
                                    key={index}
                                    extra={<div style={{color: tag_color_}}>{display_value_}</div>}
                                    align="top" 
                                    thumb={img_src_} 
                                    multipleLine={true}
                                    style={{color: tag_color_}}
                                    onClick={() => this.state.signalsClick(item.signalid)}
                                >
                                    <div style={{color: tag_color_}}>{item.name}</div>
                                    <Brief style={{color: tag_color_}}>{item.update_time}</Brief>
                                </Item>
                            )
                        } else {
                            return null;
                        }
                    }) : '无信号' 
                }
            </List>
        )
            
    }
}