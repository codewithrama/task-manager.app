"use strict";

let tasksarray = [];
let completetaskarray = [];
let cleartaskarray = [];
let isdone = false;
const addbutton = document.querySelector(".add-bt");
const clearbutton = document.querySelector(".clear-bt");
const input = document.querySelector(".text-input");
const displayArea = document.querySelector(".display-area");
let countBadge = Number(document.querySelector(".counter").textContent);
const emptyNote = document.querySelector(".text-msg");
const darkbtn = document.querySelector(".dark");
let isdarkON = false;

input.addEventListener("input", function () {
  if (input.value.trim() !== "") {
    addbutton.disabled = false; // Enable the button
  } else {
    addbutton.disabled = true; // Disable the button
  }
});

//dark mode

// if no tasks added

if (tasksarray.length === 0) {
  displayArea.classList.add("hidden");
  emptyNote.classList.remove("hidden");
}

const tasklist = function (task) {
  if (task !== "") {
    displayArea.classList.remove("hidden");
    emptyNote.classList.add("hidden");
    // Create task
    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("done");
    const text = document.createElement("p");
    text.classList.add("task-text");
    text.style.textAlign = "left";
    text.textContent = task;
    const deleteIcon = document.createElement("p");
    deleteIcon.classList.add("delete-icon");
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    taskRow.appendChild(checkbox);
    taskRow.appendChild(text);
    taskRow.appendChild(deleteIcon);

    displayArea.appendChild(taskRow);

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        text.classList.add("line-text");
        completetaskarray.push(task);
        const checkindex = tasksarray.indexOf(task);
        if (checkindex !== -1) {
          tasksarray.splice(checkindex, 1);
        }
        updateTaskCount();
      } else {
        text.classList.remove("line-text");
        const completetask = tasksarray.indexOf(task);
        if (completetask !== -1) {
          completetaskarray.splice(completetask, 1);
        }
        tasksarray.push(task);
        updateTaskCount();
        input.value;
      }
    });

    // delete functionality
    deleteIcon.addEventListener("click", function () {
      const index = tasksarray.indexOf(task);
      if (index !== -1) {
        tasksarray.splice(index, 1);
      }

      deleteIcon.closest(".task-row").remove();

      updateTaskCount();
      input.value = "";

      if (tasksarray.length === 0) {
        displayArea.classList.add("hidden");
        emptyNote.classList.remove("hidden");
      }
    });
  }
};

darkbtn.addEventListener("click", function () {
  if (!isdarkON) {
    document.querySelector(".main-class").classList.add("dark-mode");
    darkbtn.style.color = "white";
    document.querySelector("body").style.backgroundColor = "black";
    document.querySelector(".main-class").style.border = "2px solid #b5bfe7 ";
    isdarkON = true;
  } else if (isdarkON) {
    document.querySelector(".main-class").classList.remove("dark-mode");
    darkbtn.style.color = "black";
    document.querySelector("body").style.backgroundColor = "#b5bfe7";
    isdarkON = false;
  }
});

//add button functionality

addbutton.addEventListener("click", function () {
  if (input.value.trim() !== "") {
    let task = document.querySelector(".text-input").value;
    tasksarray.push(task.trim());
    document.querySelector(".text-input").value = "";
    tasklist(task);
    updateTaskCount();
  }
});

//enter key functionality

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && input.value.trim() !== "") {
    let task = document.querySelector(".text-input").value;
    tasksarray.push(task.trim());
    document.querySelector(".text-input").value = "";
    tasklist(task);
    updateTaskCount();
  }
});

function updateTaskCount() {
  document.querySelector(".counter").textContent = tasksarray.length;
}

//clear completed tasks

// When user clicks clear button:
clearbutton.addEventListener("click", function () {
  for (let completedtask of document.querySelectorAll(".task-row")) {
    if (completetaskarray.includes(completedtask.textContent)) {
      completedtask.remove();
    }
  }

  updateTaskCount();
  completetaskarray = []; // ✅ Clear after loop finishes
});

// Value length

input.addEventListener("input", function () {
  if (input.value.length > 40) {
    input.value = input.value.slice(0, 40); // cut to max limit
  }
  document.querySelector(".text-counter").textContent = input.value.length;
});
