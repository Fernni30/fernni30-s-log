export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  /** 카드 썸네일에 들어갈 글자. 비우면 썸네일 없이 표시됩니다. */
  cover: string | null;
};
