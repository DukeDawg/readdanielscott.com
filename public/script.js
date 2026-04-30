const header = document.querySelector('[data-scroll-header]');
const year = document.querySelector('[data-year]');
const form = document.querySelector('[data-signup-form]');
const note = document.querySelector('[data-form-note]');

if (year) year.textContent = new Date().getFullYear();

const setHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    note.textContent = 'Signup plumbing is not connected yet. The front door exists; the haunted mailbox comes next.';
  });
}
