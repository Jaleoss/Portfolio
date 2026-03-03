const slider = document.getElementById('carousel');
const track = slider.querySelector('.carousel-track');

// 1. Clonar los elementos para crear el efecto infinito de scroll horizontal
const items = [...track.children];
items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone); // Clonamos al final
});

let isDown = false;
let startX;
let scrollLeft;

// Función para manejar el bucle infinito
const handleInfiniteScroll = () => {
    const maxScroll = track.offsetWidth / 2; // Al haber clonado, la mitad es el final real
    
    if (slider.scrollLeft >= maxScroll) {
        // Si llegamos al final de la primera tanda, saltamos al inicio
        slider.scrollLeft = 1; 
    } else if (slider.scrollLeft <= 0) {
        // Si llegamos al inicio, saltamos al final de la primera tanda
        slider.scrollLeft = maxScroll - 1;
    }
};

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
});

// 2. Aplicar el bucle
slider.addEventListener('scroll', handleInfiniteScroll);

// Inicializar el scroll un poquito desplazado para permitir scroll hacia la izquierda de inmediato
window.onload = () => {
    slider.scrollLeft = 1;
};