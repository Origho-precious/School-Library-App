const showLibraryForm = document.getElementById('showbook-btn');
const bookForm = document.querySelector('.main');
const bookName = document.getElementById('book-name');
const bookAuthor = document.getElementById('book-author');
const bookCategory = document.getElementById('category');
const addBookBtn = document.getElementById('add-book-btn');
const libraryTitle = document.querySelector('.books-header');

let books = [];
showLibraryForm.addEventListener('click', () => {
    bookForm.style.display = 'block';
});

const clearFields = () => {
    bookName.value = '';
    bookAuthor.value = '';
    bookCategory.value = '';
}

addBookBtn.addEventListener('click', () => {
    if (bookName.value === '' || bookAuthor.value === '' || bookCategory.value === '') {
        const errorMsg = document.querySelector('#error');
        errorMsg.className = 'error';
        errorMsg.innerHTML = '<h6>Please fill all InputFields!</h6>';
        clearFields();
        const errorHandler = () => {
            errorMsg.className = 'error-hide';
            errorMsg.innerHTML = '';
        }
        setTimeout(errorHandler, 3000);
    }else{
        bookForm.style.display = 'none';
        libraryTitle.style.display = 'block';
        const newbook = document.createElement('li');
        newbook.className = 'list-group-item';
        newbook.innerHTML = `${bookName.value} by ${bookAuthor.value}(${bookCategory.value})`;
        books.push(newbook);
        const uL = document.querySelector('.list-group');
        for(book of books){
            uL.append(book);
        }
        clearFields();
    }
});