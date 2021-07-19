import slugify from "slugify";

export default function (input) {
  return slugify(input, { replacement: "_", lower: true });
}
