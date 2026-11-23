import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `fernni30's log`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        gfm: true,
        plugins: [
          { resolve: `gatsby-remark-images`, options: { maxWidth: 800 } },
          {
            resolve: `gatsby-remark-obsidian-syntax`,
            options: {
              // 해시태그를 URL로 변환하는 함수
              linkTag: (hashTag: string) =>
                `/tags/${hashTag.replace(/^#/, '')}`,

              // 내부 링크를 URL로 변환하는 함수
              linkPage: (page: string) => `/pages/${page}`,
            },
          },

          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`, // autolink-headers 뒤에 위치
          `gatsby-remark-external-links`,
        ],
      },
    },
  ],
};

export default config;
