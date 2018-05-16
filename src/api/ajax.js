/*
* ajax请求函数模块
* 返回值是 Promise对象，返回的数据已经进行了处理，response.data
*   不用像之前一样，现在就已经是要获取的数据了，then接收即可。
* */
import axios from 'axios'

export default function ajax(url='', data={}, type='GET') {
  return new Promise(function (resolve, reject) {
    let promise

    if(type==='GET'){
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr = key + '=' + data[key] + '&'
      })
      if(dataStr !== ''){
        //这2种写法都可以，目的不要最后一个 &
        // dataStr = dataStr.substring(0, dataStr.length-1)
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      //axios返回的是promise对象
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }

    /*
    * resolve执行的结果，就是将数据传递给当前通过new Promise创建的promise对象
    *   可以通过创建的promise对象.then获取
    * */
    promise.then(function (response) {
      resolve(response.data)
    })
      .catch(function (error) {
        reject(error)
      })
  })
}
