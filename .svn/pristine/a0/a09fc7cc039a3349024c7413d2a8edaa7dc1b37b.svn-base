/**
 * Created by admin on 2016/7/4.
 */
'use static'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Cookies from 'universal-cookie'
import { gSet } from './app-settings'

import 'antd/dist/antd.less'
import './data-flex.less'
import './mywebstyle.scss'

const cookies = new Cookies()
let CustomMixins = () => {
    return {
        h_usr: cookies.get(gSet.key_usr),
        h_pwd: cookies.get(gSet.key_pwd),
        h_state: cookies.get(gSet.key_state),
    }
}

export function DomRender(MyComponent: any) {
    let props_ = arguments[1] ? arguments[1] : {}
    let element_id_ = arguments[2] ? arguments[2] : 'root'
    ReactDOM.render((<MyComponent {...CustomMixins()} {...props_} />), document.getElementById(element_id_))
}

export default DomRender
