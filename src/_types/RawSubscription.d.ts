interface RawSubscription {
  id: string;
  status: string;
  active_until: string;
  active_until_i18n: string;
  active_until_for_user_i18n: string;
  created_at: string;
  humanized_created_at: unknown;
  user: RawUser;
  kind_i18n: string;
  amount: unknown;
  creator_fee: unknown;
  web_path: string;
  sort: unknown;
  plan: RawPlan;
}
