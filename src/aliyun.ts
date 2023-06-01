import axios from 'axios'

const aliyun = axios.create({
  baseURL: 'https://aliyun.nana7mi.link/',
})

export default aliyun

export async function request(url: string, max_age: number = -1) {
  let res = await aliyun.get(url, { params: { max_age: max_age } })
  if(res.data.code != 0) throw res.data.data
  return res.data.data
}

export async function get_user_info(uid: string | number, max_age: number = -1) {
  return await request(`/user.User(${uid}).get_user_info()`, max_age)
}

export async function get_user_face(uid: string | number, max_age: number = -1) {
  return await request(`/user.User(${uid}).get_user_info().face`, max_age)
}

export async function get_user_name(uid: string | number, max_age: number = -1) {
  return await request(`/user.User(${uid}).get_user_info().name`, max_age)
}

export async function get_room_info(roomid: string | number, max_age: number = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_room_info()`, max_age)
}

export async function get_chat_host(roomid: string | number, max_age: number = -1) {
  return await request(`/live.LiveRoom(${roomid}).get_chat_conf().host`, max_age)
}

export async function get_download_url(bvid: string, max_age: number = -1) {
  return await request(`/video.Video(bvid=${bvid}).get_download_url(0:int,html5=1).durl`, max_age)
}

export async function get_video_pic(bvid: string, max_age: number = -1) {
  return await request(`/video.Video(bvid=${bvid}).get_info().pic`, max_age)
}

export interface Comment {
  member: Member
  content: Content
}

export interface Member {
  mid: string
}

export interface Content {
  message: string
}

export async function get_dynamic_comments(oid: string, max_age: number = -1) {
  let data: Array<Comment> = await request(`comment.get_comments(${oid},comment.CommentResourceType.DYNAMIC:parse,1:int).replies`, max_age)
  return data
}
