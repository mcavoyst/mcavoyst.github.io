function getSystemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (e) {
    return 'light';
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('[data-theme-icon]');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  try {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const theme = isDark ? 'light' : 'dark';
    const icon = document.querySelector('[data-theme-icon]');
    
    if (icon) {
      icon.style.transform = 'rotate(360deg)';
      setTheme(theme);
      
      setTimeout(() => {
        icon.style.transform = 'rotate(0)';
      }, 150);
    }
  } catch (e) {
    console.error('Theme toggle failed:', e);
  }
}

// Initialize theme
(function() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    setTheme(savedTheme || systemTheme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  } catch (e) {
    console.error('Theme initialization failed:', e);
  }
})();
