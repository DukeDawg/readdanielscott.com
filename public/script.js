const header = document.querySelector('[data-scroll-header]');
const year = document.querySelector('[data-year]');
const contactForm = document.querySelector('[data-contact-form]');
const mailerLiteForm = document.querySelector('[data-mailerlite-form]');

if (year) year.textContent = new Date().getFullYear();

const setHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

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

if (mailerLiteForm) {
  const status = mailerLiteForm.querySelector('[data-mailerlite-status]');
  const button = mailerLiteForm.querySelector('button[type="submit"]');

  mailerLiteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = 'Joining the list...';
      status.classList.remove('is-error');
    }
    if (button) button.disabled = true;

    try {
      const payload = new FormData(mailerLiteForm);
      payload.set('ajax', '1');

      const response = await fetch(mailerLiteForm.action, {
        method: 'POST',
        body: payload
      });
      const result = await response.json().catch(() => ({}));

      if (result.success) {
        mailerLiteForm.reset();
        if (typeof window.ml_webform_success_41418069 === 'function') {
          window.ml_webform_success_41418069();
        }
        return;
      }

      const emailErrors = result.errors?.fields?.email || result.errors?.fields?.['fields.email'];
      const errorText = Array.isArray(emailErrors) && emailErrors.length
        ? emailErrors.join(' ')
        : 'Signup did not go through. Please check the email address and try again.';
      throw new Error(errorText);
    } catch (error) {
      if (status) {
        status.textContent = error.message || 'Signup did not go through. Please try again.';
        status.classList.add('is-error');
      }
    } finally {
      if (button) button.disabled = false;
    }
  });
}
