import moment from 'moment';
// import { store } from '../../redux/store';
// const state = store.getState();
export default function keyFine(key, row) {
    // const { dateFormat } = state?.dateFormat;

    let keys = key.split('.');
    let flag = 0;

    if (keys[0].includes('[0]')) {
        keys[0] = keys[0]?.substr(0, keys[0]?.indexOf('['));
        flag = 1;
    }

    if (keys.length === 2 && flag) {
        if (keys[1] === 'dob') {
            return row[keys[0]]?.[0]?.[keys[1]] ? moment(row[keys[0]]?.[0]?.[keys[1]]).format('DD-MMM-YYYY') : '-';
        } else if (String(keys[1])?.toLowerCase()?.includes('date')) {
            return row[keys[0]]?.[0]?.[keys[1]]
                ? moment(row[keys[0]]?.[0]?.[keys[1]]).format('DD-MMM-YYYY HH:mm a')
                : '-';
        } else {
            if (Array.isArray(row[keys[0]]?.[0]?.[keys[1]])) {
                return row[keys[0]]?.[0]?.[keys[1]]?.length;
            } else {
                return row[keys[0]]?.[0]?.[keys[1]] ? row[keys[0]]?.[0]?.[keys[1]] : '-';
            }
        }
    } else if (keys.length === 2 && !flag) {
        return row[keys[0]]?.[keys[1]] ? row[keys[0]]?.[keys[1]] : '-';
    } else if (keys.length === 3) {
        return row[keys[0]]?.[keys[1]]?.[keys[2]] ? row[keys[0]]?.[keys[1]]?.[keys[2]] : '-';
    } else {
        return '-';
    }
}
