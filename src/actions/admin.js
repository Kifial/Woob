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

export const sortByClosestDate = (items) => {
  let arr = [ ...items ];
  return arr.sort((a, b) => {
    let aDate = a.date.split('-');
    let bDate = b.date.split('-');
    if (+aDate[2] > +bDate[2]) return 1;
    if (+aDate[2] < +bDate[2]) return -1;
    if (+aDate[1] > +bDate[1]) return 1;
    if (+aDate[1] < +bDate[1]) return -1;
    if (+aDate[0] > +bDate[0]) return 1;
    if (+aDate[0] < +bDate[0]) return -1;
    return 1;
  });
};

export const sortByFarestDate = (items) => {
  let arr = [ ...items ];
  return arr.sort((a, b) => {
    let aDate = a.date.split('-');
    let bDate = b.date.split('-');
    if (+aDate[2] > +bDate[2]) return -1;
    if (+aDate[2] < +bDate[2]) return 1;
    if (+aDate[1] > +bDate[1]) return -1;
    if (+aDate[1] < +bDate[1]) return 1;
    if (+aDate[0] > +bDate[0]) return -1;
    if (+aDate[0] < +bDate[0]) return 1;
    return -1;
  });
};