import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  query ResearchThreadTemplateQuery($id: String!) {
    researchThread: sanityResearchThread(id: { eq: $id }) {
      id
      slug {
        current
      }

      
    }
  }
`;

const ResearchThreadTemplate = props => {
  const { data, errors } = props;
  const project = data && data.sampleProject;
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

export default ResearchThreadTemplate;
