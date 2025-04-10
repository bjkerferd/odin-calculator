

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
    let hasInput = false;
    let hasOutput = false;
    let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

    const IO = document.querySelector("#IO");
    const expression = document.querySelector("#expression");
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator.numeric");
    numbers.forEach(numbers => numbers.addEventListener("click", onNumberClick));
    operators.forEach(operator => operator.addEventListener("click", onOperatorClick));
    document.querySelector("#back").addEventListener("click", onBackClick);
    document.querySelector("#clear").addEventListener("click", onClearClick);
    document.querySelector("#evaluate").addEventListener("click", onEqualClick);
    document.addEventListener("keyup", onKeyPress);

    function onNumberClick(e) {
        inputNum = e.target.textContent;
        processNumberInput(inputNum);
    }

    function processNumberInput(inputNum) {
        if (hasOutput) onClearClick();
        hasInput ? IO.textContent += inputNum : IO.textContent = inputNum;
        hasInput = true;
        hasOutput = false;
    }
    
    function onOperatorClick(e) {
        inputOp = e.target.textContent;
        processOperatorInput(inputOp);
    }    

    function processOperatorInput(inputOp) {
        if (hasOutput) {
            a = Number(IO.textContent);
            hasOutput = false;
            op = inputOp;
            expression.textContent = `${a} ${op}`;
        } else if (hasInput) {
            if (!a) {
                // if we don't have a, update it
                a = Number(IO.textContent);
                op = inputOp;
                hasInput = false;
                expression.textContent = `${a} ${op}`
            } else {
                // evaluate the expression
                b = Number(IO.textContent);
                a = operate(a, b, op);
                IO.textContent = a;
                hasInput = false;
                op = inputOp;
                expression.textContent = `${a} ${op}`
            }
        }
    }
    
    function onBackClick() {
        if (hasInput) {
            IO.textContent = IO.textContent.slice(0, -1);
        }
    }

    function onClearClick() {
        input = "";
        a = "";
        b = "";
        op = "";
        hasInput = false;
        hasOutput = false;
        IO.textContent = "";
        expression.textContent = "";
    }

    function onEqualClick() {
        if (hasOutput) {
            a = Number(IO.textContent);
            hasOutput = false;
            expression.textContent = `${a} =`
            hasInput = false;
            hasOutput = true;
        } if (hasInput) {
            if (!a) {
                a = Number(IO.textContent);
                // then input = input
                expression.textContent = `${a} = `;
                hasInput = false;
                hasOutput = true;
            } else { 
                b = Number(IO.textContent);
                output = operate(a, b, op);
                expression.textContent = `${a} ${op} ${b} = `
                IO.textContent = output;
                hasInput = false;
                hasOutput = true;
                b = null;
            }
        }
    }

    function onKeyPress(e) {
        console.log(e.key);
        if (nums.includes(e.key)) {
            processNumberInput(e.key);
        } else {
            switch (e.key) {
                case "*" : processOperatorInput("×"); break;
                case "/" : processOperatorInput("÷"); break;
                case "+" : processOperatorInput("+"); break;
                case "-" : processOperatorInput("-"); break;
                case "Escape" : onClearClick(); break;
                case "Backspace" : onBackClick(); break;
                case "=" : onEqualClick(); break;
                case "Enter" : onEqualClick(); break;
            }
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