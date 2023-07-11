"use strict";

let btns = document.querySelectorAll('.eisenhower-matrix__btn')

btns.forEach((btn) => {
  btn.addEventListener("click", hideAndOpen);
})

function hideAndOpen(e) {
  e.preventDefault();
  let header = e.target.closest('.eisenhower-matrix__header');
  header.classList.toggle("hidden")
  if (header.classList.contains("hidden")) {
    e.target.closest('.eisenhower-matrix__btn').style.transform = "rotate(180deg)"
  } else {
    e.target.closest('.eisenhower-matrix__btn').style.transform = "rotate(0deg)"
  }
  
}

let modal = document.querySelector("#add-window");

let modal_content = document.querySelector(".modal__content");

let add_btn = document.querySelector(".add");

let close_btn = document.querySelector(".modal__close");

add_btn.addEventListener("click", function() {
  modal.style.display = "block";

  let task_examples = ['написать статью для блога', 
                       'договориться о встрече с клиентом', 
                       'навести порядок на рабочем столе', 
                       'позвонить другу', 
                       'сделать уборку в квартире', 
                       'оплатить счета за коммунальные услуги', 
                       'выгулять собаку', 
                       'проверить почту',
                       'сходить на прогулку',
                       'сделать фотографии',
                       'посмотреть фильм',
                       'разобрать накопившиеся бумаги',
                       'проветрить помещение', 
                       'помыть посуду',
                       'вынести мусор',
                       'приготовить обед',
                       'сходить в магазин']

  let input = document.querySelector(".form__input")
  
  input.setAttribute('placeholder', `Например, ${task_examples[Math.floor(Math.random() * (task_examples.length - 1))]}`)
})

close_btn.addEventListener("click", function() {
  modal.style.display = "none";
  document.querySelector('.form').reset()
})

modal.addEventListener("click", function() {
  modal.style.display = "none";
  document.querySelector('.form').reset()
})

modal_content.addEventListener("click", function(e) {
  e.stopPropagation();
})

document.addEventListener("keyup", function(e) {
  if (e.key == 'Escape') {
    modal.style.display = "none";
    document.querySelector('.form').reset()
  }
})

if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify({'urgent-important' : [], 'not-urgent-important' : [], 'urgent-not-important' : [], 'not-urgent-not-important' : []}))
}

let create_btn = document.querySelector(".form__submit")

create_btn.addEventListener("click", function() {
  let task = document.querySelector(".form__input").value,
      isUrgent = document.querySelector(".form__radiobutton[name='urgent']:checked").value,
      isImportant = document.querySelector(".form__radiobutton[name='important']:checked").value;

  let tasks = JSON.parse(localStorage.getItem("tasks"))

  let popup = document.querySelector(".popup__text")
  let condition = `${isUrgent}-${isImportant}`

  if (tasks[condition].includes(task)) {
    popup.classList.add("show")
    setTimeout(hidePopup, 3000)
  } else {
    tasks[condition].push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    modal.style.display = "none"
    document.querySelector('.form').reset()    
  }
  showTasks()

})

showTasks()

function hidePopup () {
  let popup = document.querySelector(".popup__text")
  popup.classList.remove("show")
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"))

  let task_lists = document.querySelectorAll('.eisenhower-matrix__list')

  task_lists.forEach((task_list) => {
    task_list.innerHTML = ''
  })

  for (let tasks_keys of Object.keys(tasks)) {
    for (let i = 0; i < tasks[tasks_keys].length; i++) {
      document.querySelector(`.${tasks_keys} .eisenhower-matrix__list`).insertAdjacentHTML("beforeend", 
      `<li class="eisenhower-matrix__list-item">${tasks[tasks_keys][i]}
        <span class="remove" data-delete="${tasks[tasks_keys][i]}">X</span>
      </li>`)
    }
  }
}

document.querySelectorAll(".eisenhower-matrix__list").forEach((list) => {
  list.addEventListener("click", function(e) {
    if (!e.target.classList.contains('remove')) {return}

    let tasks = JSON.parse(localStorage.getItem("tasks"))
    
    if (e.target.closest(".eisenhower-matrix__cell").classList.contains("urgent-important")) {

      for (let i = 0; i < tasks['urgent-important'].length; i++) {
        if (e.target.dataset.delete == tasks['urgent-important'][i]) {
          tasks['urgent-important'].splice(i, 1)
          localStorage.setItem("tasks", JSON.stringify(tasks))
          showTasks()
        }
      }
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("not-urgent-important")) {

        for (let i = 0; i < tasks['not-urgent-important'].length; i++) {
          if (e.target.dataset.delete == tasks['not-urgent-important'][i]) {
            tasks['not-urgent-important'].splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks()
          }
        }      
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("urgent-not-important")) {

        for (let i = 0; i < tasks['urgent-not-important'].length; i++) {
          if (e.target.dataset.delete == tasks['urgent-not-important'][i]) {
            tasks['urgent-not-important'].splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks()
          }
        }      
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("not-urgent-not-important")) {

        for (let i = 0; i < tasks['not-urgent-not-important'].length; i++) {
          if (e.target.dataset.delete == tasks['not-urgent-not-important'][i]) {
            tasks['not-urgent-not-important'].splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks()
          }
        }      
    } 
  })
})

let howToUse_btn = document.querySelector(".modal__show-tips")

howToUse_btn.addEventListener("click", function() {
  document.querySelector(".modal__flex-right").classList.toggle("show")
  this.classList.toggle("active")
})