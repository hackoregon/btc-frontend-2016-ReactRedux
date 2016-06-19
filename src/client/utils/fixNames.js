export default function fixNames(str){
  return str.replace(/Mc(.)/g, function(a, b) {
    return 'Mc' + b.toUpperCase();
  });
}
