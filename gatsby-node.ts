import path from 'path';
import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMdx: {
      nodes: {
        id: string;
        frontmatter: {
          slug: string;
        };
        internal: {
          contentFilePath: string;
        };
      }[];
    };
  }>(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors);
    return;
  }

  const posts = result.data!.allMdx.nodes;
  const postTemplate = path.resolve('src/templates/post.tsx');

  posts.forEach((node) => {
    createPage({
      path: node.frontmatter.slug,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    });
  });
};
