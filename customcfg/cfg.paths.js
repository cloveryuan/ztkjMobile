const path = require('path');
const paths = require('react-scripts-ts-antd/config/paths');

module.exports = {
    appTitle: "Keep Online V2.0",
    appPages: path.resolve(paths.appSrc, "pages"),
    // htmlTemplate: paths.appHtml,
    htmlTemplate: path.resolve(paths.appSrc, "common/mywebtemplate.html"),
};
