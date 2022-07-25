import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";


function SEO({lang}) {
  let keywords = ["EHCN", "The Experimental Humanities Collaborative Network", "Open Society University Network", "OSUN","Open Society"]
  return (
          <Helmet
            htmlAttributes={{ lang }}
            title={"EHCN"}
            titleTemplate={"EHCN"}
            meta={[
              {
                name: "description",
                content: "The Experimental Humanities Collaborative Network is a global network rethinking the humanities in the light of changing technologies, our increasingly connected planet, the ongoing ecological crisis, and the need to create more inclusive institutions."
              },
              { 
                name: "google-site-verification",
                content: "zSNANb4AJmoBGphdqdjRqJTpXd7KqCVNRIxVPJPOfdw",
              }, 
              {
                property: "og:title",
                content: "The Experimental Humanities Collaborative Network"
              },
              {
                property: "og:description",
                content: "The Experimental Humanities Collaborative Network is a global network rethinking the humanities in the light of changing technologies, our increasingly connected planet, the ongoing ecological crisis, and the need to create more inclusive institutions."
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                name: "twitter:title",
                content: "EHCN"
              },
              {
                name: "twitter:description",
                content: "The Experimental Humanities Collaborative Network is a global network rethinking the humanities in the light of changing technologies, our increasingly connected planet, the ongoing ecological crisis, and the need to create more inclusive institutions."
              }
            ].concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", ")
                    }
                  : []
              )}
           />
          );
}

SEO.defaultProps = {
  lang: "en",
  meta: [],
  keywords: []
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired
};

export default SEO;


