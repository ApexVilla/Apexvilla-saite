// ============================================
// APEXVILLA - JavaScript Premium
// Animações modernas, microinterações e UX avançada
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // MOBILE MENU
  // ============================================
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      document.body.style.overflow = 'hidden';
    });
  }

  if (navClose) {
    navClose.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  }

  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
    });
  });

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  function animateCounter(element) {
    const target = +element.dataset.target;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // ============================================
  // SMOOTH SCROLL & SERVICE REVEAL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        // Feature: Reveal Service Details on Click
        if (target.classList.contains('detail-block') || target.closest('.service-details')) {
          // If target is detail block, handle reveal
          // Close others
          document.querySelectorAll('.detail-block').forEach(b => {
            if (b !== target) b.classList.remove('active');
          });

          // Open target
          target.classList.add('active');
        }

        const headerOffset = 80;
        // Wait slightly for layout to recalc if hidden
        setTimeout(() => {
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 50);
      }
    });
  });

  // ============================================
  // MAKE SERVICE CARDS CLICKABLE
  // ============================================
  document.querySelectorAll('.service__card').forEach(card => {
    card.style.cursor = 'pointer'; // Visual cue
    card.addEventListener('click', (e) => {
      // Prevent infinite loop if clicking the link itself
      if (e.target.tagName === 'A' || e.target.closest('a')) return;

      const link = card.querySelector('.service__link');
      if (link) {
        link.click();
      }
    });
  });

  // ============================================
  // CONTACT FORM ENHANCEMENT
  // ============================================
  const form = document.getElementById('contact-form');

  if (form) {
    const inputs = form.querySelectorAll('input, textarea, select');

    // Add floating label effect
    inputs.forEach(input => {
      input.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function () {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });

      // Check if input has value on load
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Show loading state
      const submitButton = form.querySelector('.form__button');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;

      // Format message for WhatsApp
      const message = `*Novo Lead via Site ApexVilla*

*Nome:* ${data.name}
*Email:* ${data.email}
*Telefone:* ${data.phone}
*Serviço:* ${form.querySelector('select[name="service"] option:checked').text}

*Mensagem:*
${data.message}`;

      // Encode message
      const encodedMessage = encodeURIComponent(message);

      // WhatsApp phone number
      const phoneNumber = '5562981254228';

      // Show loading state briefly then redirect
      submitButton.textContent = 'Redirecionando para WhatsApp...';
      submitButton.disabled = true;

      setTimeout(() => {
        // Redirect to WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

        // Reset form UI
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        form.reset();
        inputs.forEach(input => {
          input.parentElement.classList.remove('focused');
        });
      }, 1000);
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 28px;
      background: rgba(15, 22, 36, 0.95);
      backdrop-filter: blur(20px);
      color: #fff;
      padding: 20px 28px;
      border-radius: 14px;
      border: 1px solid rgba(13, 148, 136, 0.3);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      z-index: 1000;
      animation: slideInRight 0.4s ease-out;
      max-width: 400px;
      font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.4s ease-out';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 400);
    }, 4000);
  }

  // Add notification animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ============================================
  // PARALLAX EFFECT FOR HERO IMAGE
  // ============================================
  const heroImage = document.querySelector('.hero__img');

  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;

      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // ============================================
  // CURSOR EFFECT (Optional - Premium touch)
  // ============================================
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid rgba(13, 148, 136, 0.8);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
    display: none;
  `;
  document.body.appendChild(cursor);

  // Show cursor on desktop only
  if (window.innerWidth > 768) {
    cursor.style.display = 'block';

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX - 10 + 'px';
      cursor.style.top = e.clientY - 10 + 'px';
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service__card, .portfolio__card, .pricing__card');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'rgba(212, 175, 55, 0.8)';
      });

      element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(13, 148, 136, 0.8)';
      });
    });
  }

  // ============================================
  // TYPING EFFECT FOR HERO TITLE (Optional)
  // ============================================
  const heroTitle = document.querySelector('.home__title .gradient-text');
  if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing after a delay
    setTimeout(typeWriter, 500);
  }

  // ============================================
  // LAZY LOADING FOR IMAGES
  // ============================================
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // ============================================
  // PERFORMANCE: Debounce scroll events
  // ============================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll-heavy functions
  const optimizedScrollHandler = debounce(() => {
    // Add any scroll-heavy operations here
  }, 10);

  window.addEventListener('scroll', optimizedScrollHandler);

  // ============================================
  // PRELOADER (Optional - Premium touch)
  // ============================================
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }

    // Trigger initial animations
    document.body.classList.add('loaded');
  });




  // ============================================
  console.log('%c🚀 ApexVilla - Transformando Negócios com IA', 'color: #0d9488; font-size: 20px; font-weight: bold;');
  console.log('%c💎 Tecnologia Premium | Resultados Extraordinários', 'color: #d4af37; font-size: 14px;');
});

// Helper to select service from plans
function setService(planKey) {
  const form = document.getElementById('contact-form');
  const messageArea = form.querySelector('textarea[name="message"]');
  const serviceSelect = form.querySelector('select[name="service"]'); // Assuming there's a select, checking index.html line 376... yes but it has name="subject" usually? index.html says name="service" in lines 376-384 range? No wait, index.html line 384 says </select> but start tag was missing in previous view? 
  // Let's just handle the message text for now to be safe.

  const planMap = {
    'traffic-start': 'Tenho interesse no Plano Start de Tráfego Pago.',
    'traffic-growth': 'Tenho interesse no Plano Growth de Tráfego Pago.',
    'web-lp': 'Tenho interesse no Plano de Landing Page.',
    'web-pro': 'Tenho interesse no Plano Institucional Pro.',
    'app-mvp': 'Tenho interesse no Plano MVP Start para Apps.',
    'app-pro': 'Tenho interesse no Plano Startup Pro para Apps.',
    'saas': 'Gostaria de falar com consultor sobre SaaS.',
    'saas-custom': 'Quero solicitar diagnóstico para Projeto Customizado SaaS.',
    'auto-bot': 'Tenho interesse no Bot de Atendimento.',
    'auto-gpt': 'Tenho interesse no Agente GPT-4.'
  };

  if (messageArea) {
    messageArea.value = planMap[planKey] || 'Tenho interesse em um plano.';
    messageArea.parentElement.classList.add('focused');
  }

  // Scroll to form
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}
