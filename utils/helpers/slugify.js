import { default as Slugify } from "slugify";

export default function slugify(input) {
  return Slugify(input, { replacement: "_", lower: true });
}
