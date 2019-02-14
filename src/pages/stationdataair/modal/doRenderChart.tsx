import * as React from 'react';
import { Modal } from 'antd-mobile';
export class Chart extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }
    render() {
        return (
            <Modal
                visible={this.state.chartShow}
                transparent={true}
                maskClosable={false}
                onClose={this.state.onClose}
                footer={[{ text: '确定', onPress: () => { this.state.onClose(); } }]}
            >
                <div id="main" style={{ height: 350, overflow: 'scroll' }} />
            </Modal>
        )
    }
}
