window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('mainContent');

  // Inicia o fade-out do preloader
  preloader.style.transition = 'opacity 0.5s ease';
  preloader.style.opacity = '0';

  setTimeout(() => {
    preloader.style.display = 'none';
    mainContent.style.display = 'block';

    // Faz o conteúdo aparecer suavemente
    setTimeout(() => {
      mainContent.classList.add('visible');
    }, 50); // pequeno delay para garantir o render

    document.body.style.overflow = 'auto';
  }, 500); // tempo do fade-out do preloader
});
/*  */
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Verifica tema salvo
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  toggleBtn.innerHTML = '<ion-icon name="sunny"></ion-icon>';
} else {
  toggleBtn.innerHTML = '<ion-icon name="moon"></ion-icon>';
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');

  // Salva no localStorage
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  // Atualiza texto do botão
  toggleBtn.innerHTML = isDark
    ? '<ion-icon name="sunny"></ion-icon>'
    : '<ion-icon name="moon"></ion-icon>';
});
/* Lang */
document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('menumobile');
  const langMenu = document.getElementById('lang-menu');
  const langItems = langMenu.querySelectorAll('li');
  const selectedLangSpan = document.getElementById('selected-lang');

  const langLabels = {
    'pt-br': 'Português Brasil',
    en: 'English',
    es: 'Español',
  };

  // Verifica e aplica a linguagem salva
  const savedLang = localStorage.getItem('language') || 'pt-br';
  applyLanguage(savedLang);

  // Abre/fecha menu de idiomas ao clicar no botão
  langBtn.addEventListener('click', () => {
    langMenu.classList.toggle('is-expand');
  });

  // Troca de idioma ao clicar
  langItems.forEach((item) => {
    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      if (!langLabels[lang]) return;

      localStorage.setItem('language', lang);
      applyLanguage(lang);
      langMenu.classList.remove('is-expand');
    });
  });

  function applyLanguage(lang) {
    const label = langLabels[lang] || langLabels['pt-br'];
    selectedLangSpan.textContent = label;

    fetch(`/public/i18n/${lang}.json`)
      .then((res) => res.json())
      .then((data) => traduzirTudo(data))
      .catch((err) => console.error('Erro ao carregar traduções:', err));
  }
  function traduzirTudo(traducoes) {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const chave = el.getAttribute('data-i18n');
      const texto = chave
        .split('.')
        .reduce((acc, part) => acc?.[part], traducoes);

      if (texto) {
        el.innerHTML = texto; // Só isso, sem lenga lenga
      }
    });
  }
});

/* Menu responsivo */
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.head_nav');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
