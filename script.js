// Typing Animation

const words = [
  "Software Developer",
  "Full Stack Developer",
  "AI Developer",
  "Problem Solver",
  "Competitive Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

  if (!typingElement) return;
  const currentWord = words[wordIndex];

  if (!isDeleting) {

    typingElement.textContent =
      currentWord.substring(0, charIndex + 1);

    charIndex++;

    if (charIndex === currentWord.length) {

      isDeleting = true;

      setTimeout(typeEffect, 1500);
      return;
    }

  } else {

    typingElement.textContent =
      currentWord.substring(0, charIndex - 1);

    charIndex--;

    if (charIndex === 0) {

      isDeleting = false;

      wordIndex++;

      if (wordIndex === words.length) {
        wordIndex = 0;
      }
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();


// Navbar Background Animation

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if (window.scrollY > 50) {

    header.style.background =
      "rgba(0,0,0,0.95)";

    header.style.boxShadow =
      "0 5px 20px rgba(0,255,179,.15)";

  } else {

    header.style.background =
      "rgba(0,0,0,0.75)";

    header.style.boxShadow =
      "none";
  }
});


// Mobile Menu

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if(menuBtn){
    menuBtn.addEventListener("click", () => {

    nav.classList.toggle("active");

    const expanded =
    menuBtn.getAttribute("aria-expanded") === "true";

    menuBtn.setAttribute(
        "aria-expanded",
        !expanded
    );
});
}


// Scroll To Top Button

const topBtn = document.getElementById("topBtn");

if (topBtn) {

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      topBtn.style.display = "flex";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

}

// Initialize AOS if available
if (typeof AOS !== "undefined" && AOS.init) {
  AOS.init();
}

// Ensure reveal and counters update after anchor navigation
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', () => {
    setTimeout(() => { revealSections(); runCounters(); }, 300);
  });
});

window.addEventListener('hashchange', () => { revealSections(); runCounters(); });


// Reveal Animation

document.querySelectorAll("section");
const revealElements = document.querySelectorAll("section");

revealElements.forEach(s => s.classList.add("reveal"));

function revealSections() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();


// Statistics Counter Animation

const numberSpans = document.querySelectorAll('.stat .num');

let counterStarted = false;

function runCounters() {
  if (counterStarted) return;

  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  if (sectionTop < window.innerHeight - 100) {
    counterStarted = true;

    numberSpans.forEach(span => {
      const original = span.innerText || '';
      const target = parseInt(original.replace(/[^\d]/g, '')) || 0;

      let count = 0;
      const increment = Math.max(1, Math.ceil(target / 50));

      const update = () => {
        count += increment;
        if (count >= target) {
          span.innerText = target;
        } else {
          span.innerText = count;
          requestAnimationFrame(update);
        }
      };

      update();
    });
  }
}

window.addEventListener('scroll', runCounters);
runCounters();

// Contact form: send via mailto or WhatsApp
const contactForm = document.getElementById('contactForm');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');
const sendEmailBtn = document.getElementById('sendEmail');
const sendWhatsAppBtn = document.getElementById('sendWhatsApp');

function validateContact() {
  if (!contactName || !contactEmail || !contactMessage) return false;
  if (contactName.value.trim() === '' || contactEmail.value.trim() === '' || contactMessage.value.trim() === '') {
    alert('Please fill in your name, email, and message.');
    return false;
  }
  return true;
}

if (sendEmailBtn) {
  sendEmailBtn.addEventListener('click', () => {
    if (!validateContact()) return;
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const msg = contactMessage.value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`);
    const mailto = `mailto:devanshikumar05@gmail.com?subject=${subject}&body=${body}`;

    try {
      const a = document.createElement('a');
      a.href = mailto;
      a.target = '_blank';
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mailto).then(() => alert('Mail link copied to clipboard. Paste it into your mail client.'))
          .catch(() => alert('Unable to open mail client. Copy this link: ' + mailto));
      } else {
        alert('Unable to open mail client. Copy this link: ' + mailto);
      }
    }
  });
}

if (sendWhatsAppBtn) {
  sendWhatsAppBtn.addEventListener('click', () => {
    if (!validateContact()) return;
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const msg = contactMessage.value.trim();

    const text = encodeURIComponent(`Message from ${name} (${email}):\n\n${msg}`);
    // WhatsApp number in international format without '+' or leading zeros
    const waNumber = '919598897886';
    const waLink = `https://wa.me/${waNumber}?text=${text}`;
    try {
      const a = document.createElement('a');
      a.href = waLink;
      a.target = '_blank';
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(waLink).then(() => alert('WhatsApp link copied to clipboard. Paste in browser or WhatsApp.'))
          .catch(() => alert('Unable to open WhatsApp. Copy this link: ' + waLink));
      } else {
        alert('Unable to open WhatsApp. Copy this link: ' + waLink);
      }
    }
  });
}