console.log("GLA Library.");

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
  

    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, msg) {
        let message = document.getElementById("message");
        message.innerHTML = `
                    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>Message : </strong>${msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
        `;
        setTimeout(() => {
            message.innerHTML = "";
        }, 5000);
        showBooks();
    }
}
function showBooks() {
    let savedBooks = localStorage.getItem('savedBooks');
    console.log("adding book ...");
    let tableBody = document.getElementById("tableBody");
    if (savedBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(savedBooks);
    }

    let uiString = "";

    bookObj.forEach((book) => {

        uiString += `
        <tr>
        
        <td>${book.name} </td>
        <td>${book.author}</td>
        <td>${book.type} </td>
        </tr>
        `;

    });
    tableBody.innerHTML = uiString;
}
showBooks();
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You submitted the library form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let fiction = document.getElementById("fiction");
    let js = document.getElementById("js");
    let soccer = document.getElementById("soccer");

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (js.checked) {
        type = js.value;
    }
    else if (soccer.checked) {
        type = soccer.value;
    }
    
    
    
    let book = new Book(name, author, type);
    console.log(book);
    let savedBooks = localStorage.getItem("savedBooks");
    if (savedBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(savedBooks);
    }
    bookObj.push(book);
    localStorage.setItem("savedBooks", JSON.stringify(bookObj));
    
    let display = new Display();
    
    if (display.validate(book)) {
        display.clear();
        display.show('success', "Your book has been successfully added.");
    }
    else {
        display.show('danger', "Sorry , You cannot add this book !");
    }
    e.preventDefault();

}
