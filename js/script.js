const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const unread = document.querySelector("#unread");

const library = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}
/* TO DO: 
- add placeholders to input fields
- add a couple of default books set as unread
- add a footer/created by shannqa info
- add form validation - numbers in the pages field, other fields required
- possibly add the date the book was read?
*/

function addBook(event) {
  const form = document.querySelector("#form");

  if (form.checkValidity()) {
    let readState;
    if (read.checked) {
      readState = "read";
    } else {
      readState = "unread";
    }
    let newBook = new Book(title.value, author.value, pages.value, readState);
    library.push(newBook);
    createTableNew();
    getStats();

    form.reset();
  } else {
    return;
  }
  event.preventDefault();
}

const table = document.querySelector("tbody");

/* Create a new table */
function createTableNew() {
  removeTable();
  library.forEach((book, index) => {
    const tr = document.createElement("tr");
    for (value in book) {
      const td = document.createElement("td");
      // Add a toggle for the read/unread status
      if (value === "status") {
        const labelToggle = document.createElement("label");
        const inputToggle = document.createElement("input");
        const spanToggle = document.createElement("span");
        inputToggle.addEventListener("change", changeStatus);
        labelToggle.setAttribute("class", "label-toggle");
        inputToggle.setAttribute("type", "checkbox");
        spanToggle.setAttribute("class", "span-toggle");
        if (book[value] === "read") {
          inputToggle.setAttribute("checked", "checked");
        }
        labelToggle.appendChild(inputToggle);
        labelToggle.appendChild(spanToggle);
        td.appendChild(labelToggle);
      }
      let textNode = document.createTextNode(`${book[value]}`);
      td.appendChild(textNode);
      td.setAttribute("data-index", `${index}`);
      tr.appendChild(td);
    }
    // Add a delete from the library button
    const td = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "✘";
    deleteButton.setAttribute("id", "delete-button");
    deleteButton.setAttribute("data-index", `${index}`);
    deleteButton.addEventListener("click", deleteBook);
    td.appendChild(deleteButton);
    tr.appendChild(td);
    table.appendChild(tr);
  });
}
/* Remove all child elements from the table, except for the headings */
function removeTable() {
  while (table.lastChild) {
    table.removeChild(table.lastChild);
  }
}

/* Change read/unread status */
function changeStatus() {
  let changeTd = this.parentNode.parentNode;
  let changeIndex = changeTd.getAttribute("data-index"); // can use it to delete and pop array
  let currentState = library[changeIndex].status;
  let statusTextField = this.parentNode.nextSibling;

  if (currentState === "read") {
    library[changeIndex].status = "unread";
    statusTextField.textContent = "unread";
    this.removeAttribute("checked");
  }
  if (currentState === "unread") {
    library[changeIndex].status = "read";
    statusTextField.textContent = "read";
    this.setAttribute("checked", "checked");
  }
  getStats();
}

/* Delete a book from the library */
function deleteBook() {
  let removeConfirm = confirm(
    "Are you sure you want to remove the book from your library?"
  );
  if (removeConfirm) {
    let deleteIndex = this.getAttribute("data-index");
    library.splice(deleteIndex, 1);
    createTableNew();
    getStats();
  }
}

/* Submit the book to the library */
const submit = document.querySelector("#submit");
submit.addEventListener("click", addBook);

/* Statistics of the user's library */
function getStats() {
  const statsRead = document.querySelector(".stats-read");
  const statsUnread = document.querySelector(".stats-unread");
  const statsTotal = document.querySelector(".stats-total");
  let numRead = library.filter((book) => book.status === "read");
  let numUnread = library.filter((book) => book.status === "unread");
  statsRead.textContent = numRead.length;
  statsUnread.textContent = numUnread.length;
  statsTotal.textContent = library.length;
}

/* Theme settings */
const themeButton = document.querySelector(".theme");
function setTheme() {
  const root = document.documentElement;
  let newTheme = root.className === "dark" ? "light" : "dark";
  let newSVG =
    themeButton.getAttribute("src") === "img/sun-white.svg"
      ? "img/sun-black.svg"
      : "img/sun-white.svg";
  themeButton.setAttribute("src", `${newSVG}`);
  root.className = newTheme;
}
themeButton.addEventListener("click", setTheme);
