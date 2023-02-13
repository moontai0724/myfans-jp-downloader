interface RawPlanFull extends RawPlanBasic {
  description: string;
  status: string;
  posts_count: number;
  is_back_number: boolean;
  flag: unknown;
  welcome_message: string;
  plan_discounts: unknown;
  user: RawUserPublic;
}
