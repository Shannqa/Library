const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const unread = document.querySelector("#unread");

const library = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
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
/* TO DO: 
- remove input values after submitting form
- add placeholders to input fields
- add a couple of default books set as unread
- add a log, including the amount of read/unread books and total in the library
- add a footer/created by shannqa info
- change fonts
- change the library logo, possibly include some free images
- add form validation - numbers in the pages field, other fields required
- possibly add the date the book was read?
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
  createTableNew();
  getStats();
}

const table = document.querySelector("tbody");

/* Create a new table */
function createTableNew() {
  removeTable();
  library.forEach((book, index) => {
    const tr = document.createElement("tr");
    for (value in book) {
      const td = document.createElement("td");
      if (value === "status") {
        // Add a toggle for the read/unread status
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
    table.appendChild(tr);
  });
}
/* Remove all child elements from the table, except for the headings */
function removeTable() {
  while (table.lastChild) {
    table.removeChild(table.lastChild);
  }
}

// function createTable() {
//   let lastBook = library[library.length - 1];
//   const tr = document.createElement("tr");
//   tr.setAttribute("class", `${library.length - 1}`);
//   for (let value in lastBook) {
//     const td = document.createElement("td");
//     if (lastBook[value] === "read" || lastBook[value] === "unread") {
//       const labelToggle = document.createElement("label");
//       labelToggle.setAttribute("class", "label-toggle");
//       const inputToggle = document.createElement("input");
//       inputToggle.setAttribute("type", "checkbox");
//       inputToggle.addEventListener("change", changeStatus);
//       const spanToggle = document.createElement("span");
//       spanToggle.setAttribute("class", "span-toggle");
//       if (lastBook[value] === "read") {
//         inputToggle.setAttribute("checked", "checked");
//       }
//       labelToggle.appendChild(inputToggle);
//       labelToggle.appendChild(spanToggle);
//       td.appendChild(labelToggle);
//       let textNode = document.createTextNode(`${lastBook[value]}`);
//       td.appendChild(textNode);
//       tr.appendChild(td);
//     } else {
//       td.textContent = lastBook[value];
//       tr.appendChild(td);
//     }
//     table.appendChild(tr);
//   }
//   const td = document.createElement("td");
//   const btn = document.createElement("button");
//   btn.textContent = "✘";
//   btn.setAttribute("id", "remove-button");
//   btn.setAttribute("class", `${library.length - 1}`);
//   btn.addEventListener("click", function () {
//     let removeConfirm = confirm(
//       "Are you sure you want to remove the book from your library?"
//     );
//     if (removeConfirm) {
//       let index = this.getAttribute("class");
//       let removeRow = document.querySelectorAll(`[class='${index}']`);
//       removeRow.forEach((element) => {
//         element.remove();
//       });
//       delete library[index];
//       getStats();
//     }
//   });
//   td.appendChild(btn);
//   tr.appendChild(td);
//   table.appendChild(tr);
// }

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
