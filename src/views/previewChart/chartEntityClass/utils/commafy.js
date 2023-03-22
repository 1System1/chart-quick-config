// 数字格式化
export default function numberCommafy(num, options) {
    let commafyOptions = {
        spaceNumber: 3, //分割位数，默认3
        separator: ',', //分隔符，默认','
        digits: null, // 只对 number 类型有效，小数位数,默认null
        round: true, // 只对 number 类型有效，四舍五入，默认true
        ceil: false, //只对 number 类型有效，向上舍入
        floor: false, // 只对 number 类型有效，向下舍入
    };
    var opts = Object.assign({}, commafyOptions, options);
    var optDigits = opts.digits;
    var isNum = isNumber(num);
    var rest, result, isNegative, intStr, floatStr;

    var ceil = helperCreateMathNumber('ceil');
    var floor = helperCreateMathNumber('floor');
    var round = helperCreateMathNumber('round');
    if (isNum) {
        rest = (opts.ceil ? ceil : opts.floor ? floor : round)(num, optDigits);
        result = toNumberString(optDigits ? toFixed(rest, optDigits) : rest).split('.');
        intStr = result[0];
        floatStr = result[1];
        isNegative = intStr && rest < 0;
        if (isNegative) {
            intStr = intStr.substring(1, intStr.length);
        }
    } else {
        rest = toValueString(num).replace(/,/g, '');
        result = rest ? [rest] : [];
        intStr = result[0];
    }
    if (result.length) {
        return (
            (isNegative ? '-' : '') +
            intStr.replace(new RegExp('(?=(?!(\\b))(.{' + (opts.spaceNumber || 3) + '})+$)', 'g'), opts.separator || ',') +
            (floatStr ? '.' + floatStr : '')
        );
    }
    return rest;
}

function helperCreateMathNumber(name) {
    return function (num, digits) {
        var numRest = toNumber(num);
        var rest = numRest;
        if (numRest) {
            digits = digits >> 0;
            var numStr = toNumberString(numRest);
            var nums = numStr.split('.');
            var intStr = nums[0];
            var floatStr = nums[1] || '';
            var fStr = floatStr.substring(0, digits + 1);
            var subRest = intStr + (fStr ? '.' + fStr : '');
            if (digits >= floatStr.length) {
                return toNumber(subRest);
            }
            subRest = numRest;
            if (digits > 0) {
                var ratio = Math.pow(10, digits);
                rest = Math[name](helperMultiply(subRest, ratio)) / ratio;
            } else {
                rest = Math[name](subRest);
            }
        }
        return rest;
    };
}
function helperMultiply(multiplier, multiplicand) {
    var str1 = toNumberString(multiplier);
    var str2 = toNumberString(multiplicand);
    return (parseInt(str1.replace('.', '')) * parseInt(str2.replace('.', ''))) / Math.pow(10, helperNumberDecimal(str1) + helperNumberDecimal(str2));
}
function helperNumberDecimal(numStr) {
    return (numStr.split('.')[1] || '').length;
}
/**
 * 数值转字符串，科学计数转字符串
 * @param { Number } num 数值
 *
 * @return {Number}
 */
function toNumberString(num) {
    var rest = '' + num;
    var scienceMatchs = rest.match(/^([-+]?)((\d+)|((\d+)?[.](\d+)?))e([-+]{1})([0-9]+)$/);
    if (scienceMatchs) {
        var isNegative = num < 0;
        var absFlag = isNegative ? '-' : '';
        var intNumStr = scienceMatchs[3] || '';
        var dIntNumStr = scienceMatchs[5] || '';
        var dFloatNumStr = scienceMatchs[6] || '';
        var sciencFlag = scienceMatchs[7];
        var scienceNumStr = scienceMatchs[8];
        var floatOffsetIndex = scienceNumStr - dFloatNumStr.length;
        var intOffsetIndex = scienceNumStr - intNumStr.length;
        var dIntOffsetIndex = scienceNumStr - dIntNumStr.length;
        if (sciencFlag === '+') {
            if (intNumStr) {
                return absFlag + intNumStr + helperStringRepeat('0', scienceNumStr);
            }
            if (floatOffsetIndex > 0) {
                return absFlag + dIntNumStr + dFloatNumStr + helperStringRepeat('0', floatOffsetIndex);
            }
            return absFlag + dIntNumStr + helperNumberOffsetPoint(dFloatNumStr, scienceNumStr);
        }
        if (intNumStr) {
            if (intOffsetIndex > 0) {
                return absFlag + '0.' + helperStringRepeat('0', Math.abs(intOffsetIndex)) + intNumStr;
            }
            return absFlag + helperNumberOffsetPoint(intNumStr, intOffsetIndex);
        }
        if (dIntOffsetIndex > 0) {
            return absFlag + '0.' + helperStringRepeat('0', Math.abs(dIntOffsetIndex)) + dIntNumStr + dFloatNumStr;
        }
        return absFlag + helperNumberOffsetPoint(dIntNumStr, dIntOffsetIndex) + dFloatNumStr;
    }
    return rest;
}
function helperStringRepeat(str, count) {
    if (str.repeat) {
        return str.repeat(count);
    }
    var list = isNaN(count) ? [] : new Array(staticParseInt(count));
    return list.join(str) + (list.length > 0 ? str : '');
}

var staticParseInt = parseInt;

function helperNumberOffsetPoint(str, offsetIndex) {
    return str.substring(0, offsetIndex) + '.' + str.substring(offsetIndex, str.length);
}

/**
 * 转数值
 * @param { String/Number } str 数值
 *
 * @return {Number}
 */
var toNumber = helperCreateToNumber(parseFloat);

function helperCreateToNumber(handle) {
    return function (str) {
        if (str) {
            var num = handle(str);
            if (!isNaN(num)) {
                return num;
            }
        }
        return 0;
    };
}
/**
 * 判断是否Number对象
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
var isNumber = helperCreateInTypeof('number');
function helperCreateInTypeof(type) {
    return function (obj) {
        return typeof obj === type;
    };
}
/**
 * 将数值四舍五入并格式化为固定小数位的字符串
 *
 * @param {string|number} num 数值
 * @param {number} digits 小数保留位数
 * @return {String}
 */
function toFixed(num, digits) {
    digits = digits >> 0;
    var round = helperCreateMathNumber('round');
    var str = toValueString(round(num, digits));
    var nums = str.split('.');
    var intStr = nums[0];
    var floatStr = nums[1] || '';
    var digitOffsetIndex = digits - floatStr.length;
    if (digits) {
        if (digitOffsetIndex > 0) {
            return intStr + '.' + floatStr + helperStringRepeat('0', digitOffsetIndex);
        }
        return intStr + helperNumberOffsetPoint(floatStr, Math.abs(digitOffsetIndex));
    }
    return intStr;
}
function toValueString(obj) {
    if (isNumber(obj)) {
        return toNumberString(obj);
    }
    return '' + (eqNull(obj) ? '' : obj);
}
/**
 * 判断是否 undefined 和 null
 * @param {Object} obj 对象
 * @return {Boolean}
 */
function eqNull(obj) {
    return isNull(obj) || isUndefined(obj);
}
/**
 * 判断是否为Null
 *
 * @param {Object} obj 对象
 * @return {Boolean}
 */
function isNull(obj) {
    return obj === null;
}
function isUndefined(obj) {
    return typeof obj === 'undefined';
}
