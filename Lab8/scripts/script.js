// 8 задание демонстрация работы с объектами
const donate1 = new Donate("Маленькая помощь", 59)
donate1.addDescription("Помогаем едой")
const donate2 = new Donate("Средняя помощь", 159)
donate2.addDescription("Помогаем едой")
donate2.addDescription("Помощь приютам")
const donate3 = new Donate("Большая помощь", 559)
donate3.addDescription("Помогаем едой")
donate3.addDescription("Помощь приютам")
donate3.addDescription("Помощь фондам")
const donates = [donate1, donate2, donate3]

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

  addDonatesToPage(donates)

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

  updateTotal(0)
  document.querySelectorAll(".table__button").forEach(price => {
    price.addEventListener("click", priceClickHandle)
  })

  document.querySelector(".donates__btn").addEventListener("click", buyHandle)
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

/**
 * Добавление донатов на страницу
 * @param donates Донаты в виде массива
 */
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
        priceElem: `<td><p class="table__button"><b>${donate.price}&euro;</b></p></td>`
      }
    }
    return {
      headElem: `<th><h3>${donate.name}</h3></th>`,
      bodyElem: `<td><ul>${descriptionElems.join("")}</ul></td>`,
      priceElem: `<td><p class="table__button"><b>${donate.price}&euro;</b></p></td>`
    }
  })
  donates.forEach(donate => {
    document.querySelector(".table__titles").insertAdjacentHTML("beforeend", donate.headElem)
    document.querySelector(".table__descriptions").insertAdjacentHTML("beforeend", donate.bodyElem)
    document.querySelector(".table__prices").insertAdjacentHTML("beforeend", donate.priceElem)
  })
}

/**
 * Обновление цены в нужном элементе
 * @param newPrice Новая цена
 */
function updateTotal(newPrice){
  document.querySelector(".donates__total").querySelector("span").innerHTML = `${newPrice}&euro;`
}

/**
 * Получение текущей суммы покупки
 * @return {number} Сумма покупки
 */
function getTotal(){
  const totalElem = document.querySelector(".donates__total").querySelector("span")
  return +totalElem.innerText.slice(0, totalElem.innerText.length - 1)
}

/**
 * Получение цены из элемента, приведенной к типу данных number
 * @param elem Элемент из которого получаем цену
 * @return {number} Цена
 */
function getPrice(elem){
  return +elem.innerText.slice(0, elem.innerText.length - 1)
}

/**
 * Перехватчик события нажатия на цену
 * @param e event из pure JS
 */
function priceClickHandle(e){
  let currentDonate
  for(let i = 0; i < donates.length; i++){
    if(donates[i].price === getPrice(e.target)){
      currentDonate = donates[i]
      break
    }
  }
  document.querySelector(".donates__list").insertAdjacentHTML("beforeend", `<li>${currentDonate.name} - ${currentDonate.price}&euro;</li>`)
  updateTotal(getTotal() + currentDonate.price)
  e.currentTarget.classList.toggle("table__button_disable")
  e.currentTarget.removeEventListener("click", priceClickHandle)

  document.querySelector(".donates__list").querySelectorAll("li").forEach(elem => {
    elem.removeEventListener("click", listElemClickHandle)
    elem.addEventListener("click", listElemClickHandle)
  })
}

/**
 * Перехватчик события нажатия на элемент списка (очистка корзины)
 * @param e event из pure JS
 */
function listElemClickHandle(e){
  let currentDonate
  for(let i = 0; i < donates.length; i++){
    if(e.currentTarget.innerText.search(donates[i].name) !== -1){
      currentDonate = donates[i]
      break
    }
  }
  updateTotal(getTotal() - currentDonate.price)
  const elems = document.querySelectorAll(".table__button")
  for(let i = 0; i < elems.length; i++){
    if(elems[i].innerText.search(currentDonate.price) !== -1){
      elems[i].classList.toggle("table__button_disable")
      elems[i].addEventListener("click", priceClickHandle)
      break
    }
  }
  document.querySelector(".donates__list").removeChild(e.currentTarget)
}

/**
 * Перехватчик события нажатия на кнопку оплаты
 * @param e event из pure JS
 */
function buyHandle(e){
  if(getTotal() === 0){
    alert("Вы не выбрали товаров для покупки")
  } else{
    alert("Оплата прошла успешно")
    document.location.reload()
  }
}