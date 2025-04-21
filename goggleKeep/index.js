let arr = [];
if(localStorage.getItem("arrData")) {
    arr = JSON.parse(localStorage.getItem("arrData"))
    loadCards();
}

// localStorage.clear()

function addCardFunction() {
  let obj = {
    title: "add title",
    tasks: [
      "add tasks 1",
      "add tasks 2",
      "add tasks 3",
      "add tasks 4",
      "add tasks 5",
    ],
  };

  arr.push(obj);
  loadCards();
}

function loadCards() {
  const cardsContainer = document.getElementById("cardsContainer");

  cardsContainer.innerHTML = "";

  arr.map((value, index) => {
    let div = document.createElement("div");
    div.classList = "top_container";

    let dynamicCard = `
            <div class="card" id="tags-${index}">
                <div class="card-title">
                    <h3>${arr[index].title}</h3>
                </div>
                <div class="task-list">
                <div class="task">
                    <span">${arr[index].tasks[0]}</span>
                </div>
                <div class="task">
                    <span">${arr[index].tasks[1]}</span>
                </div>
                <div class="task">
                    <span">${arr[index].tasks[2]}</span>
                </div>
                <div class="task">
                    <span>${arr[index].tasks[3]}</span>
                </div>
                <div class="task">
                    <span>${arr[index].tasks[4]}</span=>
                </div>
                </div>
                <div class="button-container">
                    <button class="edit-btn" onClick="editCard(${index})">Edit</button>
                    <button class="delete-btn" onClick="deleteCard(${index})">Delete</button>
                </div>
            </div>

              <!-- *********** inputs below here ********** --> 

            <div class="card inactive" id="inputs-${index}">
                <div class="card-title"">
                    <input type="text" class="" value="${
                      arr[index].title
                    }" id="title-${index}"/>
                </div>
                <div class="task-list">
                <div class="task">
                    <input type="text" class="" value="${
                      arr[index].tasks[0]
                    }" id="task-${index}-index${0}"/>
                </div>
                <div class="task">
                    <input type="text" class="" value="${
                      arr[index].tasks[1]
                    }" id="task-${index}-index${1}"/>
                </div>
                <div class="task">
                    <input type="text" class="" value="${
                      arr[index].tasks[2]
                    }" id="task-${index}-index${2}"/>
                </div>
                <div class="task">
                    <input type="text" class="" value="${
                      arr[index].tasks[3]
                    }" id="task-${index}-index${3}"/>
                </div>
                <div class="task">
                    <input type="text" class="" value="${
                      arr[index].tasks[4]
                    }" id="task-${index}-index${4}"/>
                </div>
                </div>
                <div class="button-container">
                    <button onClick="handleSave(${index})" class="save-btn">Save</button>
                </div>
            </div>`;

    div.innerHTML = dynamicCard;

    cardsContainer.appendChild(div);
  });

  localStorage.setItem("arrData", JSON.stringify(arr));
}

function deleteCard(index) {
  arr = arr.filter((value, i) => {
    return i != index;
  });

  loadCards();
}

function handleSave(index) {
  let newTitle = document.getElementById(`title-${index}`);
  arr[index].title = newTitle.value;

  for (let i = 0; i < 5; i++) {
    let newTasks = document.getElementById(`task-${index}-index${i}`);
    arr[index].tasks[i] = newTasks.value;
  }

  let iTags = document.getElementById(`tags-${index}`);
  let iInputs = document.getElementById(`inputs-${index}`);

  iTags.classList.toggle("inactive");
  iInputs.classList.toggle("inactive");

  console.log(arr);
  loadCards();
}

function editCard(index) {
  let tags = document.getElementById(`tags-${index}`);
  let inputs = document.getElementById(`inputs-${index}`);

  tags.classList.toggle("inactive");
  inputs.classList.toggle("inactive");

  console.log(arr[index]);
}
