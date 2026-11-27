import * as React from 'react';
import { graphql, Link, type HeadFC, type PageProps } from 'gatsby';

import Layout from '../../components/layout';
import Seo from '../../components/seo';

import type { PostMeta } from '../../types';

type Data = { markdownRemark: { html: string; frontmatter: PostMeta } };

const PostPage = ({ data }: PageProps<Data>) => {
  const { html, frontmatter: post } = data.markdownRemark;

  return (
    <Layout>
      <main className="mx-auto max-w-3xl px-6 pb-20 pt-8">
        <article>
          <header className="mb-10 flex flex-col gap-3 border-b border-surface-raised pb-8">
            <time className="font-hand text-lg font-bold text-muted">
              {post.date}
            </time>
            <h1 className="text-3xl leading-normal md:text-[40px]">
              {post.title}
            </h1>
            <ul className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="font-hand text-lg font-bold text-accent-tag"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </header>
          {/* 직접 작성한 마크다운을 변환한 HTML입니다. */}
          <div
            className="prose-post"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <Link
          to="/"
          className="mt-12 inline-flex min-h-11 items-center rounded-full bg-surface px-5"
        >
          ← 목록으로
        </Link>
      </main>
    </Layout>
  );
};

export default PostPage;

export const Head: HeadFC<Data> = ({ data }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.description}
  />
);

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        slug
        title
        description
        date(formatString: "YYYY.MM.DD")
        tags
        cover
      }
    }
  }
`;
