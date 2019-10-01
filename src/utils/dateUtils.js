/*
包含 n 个日期时间处理的工具函数模块
*/



// 获得想要日期格式
export function formatDate(time) {
    if (!time) return ''
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour= date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    return (
        year + '-' + (month > 9 ? month: '0' + month ) + '-' + (day > 9 ? day : '0' + day ) + ' '
        + (hour > 9 ? hour: '0'+ hour) + ':' + ( minutes > 9 ? minutes: '0' + minutes ) + ':' + (seconds > 9 ? seconds: '0' + seconds )
    )
}
 