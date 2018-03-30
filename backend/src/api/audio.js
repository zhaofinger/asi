import ajax from '../public/lib/ajax';

/**
 * 新建audio
 * @param {object} data AudioModel
 */
export const createAudio = data => {
  return ajax('/audio', 'post', data);
};