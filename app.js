
let myLibrary = {};

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

    this.printTitle = function () {
        return this.title
    }
    this.printAuthor = function () {
        return this.author
    }
    this.printPages = function () {
        return this.pages
    }
    this.printRead = function () {
        if (this.read) {
            return "Finished";
        } else {
            return "Not read";
        }
    }
    this.printId = function () {
        return this.id
    }
    this.setId = function (id) {
        this.id = id;
    }
    this.changeRead = function () {
        this.read = !this.read;
    }
}


function addBookToLibrary(...books) {
    let lastIndex = 0;
    for (const book of books) {
        myLibrary[lastIndex] = book;
        book.setId(lastIndex);
        lastIndex += 1;
    }

}

const libraryShelf = document.querySelector("body > div");

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

    //<button>bin</button>
    const child5 = document.createElement("button");
    //child5.textContent = "Bin";
    //child5.className = "bin";
    //parent.appendChild(child5);


    child5.className = "bin";
    const binIcon = document.createElement("i");
    binIcon.textContent = "Delete";
    binIcon.className = "material-symbols-outlined";
    child5.appendChild(binIcon)
    parent.appendChild(child5);

    //child5.innerHTML = "<i class=\"material-symbols-outlined\">Delete</i>";



    // send book to shelf
    //libraryShelf.appendChild(parent);

    //send book to front of shelf
    //const firstBook = document.querySelector(".libraryDisplay div:first-of-type");


    const firstBook = document.querySelector(".libraryDisplay > div:nth-of-type(2)");
    libraryDisplay.insertBefore(parent, firstBook);
    


    // READ BUTTON
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



    // REMOVE BUTTON FUNCTIONALITY 
    // remove button and ?? event listener
    //    const buttonRemove = document.querySelector(".libraryDisplay > div:first- > button");
    const buttonRemove = document.querySelector(".libraryDisplay > div:nth-of-type(2) > button");
    buttonRemove.addEventListener('click',
        (e) => {
            console.log(e);
            removeElement(e);
            removeBook(e);
        });


}

function displayBooks() {
    for (var id in myLibrary) {
        let book = myLibrary[id];
        createBook(book);
    }
}


const add = document.querySelector('#add');
const libraryDisplay = document.querySelector('.libraryDisplay');


function removeBook(e) {
    // need to remove book from myLibrary 
    // get book id to remove
    let bookId = parseInt(e.composedPath()[1].className);
    delete myLibrary[bookId];
}


// event listeners 
function removeElement(e) {
    // remove button
    e.composedPath()[1].remove();

};


function addElement(newBook) {

    // need to add book to myLibrary 
    myLibrary[newBook.printId()] = newBook;

    // need to display book
    createBook(newBook);
}


function readUserInput() {
    // get new id
    let maxId = 0;
    for (var key in myLibrary) {
        //var value = dict[key];
        if (key > maxId) {
            maxId = parseInt(key);
        }
    }
    let newID = maxId + 1;

    


    let userTitle = document.querySelector("#userTitle").value;
    let userAuthor = document.querySelector("#userAuthor").value;
    let userPages = document.querySelector("#userPages").value;
    let userRead = document.querySelector("#userRead").value;

    if(userTitle == ""|| userAuthor == "" || userPages ==""){
        return -1
    }

    if (userRead == "Finished") {
        userRead = true;
    } else if (userRead == "Not read") {
        userRead = false;
    }

    console.log(userRead);

    return new Book(userTitle, userAuthor, userPages, userRead, newID);

}



const userRead = document.querySelector("#userRead")
userRead.addEventListener('click', (e) => {
    // change display value    
    if (userRead.value == "Finished") {
        userRead.value = "Not read";
    } else {
        userRead.value = "Finished";
    }

});


const form = document.querySelector(".libraryDisplay .form");
add.addEventListener('click', (e) => {
    
    
    //show form 
    form.style = 'display:flex';
    add.style.display = "none";

});

// add event listener to submit button
const submit = document.querySelector("#userSubmit");

submit.addEventListener('click', (e) => {


    // get user input
    let userBook = readUserInput();

    if(userBook == -1){
        return
    }

    // add new book
    addElement(userBook);

    //hide form
    form.style.display = 'none';
    add.style.display = "block";

    // clear user inputs?

});



// tests
const animal = new Book("Animal Farm", "George Orwell", 112, true);
const hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, false);
const gone = new Book("Gone Girl", "Gillian Flynn", 432, true);
const code = new Book("The Code Book", "Simon Singh", 416, false);
const alice = new Book("Alice's Adventures in Wonderland", "Lewis Carroll", 176, false);


// init

addBookToLibrary(animal, hobbit, gone, code, alice);
displayBooks()