interface RawPost {
  id: string;
  kind: string;
  /** Post text content will be here */
  body: string;
  humanized_publish_start_at: string;
  deleted_at_i18n: unknown;
  liked: boolean;
  likes_count: number;
  user: RawUserPublicCreator;
  /** image post content will be here */
  post_images: RawImage[];
  visible: boolean;
  banned: boolean;
  publish_end_at: string;
  publish_start_at: string;
  pinned_at: unknown;
  file_download_url: unknown;
  plan: unknown;
  current_single_plan: unknown;
  /** plans that can access this post */
  plans: RawPlanBasic[];
  video_processing: boolean;
  video_duration: { hours: unknown; minutes: string; seconds: string };
  free: boolean;
  limited: boolean;
  /** is available to access or not */
  available: boolean;
}
