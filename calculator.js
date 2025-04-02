function add (a, b) {
    return a + b;
}

function subtract (a, b) {
    return a - b;
}

function divide (a, b) {
    return b !== 0 ? a / b : "DivZero!"; // dive by zero error
}

function multiply (a, b) {
    return a * b;
}

function operate (a, b, op) {
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "/": return divide(a, b);
        case "*": return multiply(a, b);
    }
}


function consoleCalc() {
    let a = null;
    let b = null;
    let op = null;
    let evaluate = false;
    
    let input = null;

    ops = ["+", "-", "/", "*", "="];

    while (input !== 'q') {
        input = prompt("Input: "); 

        if (ops.includes(input)) {
            if (!op) {
                op = input
            } else {
                a = operate(a, b, op);
                b = null;
                op = input;
            }
        } else { // input is number 
            if (!a) {
                a = Number(input);
            } else if (!b) {
                b = Number(input);
            } 
        }
        
        console.log(renderExpression(a, b, op));
    }

    function renderExpression(a, b, op) {
        if (!a) return "";
        else if (!op) return a;
        else if (!b) return `${a} ${op}`;
        else return `${a} ${op} ${b} = ${operate(a, b, op)}` 
    }
}

consoleCalc();