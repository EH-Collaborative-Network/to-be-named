
  
function translateTime(d, locale = null, timezone, noTime = false, onlyTime = false, noYear = false){
    let td;
    let tz;

    if(parseInt(timezone)){
        //  let hours = parseInt(timezone.split(":")[0]);
        //  let minutes = parseInt(timezone.split(":")[1])
        //  if(hours < 0){
        //      minutes = minutes * -1;
        //  }
        //  let offsetMinutes = minutes * 60 * 1000;
        //  let offsetHours = hours * 60 * 60 * 1000;
        //  let offset = offsetHours + offsetMinutes;
         let offset = timezone * 60 * 60 * 1000;
         d.setTime(d.getTime() + offset);
         tz = "UTC"
         
    }else{
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        tz = timezone
    }
    if(noTime){
        if(noYear){
            td = d.toLocaleString((locale || "en-US"), {month: 'long', day: 'numeric', timeZone:tz}); 
        }else{
            td = d.toLocaleString((locale || "en-US"), {year: 'numeric', month: 'long', day: 'numeric', timeZone:tz});
        }
    }else{
        td = d.toLocaleString((locale || "en-US"), {year: 'numeric', month: 'long', day: 'numeric', hour:'numeric',minute:'numeric', timeZone:tz});
    }

    if(onlyTime){
        td = d.toLocaleTimeString((locale || "en-US"), {timeZone: tz, hour: "numeric", minute: "numeric"});
    }
    
    return td
}

export default translateTime