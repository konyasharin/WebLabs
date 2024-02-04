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
}