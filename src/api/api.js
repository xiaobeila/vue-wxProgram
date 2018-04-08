import fetch from 'common/js/fetch'

/**
 * 资讯接口
 * @param {*page} param
 */
export function getInfoList (param) {
  return fetch({
    url: '/api/information/index',
    method: 'get',
    data: param
  })
}
