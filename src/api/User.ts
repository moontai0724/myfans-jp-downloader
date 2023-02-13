import axios from "axios";

export default class User {
  private user?: RawUser;
  constructor(private username: string) {}

  async getInformation(): Promise<RawUser> {
    return await axios
      .get(`/v2/users/show_by_username?username=${this.username}`)
      .then(res => {
        this.user = res.data;
        return res.data;
      });
  }

  async getPlans(): Promise<RawPlanFull[]> {
    if (!this.user?.id) await this.getInformation();

    return await axios
      .get(`/v1/users/${this.user?.id}/plans`)
      .then(res => res.data);
  }

  async getPosts(options?: PaginationOptions): Promise<Paginated<RawPost>> {
    if (!this.user?.id) await this.getInformation();

    return await axios
      .get(`/v2/users/${this.user?.id}/posts`, { params: options })
      .then(res => res.data);
  }
}
