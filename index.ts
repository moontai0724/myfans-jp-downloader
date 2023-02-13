import axios from "axios";
import { config } from "dotenv";
import * as FileSystem from "fs";
import * as Path from "path";
import * as createLogger from "progress-estimator";
import youtubedl, { create as createYoutubeDl } from "youtube-dl-exec";

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
        per_page: 2,
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

    const images = post.getImages();
    for (let i = 0; i < images.length; i++) {
      await downloadImage(
        images[i],
        subPath,
        index.toString().padStart(4, "0") +
          " " +
          partBody +
          " " +
          data.id +
          " " +
          i,
      );
    }

    if (data.video_url)
      await downloadVideo(
        data.video_url,
        subPath,
        replaceIllegalPathCharacters(
          index.toString().padStart(4, "0") + " " + partBody,
        ),
      );
  }

  console.log("Finished downloading user");
}

async function downloadVideo(url: string, directory: string, filename: string) {
  const executablePath = process.env.YT_DLP_EXECUTABLE as string;
  if (executablePath) {
    const youtubedlC = createYoutubeDl(executablePath);
    const promise = youtubedlC(url, { output: `${directory}/${filename}.mp4` });
    const logger = createLogger();
    const result = await logger(promise, `Obtaining ${url}`);

    console.log(result);
    return promise;
  } else {
    const promise = youtubedl(url, { output: `${directory}/${filename}.mp4` });
    const logger = createLogger();
    const result = await logger(promise, `Obtaining ${url}`);

    console.log(result);
    return promise;
  }
}

async function downloadImage(
  image: RawImage,
  directory: string,
  filename: string,
) {
  const response = await axios({
    method: "GET",
    url: image.file_url,
    responseType: "stream",
  });
  const extension = Path.extname(new URL(response.data.responseUrl).pathname);
  const path = Path.resolve(
    directory,
    replaceIllegalPathCharacters(filename + extension),
  );
  if (FileSystem.existsSync(path)) {
    const fileStat = FileSystem.statSync(path);
    if (fileStat.size == response.headers["content-length"]) {
      console.log(`${filename}${extension} already downloaded, skipped.`);
      return;
    }
  }

  const writer = FileSystem.createWriteStream(path);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", (...messages) => {
      console.log(`${filename}${extension} downloaded.`);
      resolve(messages);
    });
    writer.on("error", (...messages) => {
      console.log(`${filename}${extension} failed to download!`, messages);
      reject(messages);
    });
  });
}

function replaceIllegalPathCharacters(str: string): string {
  return str.replace(/[/\\?%*:|"<>]/g, "+");
}
