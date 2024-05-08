let myConsole = {};
let isShowLog = true;
myConsole.log = (location, logString) => {
    /* eslint-disable */
    if (isShowLog) console.log(location, logString);
};

myConsole.log = (logString) => {
    /* eslint-disable */
    if (isShowLog) console.log(logString);
};
export default myConsole;
