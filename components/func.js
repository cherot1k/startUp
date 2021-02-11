function search(array,val){
  return  array .filter(item => item.toLowerCase().includes(val))
}
function sortByName(array){
    if (array.length < 2) {
      return array
    } else {
      let pivot = array.pop()
      let less = []
      let bigger = []
      array.forEach((elem) => {
        if (elem <= pivot) {
          less.push(elem)
        } else {
          bigger.push(elem)
        }
      })
      return sortByName(less).concat([pivot]).concat(sortByName(bigger))
    }
}
function reverseArr(array){
  let arr = []
  for(let i of array ){
    if(arr.length > 0){
      arr = [i].concat(arr)
    }
    else{
      arr.push(i)
    }
  }
  return arr
}
module.exports = {
   search : search,
   reverseArr : reverseArr,
  sortByName:sortByName
}
