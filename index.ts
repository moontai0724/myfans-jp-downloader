import axios from "axios";
import { config } from "dotenv";

import Account from "./src/api/Account";
import Post from "./src/api/Post";
import User from "./src/api/User";

axios.defaults.baseURL = "https://api.myfans.jp/api";
axios.defaults.headers["google-ga-data"] = "event328";

config();

(async () => {
  const user = new Account(
    process.env.EMAIL as string,
    process.env.PASSWORD as string,
  );

  await user.login();

  const target = new User(process.env.TARGET_USERNAME as string);
  downloadUser(target);
})();

async function downloadUser(user: User) {
  const posts: RawPost[] = [];
  let nextPage = 1;

  while (nextPage > 0 || posts.length > 0) {
    if (posts.length == 0) {
      console.log("Fetching next page: page ", nextPage);
      const { data, pagination } = await user.getPosts({ page: nextPage });
      posts.push(...data);
      if (!pagination.next) {
        console.log("No more pages");
        return;
      }
      nextPage = pagination.next;
      if (nextPage > 2) nextPage = -1;
    }

    const rawPost = posts.shift();
    if (!rawPost) throw new Error("No post to download");

    const post = new Post(rawPost.id);
    await post.getPost();
    console.log("Downloading post: ", post.simplifyData());
  }

  console.log("Finished downloading user");
}

// setInterval(() => {
//   console.log("keep alive");
// }, 10000);
