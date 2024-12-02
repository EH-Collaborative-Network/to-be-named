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
    mode: "light"
  }
  setLang = (language) => {
    this.setState((state) => ({
      lang: language
    }));
    localStorage.setItem("lang", JSON.stringify(language))
    // this.setState({ lang })
  }

  setMode = (mode) => {
    this.setState((state) => ({
      mode: mode
    }));
    localStorage.setItem("mode", JSON.stringify(mode))
    // this.setState({ lang })
  }

  componentDidMount() {
    const langEn = JSON.parse(localStorage.getItem("lang"))
    const mode = JSON.parse(localStorage.getItem("mode"))

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
    if (mode) {
      this.setState({ mode: mode })
    } if(typeof window != `undefined`){
      if(window.location.href.includes("mode=dark")){
        this.setState({ mode: "dark" })
      }else{
        this.setState({ mode: "light" })
      }
    }else {
      this.setState({ mode: "light" })
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
    const { lang, mode } = this.state

    return (
      <LangContext.Provider
        value={{
          lang,
          mode,
          setLang: this.setLang,
          setMode: this.setMode
        }}
      >
        {children}
      </LangContext.Provider>
    )
  }
}
export default LangContext
export { LangProvider }