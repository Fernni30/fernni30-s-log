import path from 'path';
import { GatsbyNode } from 'gatsby';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const result = await graphql<{
    allMarkdownRemark: {
      nodes: { id: string; fileAbsolutePath: string }[];
    };
  }>(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fileAbsolutePath
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading markdown result', result.errors);
    return;
  }

  const postTemplate = path.resolve('src/templates/post.tsx');

  result.data!.allMarkdownRemark.nodes.forEach((node) => {
    const slug = path
      .basename(node.fileAbsolutePath, '.md')
      .replace(/\s+/g, '-');

    createPage({
      path: `/posts/${slug}`,
      component: postTemplate,
      context: { id: node.id },
    });
  });
};
