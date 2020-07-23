import _ from "lodash";
import "./style.css";
import checkFile from "./js/input-file-validation";
import ReviewCard from "./js/coment-constructor";


const fileImputForm = document.getElementById("customFile");
fileImputForm.addEventListener("change", checkFile);

const database = firebase.database();

const renderHeading = (amount) => {
  const cardCounter = document.getElementById("card-counter");
  cardCounter.innerHTML = amount;
};

function getIp() {
  return $.getJSON("http://gd.geobytes.com/GetCityDetails?callback=?");
}

function buildCommentData() {
  const firstName = document.getElementById("nameId").value;
  const lastName = document.getElementById("surnameId").value;
  const email = document.getElementById("email-form").value;
  const topic = document.getElementById("topic-form").value;
  const rate = document.querySelector("input[name='rating']:checked").value;
  const message = document.getElementById("message-form").value;

  getIp().then((data) => postComment(firstName, lastName, email, topic, data.geobytesipaddress, rate, message))
    .catch(() => postComment(firstName, lastName, email, topic, "", rate, message));

}

const commentForm = document.getElementById("comment-form");
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  buildCommentData();
  commentForm.reset();
});



async function uniqId() {
  const id = Math.round(new Date().getTime() + (Math.random() * 100));
  const snapshot = await database.ref("/comments/" + id).once("value");
  if (snapshot.val()) {
    return uniqId();
  }
  return id;
}

function postComment(firstname, lastname, email, topic, ip, rate, message) {
  uniqId().then((id) => {
    firebase.database().ref("comments/" + id).set({
      firstname,
      lastname,
      email,
      topic,
      ip,
      rate,
      message
    });
  });
}

// pagination --> 
const root = document.getElementById("root");
const paginationBar = document.getElementById("pagination-bar");

let currentPage = 1;
let rows = 5;

async function renderComments(rowsPerPage, page) {
  root.innerHTML = "";
  page--;

  const snapshot = await database.ref("/comments/").once("value");
  const commentsArr = Object.values(snapshot.val());

  renderHeading(commentsArr.length);

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let paginatedItems = commentsArr.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];
    let comment = new ReviewCard(item);
    comment.createCard();
  }
}

async function SetupPagination(rowsPerPage) {
  paginationBar.innerHTML = "";

  const snapshot = await database.ref("/comments/").once("value");
  const commentsArr = Object.values(snapshot.val());

  let pageCount = Math.ceil(commentsArr.length / rowsPerPage);
  
  for (let i = 1; i < pageCount + 1; i++) {
    let btn = await PaginationButton(i);

    paginationBar.appendChild(btn);
  }
}

async function PaginationButton(page) {
let button = document.createElement("button");
button.innerText = page;

if (currentPage == page) button.classList.add("active");

button.addEventListener("click", () => {
  currentPage = page;
  renderComments(rows, currentPage);

  let currentBtn = document.querySelector(".pagenumbers button.active");
  currentBtn.classList.remove("active");

  button.classList.add("active");
});

return button;
}

window.onload = renderComments(rows, currentPage);
window.onload = SetupPagination(rows);
// <-- pagination






















// function component() {
//   const element = document.createElement("div");

//   element.innerHTML = _.join(["Hello", "webpack"], " ");



//   return element;
// }

// document.body.appendChild(component());