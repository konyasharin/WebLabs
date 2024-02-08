let formState = {
  email: "",
  tel: "+7-",
  name: ""
}

const emails = ['gmail.com', 'mail.ru', 'yandex.ru']

document.addEventListener("DOMContentLoaded", () => {
  setState(formState)
  document.querySelectorAll(".form__input").forEach(input => {
    input.addEventListener("input", onChangeHandle)
    setInputDisabled(input.name, true)
  })
  setInputDisabled("submit", true, ".form__submit")
  setInputDisabled("email", false)

  document.querySelector(".form__submit").addEventListener("click", onClickSubmit)
})

function setState(newState){
  formState = newState
  document.querySelectorAll(".form__input").forEach(input => {
    input.value = formState[input.name]
  })

  setInputDisabled("tel", !(formState.email.search("@") !== -1 &&
    emails.includes(formState.email.slice(formState.email.search('@') + 1, formState.email.length)) &&
    formState.email.slice(0, formState.email.search('@')).length >= 1))

  setInputDisabled("name", !(formState.tel.length === 13 && !getInputDisabled("tel")))

  setInputDisabled("submit", !(getInputDisabled("tel") === false &&
    getInputDisabled("name") === false && formState.name.length >= 3), ".form__submit")
}

function setInputDisabled(inputName, isDisabled, inputSelector = ".form__input"){
  document.querySelectorAll(inputSelector).forEach(input => {
    if(input.name === inputName){
      input.disabled = isDisabled
    }
  })
}

function getInputDisabled(inputName){
  let isDisabled
  document.querySelectorAll(".form__input").forEach(input => {
    if(input.name === inputName){
      isDisabled = input.disabled
    }
  })
  return isDisabled
}

function onChangeHandle(e){
  const newState = {...formState} // если просто приравнять то будет ссылка на один и тот же сегмент в памяти
  newState[e.currentTarget.name] = e.currentTarget.value
  if(newState.tel.length <= 3){
    newState.tel = "+7-"
  }
  if(newState.tel.slice(0, 3) !== "+7-"){
    newState.tel = formState.tel
  }
  setState(newState)
}

function onClickSubmit(e){
  e.preventDefault()
  for(let i = 3; i < formState.tel.length; i++){
    if(!"123456789".includes(formState.tel[i])){
      alert("Номер телефона должен содержать только цифры!")
      return
    }
  }
  console.log(formState)
  const newState = {...formState}
  newState.tel = "+7-"
  newState.email = ""
  newState.name = ""
  setState(newState)
  alert("Форма отправлена успешно!")
}