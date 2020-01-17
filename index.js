
// Global Variables 
const showLibraryForm = document.getElementById('showbook-btn');
const bookForm = document.querySelector('.main');
const bookName = document.getElementById('book-name');
const bookAuthor = document.getElementById('book-author');
const bookCategory = document.getElementById('category');
const addBookBtn = document.getElementById('add-book-btn');
const libraryTitle = document.querySelector('.books-header');
const tHead = document.querySelector('.table-head');
const tBody = document.querySelector('.table-body');



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
    const warning = document.querySelector('.ls-warning');
    if(localStorage.length == 0){
        libraryTitle.style.display = 'none';
        tHead.style.visibility = 'hidden';
        // warning.innerHTML = 'No Book Yet, Click on <span>Add Book To Library</span>';
    }else{
        libraryTitle.style.display = 'block';
        tHead.style.visibility = 'visible';
        warning.style.display = 'none';
        tBody.innerHTML = localStorage.getItem('tbody')
    }
};

const storeBookInLocalStorage = (tBody) => {
    localStorage.setItem('tbody', tBody);
}

window.addEventListener('load', getBookFromlocalStorage);

// Add Book
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

        storeBookInLocalStorage(tBody.innerHTML);

        clearFields();
    }
});


