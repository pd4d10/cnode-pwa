// @flow

export type Author = {
  loginname: string,
  avatar_url: string,
}

export type Topic = {
  id: string,
  author_id: string,
  tab: string,
  content: string,
  title: string,
  last_reply_at: string,
  good: boolean,
  top: boolean,
  reply_count: number,
  visit_count: number,
  create_at: string,
  author: Author,
  replies: {
    id: string,
    author: Author,
    content: string,
    ups: string[],
    create_at: string,
    reply_id: string,
    is_uped: boolean,
  }[],
  is_collect: boolean,
}
