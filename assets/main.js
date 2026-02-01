// Set current year
document.getElementById("year")?.replaceChildren(new Date().getFullYear());

// Smooth scroll active nav highlighting
const links = [...document.querySelectorAll('.menu a[href^="#"]')];
const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  let activeIndex = 0;
  
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].offsetTop <= scrollPos) {
      activeIndex = i;
    }
  }
  
  links.forEach((link, i) => {
    link.style.color = i === activeIndex ? "var(--accent)" : "var(--text-muted)";
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();
