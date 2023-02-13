import axios from "axios";

export default class Plan {
  private plan?: RawPlanFull;
  constructor(private id: string) {}

  setPlan(plan: RawPlanFull) {
    this.plan = plan;
  }

  async getPosts(options?: PaginationOptions): Promise<Paginated<RawPost>> {
    return await axios
      .get(`/v2/plans/${this.id}/posts`, { params: options })
      .then(res => res.data);
  }

  static fromData(data: RawPlanFull) {
    const plan = new Plan(data.id);
    plan.setPlan(data);

    return plan;
  }
}
