import axios from "axios";

export default class Post {
  private post?: RawPostDetail;

  constructor(private id: string) {}

  async getPost(): Promise<RawPostDetail> {
    return await axios.get(`/v1/posts/${this.id}`).then(res => {
      this.post = res.data;

      return res.data;
    });
  }

  simplifyData(): SimplifiedPostData {
    if (!this.post) throw new Error("Post not found");

    return {
      id: this.post.id,
      kind: this.post.kind,
      body: this.post.body,
      images: [
        ...this.post.post_images.map(image => ({
          url: image.file_url,
          width: image.raw_image_width,
          height: image.raw_image_height,
        })),
      ],
      video: this.post.video_url,
      file: this.post.file_download_url,
      free: this.post.free,
      limited: this.post.limited,
      visible: this.post.visible,
      available: this.post.available,
      previous_post_id: this.post.previous_post_id,
      next_post_id: this.post.next_post_id,
    };
  }

  getImages(): RawImage[] {
    if (!this.post) throw new Error("Post not found");

    return this.post.post_images;
  }

  getVideoUrl(): string {
    if (!this.post) throw new Error("Post not found");

    return this.post.video_url;
  }
}

export interface SimplifiedPostData {
  id: string;
  kind: string;
  body: string;
  images: { url: string; width: number; height: number }[];
  video: string | null;
  file: string | null;
  free: boolean;
  limited: boolean;
  visible: boolean;
  available: boolean;
  previous_post_id: string | null;
  next_post_id: string | null;
}
