import * as React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';

import type { PostMeta } from '../types';
import PostCard from '../components/postcard';
import Layout from '../components/layout';
import Seo from '../components/seo';

type Data = { allMarkdownRemark: { nodes: { frontmatter: PostMeta }[] } };

// 모바일: 한 줄(contents로 풀어 order 정렬) / 데스크탑: 엇갈린 두 단
const column = 'contents md:flex md:min-w-0 md:flex-1 md:flex-col md:gap-12';

const IndexPage = ({ data }: PageProps<Data>) => {
  const posts = data.allMarkdownRemark.nodes.map((n, index) => ({
    post: n.frontmatter,
    index,
  }));

  const cards = (parity: number) =>
    posts
      .filter(({ index }) => index % 2 === parity)
      .map(({ post, index }) => (
        <PostCard key={post.slug} post={post} index={index} />
      ));

  return (
    <Layout>
      <main className="mx-auto flex max-w-page flex-col gap-9 px-6 pb-14 pt-4 md:gap-14 md:px-12 md:pb-[72px] md:pt-10">
        <div className="flex flex-col gap-9 md:flex-row md:items-start md:gap-14">
          <div className={column}>
            <div className="flex flex-col items-start gap-1">
              <p className="font-hand text-[22px] font-bold text-muted">
                오늘의 기록, 차곡차곡
              </p>
              <h1 className="text-[64px] leading-tight text-accent md:text-[120px]">
                #Tech
              </h1>
              <span className="ml-10 inline-block -rotate-[4deg] rounded-full bg-fg px-7 py-1 text-3xl text-bg md:ml-24 md:text-[44px]">
                #All
              </span>
            </div>
            {cards(1)}
          </div>
          <div className={column}>{cards(0)}</div>
        </div>
        {posts.length === 0 && (
          <p className="text-center text-muted">아직 작성한 글이 없어요.</p>
        )}
        <p className="text-center font-hand text-xl font-bold text-muted">
          여기까지 읽어줘서 고마워요
        </p>
      </main>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <Seo />;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
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
  }
`;
