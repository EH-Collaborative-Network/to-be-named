function translate (translations, phrase, theme) {
    let translation = []
    let lang = theme.lang;
    if(translations){
      if(lang){
        translations.forEach(element => {
          element = element.node
          if(element.code == lang){
              translation = element[phrase];
          }
        });
      } else {
        translations.forEach(element => {
          element = element.node
          if(element.name == "English"){
            translation = element[phrase]
          }
        });
      }
      if(!translation || translation.length < 1){
        translations.forEach(element => {
          element = element.node
          if(element.code == "en"){
            translation = element[phrase]
          }
        });
      }
    }
   return translation
}

export default translate