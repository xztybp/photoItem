import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' /* 导入中文包 */
import relativeTime from 'dayjs/plugin/relativeTime' /* 按需加载插件 */
dayjs.extend(relativeTime) /*  使用插件 */
dayjs.locale('zh-cn')
const timeFilter = function (value) {
  return dayjs().to(dayjs(value))
}
const yearTimeFilter = function (value = '') {
  return value.split('T')[0]
}
export default {
  timeFilter,
  yearTimeFilter
}
/* console.log(dayjs().fromNow())
console.log(dayjs().to(dayjs('1990'))) */
