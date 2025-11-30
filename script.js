/* helpers */
const q = (s,r=document) => r.querySelector(s);
const qa = (s,r=document) => Array.from(r.querySelectorAll(s));

/* theme toggle with persistence */
const themeToggle = q('#themeToggle');
function setLight(isLight){
  if(isLight) document.documentElement.classList.add('light');
  else document.documentElement.classList.remove('light');
  localStorage.setItem('isLight', isLight ? '1' : '0');
}
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    themeToggle.textContent = isLight ? '🌞' : '🌙';
    setLight(isLight);
  });
}
const saved = localStorage.getItem('isLight');
if(saved === '1'){ setLight(true); if(themeToggle) themeToggle.textContent='🌞'; } else { setLight(false); if(themeToggle) themeToggle.textContent='🌙'; }

/* year */
q('#year').textContent = new Date().getFullYear();

/* reveal on scroll */
function revealOnScroll(){
  qa('.reveal').forEach(el=>{
    const top = el.getBoundingClientRect().top;
    if(top < window.innerHeight - 80) el.classList.add('active');
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* 3D tilt for project cards */
qa('.project-card').forEach(card=>{
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 10;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  });
  card.addEventListener('mouseleave', ()=> card.style.transform = '');
});

/* resume link: opens file (download attr prompts download in many browsers) */
q('#resumeLink')?.addEventListener('click', () => {
  // nothing extra needed — 'download' attribute will hint the browser to download
});

/* contact form (basic demo) */
const contactForm = q('#contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || 'friend';
    alert(`Thanks ${name}! This demo form does not send email yet.\nTo enable email sending, follow the EmailJS instructions in the README.`);
    contactForm.reset();
  });
}

