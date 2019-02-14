import * as React from 'react';
import { NavBar, Flex, List, InputItem, Checkbox, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Cookies from 'js-cookie'
import http from '../../common/api';
import './index.scss'

const CheckboxItem = Checkbox.CheckboxItem;
class BasicInputExample extends React.Component<any, any> {
    componentDidMount() {
        // this.autoFocusInst.focus();
      }
      handleClick = () => {
        this.props.form.validateFields((error, value) => {
            let data = {
                'username': value.username,
                'password': value.password,
                'mobileLogin': 1,
                'rememberMe': value.remember ? 1 : 0
            }
            http.postReq(
                '/a/login',
                data,
                (res) => {
                    if (1 === res.success) {
                        window.location.href = './mainwindow.html';
                        Cookies.set('username', value.username);
                    } else {
                        Toast.fail(res.message, 3);
                    }
                }
            )
          });
        // window.location.href = './mainwindow.html';
      }
    render() {
        const { getFieldProps } = this.props.form;
        const isTrue = true;
        return (
            <div>
                <NavBar
                    mode="dark"
                >登录
                </NavBar>
                <Flex>
                    <p style={{textAlign: 'center', width: '100%'}}>
                        <img src={require('../../image/loginImage.jpg')} style={{margin: '20px', width: '155px'}} />
                        <div 
                            style={{fontSize: '13px', color: 'rgb(52, 52, 52)'}}
                        >ZT-KEEPONLINE在线监控
                        </div>
                    </p>
                </Flex>
                <Flex>
                    <div style={{margin: '0 auto'}}>
                        <List>
                            <InputItem
                                {...getFieldProps('username')}
                                clear={isTrue}
                                // ref={el => this.autoFocusInst = el}
                                style={{textAlign: 'justify'}}
                            >用户名：
                            </InputItem>
                            <WhiteSpace size="sm" />
                            <InputItem
                                {...getFieldProps('password')}
                                type="password"
                                clear={isTrue}
                                style={{textAlign: 'justify'}}
                            >密码：
                            </InputItem>
                            <WhiteSpace size="sm" />
                            <CheckboxItem 
                                {...getFieldProps('remember')}
                            >
                                记住密码
                            </CheckboxItem>
                            <WhiteSpace size="sm" />
                            <List.Item>
                                <div
                                    style={{ 
                                        width: '100%',
                                        height: '40px',
                                        lineHeight: '40px',
                                        color: '#fff',
                                        textAlign: 'center',
                                        background: '#108ee9',
                                        borderRadius: '2px'
                                    }}
                                    onClick={this.handleClick}
                                >
                                登录
                                </div>
                            </List.Item>
                        </List>
                    </div>
                </Flex>
            </div>
            );
    }
}
const App = createForm()(BasicInputExample);
export default App
import { DomRender } from 'src/common/domrender'
import registerServiceWorker from 'src/common/registerServiceWorker'

DomRender(App)
registerServiceWorker()