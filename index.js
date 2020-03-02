
// Global Variables 
const showLibraryForm = document.getElementById('showbook-btn');
const bookForm = document.querySelector('.main');
const bookName = document.getElementById('book-name');
const bookAuthor = document.getElementById('book-author');
const bookCategory = document.getElementById('category');
const addBookBtn = document.getElementById('add-book-btn');
const libraryTitle = document.querySelector('.books-header');
const table = document.querySelector('.table');
const tHead = document.querySelector('.table-head');
const tBody = document.querySelector('.table-body');
const deleteAllBooksBtn = document.querySelector('#delete-books-btn');


// Display BookForm
showLibraryForm.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

// Clear inputFields function
const clearFields = () => {
    bookName.value = '';
    bookAuthor.value = '';
    bookCategory.value = '';
};



// LocalStorage Function
const getBookFromlocalStorage = () => {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
        libraryTitle.style.display = 'block';
        libraryTitle.className = 'info';
        libraryTitle.innerHTML = 'No Books! <span>Click on Add Book To Library</span>'
        deleteAllBooksBtn.style.display = 'none';
    } else {
        books = JSON.parse(localStorage.getItem('books'));
        deleteAllBooksBtn.style.display = 'block';
    }

    books.forEach((book) => {
        libraryTitle.style.display = 'block';

        tHead.style.visibility = 'visible';
        const row = document.createElement('tr');

        row.innerHTML = `
                            <tr>
                                <td>${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.category}</td>
                                <td class="delete-btn">X</td>
                            </tr>
                        `

        tBody.append(row);
    });
};

window.addEventListener('load', getBookFromlocalStorage);

const storeBookInLocalStorage = (book) => {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
}


class Book{
    constructor(name, author, category, id){
        this.name = name;
        this.author = author;
        this.category = category;
    }
};

// Add Book
addBookBtn.addEventListener('click', () => {
    if (bookName.value === '' || bookAuthor.value === '' || bookCategory.value === '') {
        const errorMsg = document.querySelector('#error');
        errorMsg.className = 'error';
        errorMsg.innerHTML = '<h6>Please fill all InputFields!</h6>';
        clearFields();
        const errorHandler = () => {
            errorMsg.className = 'alert-hide';
            errorMsg.innerHTML = '';
        }
        setTimeout(errorHandler, 3000);
    }else{
        bookForm.style.display = 'none';
        libraryTitle.style.display = 'block';
        libraryTitle.innerHTML = `Library Collection`;
        libraryTitle.className = 'books-header'
        tHead.style.visibility = 'visible';
        const row = document.createElement('tr');

        row.innerHTML = `
                            <tr>
                                <td>${bookName.value}</td>
                                <td>${bookAuthor.value}</td>
                                <td>${bookCategory.value}</td>
                                <td class="delete-btn">X</td>
                            </tr>
                        `

        tBody.append(row);
        let book = new Book(bookName.value, bookAuthor.value, bookCategory.value);
        storeBookInLocalStorage(book);

        let successMsg = `<h6 class="success">Book successfully added!</h6>`;
        const alert = document.querySelector('.alert');
        alert.innerHTML = successMsg;

        const errorHandler = () => {
            alert.className = 'alert-hide';
            alert.innerHTML = '';
        }
        setTimeout(errorHandler, 3000);

        deleteAllBooksBtn.style.display = 'block';

        clearFields();
    }
});

// Delete Book
tBody.addEventListener('click', (e) => {
    if(e.target.className === 'delete-btn'){
        e.target.parentElement.remove();

        let books = JSON.parse(localStorage.getItem('books'));
        books.forEach((book, index) => {
            if(e.target.parentElement.firstElementChild.textContent === book.name){
                books.splice(index, 1);
            }
        });

        let successMsg = `<h6 class="success">Book successfully deleted!</h6>`;
        const alert = document.querySelector('.alert');
        alert.innerHTML = successMsg;

        const errorHandler = () => {
            alert.className = 'alert-hide';
            alert.innerHTML = '';
        }
        setTimeout(errorHandler, 3000);


            localStorage.setItem('books', JSON.stringify(books));
            if(books.length == 0){
                document.location.reload(true);
                localStorage.clear();
            }
    }
});

//  Delete All Button
deleteAllBooksBtn.addEventListener('click', () => {
    const confirmMsg = confirm('Are you sure?');
    if(confirmMsg == true){
        localStorage.clear();
        document.location.reload(true);
    }else {
        document.location.reload(true);
    }
    
})

