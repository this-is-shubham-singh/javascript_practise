let employeecontainer = document.getElementById("employeeList");
let loading = document.getElementById("loading");
let searchInput = document.getElementById("searchInput");
let pagination_cont = document.getElementById("pagination-cont");
let totalData = 8;
let currentPageIndex = 1;

let url = "https://dummyjson.com/users";
let url2 = "https://dummyjson.com/users?limit=10";

let arr = [];

// api calling function
const apiCall = async () => {
  let response = await fetch(url);
  let data = await response.json();

  arr = data.users;
  let n = arr.length;
  loadUsers(arr);
  loadPagination(n);
};

apiCall();

// load user data function
function loadUsers(arr, startIndex = 0, endIndex = 8) {
  // console.log("inside, loadusers", startIndex, endIndex);
  employeecontainer.innerHTML = "";

  for (let i = startIndex; i < endIndex; i++) {
    let value = arr[i];

    if (!value) {
      return;
    }
    let div = document.createElement("div");
    div.classList = "employee-card";

    let divContent = ` <img src="${value.image}" alt="John Doe">
                       <h3>${value.firstName + " " + value.lastName}</h3>
                       <p>${value.email}</p>`;

    div.innerHTML = divContent;

    employeecontainer.appendChild(div);
  }
}

searchInput.addEventListener("input", () => {
  let searchedValue = searchInput.value;

  if (searchedValue == "") {
    apiCall();
  } else {
    let newData = arr?.filter((val) => val.firstName.startsWith(searchedValue));
    loadUsers(newData);
    console.log(newData);
  }
});

function loadPagination(n) {
  // console.log(n);

  let pages = Math.ceil(n / totalData);
  // console.log(pages);

  pagination_cont.innerHTML = "";

  let div = document.createElement("div");
  div.classList = "pagination";

  let childHtml = ``;
  console.log(">1", currentPageIndex);
  if (currentPageIndex > 1) {
    childHtml = `<button class="page-btn" onClick="prev_btn(${n})">Prev</button>`;
  }

  for (let i = 1; i <= pages; i++) {
    childHtml += `<button class="page-btn" onClick="handlePagination(${i} , ${n})">${i}</button>`;
  }

  if (currentPageIndex < pages) {
    childHtml += `<button class="page-btn" onClick="next_btn(${n})">next</button>`;
  }

  div.innerHTML = childHtml;
  pagination_cont.appendChild(div);
}

function next_btn(n) {
  console.log(currentPageIndex);

  currentPageIndex += 1;

  let start_index = (currentPageIndex - 1) * totalData;
  let end_index = start_index + totalData;

  loadUsers(arr, start_index, end_index);
  loadPagination(n);
}

function prev_btn(n) {
  currentPageIndex -= 1;

  let start_index = (currentPageIndex - 1) * totalData;
  let end_index = start_index + totalData;

  loadUsers(arr, start_index, end_index);
  loadPagination(n);
}

function handlePagination(index, n) {
  console.log(index);
  console.log("n", n);

  let startIndex = (index - 1) * totalData;
  let endIndex = startIndex + totalData;
  // console.log(startIndex, endIndex);

  currentPageIndex = index;

  loadUsers(arr, startIndex, endIndex);
  loadPagination(n);
}
