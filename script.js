document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------
  // Contact Form Handler
  // ---------------------------
  window.handleSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    // Save to localStorage
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    submissions.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Show thank you message
    const form = event.target;
    form.innerHTML = `
      <p style="font-size:1.2rem; color:var(--accent); text-align:center;">
        Thank you, <strong>${name}</strong>! Your message has been received.<br>
        I’ll reply to <strong>${email}</strong> soon.
      </p>`;
  };

  // ---------------------------
  // Smooth Scrolling (internal links only)
  // ---------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---------------------------
  // Navbar Scroll Effects
  // ---------------------------
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(15, 23, 42, 0.98)';
      navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });

  // ---------------------------
  // Timeline Animations
  // ---------------------------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });

  // ---------------------------
  // Hamburger Menu Toggle (mobile)
  // ---------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ---------------------------
  // Dark/Light Mode Toggle
  // ---------------------------
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light');
    });
  }

  // ---------------------------
  // Print Functionality
  // ---------------------------
  window.addPrint = function() {
    window.print();
  };
});