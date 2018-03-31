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

/**
 * 操作Audio的发布状态
 * @param {string} id
 * @param {number} is_publish
 */
export const publishAudio = (id, is_publish) => {
  return ajax(`/audio/${id}`, 'put', { is_publish });
};