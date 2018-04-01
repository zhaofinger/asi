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
 * 获取Audio
 * @param {string} id
 */
export const getAudio = id => {
  return ajax(`/audio/${id}`, 'get');
};

/**
 * 更新Audio
 * @param {string} id
 * @param {object} audioModel
 */
export const updateAudio = (id, audioModel) => {
  return ajax(`/audio/${id}`, 'put', audioModel);
};

/**
 * 操作Audio的发布状态
 * @param {string} id
 * @param {number} is_publish
 */
export const publishAudio = (id, is_publish) => {
  return ajax(`/audio/${id}`, 'put', { is_publish });
};

/**
 * 删除Audio
 * @param {string} id
 */
export const deleteAudio = id => {
  return ajax(`/audio/${id}`, 'delete');
};