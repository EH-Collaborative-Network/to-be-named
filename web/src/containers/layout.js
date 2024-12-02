import { graphql, StaticQuery } from "gatsby";
import React, { useState } from "react";
import Layout from "../components/Layout/layout";
import LangContext from '../components/context/lang.js'
const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  function handleShowNav() {
    setShowNav(true);
  }
  function handleHideNav() {
    setShowNav(false);
  }
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
          );
        }
        return (
          <LangContext.Consumer>
          { theme => {
            return(
              <div className={theme.mode}>
          <Layout
            {...props}
            showNav={showNav}
            siteTitle={data.site.title}
            onHideNav={handleHideNav}
            onShowNav={handleShowNav}
          />
          </div>
            )}}

          </LangContext.Consumer>
        );
      }}
    />
  );
}

export default LayoutContainer;
