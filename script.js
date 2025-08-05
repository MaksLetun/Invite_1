document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const celebration = document.getElementById('celebration');
    const closeCelebration = document.getElementById('close-celebration');
    
    // Обработчик для кнопки "Да"
    yesBtn.addEventListener('click', function() {
        celebration.classList.remove('hidden');
        createConfetti();
    });
    
    // Обработчик для кнопки "Нет" (с "убегающей" кнопкой)
    noBtn.addEventListener('mouseover', function() {
        const btn = this;
        const container = btn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        btn.style.position = 'absolute';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
    });
    
    // Обработчик для закрытия праздничного уведомления
    closeCelebration.addEventListener('click', function() {
        celebration.classList.add('hidden');
    });
    
    // Функция для создания конфетти
    function createConfetti() {
        const colors = ['#e75480', '#ffcc00', '#00ccff', '#ff00cc', '#00ff66'];
        const celebrationDiv = document.getElementById('celebration');
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '100vh';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            celebrationDiv.appendChild(confetti);
            
            // Удаляем конфетти после анимации
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Здесь вы можете добавить свои данные
    // Пример:
    // document.getElementById('name-placeholder').textContent = 'Анна';
    // document.getElementById('restaurant-placeholder').textContent = 'La Bella';
    // document.getElementById('date-placeholder').textContent = 'пятницы, 14 февраля';
    // document.getElementById('time-placeholder').textContent = '19:00';
});