/**
 * 解决toFixed精度不准确
 *  d表示需要四舍五入的小数
 *  n表示需要保留几位小数
 */
export default (d, n) => {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  const number = d;
  // eslint-disable-next-line no-restricted-properties
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof n === 'undefined' || n === 0) {
    return Math.round(number).toString();
  }

  let result = number.toString();
  const arr = result.split('.');

  // 整数的情况
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  const integer = arr[0];
  const decimal = arr[1];
  if (decimal.length === n) {
    return result;
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  // eslint-disable-next-line prefer-template
  result = integer + '.' + decimal.substr(0, n);
  const last = decimal.substr(n, 1);

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    // eslint-disable-next-line no-restricted-properties
    const x = Math.pow(10, n);
    result = (Math.round(parseFloat(result) * x) + 1) / x;
    result = result.toFixed(n);
  }

  return result;
};