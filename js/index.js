const loadEl = document.getElementById('pre-load');
const footerEl = document.querySelector('footer');

window.addEventListener('load', () => {
    endPreLoad();
});

const endPreLoad = () => {
    loadEl.style.opacity = '0';
    loadEl.style.zIndex = '-1';
};

const startPreLoad = () => {
    loadEl.style.opacity = '1';
    loadEl.style.zIndex = '999';
};

