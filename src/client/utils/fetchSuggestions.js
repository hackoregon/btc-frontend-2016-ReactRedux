import axios from 'axios';

String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}

function getCompetitorFromName(searchTerm) {
  const searchFor = searchTerm.capitalize();
  return axios.get(`http://54.213.83.132/hackoregon/http/competitors_from_name/${searchFor}/`);
}

function getCandidate(searchTerm) {
  return axios.get(`http://54.213.83.132/hackoregon/http/candidate_search/${searchTerm}/`);
}

// using 2 end points to give more search suggestions
export default function fetchSuggestions(searchTerm) {
  if(searchTerm && searchTerm.length > 0){
  return axios.all([getCompetitorFromName(searchTerm), getCandidate(searchTerm)])
    .then((arr) => ({
        candidate_names: arr[0].data,
        related: arr[1].data
    }))}
}
