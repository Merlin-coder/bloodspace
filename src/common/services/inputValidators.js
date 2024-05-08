export const checkAtLeastLength = (expression, length) => expression && expression?.toString()?.trim().length >= length;

export const checkIsfilled = (expression) => expression && expression.length > 0;

export const checkIsTrue = (expression) => expression;

export const checkEmailPattern = (mail) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(mail);
};
export const checkZipcodePattern = (zipcode) => {
    const regex = /^\d{6}(?:[-\s]\d{4})?$/;
    return regex.test(zipcode);
};
export const checkPhonePattern = (phone) => {
    const regex = /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;
    return regex.test(phone);
};
export const checkIpAddressPattern = (ip) => {
    const regex = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    return regex.test(ip);
};
export const checkOnlyNumberPattern = (num) => {
    const regex = /^[0-9]*$/;
    return regex.test(num);
};
