let form = document.getElementById("form");
let taskTitle = document.getElementById("taskTitle");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (taskTitle.value === "") {
    msg.innerHTML = "Task Title cannot be blank";
  } else {
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [];

let acceptData = () => {
  data.push({
    task: taskTitle.value,
    date: dateInput.value,
    text: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  creatPost();
};

let creatPost = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id='${y}'>
    <span class="fw-bold">${x.task}</span>
    <span>${x.date}</span>
    <p>${x.text}</p>
    <span class="options">
      <i data-bs-toggle="modal" data-bs-target="#form" onClick='editPost(this)' class="fa-solid fa-pen-to-square"></i>
  
  <i onClick='deletePost(this); creatPost()' class="fa-solid fa-trash"></i>
    </span>
  </div>
    `);
  });

  resetForm();
};

let resetForm = () => {
  taskTitle.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let deletePost = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editPost = (e) => {
  let selectedPost = e.parentElement.parentElement;
  taskTitle.value = selectedPost.children[0].innerHTML;
  dateInput.value = selectedPost.children[1].innerHTML;
  textarea.value = selectedPost.children[2].innerHTML;

  deletePost(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  creatPost();
})();
