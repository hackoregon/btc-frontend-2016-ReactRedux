export default function capitalize(str) {
  if ((str.charAt(0)) === str.charAt(0).toUpperCase()) return;
  str.replace(/(?:^|\s)\S/g, a => a.toUpperCase());
}

// String.prototype.capitalize = function(lower) {
//     return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) {
//       return a.toUpperCase();
//     });
//   }
