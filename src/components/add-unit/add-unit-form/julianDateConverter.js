import { perpetualYear, leapYear } from './julianConstants';
// class DateConversion {
//     constructor() {
//         this.convertToDBDate = async (isbtDate) => {
//             let dayOfJulianYear = parseInt(isbtDate.slice(3, 6));
//             let year = parseInt('20' + isbtDate.slice(1, 3));
//             let hr = parseInt(isbtDate.slice(6, 8));
//             let min = parseInt(isbtDate.slice(8, 10));
//             let julianObj = constants_1.Constant.perpetualYear;
//             if (this.checkLeapYear(year)) julianObj = constants_1.Constant.leapYear;
//             for (const month in julianObj) {
//                 let arrayOfValue = julianObj[month];
//                 if (arrayOfValue.includes(dayOfJulianYear)) {
//                     return new Date(year, parseInt(month), arrayOfValue.indexOf(125) + 1, hr, min);
//                 }
//             }
//         };
//         this.checkLeapYear = (year) => {
//             return (0 == year % 4 && 0 != year % 100) || 0 == year % 400;
//         };
//         // this.convertTagDate = async (date) => {
//         //     let julianObj = constants_1.Constant.perpetualYear;
//         //     let year = date.getFullYear();
//         //     if (this.checkLeapYear(year)) julianObj = constants_1.Constant.leapYear;
//         //     let tagDate = '';
//         //     let m = date.getMonth() + 1;
//         //     let d = date.getDate() - 1;
//         //     let hr = date.getHours();
//         //     let min = date.getMinutes();
//         //     tagDate = year.toString().slice(1, 4) + julianObj['' + m][d] + '' + hr + '' + min;
//         //     return tagDate;
//         // };
//     }
// }
// export default DateConversion;

const ConvertToDBDate = (isbtDate) => {
    // console.log(isbtDate, 'recived', 'isbt');
    let dayOfJulianYear = parseInt(isbtDate.slice(3, 6));
    let year = parseInt('20' + isbtDate.slice(1, 3));
    let hr = parseInt(isbtDate.slice(6, 8));
    let min = parseInt(isbtDate.slice(8, 10));
    let julianObj = perpetualYear;
    if (checkLeapYear(year)) julianObj = leapYear;
    for (const month in julianObj) {
        let arrayOfValue = julianObj[month];
        if (arrayOfValue.includes(dayOfJulianYear)) {
            let dateCheck = new Date(year, parseInt(month) - 1, arrayOfValue.indexOf(dayOfJulianYear) + 1, hr, min);
            // console.log(dateCheck, 'dateCheck', 'isbt');
            return dateCheck;
        }
    }
};
const checkLeapYear = (year) => {
    // console.log(year, 'LeapYear', 'isbt');
    return (0 == year % 4 && 0 != year % 100) || 0 == year % 400;
};

export default ConvertToDBDate;
