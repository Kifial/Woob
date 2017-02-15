export const matchesSearchResults = (items, search) => {
  let result = [];
  const regexp = new RegExp(search, 'gi');
  items.forEach((item) => {
    if (item.A.name.match(regexp) || item.B.name.match(regexp)) {
      result.push(item);
    }
  });
  return result;
};