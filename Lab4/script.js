// Обработчик для 7 задания первый
document.addEventListener("DOMContentLoaded", (e) => {
  init()
  console.log(e)
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
  outputInitInfo()
  // Обработчик для 7 задания второй
  document.onclick = ((e) => {
    console.log(e)
  })

  const tableImg = document.querySelector("#table-img")
  tableImg.addEventListener("click", () => {
    if(tableImg.src.search("dogWithGlasses.png") !== -1){
      tableImg.src = tableImg.src.replace("dogWithGlasses.png", "hippopotamus.png")
    } else if(tableImg.src.search("hippopotamus.png") !== -1){
      tableImg.src = tableImg.src.replace("hippopotamus.png", "dogWithGlasses.png")
    }
  })

  // Модификация Array для 8 задания
  Array.prototype.calcAverage = function(){
    let sum = 0
    for(let i = 0; i < this.length; i++){
      sum += this[i]
    }
    return sum / this.length
  }
  const t = [1, 2, 3]
  console.log(t.calcAverage())

  const donates = [new Donate("Маленькая помощь", 59), new Donate("Большая помощь", 159)]
  document.querySelector("thead").querySelectorAll("th").forEach((elem, i) => {
    elem.innerHTML = `<h3>${donates[i].name}</h3>`
  })
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

// 7 задание
function outputInitInfo(){
  document.querySelectorAll("img").forEach((img, i) => {
    console.log(`Информация об изображении №${i + 1}:`)
    console.log({
      height: img.height,
      width: img.width,
      src: img.src,
      alt: img.alt
    })
  })
  document.querySelectorAll("a").forEach((link, i) => {
    console.log(`Информация о ссылке №${i + 1}:`)
    console.log({
      href: link.href,
      text: link.text
    })
  })
}

function Donate(name, price){
  this.name = name
  this.price = price
  this.descriptions = []
  this.addDescription = function(description){
    this.descriptions.push(description)
  }
}

