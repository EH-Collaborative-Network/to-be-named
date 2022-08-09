import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query ArtistAuthorTemplateQuery($id: String!) {
    researchThread: sanityArtistAuthor(id: { eq: $id }) {
      id
      name
      slug {
        current
      }

      
    }
  }
`;

const ArtistAuthorTemplate = props => {
  const { data, errors } = props;
  const project = data && data.researchThread;
  return (
    <Layout>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || "Untitled"} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

    </Layout>
  );
};

export default ArtistAuthorTemplate;
