// Обработчик для 7 задания первый
document.addEventListener("DOMContentLoaded", (e) => {
  init()
  console.log(e)
})

function init(){
  const imgs = document.querySelector(".donates").querySelectorAll("img")
  imgs.forEach(img => {
    if(img.classList.contains("col-2")){
      img.height = +img.width
    }
  })

  // 8 задание демонстрация работы с объектами
  const donate1 = new Donate("Маленькая помощь", 59)
  donate1.addDescription("Помогаем едой")
  const donate2 = new Donate("Большая помощь", 159)
  donate2.addDescription("Помогаем едой")
  donate2.addDescription("Помощь приютам")
  addDonatesToPage([donate1, donate2])

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

function addDonatesToPage(donates){
  donates = donates.map((donate, i) => {
    let descriptionElems = []
    donate.descriptions.forEach(description => {
      descriptionElems.push(`<li>${description}</li>`)
    })
    if(i === 0){
      return {
        headElem: `<th><h3>${donate.name}</h3><img src="img/dogWithGlasses.png" alt="dogWithGlasses" id="table-img"></th>`,
        bodyElem: `<td><ul>${descriptionElems.join("")}</ul></td>`,
        priceElem: `<td><p><b>${donate.price}&euro;</b></p></td>`
      }
    }
    return {
      headElem: `<th><h3>${donate.name}</h3></th>`,
      bodyElem: `<td><ul>${descriptionElems.join("")}</ul></td>`,
      priceElem: `<td><p><b>${donate.price}&euro;</b></p></td>`
    }
  })
  let headElems = ""
  let bodyElems = ""
  let priceElems = ""
  donates.forEach(donate => {
    headElems += donate.headElem
    bodyElems += donate.bodyElem
    priceElems += donate.priceElem
  })
  document.querySelector(".table__titles").innerHTML = headElems
  document.querySelector(".table__descriptions").innerHTML = bodyElems
  document.querySelector(".table__prices").innerHTML = priceElems
}