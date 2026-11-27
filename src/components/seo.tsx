import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

type Data = { site: { siteMetadata: { title: string; description: string } } };

const Seo = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const { site } = useStaticQuery<Data>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const meta = site.siteMetadata;

  return (
    <>
      <title>{title ? `${title} | ${meta.title}` : meta.title}</title>
      <meta name="description" content={description ?? meta.description} />
    </>
  );
};

export default Seo;
