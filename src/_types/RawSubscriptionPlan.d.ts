interface RawSubscriptionPlan {
  id: string;
  product_name: string;
  description: string;
  monthly_price: number;
  status: string;
  posts_count: number;
  is_limited_access: boolean;
  active_user_subscriptions_count: number;
  is_back_number: boolean;
  flag: string;
  welcome_message: string;
  disallow_new_subscriber: boolean;
  message_room_id: unknown;
  active_discount: unknown;
  plan_discounts: unknown;
  user: RawUserPublic;
}
