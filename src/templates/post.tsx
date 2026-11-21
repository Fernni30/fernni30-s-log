import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

const shortcodes = { Link };

type DataProps = {
  mdx: {
    frontmatter: {
      title: string;
    };
  };
};

export default function PageTemplate({ data, children }: PageProps<DataProps>) {
  return (
    <>
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={shortcodes}>{children}</MDXProvider>
    </>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
