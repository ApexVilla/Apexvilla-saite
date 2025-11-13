// Simple counter animation
document.addEventListener('DOMContentLoaded',()=>{
  const counters = document.querySelectorAll('.counter');
  counters.forEach(c=>{
    const target = +c.dataset.target;
    const step = Math.max(1, Math.floor(target/80));
    let current = 0;
    const inc = ()=>{
      current += step;
      if(current>=target){c.textContent=target;}
      else{c.textContent=current;setTimeout(inc,12)}
    };
    inc();
  });

  // Basic contact form behaviour (demo)
  const form = document.getElementById('contact-form');
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Obrigado! Recebemos sua mensagem. Iremos responder em breve.');
    form.reset();
  });
});