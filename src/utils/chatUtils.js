/**
 * 转换以万为单位
 * @param n 数字
 */
export function setNumber(num) {
  let absNum = Math.abs(num);
  let postfix = "";
  if (absNum >= 100000000) {
    postfix = "亿";
    num /= 100000000;
  } else if (absNum >= 10000000) {
    postfix = "千万";
    num /= 10000000;
  } else if (absNum >= 10000) {
    postfix = "万";
    num /= 10000;
  } else {
    if(parseInt(num) < parseFloat(num)){
      num = num.toFixed(3);
    }
    return num;
  }
  num = num.toFixed(3);
  let [int, dec] = num.split(".");
  let inter = "";
  while (int != "") {
    inter = int.slice(-3) + "," + inter;
    int = int.slice(0, -3);
  }
  return `${inter.slice(0, -1)}.${dec}${postfix}`;
}
/*
 * 函数节流
 */
export const Throttle = (fn, t) => {
  let last;
  let timer;
  let interval = t || 500;
  return function () {
    let args = arguments;
    let now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        fn.apply(this, args);
      }, interval);
    } else {
      last = now;
      fn.apply(this, args);
    }
  }
};
/*
 * 解析中文双引号
 */
export const HtmlDecode = (str) => {
  var s = '';
  if (str.length === 0) return '';
  s = str.replace(/&amp;/g, '&');
  s = s.replace(/&ldquo;/g, '“');
  s = s.replace(/&rdquo;/g, '”');
  s = s.replace(/&times;/g, '×');
  s = s.replace(/&radic;/g, '√');
  return s;
};