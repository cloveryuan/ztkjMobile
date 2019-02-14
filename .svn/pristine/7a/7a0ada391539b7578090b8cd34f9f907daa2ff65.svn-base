import * as React from 'react';
import { Grid } from 'antd-mobile';
import '../stationdataair.scss';

export class Equipment extends React.Component<any, any> {
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
                data={this.state.equipment_data}
                columnNum={2} 
                itemStyle={{height: '100px', display: this.state.eidShow ? 'block' : 'none'}}
                renderItem={dataItem => (
                    <div>
                      <img src={dataItem.icon} style={{ width: '32px', margin: '5px 0'}} alt="" />
                      <div style={{ color: 'rgb(76, 175, 80)', fontSize: '14px'}}>
                        <span>{dataItem.text}</span>
                      </div>
                    </div>
                )} 
                onClick={this.state.equipmentClick}
                activeStyle={isTrue}
            />
        )
            
    }
}