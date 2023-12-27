
const getWikiUrlFromName = (type, name) => {
  return `https://wiki.wizard101central.com/wiki/${type}:${name.replace(/\s+/g, '_')}`;
}

export default getWikiUrlFromName;