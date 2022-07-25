function getMonthNames (translations, theme) {
    let lang = theme.lang;
    let monthsEn = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august','september','october','november','december'];
    let translatedMonths = [];
    if(translations){
      if(lang){
        translations.forEach(element => {
          element = element.node
          if(element.code == lang){
             monthsEn.forEach(function(day, index){
                 translatedMonths.push(element[day])
             })
          }
        });
      } else {
        translations.forEach(element => {
          element = element.node
          if(element.name == "English"){
            monthsEn.forEach(function(day, index){
                translatedMonths.push(element[day])
            })
          }
        });
      }
      if(!translatedMonths || translatedMonths.length < 1){
        translations.forEach(element => {
          element = element.node
          if(element.code == "en"){
            monthsEn.forEach(function(day, index){
                translatedMonths.push(element[day])
            })
          }
        });
      }
    }
   return translatedMonths
}

export default getMonthNames