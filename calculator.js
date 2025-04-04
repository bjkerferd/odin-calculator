

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
        case "÷": return divide(a, b);
        case "*": return multiply(a, b);
        case "×": return multiply(a, b);
    }
}



function calculator() {
    let input = "";
    let a = null;
    let b = null;
    let op = null;
    let hasInput = false

    const IO = document.querySelector("#IO");
    const expression = document.querySelector("#expression");
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator.numeric");
    numbers.forEach(numbers => numbers.addEventListener("click", onNumberClick));
    operators.forEach(operator => operator.addEventListener("click", onOperatorClick));

    function onNumberClick(e) {
        num = e.target.textContent
        hasInput ? IO.textContent += num : IO.textContent = num;
        hasInput = true;
    }
    
    function onOperatorClick(e) {
        if (hasInput) {
            if (!a) {
                // if we don't have a, update it
                a = Number(IO.textContent);
                op = e.target.textContent;
                hasInput = false;
                expression.textContent = `${a} ${op}`
            } else {
                // evaluate the expression
                b = Number(IO.textContent);
                a = operate(a, b, op);
                IO.textContent = a;
                hasInput = false;
                op = e.target.textContent;
                expression.textContent = `${a} ${op}`
            }
        }
    }    
    
    function onBackClick(e) {
        if (hasInput) {
        }
    }
}



function consoleCalc() {
    let a = null;
    let b = null;
    let op = null;
    
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

// consoleCalc();
calculator();