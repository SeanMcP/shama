// @ts-check

import fs from "fs";

import { distribution } from "./distribution.mjs";

const booksInOrder = [];
const chapterCountByBook = {};
let lastBook = "";

let chapters = [];

function processChapter(filepath) {
  const file = fs.readFileSync(filepath, "utf8");

  // Regex for removing all non-English characters from a string
  const regex = /[^a-zA-Z ]/g;

  // Get the first 2 lines of the file
  let [titleLine, chapterLine, ...lines] = file.split("\n");
  const title = titleLine.slice(0, -1).trim();

  if (lastBook !== title) {
    if (lastBook) {
      fs.writeFileSync(
        `./data/books/${lastBook}.json`,
        JSON.stringify(chapters)
      );
      chapterCountByBook[lastBook] = chapters.length;
    }
    chapters = [];
    lastBook = title;
    booksInOrder.push(title);
  }

  let cleanLine = "";

  lines.forEach((line) => {
    if (!line) return;
    cleanLine += line.replace(regex, "").trim() + " ";
  });

  const wordMap = {};

  const words = cleanLine.split(" ");
  let chapterWordCount = words.length;

  words.forEach((word, i) => {
    if (!word) return;
    const key = word === "God" || word === "Yahweh" ? word : word.toLowerCase();
    if (!wordMap[key]) wordMap[key] = [];
    wordMap[key].push(i);
  });

  // iterate over wordMap and calculate distribution
  const wordDistribution = [];
  Object.entries(wordMap).forEach(([word, indexArray]) => {
    const count = indexArray.length;
    wordDistribution.push([
      word,
      count,
      (100 * count) / chapterWordCount,
      distribution(indexArray, chapterWordCount),
    ]);
  });

  const sortedByDistribution = wordDistribution.sort((a, b) => b[3] - a[3]);

  chapters.push(sortedByDistribution);
}

const files = fs.readdirSync("./data/web/");

files.forEach((filename) => {
  processChapter(`./data/web/${filename}`);
});

// Don't forget Revelation
fs.writeFileSync(`./data/books/${lastBook}.json`, JSON.stringify(chapters));
chapterCountByBook[lastBook] = chapters.length;

fs.writeFileSync("./data/books.json", JSON.stringify(booksInOrder));
fs.writeFileSync("./data/chapters.json", JSON.stringify(chapterCountByBook));
