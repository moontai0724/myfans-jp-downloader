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
  file_download_url: string | null;
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

interface test {
  id: "378bc876-992c-4ebc-a495-94c0d78a6fcc";
  kind: "video";
  body: "拘束乗馬鞭Aアングルlongばーじょん\r\nギャン泣きすずちゃん\r\n";
  humanized_publish_start_at: "02/12 18:00";
  deleted_at_i18n: null;
  liked: false;
  likes_count: 1;
  user: {
    about: "すずです₍ ᐢ. ̫ .ᐢ ₎ \r\nバチボコ動画載せてます。よろしくお願いします૮ .  ̫ . ა ⸝꙳ \r\n単品販売動画のサンプルはTwitterメディアに載せています\r\n\r\n※掲載するメディアは全て同意の元行っています。\r\n※過激な表現が含まれますので苦手な方の閲覧・購入はお控えください。\r\n同意のない暴力行為を推奨するものではありません。\r\n\r\n※転載・2次配布・転売は禁止です。\r\nRepost is prohibited.\r\n\r\n【プランについて⚠️】\r\nmyfansの月額プランは解約すると即時特典が受けられなくなります。\r\nもし解約する際は、勿体ないので即解約せずに30日後解約するのがオススメです(??)\r\n\r\nSM/調教/お仕置き/腹パン/ビンタ/スパンキング/鞭/電気責め/踏みつけ/蹴り/ヒトイヌ/アナル/拘束/首絞め";
    active: true;
    avatar_url: "https://cm.cdn.myfans.jp/uploads/user/avatar_image/a042b3ed-004f-42c3-8645-417e37ccc43e/9C2D2979-8E4F-4C90-B755-5497F92FB497.jpeg";
    banner_url: "https://cm.cdn.myfans.jp/uploads/user/banner_image/a042b3ed-004f-42c3-8645-417e37ccc43e/7FC1FD86-A6C2-4EB8-AB5F-19B382A94D9E.jpeg";
    id: "a042b3ed-004f-42c3-8645-417e37ccc43e";
    is_following: true;
    likes_count: 218;
    name: "Hallucination";
    username: "SuzuSM0";
    is_official_creator: false;
    is_official: false;
    label: null;
    current_back_number_plan: null;
  };
  post_images: [
    {
      file_url: "https://cm.cdn.myfans.jp/uploads/post_image/image/b4142b36-c4a1-4766-a4ca-897c2e4cae87/image20230206-1-1mtlr8q.jpg";
      square_thumbnail_url: "https://cm.cdn.myfans.jp/uploads/post_image/square_image/b4142b36-c4a1-4766-a4ca-897c2e4cae87/image20230206-1-15f3ih.jpg";
      raw_image_height: 1080;
      raw_image_width: 1920;
      square_thumnail_url: "https://cm.cdn.myfans.jp/uploads/post_image/square_image/b4142b36-c4a1-4766-a4ca-897c2e4cae87/image20230206-1-15f3ih.jpg";
    },
  ];
  visible: true;
  banned: false;
  publish_end_at: "2023-03-12T23:59:00+09:00";
  publish_start_at: "2023-02-12T18:00:00+09:00";
  pinned_at: null;
  file_download_url: null;
  plan: null;
  current_single_plan: null;
  plans: [
    {
      id: "143ed41b-d9a3-4ba2-96cd-4a4896f0ccd1";
      product_name: "もるもっと組🐹";
      monthly_price: 5000;
      is_limited_access: false;
      disallow_new_subscriber: false;
      active_discount: null;
    },
    {
      id: "5ad6f995-783a-4001-b9a8-d2d50f2b4fae";
      product_name: "うさぎ組🐰";
      monthly_price: 10000;
      is_limited_access: false;
      disallow_new_subscriber: false;
      active_discount: null;
    },
    {
      id: "b6ef57ea-2999-42fb-ae33-8269a15a7fac";
      product_name: "園長せんせい👨‍🏫";
      monthly_price: 15000;
      is_limited_access: false;
      disallow_new_subscriber: false;
      active_discount: null;
    },
  ];
  video_processing: false;
  video_duration: { hours: null; minutes: "08"; seconds: "27" };
  free: false;
  limited: true;
  available: true;
  plan_id: null;
  video_url: "https://cm.cdn.myfans.jp/videos/processed/hls/6006db03-c278-4eb6-8dba-fa2c2f2bbac7.m3u8";
  next_post_id: null;
  previous_post_id: "a633cc16-fcdf-4369-9f0b-8f5364a9f16a";
  view_count_i18n: "-";
  is_mosaic_enable: false;
  is_trial_video: false;
  commentable: true;
}
