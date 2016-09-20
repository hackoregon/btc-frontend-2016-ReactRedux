//NOTE: tests donor names for (filerId) and returns it if it exists - usecase = PACs
export default function filterNamesForLinks(link) {
  const pattern = /\((\d+)\)/;
  if (link.indexOf('recipients/') === -1 && pattern.test(link)) {
    return '/recipients/' + link.match(pattern)[1];
  }
  return link;
}
