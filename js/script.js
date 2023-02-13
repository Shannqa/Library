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
    if (lastBook[value] === "read" || lastBook[value] === "unread") {
      const labelToggle = document.createElement("label");
      labelToggle.setAttribute("class", "label-toggle");
      const inputToggle = document.createElement("input");
      inputToggle.setAttribute("type", "checkbox");
      inputToggle.addEventListener("change", function () {
        if (this.checked) {
          // change from unchecked to checked
          lastBook[value] = "read";
        } else {
          lastBook[value] = "unread";
        }
        //text node with read/unread value
        let oldStatus = this.parentNode.nextSibling;
        oldStatus.remove();
        let newTextNode = document.createTextNode(`${lastBook[value]}`);
        td.appendChild(newTextNode);
      });
      const spanToggle = document.createElement("span");
      spanToggle.setAttribute("class", "span-toggle");
      if (lastBook[value] === "read") {
        inputToggle.setAttribute("checked", "checked");
      }
      labelToggle.appendChild(inputToggle);
      labelToggle.appendChild(spanToggle);
      td.appendChild(labelToggle);
      let textNode = document.createTextNode(`${lastBook[value]}`);
      td.appendChild(textNode);
      tr.appendChild(td);
    } else {
      td.textContent = lastBook[value];
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.textContent = "✘";
  btn.setAttribute("id", "remove-button");
  btn.setAttribute("class", `${library.length - 1}`);
  btn.addEventListener("click", function () {
    let removeConfirm = confirm(
      "Are you sure you want to remove the book from your library?"
    );
    if (removeConfirm) {
      let index = this.getAttribute("class");
      let removeRow = document.querySelectorAll(`[class='${index}']`);
      removeRow.forEach((element) => {
        element.remove();
      });
      delete library[index];
    }
  });
  td.appendChild(btn);
  tr.appendChild(td);
  table.appendChild(tr);
}

const submit = document.querySelector("#submit");
submit.addEventListener("click", addBook);
