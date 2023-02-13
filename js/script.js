const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const unread = document.querySelector("#unread");

const library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
/* 
Book.prototype.info = function () {
  return (
    this.title +
    " by " +
    this.author +
    ", " +
    this.pages +
    ", " +
    this.read +
    "."
  );
};
*/
function addBook(event) {
  event.preventDefault();
  let readState;
  if (read.checked) {
    readState = "read";
  } else {
    readState = "unread";
  }
  let newBook = new Book(title.value, author.value, pages.value, readState);
  library.push(newBook);
  createTable();
}

const table = document.querySelector("table");
function createTable() {
  let lastBook = library[library.length - 1];
  const tr = document.createElement("tr");
  tr.setAttribute("class", `${library.length - 1}`);
  for (let value in lastBook) {
    const td = document.createElement("td");
    td.textContent = lastBook[value];
    tr.appendChild(td);
  }
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.textContent = "✘";
  btn.setAttribute("id", "remove-button");
  btn.setAttribute("class", `${library.length - 1}`);
  btn.addEventListener("click", function () {
    let index = this.getAttribute("class");
    let removeRow = document.querySelectorAll(`[class='${index}']`);
    removeRow.forEach((element) => {
      element.remove();
    });
    delete library[index];
  });
  td.appendChild(btn);
  tr.appendChild(td);
  table.appendChild(tr);
}

const submit = document.querySelector("#submit");
submit.addEventListener("click", addBook);

function removeBook() {
  let bookToRemove;
}
