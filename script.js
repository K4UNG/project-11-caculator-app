const toggle = document.querySelector('.toggle');
const circle = document.querySelector('.switch');
const buttons = document.querySelectorAll('.number-pad>button');
let sound = new Audio('./button.wav')
let sound2 = new Audio('./theme.wav')
sound2.volume = .5;


let current = ''
let dotted = false;

let loopId = null;

const display = document.querySelector('.output h2');
const operators = ['+', '-', 'x', '/'];
const mathCalc = {
    '+': function(x, y) { return x + y },
    '-': function(x, y) { return x - y },
    'x': function(x, y) { return x * y },
    '/': function(x, y) { return x / y }
}

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

toggle.onclick = () => { sound2.play(); switchTheme(); removePress();};

buttons.forEach( btn => {
    btn.onclick = () => {
        sound.play();
        removePress();
        btn.childNodes[0].classList.add('pressed');
        addDisplay(btn);
        if (current) {
            display.textContent = current;
        } else {
            display.textContent = '0';
        }

        if (btn.dataset.key === '=') {
            if (display.textContent != 0) {
                calculate();
                current = ''
            }
        }
    }
});

function addDisplay(button) {
    if (button.classList.contains('num')) {
        if (!(button.dataset.key === '.' && dotted) && !(button.dataset.key === '0' && !current)) {
            if (button.dataset.key == '.') {
                dotted = true;
            }
            current += button.dataset.key;
        }
    } else if (button.classList.contains('oper')) {
        dotted = false;
        if (!current) {
            current = '0';
        }

        let string = '';
        if (operators.includes(current[current.length - 1])) {
            for (let i = 0; i < current.length - 1; i++) {
                string += current[i];
            }
            current = string + button.dataset.key;
        }
        else {
            current += button.dataset.key;
        }
    } else if (button.dataset.key === 'del') {
        let string = ''
        if (operators.includes(current[current.length - 1])) {
            dotted = true;
        } else if (current[current.length - 1] === '.') {
            dotted = false;
        }
        for (let i = 0; i < current.length - 1; i++) {
            string += current[i];
        }
        current = string;
    } else if (button.dataset.key === 'res') {
        dotted = false;
        current = '';
    }
}

function removePress() {
    buttons.forEach(button => {
        button.childNodes[0].classList.remove('pressed');
    });
}

function calculate() {
    if (operators.includes(current[current.length - 1])) {
        let string = '';
        for (let i = 0; i < current.length - 1; i++) {
            string += current[i];
        }
        current = string;
    }
    let numbers = []
    let string = ''
    for (let i = 0; i < current.length; i++) {
        if (operators.includes(current[i])) {
            numbers.push(parseFloat(string));
            string = '';
            numbers.push(current[i]);
        } else {
            string += current[i];
        }
    }
    numbers.push(parseFloat(string));
    readCalculate(numbers);
}

function readCalculate(nums) {
    loopId = setInterval(() => {
        if (nums.length === 1) {
            display.textContent = nums[0];
            clearInterval(loopId);
        }
        let int;
        if (nums.includes('x')) {
            for (let i = 0; i < nums.length; i++) {
                if (nums[i] === 'x') {
                    int = mathCalc['x'](nums[i-1], nums[i+1]);
                    nums[i] = int;
                    nums.splice(i - 1, 1);
                    nums.splice(i, 1);
                }
            }
        } else if (nums.includes('/')) {
            for (let i = 0; i < nums.length; i++) {
                if (nums[i] === '/') {
                    int = mathCalc['/'](nums[i-1], nums[i+1]);
                    nums[i] = int;
                    nums.splice(i - 1, 1);
                    nums.splice(i, 1);
                }
            }
        } else if (nums.includes('+')) {
            for (let i = 0; i < nums.length; i++) {
                if (nums[i] === '+') {
                    int = mathCalc['+'](nums[i-1], nums[i+1]);
                    nums[i] = int;
                    nums.splice(i - 1, 1);
                    nums.splice(i, 1);
                }
            }
        } else if (nums.includes('-')) {
            for (let i = 0; i < nums.length; i++) {
                if (nums[i] === '-') {
                    int = mathCalc['-'](nums[i-1], nums[i+1]);
                    nums[i] = int;
                    nums.splice(i - 1, 1);
                    nums.splice(i, 1);
                }
            }
        }
    });
}