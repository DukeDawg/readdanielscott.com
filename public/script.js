const header = document.querySelector('[data-scroll-header]');
const year = document.querySelector('[data-year]');
const form = document.querySelector('[data-signup-form]');
const note = document.querySelector('[data-form-note]');

if (year) {
  year.textContent = new Date().getFullYear();
}

const syncHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (form && note) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(form).get('email');
    note.textContent = email
      ? `Demo captured for ${email}. Wire this to MailerLite/ConvertKit before launch.`
      : 'Demo form only. Wire this to the real email provider before launch.';
    form.reset();
  });
}
