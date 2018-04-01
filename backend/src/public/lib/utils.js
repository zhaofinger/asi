import { IMG_PREFIX, AUDIO_PREFIX } from '../../config';

/**
 * 补全图片地址
 * @param {string} url
 */
export const fullImgUrl = url => {
  if (typeof url !== 'string') {
    return url;
  }
  if (url.includes('http')) {
    return url;
  } else {
    return IMG_PREFIX + url;
  }
};

/**
 * 补全音频地址
 * @param {string} url
 */
export const fullAudioUrl = url => {
  if (!url) {
    return url;
  }
  if (url.includes('http')) {
    return url;
  } else {
    return AUDIO_PREFIX + url;
  }
};

/**
 * 时间格式化
 * @param {number} time
 * @param {string} fmt
 */
export const timeFormat = (time, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  time = new Date(time);
  let o = {
    'M+': time.getMonth() + 1,                      // 月
    'd+': time.getDate(),                           // 日
    'h+': time.getHours(),                          // 小时
    'm+': time.getMinutes(),                        // 分
    's+': time.getSeconds(),                        // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3),    // 季度
    'S': time.getMilliseconds()                     // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
};