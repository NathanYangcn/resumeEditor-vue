export default function () {
  let time = new Date()
  let yy = time.getFullYear()
  let mm = time.getMonth() + 1
  let dd = time.getDate()
  let hh = time.getHours()
  let ms = time.getMinutes()
  let timeArray = []
  timeArray.push(yy, mm, dd, hh, ms)

  for (var i = 0; i < timeArray.length; i++) {
    if (timeArray[i] < 10) {
      timeArray[i] = '0' + timeArray[i]
    }
  }

  let tpl = timeArray[0] + '年' + timeArray[1] + '月' + timeArray[2] + '日'
  return tpl
}
