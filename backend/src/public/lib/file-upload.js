import * as qiniu from 'qiniu-js';
import { getToken } from '../../api/file';
/**
 * upload file
 * @param {object} file
 * @param {number} type
 */
export default async function (file, type, is_img = true) {
  is_img = Number(is_img);
  let { token } = await getToken({ is_img });
  if (!token) return;

  return qiniu.upload(file, `${type}/${Date.now()}_${file.name}`, token);
};