const UTCTime = () => {
    let d = new Date()
    let hh = ''
    let mm = ''
    if(d.getUTCHours()<10) hh = '0' + d.getUTCHours().toString()
    else hh = d.getUTCHours().toString()
    if(d.getUTCMinutes()<10) mm = '0' + d.getUTCMinutes().toString()
    else mm = d.getUTCMinutes().toString()
    return hh+':'+mm
}

module.exports=UTCTime