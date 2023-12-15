
import Enum from "@/enum";
import { v4 as uuidv4 } from 'uuid';
import { escapeRegex } from "./escapeRegex";

const getTagData = (results, type, resultSource) => {
  let strStart = 0;
  const tagData = [];

  for (let matchData of results) {
    const matchLength = matchData[0].length;
    const endAnchor = matchData.index + matchLength;

    const chunk = resultSource.substring(strStart, matchData.index + matchLength);
    const before = chunk.substring(0, chunk.length - matchLength);
    const now = chunk.substring(chunk.length - matchLength);

    if (before) {
      tagData.push({
        matched: false,
        type: Enum.SearchMatchType.Normal,
        source: before,
        key: uuidv4(),
      })
    }

    tagData.push({
      matched: true,
      type,
      source: now,
      key: uuidv4(),
    });

    strStart = endAnchor;
  }

  if (strStart > 0 && strStart < resultSource.length) {
    tagData.push({
      matched: false,
      type: Enum.SearchMatchType.Normal,
      source: resultSource.substring(strStart, resultSource.length),
      key: uuidv4(),
    })
  }

  return tagData;
}

<<<<<<< HEAD
export const filterSearchResults = (searchResults, searchInput) => {
  const results = [];

  for (let key in searchResults) {
    const result = searchResults[key];

    const resultData = {
      // priority: 3, 
=======
export const filterSearchResults = (searchResults, searchInput, searchResultType) => {
  const results = [];
  const searchInputBase = searchInput.toLowerCase();

  for (let key in searchResults) {
    const result = searchResults[key];
    const resultBase = result.toLowerCase();

    const resultData = {
      // priority: 3, 
      type: searchResultType,
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
      source: result, 
      tags: [] 
    };

    // If search input matches the result string from the beginning
<<<<<<< HEAD
    if (result.substring(0, searchInput.length) === searchInput) {
=======
    if (result.substring(0, searchInput.length).toLowerCase() === searchInputBase) {
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
      resultData.tags = [
        { 
          matched: true, 
          type: Enum.SearchMatchType.FirstMatch, 
<<<<<<< HEAD
          source: searchInput,
=======
          source: result.substring(0, searchInput.length),
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
          key: "0",
        },
        { 
          matched: false, 
          type: Enum.SearchMatchType.Normal, 
          source: result.substring(searchInput.length),
          key: "1",
        }
      ];

      resultData.priority = 3;
      results.push(resultData);

      continue;
    }

    // If the search input is a word/phrase (or several) in the result string
    resultData.tags = getTagData(
<<<<<<< HEAD
      result.matchAll(new RegExp(`\\b${escapeRegex(searchInput)}\\b`, 'g')),
=======
      resultBase.matchAll(new RegExp(`\\b${escapeRegex(searchInputBase)}\\b`, 'g')),
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
      Enum.SearchMatchType.WordMatch,
      result
    );

    if (resultData.tags.length > 0) {
      resultData.priority = 2;
      results.push(resultData);

      continue;
    }

    // If the result string matches ANY occurrence of the search input
    resultData.tags = getTagData(
<<<<<<< HEAD
      result.matchAll(new RegExp(escapeRegex(searchInput), 'g')),
=======
      resultBase.matchAll(new RegExp(escapeRegex(searchInputBase), 'g')),
>>>>>>> 20c3251fd1644a17fc2e585067deac6b449c8c28
      Enum.SearchMatchType.AnyMatch,
      result
    );

    if (resultData.tags.length > 0) {
      resultData.priority = 1;
      results.push(resultData);

      continue;
    }
  }

  return results;

}