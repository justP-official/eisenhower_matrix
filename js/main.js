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
})

close_btn.addEventListener("click", function() {
  modal.style.display = "none";
})

modal.addEventListener("click", function() {
  modal.style.display = "none";
})

modal_content.addEventListener("click", function(e) {
  e.stopPropagation();
})

document.addEventListener("keyup", function(e) {
  if (e.key == 'Escape') {
    modal.style.display = "none";
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

  if (isUrgent == 'yes' && isImportant == 'yes') {
    if (!tasks['urgent-important'].includes(task)) {
      tasks['urgent-important'].push(task)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      modal.style.display = "none"
    } else {
      popup.classList.toggle("show")
      setTimeout(hidePopup, 5000)
    }
  } else if (isUrgent == 'no' && isImportant == 'yes') {
    if (!tasks['not-urgent-important'].includes(task)) {
      tasks['not-urgent-important'].push(task)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      modal.style.display = "none"
    } else {
      popup.classList.toggle("show")
      setTimeout(hidePopup, 5000)
    }
  } else if (isUrgent == 'yes' && isImportant == 'no') {
    if (!tasks['urgent-not-important'].includes(task)) {
      tasks['urgent-not-important'].push(task)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      modal.style.display = "none" 
    } else {
      popup.classList.toggle("show")
      setTimeout(hidePopup, 5000)
    }
   
  } else if (isUrgent == 'no' && isImportant == 'no') {
    if (!tasks['not-urgent-not-important'].includes(task)) {
      tasks['not-urgent-not-important'].push(task)
      localStorage.setItem("tasks", JSON.stringify(tasks))
      modal.style.display = "none"        
    } else {
      popup.classList.toggle("show")
      setTimeout(hidePopup, 5000)
    }
  }

  showTasks()

  document.querySelector('.form').reset()
})

showTasks()

function hidePopup () {
  let popup = document.querySelector(".popup__text")
  popup.classList.remove("show")
}

function showTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks"))

  let urgentAndImportantList = document.querySelector('.urgent-and-important .eisenhower-matrix__body .eisenhower-matrix__list'),
      notUrgentAndImportantList = document.querySelector('.not-urgent-and-important .eisenhower-matrix__body .eisenhower-matrix__list'),
      urgentAndNotImportantList = document.querySelector('.urgent-and-not-important .eisenhower-matrix__body .eisenhower-matrix__list'),
      notUrgentAndNotImportantList = document.querySelector('.not-urgent-and-not-important .eisenhower-matrix__body .eisenhower-matrix__list')

  urgentAndImportantList.innerHTML = ''
  notUrgentAndImportantList.innerHTML = ''
  urgentAndNotImportantList.innerHTML = ''
  notUrgentAndNotImportantList.innerHTML = ''

  for (let i = 0; i < tasks['urgent-important'].length; i++) {
    urgentAndImportantList.insertAdjacentHTML("beforeend", `<li class="eisenhower-matrix__list-item">${tasks['urgent-important'][i]} <span class="remove" data-delete="${tasks['urgent-important'][i]}">X</span></li>`)
  }
  
  for (let i = 0; i < tasks['not-urgent-important'].length; i++) {
    notUrgentAndImportantList.insertAdjacentHTML("beforeend", `<li class="eisenhower-matrix__list-item">${tasks['not-urgent-important'][i]} <span class="remove" data-delete="${tasks['not-urgent-important'][i]}">X</span></li>`)
  }

  for (let i = 0; i < tasks['urgent-not-important'].length; i++) {
    urgentAndNotImportantList.insertAdjacentHTML("beforeend", `<li class="eisenhower-matrix__list-item">${tasks['urgent-not-important'][i]} <span class="remove" data-delete="${tasks['urgent-not-important'][i]}">X</span></li>`)
  }
  
  for (let i = 0; i < tasks['not-urgent-not-important'].length; i++) {
    notUrgentAndNotImportantList.insertAdjacentHTML("beforeend", `<li class="eisenhower-matrix__list-item">${tasks['not-urgent-not-important'][i]} <span class="remove" data-delete="${tasks['not-urgent-not-important'][i]}">X</span></li>`)
  }
}

document.querySelectorAll(".eisenhower-matrix__list").forEach((list) => {
  list.addEventListener("click", function(e) {
    if (!e.target.classList.contains('remove')) {return}

    let tasks = JSON.parse(localStorage.getItem("tasks"))
    
    if (e.target.closest(".eisenhower-matrix__cell").classList.contains("urgent-and-important")) {

      for (let i = 0; i < tasks['urgent-important'].length; i++) {
        if (e.target.dataset.delete == tasks['urgent-important'][i]) {
          tasks['urgent-important'].splice(i, 1)
          localStorage.setItem("tasks", JSON.stringify(tasks))
          showTasks()
        }
      }
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("not-urgent-and-important")) {

        for (let i = 0; i < tasks['not-urgent-important'].length; i++) {
          if (e.target.dataset.delete == tasks['not-urgent-important'][i]) {
            tasks['not-urgent-important'].splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks()
          }
        }      
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("urgent-and-not-important")) {

        for (let i = 0; i < tasks['urgent-not-important'].length; i++) {
          if (e.target.dataset.delete == tasks['urgent-not-important'][i]) {
            tasks['urgent-not-important'].splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks()
          }
        }      
    } else if (e.target.closest(".eisenhower-matrix__cell").classList.contains("not-urgent-and-not-important")) {

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
