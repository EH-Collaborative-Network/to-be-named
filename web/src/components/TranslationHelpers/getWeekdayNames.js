function getWeekdayNames (translations, theme) {
    let lang = theme.lang;
    let weekdaysEn = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let translatedWeekdays = [];

    if(translations){
      if(lang){
        translations.forEach(element => {
          element = element.node
          if(element.code == lang){
             weekdaysEn.forEach(function(day, index){
                 translatedWeekdays.push(element[day])
             })
          }
        });
      } else {
        translations.forEach(element => {
          element = element.node
          if(element.name == "English"){
            weekdaysEn.forEach(function(day, index){
                translatedWeekdays.push(element[day])
            })
          }
        });
      }
      if(!translatedWeekdays || translatedWeekdays.length < 1){
        translations.forEach(element => {
          element = element.node
          if(element.code == "en"){
            weekdaysEn.forEach(function(day, index){
                translatedWeekdays.push(element[day])
            })
          }
        });
      }
    }
   return translatedWeekdays
}

export default getWeekdayNames