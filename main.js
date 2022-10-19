let input = document.querySelector("input");
let toDoAll = document.getElementsByClassName("toDoWrap")[0];
let toDos = JSON.parse(localStorage.getItem("toDos")) || [];

const showToDo = () => {
  if (toDos.length) {
    for (let i = 0; i < toDos.length; i++) {
      let div = document.createElement("div");
      div.setAttribute("class", "todo");
      div.id = toDos[i].id;
      console.log(toDos[i].completed);
      div.innerHTML = `
    <h4 style="${toDos[i].completed ? "text-decoration: line-through" : ""}">
        ${toDos[i].title}
    </h4>
    <div class="amal">
        <button class="edit" onclick="editToDo(${toDos[i].id})">EDIT</button>
        <button class="complete" onclick="completeToDo(${toDos[i].id})">${
        toDos[i].completed ? "UNCOMPLETE" : "COMPLETE"
      }</button>
        <button class="delete" onclick="deleteToDo(${
          toDos[i].id
        })">DELETE</button>
        <h5 class="added">Inserted: ${toDos[i].date}</h5>
    </div>
  `;

      toDoAll.append(div);
    }

    document.querySelector(".empty").style.display = "none";
    document.querySelector(".btn-delete").style.display = "inline-block";
  }
};

showToDo();

if (toDos.length >= 2) {
  document.querySelector(".todosAllScroll").style.height = "30vh";
  document.querySelector(".todosAllScroll").style.overflowY = "scroll";
}
const addToDo = () => {
  if (input.value.trim().length >= 3 && input.value.trim().length <= 64) {
    const titleRaven = () => {
      for (let i = 0; i < toDos.length; i++) {
        if (input.value.trim() == toDos[i].title) {
          alert("Bu so'z oldin kiritilgan!");
          break;
        }
      }
    };
    titleRaven();
    let div = document.createElement("div");
    div.setAttribute("class", "todo");
    let date = new Date().getDate(),
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
      hour = new Date().getHours(),
      minute = new Date().getMinutes();

    const toDo = {
      id: toDos.length,
      title: input.value,
      completed: false,
      date: `${date}.${
        month < 10 ? "0" + month : month
      }.${year} ${hour}:${minute}`,
    };
    toDos.push(toDo);
    localStorage.setItem("toDos", JSON.stringify(toDos));
    div.id = toDo.id;

    div.innerHTML = `
    <h4>
        ${input.value}
    </h4>
    <div class="amal">
        <button class="edit" onclick="editToDo(${toDo.id})">EDIT</button>
        <button class="complete" onclick="completeToDo(${
          toDo.id
        })">COMPLETE</button>
        <button class="delete" onclick="deleteToDo(${toDo.id})">DELETE</button>
        <h5 class="added">Inserted: ${date}.${
      month < 10 ? "0" + month : month
    }.${year} ${hour}:${minute}</h5>
    </div>
  `;

    toDoAll.append(div);
    document.querySelector(".empty").style.display = "none";
    document.querySelector(".btn-delete").style.display = "inline-block";
    input.value = "";
    document.querySelector(".todosAllScroll").style.height = "30vh";
    document.querySelector(".todosAllScroll").style.overflowY = "scroll";
  } else {
    if (input.value.trim().length < 3) {
      alert("Iltimos 3tadan ko'proq so'z kiriting");
    } else {
      alert("Iltimos qisqaroq so'z kiriting");
    }
  }
};

const completeToDo = (id) => {
  for (let i = 0; i < toDoAll.children.length; i++) {
    if (id == toDoAll.children[i].id) {
      if (toDos[i].completed) {
        toDoAll.children[i].childNodes[1].style.textDecoration = "none";
        toDoAll.children[i].getElementsByClassName("complete")[0].innerText =
          "COMPLETE";
        toDos[i].completed = false;
      } else {
        toDoAll.children[i].childNodes[1].style.textDecoration = "line-through";
        toDoAll.children[i].getElementsByClassName("complete")[0].innerText =
          "UNCOMPLETE";
        toDos[i].completed = true;
      }
    }
  }
  localStorage.setItem("toDos", JSON.stringify(toDos));
  toDos[id].completed = toDos[id].completed;
};

const deleteToDo = (id) => {
  for (let i = 0; i < toDoAll.children.length; i++) {
    if (id == toDoAll.children[i].id) {
      toDoAll.children[i].remove();
      toDos = toDos.filter((toDo) => toDo.id !== i);
      break;
    }
  }

  localStorage.setItem("toDos", JSON.stringify(toDos));
  if (toDoAll.children.length === 0) {
    document.querySelector(".empty").style.display = "block";
    document.querySelector(".btn-delete").style.display = "none";
    document.querySelector(".todosAllScroll").style.height = "auto";
    document.querySelector(".todosAllScroll").style.overflowY = "auto";
  }
};

const deleteAll = () => {
  toDoAll.innerHTML = null;
  document.querySelector(".empty").style.display = "block";
  document.querySelector(".btn-delete").style.display = "none";
  document.querySelector(".todosAllScroll").style.height = "auto";
  document.querySelector(".todosAllScroll").style.overflowY = "auto";
  localStorage.clear();
};

const editToDo = (id) => {
  console.log(id);
  event.stopPropagation();
  let modal = document.getElementById("edit_modal");
  let save_btn = document.getElementById("edit_save");
  let cancel_btn = document.getElementById("edit_cancel");
  let input = document.getElementById("edit_input"),
    overlay = document.getElementById("overlay");
  input.value = toDos[id].title;

  modal.style.display = "block";
  overlay.style.display = "block";
  save_btn.addEventListener("click", () => {
    if (input.value.trim().length >= 3 && input.value.trim().length <= 64) {
      toDos[id].title = input.value;
      for (let i = 0; i < toDoAll.children.length; i++) {
        if (id == toDoAll.children[i].id) {
          toDoAll.children[i].childNodes[1].innerText = input.value;
          break;
        }
      }
      modal.style.display = "none";
      overlay.style.display = "none";
    } else {
      if (input.value.trim().length < 3) {
        alert("Iltimos 3tadan ko'proq so'z kiriting");
      } else {
        alert("Iltimos qisqaroq so'z kiriting");
      }
    }
  });

  cancel_btn.addEventListener("click", () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  });

  overlay.onclick = () => {
    modal.style.display = "none";
    overlay.style.display = "none";
  };
};
