const header = document.querySelector('[data-scroll-header]');
const year = document.querySelector('[data-year]');
const signupForm = document.querySelector('[data-signup-form]');
const signupNote = document.querySelector('[data-form-note]');
const contactForm = document.querySelector('[data-contact-form]');

if (year) year.textContent = new Date().getFullYear();

const setHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

if (signupForm && signupNote) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    signupNote.textContent = 'Signup plumbing is not connected yet. The front door exists; the haunted mailbox comes next.';
  });
}

if (contactForm) {
  const status = contactForm.querySelector('[data-contact-status]');
  const button = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) status.textContent = 'Sending message…';
    if (button) button.disabled = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(contactForm)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || 'Message failed.');

      contactForm.reset();
      if (window.turnstile) window.turnstile.reset();
      if (status) status.textContent = 'Message sent. Daniel has it.';
    } catch (error) {
      if (status) status.textContent = error.message || 'Message could not be sent. Please try again later.';
    } finally {
      if (button) button.disabled = false;
    }
  });
}
