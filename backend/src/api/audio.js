import ajax from '../public/lib/ajax';

/**
 * 获取 audio list
 * @param {*} data
 */
export const getAudioList = data => {
  return ajax('/audio', 'get', data);
};

/**
 * 新建audio
 * @param {object} data AudioModel
 */
export const createAudio = data => {
  return ajax('/audio', 'post', data);
};