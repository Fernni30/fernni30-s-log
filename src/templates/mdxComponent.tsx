/**
 * Gatsby + MDX (TypeScript) 기본 마크다운 스타일링 (Tailwind, 모바일 반응형)
 *
 * - shadcn/ui 토큰(bg-muted, text-muted-foreground, border, text-primary)을 사용합니다.
 * - 이 파일 경로가 tailwind.config.js 의 content 에 포함되어 있어야 클래스가 생성됩니다.
 * - Tailwind 3.4+ 권장 (text-balance, break-keep)
 */
import * as React from 'react';
import { Link } from 'gatsby';
import type { MDXComponents as MDXComponentMap } from 'mdx/types';

type Props<T extends React.ElementType> = React.ComponentPropsWithoutRef<T>;

// 외부 의존성 없이 쓰는 간단한 cn (shadcn의 cn을 쓰고 싶으면 교체해도 됩니다)
const cn = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ */
/* Headings: 모바일에서 한 단계 작게, sm/lg에서 점점 크게                  */
/* ------------------------------------------------------------------ */
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const makeHeading = (Tag: HeadingTag, classes: string) => {
  const Heading = ({ className, ...props }: Props<HeadingTag>) => (
    <Tag
      className={cn(
        // scroll-mt-20: 고정 헤더에 가려지지 않게 앵커 이동 시 여백
        'scroll-mt-20 tracking-tight text-balance break-keep break-words first:mt-0',
        classes,
        className,
      )}
      {...props}
    />
  );
  Heading.displayName = Tag;
  return Heading;
};

const H1 = makeHeading(
  'h1',
  'mt-0 mb-6 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl',
);
const H2 = makeHeading(
  'h2',
  'mt-10 mb-4 pb-2 text-2xl font-semibold sm:mt-12 sm:text-3xl',
);
const H3 = makeHeading('h3', 'mt-8 mb-3 text-xl font-semibold sm:text-2xl');
const H4 = makeHeading('h4', 'mt-6 mb-2 text-lg font-semibold sm:text-xl');
const H5 = makeHeading('h5', 'mt-6 mb-2 text-base font-semibold sm:text-lg');
const H6 = makeHeading(
  'h6',
  'mt-6 mb-2 text-sm font-semibold text-muted-foreground sm:text-base',
);

/* ------------------------------------------------------------------ */
/* Text                                                                */
/* ------------------------------------------------------------------ */
const P = ({ className, ...props }: Props<'p'>) => (
  <p
    className={cn(
      // break-keep: 한글을 단어(어절) 단위로 줄바꿈, break-words: 긴 URL/영단어는 넘치지 않게
      'leading-7 break-keep break-words [&:not(:first-child)]:mt-5 sm:[&:not(:first-child)]:mt-6',
      className,
    )}
    {...props}
  />
);

const A = ({ href = '', className, children, ...props }: Props<'a'>) => {
  const cls = cn(
    'font-medium text-primary underline underline-offset-4 decoration-primary/40 transition-colors hover:decoration-primary break-words',
    className,
  );
  const isInternal = href.startsWith('/') && !href.startsWith('//');
  const isSpecial =
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:');

  if (isInternal) {
    return (
      <Link to={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }
  if (isSpecial) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      {...props}
    >
      {children}
    </a>
  );
};

const Strong = ({ className, ...props }: Props<'strong'>) => (
  <strong className={cn('font-semibold', className)} {...props} />
);
const Em = ({ className, ...props }: Props<'em'>) => (
  <em className={cn('italic', className)} {...props} />
);
const Del = ({ className, ...props }: Props<'del'>) => (
  <del
    className={cn('text-muted-foreground line-through', className)}
    {...props}
  />
);

/* ------------------------------------------------------------------ */
/* Lists (GFM 체크박스 리스트 포함)                                      */
/* ------------------------------------------------------------------ */
const Ul = ({ className, ...props }: Props<'ul'>) => (
  <ul
    className={cn(
      'my-5 ml-5 list-disc space-y-2 marker:text-muted-foreground sm:ml-6',
      '[&_ul]:mt-2 [&_ul]:list-[circle] [&_ol]:mt-2',
      '[&.contains-task-list]:ml-0 [&.contains-task-list]:list-none',
      className,
    )}
    {...props}
  />
);
const Ol = ({ className, ...props }: Props<'ol'>) => (
  <ol
    className={cn(
      'my-5 ml-5 list-decimal space-y-2 marker:text-muted-foreground sm:ml-6',
      '[&_ul]:mt-2 [&_ol]:mt-2',
      className,
    )}
    {...props}
  />
);
const Li = ({ className, ...props }: Props<'li'>) => (
  <li
    className={cn(
      'leading-7 break-keep break-words [&>input]:mr-2 [&>input]:align-middle',
      className,
    )}
    {...props}
  />
);

/* ------------------------------------------------------------------ */
/* Blockquote / hr                                                     */
/* ------------------------------------------------------------------ */
const Blockquote = ({ className, ...props }: Props<'blockquote'>) => (
  <blockquote
    className={cn(
      'my-6 border-l-2 pl-4 italic text-muted-foreground sm:pl-6',
      className,
    )}
    {...props}
  />
);

const Hr = ({ className, ...props }: Props<'hr'>) => (
  <hr className={cn('my-8 border-border sm:my-10', className)} {...props} />
);

/* ------------------------------------------------------------------ */
/* Code                                                                */
/* MDX v2+ 에서는 인라인/블록 모두 <code> 이므로,                        */
/* 인라인 스타일을 기본으로 두고 <pre> 안의 code 는 pre 쪽에서 리셋합니다.   */
/* ------------------------------------------------------------------ */
const Code = ({ className, ...props }: Props<'code'>) => (
  <code
    className={cn(
      'rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] font-medium break-words',
      className,
    )}
    {...props}
  />
);

const Pre = ({ className, ...props }: Props<'pre'>) => (
  <pre
    className={cn(
      // 모바일: 가로 스크롤 + 작은 글자/패딩, sm 이상: 기본 크기
      'my-6 max-w-full overflow-x-auto rounded-lg border bg-muted p-3 font-mono text-[13px] leading-6 [tab-size:2] sm:p-4 sm:text-sm',
      // pre 안의 code 는 인라인 스타일 제거
      '[&_code]:rounded-none [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[1em] [&_code]:font-normal [&_code]:whitespace-pre [&_code]:break-normal',
      className,
    )}
    {...props}
  />
);

/* ------------------------------------------------------------------ */
/* Table: 좁은 화면에서는 찌그러지지 않고 가로 스크롤                      */
/* ------------------------------------------------------------------ */
const Table = ({ className, ...props }: Props<'table'>) => (
  <div className="my-6 w-full overflow-x-auto rounded-lg border">
    <table
      className={cn(
        'w-full min-w-[28rem] border-collapse text-left text-sm sm:min-w-full',
        className,
      )}
      {...props}
    />
  </div>
);
const Thead = ({ className, ...props }: Props<'thead'>) => (
  <thead className={cn('bg-muted/50', className)} {...props} />
);
const Tr = ({ className, ...props }: Props<'tr'>) => (
  <tr className={cn('even:bg-muted/40', className)} {...props} />
);
const Th = ({ className, ...props }: Props<'th'>) => (
  <th
    className={cn(
      'border-b px-3 py-2 font-semibold whitespace-nowrap sm:px-4',
      className,
    )}
    {...props}
  />
);
const Td = ({ className, ...props }: Props<'td'>) => (
  <td
    className={cn('border-t px-3 py-2 align-top sm:px-4', className)}
    {...props}
  />
);

/* ------------------------------------------------------------------ */
/* Media                                                               */
/* ------------------------------------------------------------------ */
const Img = ({ className, alt = '', ...props }: Props<'img'>) => (
  <img
    alt={alt}
    loading="lazy"
    decoding="async"
    className={cn('my-6 h-auto max-w-full rounded-lg border', className)}
    {...props}
  />
);
const Video = ({ className, ...props }: Props<'video'>) => (
  <video
    className={cn('my-6 h-auto max-w-full rounded-lg', className)}
    {...props}
  />
);
const Iframe = ({ className, ...props }: Props<'iframe'>) => (
  <iframe
    className={cn('my-6 aspect-video w-full rounded-lg border', className)}
    {...props}
  />
);

export const MDXComponents: MDXComponentMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: P,
  a: A,
  strong: Strong,
  em: Em,
  del: Del,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockquote,
  hr: Hr,
  code: Code,
  pre: Pre,
  table: Table,
  thead: Thead,
  tr: Tr,
  th: Th,
  td: Td,
  img: Img,
  video: Video,
  iframe: Iframe,
};
