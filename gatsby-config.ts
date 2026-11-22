import type { GatsbyConfig } from 'gatsby';
import remarkGfm from 'remark-gfm';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `fernni30's log`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/content/posts`,
      },
    },
  ],
};

export default config;
