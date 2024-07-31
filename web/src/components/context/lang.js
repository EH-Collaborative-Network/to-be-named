import React from "react"
let defaultState;

if(typeof window != `undefined`){
  if(window.location.href.includes("language=es")){
    defaultState = {
      lang: "es",
      setLang: () => {},
    }
  }else{
    defaultState = {
      lang: "en",
      setLang: () => {},
    }
  }
}else{
  defaultState = {
    lang: "en",
    setLang: () => {},
  }
}

const LangContext = React.createContext(defaultState)

class LangProvider extends React.Component {
  state = {
    lang: "en",
  }
  setLang = (language) => {
    this.setState((state) => ({
      lang: language
    }));
    localStorage.setItem("lang", JSON.stringify(language))
    // this.setState({ lang })
  }

  componentDidMount() {
    const langEn = JSON.parse(localStorage.getItem("lang"))

    if (langEn) {
      this.setState({ lang: langEn })
    } if(typeof window != `undefined`){
      if(window.location.href.includes("language=es")){
        this.setState({ lang: "es" })
      }else{
        this.setState({ lang: "en" })
      }
    }else {
      this.setState({ lang: "en" })
    }
    // Getting dark mode value from localStorage!
    // if (langEn) {
    //   this.setState({ lang: langEn })
    // } else {
    //   this.setState({ lang: "en" })
    // }
  }
  render() {
    const { children } = this.props
    const { lang } = this.state
    return (
      <LangContext.Provider
        value={{
          lang,
          setLang: this.setLang,
        }}
      >
        {children}
      </LangContext.Provider>
    )
  }
}
export default LangContext
export { LangProvider }