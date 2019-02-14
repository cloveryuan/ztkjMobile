import * as React from 'react';
import { Result, Icon } from 'antd-mobile';
import './error.scss'
export class Error extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            message: ''
        }
    }
    getMessage = (href) => {
        let arr = decodeURI(href).split('?');
        this.setState({message: arr[1]})
    }
    componentDidMount() {
        this.getMessage(window.location.href);
    }
    render() {
        return (
            <div>
                <Result
                    img={<Icon type="cross-circle-o" className="spe" style={{ fill: '#F13642' }} />}
                    title="访问失败"
                    message={this.state.message}
                />
            </div>
            );
    }
}
import { DomRender } from 'src/common/domrender'
import registerServiceWorker from 'src/common/registerServiceWorker'

DomRender(Error)
registerServiceWorker()