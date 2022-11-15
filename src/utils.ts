import slugify from "slugify";

export function toSlug(string: string, psalmSubpath: boolean = false) {
  if (psalmSubpath && string === "Psalms") return "psalm";
  return slugify(string, { lower: true });
}

export const commonWords = [
  "a",
  "all",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "have",
  "i",
  "in",
  "is",
  "it",
  "my",
  "not",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "was",
  "will",
  "with",
  "you",
  "your",
];

export function isCommon(word: string) {
  return commonWords.includes(word.toLowerCase());
}
