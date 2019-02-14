import * as React from 'react';
import { Grid } from 'antd-mobile';
import '../stationcontrol.scss';

export class Station extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = props
    }
    componentWillReceiveProps(nextProps: any) {
        this.setState(nextProps)
    }

    render() {
        const { isTrue } = this.state;
        return (
            <Grid 
                data={this.state.data}
                columnNum={2} 
                itemStyle={{height: '120px', display: this.state.sidShow ? 'block' : 'none'}} 
                onClick={this.state.stationClick}
                activeStyle={isTrue}
            />
        )
            
    }
}