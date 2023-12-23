let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");

// Load existing to-do list data from local storage on page load
window.onload = function () {
  loadToDoData();
};

addToDoButton.addEventListener("click", function () {
  if (inputField.value === "") {
    alert("Please add a task first");
  } else {
    let List_El = document.createElement("p");
    List_El.innerText = inputField.value;
    toDoContainer.classList.add("pointer");
    toDoContainer.appendChild(List_El);
    inputField.value = "";
    saveData();

    List_El.addEventListener("click", function () {
      List_El.style.textDecoration = "line-through";
      saveData(); // Save updated data after marking as completed
    });

    List_El.addEventListener("dblclick", function () {
      toDoContainer.removeChild(List_El);
      saveData(); // Save updated data after removing the task
    });
  }
});

function loadToDoData() {
  let savedData = localStorage.getItem("save");
  if (savedData) {
    let parsedData = JSON.parse(savedData);
    parsedData.forEach(function (taskText) {
      let List_El = document.createElement("p");
      List_El.innerText = taskText;
      toDoContainer.classList.add("pointer");
      toDoContainer.appendChild(List_El);

      List_El.addEventListener("click", function () {
        List_El.style.textDecoration = "line-through";
        saveData();  
      });

      List_El.addEventListener("dblclick", function () {
        toDoContainer.removeChild(List_El);
        saveData();  
      });
    });
  }
}

function saveData() {
  let taskElements = Array.from(toDoContainer.children);
  let taskData = taskElements.map(function (element) {
    return element.innerText;
  });
  localStorage.setItem("save", JSON.stringify(taskData));
}