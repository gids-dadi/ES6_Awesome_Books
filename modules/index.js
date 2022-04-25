import AwesomeBooks from './AwesomeBooks.js'
import { DateTime } from "./luxon.js";

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if(awesomeBooks.getBooks().length < 1) {
awesomeBooks.forBook('The Decline and Fall of the Roman Empire', 'Edward Gibbon	');
awesomeBooks.forBook('Far from the Madding Crowd', 'Thomas Hardy');
awesomeBooks.forBook('	Alice in Wonderland', 'Lewis Carrol');
awesomeBooks.forBook('A Dangerous place', 'D.P. Moynihan');
}

let bookLlist = document.querySelector('#bookList')

const renderBooklist =() => {
  bookLlist.innerHTML = awesomeBooks.getBooks().map((book, index) => `
  <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>`).join('');
}

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

const list_link = document.querySelector('#list');
const new_link = document.querySelector('#add');
const contact_link = document.querySelector('#contact');

const listSection = document.querySelector('#book-list');
const contactSection = document.querySelector('#contact-section');
const newSection = document.querySelector('#new-book');


list_link.addEventListener('click', () => {
  list_link.classList.add('active');
  new_link.classList.remove('active');
  contact_link.classList.remove('active');
  listSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  newSection.classList.add('hidden');
});

new_link.addEventListener('click', () => {
  list_link.classList.remove('active');
  new_link.classList.add('active');
  contact_link.classList.remove('active');
  listSection.classList.remove('hidden');
  contactSection.classList.add('hidden');
  newSection.classList.remove('hidden');
});

contact_link.addEventListener('click', () => {
  list_link.classList.remove('active');
  new_link.classList.remove('active');
  contact_link.classList.add('active');
  listSection.classList.add('hidden');
  contactSection.classList.remove('hidden');
  newSection.classList.add('hidden');
});

const luxon_time = document.querySelector('#date');

luxon_time.innerHTML = DateTime.now().toLocaleString();