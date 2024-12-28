const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const submit = document.getElementById("submit");
const bookContainer = document.getElementById("book-container");

// Load books from localStorage or initialize as an empty array
const myLibrary = JSON.parse(localStorage.getItem("books")) || [];

class Book {
   constructor(title, author, pages, read) {
      this.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
   }
}

// Add book to the library
const addBookToLibrary = (title, author, pages, read) => {
   if (!title || !author || !pages) {
      alert("Fill in all fields!");
      return;
   }

   const book = new Book(title, author, pages, read);
   console.log("Generated ID for new book:", book.id);

   // Check if a book with the same title and author already exists
   const duplicate = myLibrary.findIndex(bookInLibrary => 
      bookInLibrary.title === book.title && bookInLibrary.author === book.author);

   if (duplicate !== -1) {
      alert("This book is already in the library.");
      return;
   }

   // If no duplicate, add the book to the library
   myLibrary.push(book);
   updateLocalStorage();
   displayBooks();
}

// Update localStorage with the latest myLibrary array
const updateLocalStorage = () => {
   localStorage.setItem("books", JSON.stringify(myLibrary));
}

// Display books on the page
const displayBooks = () => {
   bookContainer.innerHTML = "";

   myLibrary.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      const titleEl = document.createElement("p");
      const authorEl = document.createElement("p");
      const pagesEl = document.createElement("p");
      const readEl = document.createElement("p");
      const removeButton = document.createElement("button");

      titleEl.textContent = `Title: ${book.title}`;
      authorEl.textContent = `Author: ${book.author}`;
      pagesEl.textContent = `Pages: ${book.pages}`;
      readEl.textContent = `Read: ${book.read ? "Yes" : "No"}`;

      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
         removeBook(book.id);
      });

      bookCard.appendChild(titleEl);
      bookCard.appendChild(authorEl);
      bookCard.appendChild(pagesEl);
      bookCard.appendChild(readEl);
      bookCard.appendChild(removeButton);

      bookContainer.appendChild(bookCard);
   });
}

// Remove a book from the library
const removeBook = (id) => {
   const bookIndex = myLibrary.findIndex((book) => book.id === id);
   if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      updateLocalStorage();
      displayBooks();
   }
}

// Handle form submission
submit.addEventListener("click", (e) => {
   e.preventDefault();

   const bookTitle = title.value;
   const bookAuthor = author.value;
   const bookPages = pages.value;
   const bookRead = read.checked;

   addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);

   title.value = "";
   author.value = "";
   pages.value = "";
   read.checked = false;
});

// Display books when the page loads
displayBooks();
