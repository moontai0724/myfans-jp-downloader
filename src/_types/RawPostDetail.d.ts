interface RawPostDetail extends RawPost {
  plan_id: unknown;
  /** m3u8 download address, without auth */
  video_url: string;
  next_post_id: string | null;
  previous_post_id: string | null;
  view_count_i18n: string;
  is_mosaic_enable: boolean;
  is_trial_video: boolean;
  commentable: boolean;
}
