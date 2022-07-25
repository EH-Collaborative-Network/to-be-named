import React from "react"

const defaultState = {
  lang: "en",
  setLang: () => {},
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
    // Getting dark mode value from localStorage!
    const langEn = JSON.parse(localStorage.getItem("lang"))
    if (langEn) {
      this.setState({ lang: langEn })
    } else {
      this.setState({ lang: "en" })
    }
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