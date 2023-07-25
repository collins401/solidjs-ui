import env from '@/utils/env';
import request from '@/utils/request';

export interface CNodeResponse {
  success: boolean;
  data: any;
  [propsName: string]: any;
}
export const cnodeTopics = async (query: any) => {
  return request('https://cnodejs.org/api/v1/topics', { query });
  // const params = new URLSearchParams(query);
  // const response = await fetch(`https://cnodejs.org/api/v1/topics?${params}`);
  // return await response.json();
};
export const cnodeTopicsDetail = async (id: string) => {
  return request(String('https://cnodejs.org/api/v1/topic/' + id));
  // const response = await fetch(`https://cnodejs.org/api/v1/topic/${id}?mdrender=false`);
  // return await response.json();
};
