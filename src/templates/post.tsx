import React from 'react';
import { graphql, PageProps } from 'gatsby';

type DataProps = {
  markdownRemark: { html: string };
};

export default function PageTemplate({ data }: PageProps<DataProps>) {
  return (
    <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </article>
  );
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`;
