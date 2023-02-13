import axios from "axios";

export default class Post {
  constructor(private id: string) {}

  async getPost(): Promise<RawPost> {
    return await axios.get(`/v1/posts/${this.id}`).then(res => res.data);
  }
}
