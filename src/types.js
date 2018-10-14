// @flow
export type Author = {
  loginname: string,
  avatar_url: string,
}

export type Reply = {
  id: string,
  author: Author,
  content: string,
  ups: string[],
  create_at: string,
  reply_id: string,
  is_uped: boolean,
}

// https://cnodejs.org/api/v1/topics
export type ListTopic = {
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
}

// https://cnodejs.org/api/v1/topic/5433d5e4e737cbe96dcef312
export type DetailTopic = ListTopic & {
  replies: Reply[],
  is_collect: boolean,
}
