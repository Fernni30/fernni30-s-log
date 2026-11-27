import * as React from 'react';
import { Link } from 'gatsby';
import Star from './star';

import type { PostMeta } from '../types';

const VARIANTS = [
  {
    card: 'bg-surface -rotate-[1.5deg] md:mt-4',
    sub: 'text-muted',
    tag: 'text-accent-tag',
    tape: 'rotate-[4.5deg]',
    cover: 'h-44 md:h-80 bg-cover-slate text-fg',
  },
  {
    card: 'bg-surface-soft rotate-[1.5deg]',
    sub: 'text-muted-soft',
    tag: 'text-accent-tag',
    tape: '-rotate-[4.5deg]',
    cover: 'h-40 md:h-[200px] bg-cover-steel text-white',
  },
  {
    card: 'bg-surface-raised rotate-1',
    sub: 'text-muted-raised',
    tag: 'text-accent-light',
    tape: '-rotate-3',
    cover: 'h-40 md:h-[180px] bg-cover-black text-white',
  },
  {
    card: 'bg-surface -rotate-1',
    sub: 'text-muted',
    tag: 'text-accent-tag',
    tape: 'rotate-3',
    cover: 'h-40 bg-cover-gray text-white',
  },
];

type Props = { post: PostMeta; index: number };

const PostCard = ({ post, index }: Props) => {
  const v = VARIANTS[index % VARIANTS.length];

  return (
    // 모바일에서는 order 값으로 최신순을 유지합니다.
    <article
      style={{ order: index + 1 }}
      className={`relative flex flex-col gap-3.5 rounded-[20px] p-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] md:p-6 ${v.card}`}
    >
      <div
        aria-hidden="true"
        className={`absolute -top-3 left-[40%] h-[26px] w-[88px] bg-tape opacity-70 ${v.tape}`}
      />
      {post.cover && (
        <div
          aria-hidden="true"
          className={`relative flex items-center justify-center whitespace-pre-line rounded-xl px-4 text-center text-[26px] leading-snug md:text-[32px] ${v.cover}`}
        >
          <Star size={16} className="absolute right-[18px] top-4" />
          {post.cover}
        </div>
      )}
      <time
        dateTime={post.date.replace(/\./g, '-')}
        className={`font-hand text-lg font-bold ${v.sub}`}
      >
        {post.date}
      </time>
      <h2 className="text-[22px] leading-normal md:text-[27px]">
        <Link to={`/posts/${post.slug}/`} className="hover:text-accent">
          {post.title}
        </Link>
      </h2>
      <p className={`text-[15px] leading-[1.8] ${v.sub}`}>{post.description}</p>
      <ul className="flex flex-wrap gap-3">
        {post.tags.map((tag) => (
          <li key={tag} className={`font-hand text-lg font-bold ${v.tag}`}>
            #{tag}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PostCard;
