import axios from "axios";
import { config } from "dotenv";
import * as FileSystem from "fs";
import * as Path from "path";

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
  const basePath = Path.resolve(
    __dirname,
    "../output",
    replaceIllegalPathCharacters(user.getName()),
  );

  if (!FileSystem.existsSync(basePath)) {
    FileSystem.mkdirSync(basePath, {
      recursive: true,
    });
  }
  const posts: RawPost[] = [];
  let nextPage = 1;
  let index = 0;

  while (nextPage > 0 || posts.length > 0) {
    index++;
    if (posts.length == 0) {
      console.log("Fetching next page: page ", nextPage);
      const { data, pagination } = await user.getPosts({
        page: nextPage,
      });
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
    const data = await post.getPost();
    console.log("Downloading post: ", data);

    const partBody = data.body.split(/\r\n/).shift();

    const subPath = Path.resolve(
      basePath,
      replaceIllegalPathCharacters(
        index.toString().padStart(4, "0") + " " + partBody + " " + data.id,
      ),
    );

    if (!FileSystem.existsSync(subPath)) {
      FileSystem.mkdirSync(subPath, {
        recursive: true,
      });
    }

    FileSystem.writeFileSync(subPath + "/data.json", JSON.stringify(data));
    FileSystem.writeFileSync(subPath + "/context.txt", data.body);
  }

  console.log("Finished downloading user");
}

function replaceIllegalPathCharacters(str: string): string {
  return str.replace(/[/\\?%*:|"<>]/g, "+");
}
