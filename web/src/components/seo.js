import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";


function SEO({lang}) {
  let keywords = ["EHCN", "The Experimental Humanities Collaborative Network", "Open Society University Network", "OSUN","Open Society", "To Be—Named", "To Be Named"]
  return (
          <Helmet
            htmlAttributes={{ lang }}
            title={"To Be—Named"}
            titleTemplate={"To Be—Named"}
            meta={[
              {
                name: "description",
                content: "To Be—Named is a multi-site, new media art exhibition & edited volume focused on how names are created and used to shape, reshape, and sometimes mis-shape, our worlds and identities."
              },
              { 
                name: "google-site-verification",
                content: "z96MJDLw-1NyJ7b66Q5M3dx7qOg65JLp11aJBe0NxmY",
              }, 
              {
                property: "og:title",
                content: "To Be—Named"
              },
              {
                property: "og:description",
                content: "To Be—Named is a multi-site, new media art exhibition & edited volume focused on how names are created and used to shape, reshape, and sometimes mis-shape, our worlds and identities."
              },
              {
                property: "og:type",
                content: "website"
              },
              {
                name: "twitter:title",
                content: "To Be—Named"
              },
              {
                name: "twitter:description",
                content: "To Be—Named is a multi-site, new media art exhibition & edited volume focused on how names are created and used to shape, reshape, and sometimes mis-shape, our worlds and identities."
              }
            ].concat(
                keywords && keywords.length > 0
                  ? {
                      name: "keywords",
                      content: keywords.join(", ")
                    }
                  : []
              )}
           ><script src="https://www.googletagmanager.com/gtag/js?id=G-LVZH6EJH74"></script>
           <script async={false} type="text/javascript">
          {`window.dataLayer = window.dataLayer || []
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date())
          gtag('config', 'G-LVZH6EJH74')`
          }
        </script></Helmet>
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


