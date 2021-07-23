export default function query_builder(data, append) {
  const params = {};
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== "") {
      params[key] = data[key];
    }
  });
  let query = new URLSearchParams(params).toString();
  if (append) {
    query = `${query}&${append}`;
  }
  return query;
}
