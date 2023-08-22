import axios from "axios";
import { createAxiosConfig } from "../client.ts";

export const forumServiceClient = axios.create(createAxiosConfig("/forum/api"));

export interface CategoryFields {
  name: string;
}

export interface ThreadFields {
  title: string;
  content: string;
  creator_email: string;
  creator_name: string;
  approver_name: string;
  approver_email: string;
  created: string;
}

export interface CreateThreadForm {
  title: string;
  content: string;
  category?: number;
  parent?: number;
}

export interface TaggedThreadFields {
  tag_id: number;
  tag_name: string;
  thread_id: number;
}
