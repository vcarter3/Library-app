
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false

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
        return this.read
    }
}


function addBookToLibrary(...books) {
    for (const book of books) {
        myLibrary.push(book)
    }

}


const libraryShelf = document.querySelector("body > div");


function createBook(title,author,pages,read){

    const parent = document.createElement("div");
    const child1 = document.createElement("h3");
    child1.textContent = title;
    parent.appendChild(child1);


    //<p>by <span class="author">AuthorName</span></p>

    const child2 = document.createElement("p");
    child2.textContent = "By ";

    const grandChild = document.createElement("span");
    grandChild.className = "author";
    grandChild.textContent = author;
    child2.appendChild(grandChild);
    parent.appendChild(child2);

    //<p class="details"><span class="bold">Length: </span>288 pages</p>

    const child3 = document.createElement("p");
    child3.textContent = "Pages: ";
    const grandChild2 = document.createElement("span");
    grandChild2.className = "pages";
    grandChild2.textContent = pages;
    child3.appendChild(grandChild2);
    parent.appendChild(child3);


    //<p class="details"><span class="bold">Status: </span><span class="done">Done</span></p>

    const child4 = document.createElement("p");
    child4.textContent = "Status: ";
    const grandChild3 = document.createElement("button");
    grandChild3.className = "read";
    if(read){
        grandChild3.textContent = "Done";
    }else{
        grandChild3.textContent = "Not done";
    }
    
    child4.appendChild(grandChild3);
    parent.appendChild(child4);

    //<button>bin</button>

    const child5 = document.createElement("button");
    child5.textContent = "bin me";
    child5.className = "bin";
    parent.appendChild(child5);


    // send book to shelf
    //libraryShelf.appendChild(parent);


    //send book to front of shelf

    const firstBook = document.querySelector(".libraryDisplay div:first-of-type");
    libraryDisplay.insertBefore(parent, firstBook);


    // remove button event listener
    const buttonRemove = document.querySelector(".libraryDisplay > div:first-of-type > button");
    buttonRemove.addEventListener('click',
        (e) => {
            removeElement(e);
        });


}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i].printTitle(),myLibrary[i].printAuthor(),myLibrary[i].printPages(),myLibrary[i].printRead());
    }
}


const add = document.querySelector('#add');
const libraryDisplay = document.querySelector('.libraryDisplay');



// event listeners 
function removeElement(e) {

    // remove button + event listener?
    console.log(e.target);
    e.target.parentElement.remove();

    // need to remove book from myLibrary 

    console.log(myLibrary);
};


function addElement() {

    // need to get user input

    // need to add book to myLibrary 


    // display book
    createBook("title","author",12,false);
}

add.addEventListener('click', (e) => {
    addElement();
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