// @ts-ignore
/* eslint-disable */

declare namespace API {
  type Tag = {
    _id: number;
    name: string;
    create_date: string;
    update_date: string;
  }
  type TagList = {
    rows: Tag[];
    total: number;
  }
  type BlogListItem = {
    id: number;
    title: string;
    state: string;
    order: number;
    tags: Tag[];
    admireCount: number;
    visitCount: number;
    publishDate: number;
    updateDate: number;
  }
  type BlogList = {
    data?: Blog[];
    total?: number;
    success?: boolean;
  }
  type Blog = {
    _id: number;
    title: string;
    desc: string;
    content: string;
    tags: string[];
    order: number;
    admire_count: number;
    visit_count: number;
    status: number;
    publish_date: number;
    
  }
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}