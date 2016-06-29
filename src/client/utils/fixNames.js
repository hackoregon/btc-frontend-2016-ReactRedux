export default function fixNames(str){
  return str.replace(/Mc(.)/g, (a, b) => {
    return 'Mc' + b.toUpperCase();
  });
}
