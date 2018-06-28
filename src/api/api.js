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

/**
 * 资讯详情
 * @param {*page} param
 */
export function getDetail (param) {
  return fetch({
    url: '/api/information/detail/' + param.id,
    method: 'get',
    data: param
  })
}
