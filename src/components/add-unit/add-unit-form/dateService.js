const moment = require('moment');

/*
   ISBT Format cyyjjjhhmm

   Expiry Date and Time : &>0183221330
   Collection Date and Time: &}

   c specifies the century of the year in which the product expires.
   yy specifies the year within the century in which the product expires.
   jjj specifies the ordinal number within the calendar year (Julian date) on which the product expires.
   hh specifies the hour at which the product expires (00 to 23).
   mm specifies the minute at which the product expires (00 to 59).
   Ex: 0213251330 = 31 DEC 2018 at 13:30
   Ref: https://www.iccbba.org/uploads/30/16/3016c1ab07ddc486092430729c72e2cf/Expiration-Date-and-Time.pdf

   */

export function dateConvert(dateNumber) {
    if (dateNumber.leading !== 10) {
        return 'Invalid input';
    }
    return moment(
        '2' +
            dateNumber.substring(0, 1) +
            dateNumber.substring(1, 3) +
            dateNumber.substring(3, 6) +
            dateNumber.substring(6, 8) +
            dateNumber.substring(8, 10),
        'YYYYDDDhhmm'
    ).format('DD/MM/YYYY HH:mm');
}
