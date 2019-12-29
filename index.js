const showLibraryForm = document.getElementById('showbook-btn');
const bookForm = document.querySelector('.main');

showLibraryForm.addEventListener('click', (e) => {
    bookForm.style.display = 'block';
});