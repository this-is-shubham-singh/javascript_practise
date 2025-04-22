let toDoContainer = document.getElementById("todoList");

async function loadApi(markAllTags) {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await response.json();

  toDoContainer.innerHTML = "";

  for (let index = 0; index < 10; index++) {
    let value = data[index];
    let isChecked = "";
    let isCompleted = "";
    if (value.completed == true || markAllTags) {
      isChecked = "checked";
      isCompleted = "completed";
    }

    let dynamicHtml = `
            <div class="todo-item ${isCompleted}" id="contCheck-${index}">
                <input onChange="handleCheckbox(${index})" id="checkId-${index}" type="checkbox" ${isChecked}/>
                <span>${value.title}</span>
            </div>`;

    toDoContainer.innerHTML += dynamicHtml;
  }
}

const markAll = () => {
  let markAllTags = true;
  loadApi(markAllTags);
};

function handleCheckbox(index) {
  let contCheck = document.getElementById(`contCheck-${index}`);
  contCheck.classList.toggle("completed");
}
