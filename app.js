let myLibrary = {};
const libraryShelf = document.querySelector("body > div");
const addNewBook = document.querySelector('#add');
const libraryDisplay = document.querySelector('.libraryDisplay');
const userRead = document.querySelector("#userRead")
const submit = document.querySelector("#userSubmit");
const form = document.querySelector(".libraryDisplay .form");

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

Book.prototype.printTitle = function () {
    return this.title
}
Book.prototype.printAuthor = function () {
    return this.author
}
Book.prototype.printPages = function () {
    return this.pages
}
Book.prototype.printRead = function () {
    if (this.read) {
        return "Finished";
    } else {
        return "Not read";
    }
}
Book.prototype.printId = function () {
    return this.id
}
Book.prototype.setId = function (id) {
    this.id = id;
}
Book.prototype.changeRead = function () {
    this.read = !this.read;
}

function createBook(newBook) {
    const parent = document.createElement("div");
    parent.className = newBook.printId();
    const child1 = document.createElement("h3");
    child1.textContent = newBook.printTitle();
    parent.appendChild(child1);

    //<p>by <span class="author">AuthorName</span></p>
    const child2 = document.createElement("p");
    child2.textContent = "By ";
    const grandChild = document.createElement("span");
    grandChild.className = "author";
    grandChild.textContent = newBook.printAuthor();
    child2.appendChild(grandChild);
    parent.appendChild(child2);

    //<p class="details"><span class="bold">Length: </span>288 pages</p>
    const child3 = document.createElement("p");
    child3.textContent = "Pages: ";
    const grandChild2 = document.createElement("span");
    grandChild2.className = "pages";
    grandChild2.textContent = newBook.printPages();
    child3.appendChild(grandChild2);
    parent.appendChild(child3);

    //<p class="details"><span class="bold">Status: </span><span class="done">Done</span></p>
    const child4 = document.createElement("p");
    child4.textContent = "Status: ";
    const grandChild3 = document.createElement("button");
    grandChild3.className = "read";
    grandChild3.textContent = newBook.printRead();

    child4.appendChild(grandChild3);
    parent.appendChild(child4);

    //<button class="bin"><i class="material-symbols-outlined">Delete</i></button>
    const child5 = document.createElement("button");
    child5.className = "bin";
    const binIcon = document.createElement("i");
    binIcon.textContent = "Delete";
    binIcon.className = "material-symbols-outlined";
    child5.appendChild(binIcon)
    parent.appendChild(child5);

    //send book to front of shelf
    const firstBook = document.querySelector(".libraryDisplay > div:nth-of-type(2)");
    libraryDisplay.insertBefore(parent, firstBook);

    // addNewBook read button event listener
    const buttonRead = document.querySelector(".libraryDisplay>div:nth-of-type(2) .read");
    buttonRead.addEventListener('click',
        (e) => {
            // find book id
            let bookId = parseInt(e.composedPath()[2].className);
            // change value in myLib
            myLibrary[bookId].changeRead();
            // find book read status
            e.target.textContent = myLibrary[bookId].printRead();
        });

    // addNewBook remove button event listener    
    const buttonRemove = document.querySelector(".libraryDisplay > div:nth-of-type(2) > button");
    buttonRemove.addEventListener('click',
        (e) => {
            console.log(e);
            removeElement(e);
            removeBook(e);
        });
}

function removeBook(e) {
    // get book id to remove and then remove from myLibrary
    let bookId = parseInt(e.composedPath()[1].className);
    delete myLibrary[bookId];
}

function removeElement(e) {
    // remove button from page
    e.composedPath()[1].remove();
};

function addElement(newBook) {
    // addNewBook book to myLibrary 
    myLibrary[newBook.printId()] = newBook;
    // display book
    createBook(newBook);
}

addNewBook.addEventListener('click', (e) => {
    //show form 
    form.style = 'display:flex';
    addNewBook.style.display = "none";
});

function readUserInput() {
    let userTitle = document.querySelector("#userTitle").value;
    let userAuthor = document.querySelector("#userAuthor").value;
    let userPages = document.querySelector("#userPages").value;
    let userRead = document.querySelector("#userRead").value;

    if (userTitle == "" || userAuthor == "" || userPages == "") {
        // Check form is filled in
        return -1
    }

    if (userRead == "Finished") {
        userRead = true;
    } else if (userRead == "Not read") {
        userRead = false;
    }

    // get new id
    let maxId = 0;
    for (var id in myLibrary) {
        if (id > maxId) {
            maxId = parseInt(id);
        }
    }
    let newID = maxId + 1;

    return new Book(userTitle, userAuthor, userPages, userRead, newID);
}

userRead.addEventListener('click', (e) => {
    // change display value    
    if (userRead.value == "Finished") {
        userRead.value = "Not read";
    } else {
        userRead.value = "Finished";
    }

});

submit.addEventListener('click', (e) => {
    // get user input
    let userBook = readUserInput();
    if (userBook == -1) {
        return
    }
    // addNewBook new book
    addElement(userBook);
    //hide form
    form.style.display = 'none';
    addNewBook.style.display = "block";
});


// Load dummy books

function addBookToLibrary(...books) {
    // Fil myLibrary with some books
    let lastIndex = 0;
    for (const book of books) {
        myLibrary[lastIndex] = book;
        book.setId(lastIndex);
        lastIndex += 1;
    }
}

function displayBooks() {
    for (var id in myLibrary) {
        let book = myLibrary[id];
        createBook(book);
    }
}


const animal = new Book("Animal Farm", "George Orwell", 112, true);
const hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
const gone = new Book("Gone Girl", "Gillian Flynn", 432, true);
const code = new Book("The Code Book", "Simon Singh", 416, false);
const alice = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", 176, false);

addBookToLibrary(animal, hobbit, gone, code, alice);
displayBooks()