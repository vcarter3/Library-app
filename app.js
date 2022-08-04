
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = false

    this.info = function () {
        return this.title
    }
}


function addBookToLibrary(...books) {
    for (const book of books) {
        myLibrary.push(book)
    }

}


const page = document.querySelector("body > p1");

const bookShelf = document.querySelector("body > div");

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {

        // for each book in the lib
        // create a new div
        const bookContainer = document.createElement("div");
        // Fill it with content and structure
        const bookTitle = bookContainer.createElement("h2");
        const bookContent = bookTitle.createTextNode(myLibrary[i].info());
        
        
        
        bookContainer.appendChild(newCoontent);
        libraryDisplay.appendChild(titleContainer);

        // create a new h2 element
        const titleContainer = document.createElement("h2");
        // and give it some content
        const newCoontent = document.createTextNode(myLibrary[i].info());
        titleContainer.appendChild(newCoontent);
        libraryDisplay.appendChild(titleContainer);
        
    }
}



const add = document.querySelector('#add');
const libraryDisplay = document.querySelector('.libraryDisplay');



// event listeners 
function removeElement(e) {
    console.log(e.target);
    e.target.parentElement.remove();
};


function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");
    // and give it some content
    const newContent = document.createTextNode("New book");
    const button = document.createElement("button");
    button.innerHTML = "remove me";
    // add the text node to the newly created div
    newDiv.appendChild(newContent);
    newDiv.appendChild(button);
    // add the newly created element and its content into the DOM
    libraryDisplay.appendChild(newDiv);

    const buttonRemove = document.querySelector(".libraryDisplay div:last-child > button");

    buttonRemove.addEventListener('click',
        (e) => {
            removeElement(e);
        });



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