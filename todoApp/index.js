let input = document.getElementById("taskInput");
let taskContainer = document.getElementById("taskList");

let arr = [];

const addTask = () => {
  if (input.value) {
    arr.push(input.value);
    input.value = "";
    showValue();
  }
};

function showValue() {
  console.log("new value from here");
  taskContainer.innerHTML = "";
  arr.forEach((value, index) => {
    let listItem = document.createElement("li");
    listItem.classList.add("task-container");

    listItem.innerHTML = ` 
            <div class="task-text">${value}</div>
            <button class="delete-btn" onClick="deleteVal(${index})">Delete</button>
        `;

    taskContainer.appendChild(listItem);
  });
}

function deleteVal(dltIndex) {
  arr = arr.filter((value, index) => {
    return index != dltIndex;
  });
  showValue();
}
