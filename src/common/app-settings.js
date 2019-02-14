/**
 * Created by admin on 17/4/2.
 */
'use strict';

let g_settings_ = {};
//
g_settings_.app_title = window.app_title || "国网南京市供电公司";
g_settings_.app_name = window.app_name || "智能监测控制云平台HRT3000";
//
g_settings_.key_usr = "USR";
g_settings_.key_pwd = "PWD";
g_settings_.key_state = "STATE";
//
g_settings_.upload_url = "http://180.96.28.83:8082/upload";
g_settings_.calc_api = "http://180.96.28.83:8082/calcbpa";
g_settings_.calc_table_api = "http://180.96.28.83:8082/calcbpatbl";
g_settings_.calc_pf_api = "http://180.96.28.83:8082/calcbpapf";
export { g_settings_ as default, g_settings_ as gSet }