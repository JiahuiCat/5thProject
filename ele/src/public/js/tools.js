/**
 * Created by newuser on 2018/10/29.
 */
/* eslint-disable */
export function filterCustomDate(time) {
  let date = new Date(time) // 将时间戳转化成日期
  let template = 'yyyy-MM-dd hh:mm'
  template = template.replace(/y+/g, date.getFullYear())
  let obj = {
    '(M+)': date.getMonth() + 1 + '',// js月份从0计算
    '(d+)': date.getDate() + '',
    '(h+)': date.getHours() + '',
    '(m+)': date.getMinutes() + '',
    '(s+)': date.getSeconds() + ''
  }

  for (let key in obj) {
    let reg = new RegExp(key) // 将key 转化为正则表达式
    if (reg.test(template)) { // 用正则表达式尝试当前字符串是否有匹配的字符
      let str = RegExp.$1.length === 1 ? obj[key] : returnDoubleDate(obj[key])
      template = template.replace(reg, str)
    }
  }
  return template
}

function returnDoubleDate(time) {
  // 7 => 007  17 => 0017
  return ( '00' + time).substr(time.length)
}
