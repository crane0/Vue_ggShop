import Vue from 'vue'
// import moment from 'moment'
import format from 'date-fns/format'

//定义的data-format，在ShowRatings中使用了 {{rating.rateTime | data-format}}
Vue.filter('data-format', function (value, formatStr='YYYY-MM-DD HH:mm:ss') {
  // return moment(value).format(formatStr)
  return format(value, formatStr)
})
