document.addEventListener("DOMContentLoaded", () => {
  init()
})

function init(){
  const imgs = document.querySelector(".donates").querySelectorAll("img")
  imgs.forEach(img => {
    if(img.classList.contains("col-2")){
      img.height = img.width
    }
  })
  // Используем функции для 6 задания
  console.log(sumArr([10, -3, 23, 1, 1.3]))
  console.log(minArr([10, -3, 23, 1, 1.3]))
  console.log(searchSecondBigNumber([10, -3, 23, 1, 1.3]))
}

// Функции для 6 задания
// 1)
function sumArr(arrayOfNums){
  let sum = 0
  arrayOfNums.forEach(num => {
    sum += num
  })
  return sum
}

// 2)
function minArr(arrayOfNums){
  let min = 0
  arrayOfNums.forEach((num, i) => {
    min = i === 0 ? num : Math.min(num, min)
  })
  return min
}

// 3)
function searchSecondBigNumber(arrayOfNums){
  return arrayOfNums.sort()[arrayOfNums.length - 2]
}