const toggle = document.querySelector('.toggle');
const circle = document.querySelector('.switch');

function switchTheme() {
    if (circle.classList.contains('theme-2')) {
        circle.classList.replace('theme-2', 'theme-3');

        document.body.classList.replace('second', 'third');
    }
    else if (circle.classList.contains('theme-3')) {
        circle.classList.remove('theme-3');

        document.body.classList.remove('third');
    }
    else {
        circle.classList.add('theme-2');

        document.body.classList.add('second')
    }
}

toggle.onclick = switchTheme;