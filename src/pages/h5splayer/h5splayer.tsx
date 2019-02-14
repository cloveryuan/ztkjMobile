import * as React from 'react';
import { Icon } from 'antd';
import { NavBar, Popover } from 'antd-mobile';
import './h5splayer.css';
import $ from 'jquery';
import h5splayerhelper from '../../common/h5splayerhelper';
import '../../common/adapter'
import  './stationcontrol.scss';

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

export class H5splayer extends React.Component<PropsConfigure, StateTable> {
    constructor(props: PropsConfigure) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
    }
    getScripts = () => {
        if (h5splayerhelper.H5siOS() === true
            || h5splayerhelper.H5sSafariBrowser() === true) {
            $('#h5sVideo1').prop('controls', true);
        }
        var conf1 = {
            videoid: 'h5sVideo1',
            // protocol: window.location.protocol, //http: or https:
            protocol: 'http:',
            // host: window.location.host, //localhost:8080
            host: '61.155.96.68:18080',
            rootpath: '/', // '/' or window.location.pathname
            token: 'token1',
            hlsver: 'v1', // v1 is for ts, v2 is for fmp4
            session: 'c1782caf-b670-42d8-ba90-2244d0b0ee83' // session got from login
        };
        let v1: any = h5splayerhelper.H5sPlayerCreate(conf1);
        console.log(v1)
        $('#h5sVideo1').parent().click(function (this: any) {
            if ($(this).children('.h5video').get(0).paused) {
                $(this).children('.h5video').get(0).play();
                if (v1 !== null) {
                    v1.disconnect();
                    v1 = {};
                    v1 = null;
                }
                v1 = h5splayerhelper.H5sPlayerCreate(conf1);
                v1.connect();
                $(this).children('.playpause').fadeOut();
            } else {
                v1.disconnect();
                // v1 = {};
                v1 = null;
                $(this).children('.h5video').get(0).pause();
                $(this).children('.playpause').fadeIn();
            }
        });
    }
    componentDidMount() {
    
        this.getScripts()
    }
    onSelect = (opt) => {
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
                        <video autoPlay={true} className="h5video" id="h5sVideo1" />
                        <div className="playpause" id="playpause1" />
                    </div>
                </div>
            </div> 
        )
    }
}

import { DomRender } from '../../common/domrender'
import registerServiceWorker from '../../common/registerServiceWorker'

DomRender(H5splayer)
registerServiceWorker()