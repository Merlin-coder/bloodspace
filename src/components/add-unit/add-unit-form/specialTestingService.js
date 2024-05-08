export default function specialTesingCheck(unitId) {
    let mChar = require('cdigit').mod37_2.generate(unitId);
    return mChar.charAt(mChar.length - 1);
}
