import AwesomeBooks from './AwesomeBooks.js';
import { DateTime } from '../luxon.js';

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if (awesomeBooks.getBooks().length < 1) {
  awesomeBooks.forBook('Far from the Madding Crowd', 'Thomas Hardy');
  awesomeBooks.forBook('Alice in Wonderland', 'Lewis Carrol');
  awesomeBooks.forBook('A Dangerous place', 'D.P. Moynihan');
}

const bookList = document.querySelector('#bookList');

const renderBooklist = () => {
  bookList.innerHTML = awesomeBooks
    .getBooks()
    .map(
      (book, index) => `
  <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>;`
    )
    .join('');
};

renderBooklist();

const addBookForm = document.querySelector('#bookEntry');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#bookTitle').value;
  const author = event.target.querySelector('#bookAuthor').value;
  awesomeBooks.forBook(title, author);
  this.reset();
  renderBooklist();
});

bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBooklist();
  }
});

const listLink = document.querySelector('#list');
const newLink = document.querySelector('#add');
const contactLink = document.querySelector('#contact');

const listSection = document.querySelector('#book-list');
const contactSection = document.querySelector('#contact-section');
const newSection = document.querySelector('#new-book');

listLink.addEventListener('click', () => {
  listLink.classList.add('active');
  newLink.classList.remove('active');
  contactLink.classList.remove('active');
  listSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  newSection.classList.add('hidden');
});

newLink.addEventListener('click', () => {
  listLink.classList.remove('active');
  newLink.classList.add('active');
  contactLink.classList.remove('active');
  listSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  newSection.classList.remove('hidden');
});

contactLink.addEventListener('click', () => {
  listLink.classList.remove('active');
  newLink.classList.remove('active');
  contactLink.classList.add('active');
  listSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
  newSection.classList.add('hidden');
});

const luxonTime = document.querySelector('#date');
luxonTime.innerHTML = DateTime.now().toLocaleString();
