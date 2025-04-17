// sidebar.js
function iniciarSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const mainContent = document.querySelector('main.painel');
    const userNameSpan = document.getElementById('user-name');
  
    // Buscar nome do usuário autenticado via backend
    fetch('/api/usuario', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (userNameSpan && data.nome) {
          userNameSpan.textContent = data.nome;
        }
      })
      .catch(err => {
        console.error('Erro ao obter nome do usuário:', err);
      });
  
    if (sidebar && toggleBtn && mainContent) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        const isCollapsed = sidebar.classList.contains('collapsed');
        mainContent.style.marginLeft = isCollapsed ? '60px' : '240px';
      });
    }
  }
  
  document.addEventListener('DOMContentLoaded', iniciarSidebar);
  