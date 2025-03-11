import { kebabCase, sentenceCase } from "change-case";

export function toKebabCase(input: string) {
  return kebabCase(input);
}

export function toSentenceCase(input: string) {
  return sentenceCase(input);
}
