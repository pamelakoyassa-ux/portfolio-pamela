const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Apparition douce des sections au défilement.
const revealItems = document.querySelectorAll('.section-heading, .about-lead, .fact, .skill-card, .project-card, .service-item, .contact-detail, .contact-form');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  if (item.classList.contains('skill-card') || item.classList.contains('service-item')) {
    item.classList.add(`reveal-delay-${(index % 3) + 1}`);
  }
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('is-visible'));
}

const form = document.getElementById('contactForm');
const whatsappButton = document.getElementById('whatsappSubmit');
const note = document.getElementById('formNote');
const emailAddress = 'pamelakoyassa@gmail.com';
const whatsappNumber = '23672758701';
function getMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  return { name, email, subject, message };
}
function isValid() {
  if (!form.reportValidity()) return false;
  const data = getMessage();
  if (!data.name || !data.email || !data.subject || !data.message) return false;
  return true;
}
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  if (!isValid()) return;
  const data = getMessage();
  const body = `Bonjour Paméla,\n\n${data.message}\n\nNom : ${data.name}\nE-mail : ${data.email}`;
  const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)&su=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}';
  if (note) { note.textContent = 'Gmail va souvrir. Vérifier votre message puis confirmer son envoi.';
} 
    window.open(gmailUrl,
'_blank');
});
if (whatsappButton) whatsappButton.addEventListener('click', () => {
  if (!isValid()) return;
  const data = getMessage();
  const body = `Bonjour Paméla, je vous contacte depuis votre portfolio.\n\nSujet : ${data.subject}\nMessage : ${data.message}\n\nMon nom : ${data.name}\nMon e-mail : ${data.email}`;
  if (note) note.textContent = 'WhatsApp va s’ouvrir avec votre message préparé. Vérifiez-le puis appuyez sur Envoyer.';
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
});
