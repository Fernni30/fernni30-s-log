import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  pathPrefix: '/fernni30-s-log',
  siteMetadata: {
    title: 'fernni30s — Tech Blog',
    description: '오늘의 기록, 차곡차곡',
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'posts', path: `${__dirname}/content/posts` },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: { maxWidth: 720, linkImagesToOriginal: false },
          },
        ],
      },
    },
  ],
};

export default config;
