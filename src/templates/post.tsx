import React from 'react';

import { graphql, PageProps } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXComponents } from './mdxComponent';

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
      <MDXProvider components={MDXComponents}>{children}</MDXProvider>
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
