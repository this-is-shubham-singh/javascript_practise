let arr = [];

async function apiCall() {
  let response = await fetch("./data.json");
  let data = await response.json();
  arr = data;
  // console.log(data);
  // console.log(arr);
  loadEmployeeData();
}

apiCall();

let listContainer = document.getElementById("employeeList");
function loadEmployeeData() {
  listContainer.innerHTML = "";

  // console.log(arr);

  arr.map((value, index) => {
    let li = document.createElement("li");
    li.setAttribute("index", `ind-${index}`);
    li.onclick = () => showUser(index);

    let innerData = `<span>${
      value.firstName + " " + value.lastName
    }</span><span class="delete" onClick="deleteUser(${index})">X</span>`;

    li.innerHTML = innerData;

    listContainer.appendChild(li);
  });
}

// displaying user on right side
let userDisplayContainer = document.getElementById("userDisplayContainer");
function showUser(index) {
  let value = arr[index];

  const dob = value.dob.substring(0, 4);
  const d = new Date();
  const currentYear = d.getFullYear();
  const age = currentYear - dob;

  let userHtml = `<div class="heading">Employee Info</div>
                    <div class="employee-info" id="employeeInfo">
                      <img src="${value.imageUrl}" alt="Employee Image">
                      <span>Name: ${
                        value.firstName + " " + value.lastName
                      }</span>
                      <span>Age: ${age}</span>
                      <span>Address: ${value.address}</span>
                      <span>Email: ${value.email}</span>
                      <span>Phone: ${value.contactNumber}</span>
                      <span>DOB: ${value.dob}</span>
                    </div>`;

  userDisplayContainer.innerHTML = userHtml;
}

// deleting user
function deleteUser(index) {
  arr = arr.filter((val, eleIndex) => {
    return index != eleIndex;
  });

  loadEmployeeData();
}

let addEmployeeModal = document.getElementById("addEmployeeModal");
let addEmpButton = document.getElementById("addEmpButton");
addEmpButton.addEventListener("click", addData);

function addData() {
  addEmployeeModal.classList.toggle("inActive");
}

function handleSubmit(e) {
  e.preventDefault();

  let formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    imageUrl: document.getElementById("imageUrl").value,
    email: document.getElementById("email").value,
    contactNumber: document.getElementById("contactNumber").value,
    address: document.getElementById("address").value,
    dob: document.getElementById("dob").value,
  };

  arr.push(formData);

  loadEmployeeData();

  addEmployeeModal.classList.add("inActive");
}
