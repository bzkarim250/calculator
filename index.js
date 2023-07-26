       let operatorAdded = false;
        let decimalAdded = false;

        // Update display
        function updateDisplay(value) {
            const displayElement = document.querySelector('.display');
            // Limit the displayed value to a maximum of 12 characters
            const displayedValue = value.length > 12 ? value.slice(-12) : value;
            displayElement.textContent = displayedValue;
        }

        function evaluateExpression(expression) {
            try {
                expression = expression.replace(/÷/g, '/').replace(/×/g, '*');

                // Check for division by zero
                if (/\/\s*0/.test(expression)) {
                    return 'Error';
                }

                return new Function('return ' + expression)();
            } catch (error) {
                return 'Error';
            }
        }

        function handleButtonClick(event) {
            const clickedButton = event.target;
            const buttonText = clickedButton.textContent;
            const displayValue = document.querySelector('.display').textContent;

            if (buttonText === 'Clear') {
                updateDisplay('0');
                operatorAdded = false;
                decimalAdded = false;
            } else if (buttonText === 'Delete') {
                if (displayValue.length > 1) {
                    updateDisplay(displayValue.slice(0, -1));
                } else {
                    updateDisplay('0');
                    operatorAdded = false;
                    decimalAdded = false;
                }
            } else if (buttonText === '=') {
                const result = evaluateExpression(displayValue);
                updateDisplay(result);
                operatorAdded = false;
                decimalAdded = false;
            } else {
                if (displayValue === '0' || displayValue === 'Error') {
                    updateDisplay(buttonText);
                } else {
                    if (
                        (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/')
                        && (
                            (displayValue[displayValue.length - 1] === '+')
                            || (displayValue[displayValue.length - 1] === '-')
                            || (displayValue[displayValue.length - 1] === '*')
                            || (displayValue[displayValue.length - 1] === '/')
                        )
                    ) {
                        // single operator
                        return;
                    } else if (buttonText === '.' && decimalAdded) {
                        return;
                    } else {
                        updateDisplay(displayValue + buttonText);
                    }
                }

                if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
                    operatorAdded = true;
                    decimalAdded = false;
                } else if (buttonText === '.') {
                    decimalAdded = true;
                } else {
                    operatorAdded = false;
                }
            }
        }

        // Event listener to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        function handleInput(event) {
            const inputChar = event.type === 'click' ? event.target.textContent : event.key;
            const displayValue = document.querySelector('.display').textContent;

            if (
                !/^[0-9+\-*/.=]$/.test(inputChar) &&       // Allow numeric, operators, '=', and '.'
                !(event.key === 'Backspace' || event.key === 'Delete')  // Allow 'Backspace' and 'Delete'
            ) {
                event.preventDefault();
                return;
            }

            if (inputChar === 'Clear') {
                updateDisplay('0');
                operatorAdded = false;
                decimalAdded = false;
            } else if (inputChar === 'Delete' || inputChar === 'Backspace') {
                if (displayValue.length > 1) {
                    updateDisplay(displayValue.slice(0, -1));
                } else {
                    updateDisplay('0');
                    operatorAdded = false;
                    decimalAdded = false;
                }
            } else if (inputChar === '=') {
                const result = evaluateExpression(displayValue);
                updateDisplay(result);
                operatorAdded = false;
                decimalAdded = false;
            } else {
                if (displayValue === '0' || displayValue === 'Error') {
                    updateDisplay(inputChar);
                } else {
                    if (
                        (inputChar === '+' || inputChar === '-' || inputChar === '*' || inputChar === '/')
                        && (
                            (displayValue[displayValue.length - 1] === '+')
                            || (displayValue[displayValue.length - 1] === '-')
                            || (displayValue[displayValue.length - 1] === '*')
                            || (displayValue[displayValue.length - 1] === '/')
                        )
                    ) {
                        // single operator
                        return;
                    } else if (inputChar === '.' && decimalAdded) {
                        return;
                    } else {
                        updateDisplay(displayValue + inputChar);
                    }
                }

                if (inputChar === '+' || inputChar === '-' || inputChar === '*' || inputChar === '/') {
                    operatorAdded = true;
                    decimalAdded = false;
                } else if (inputChar === '.') {
                    decimalAdded = true;
                } else {
                    operatorAdded = false;
                }
            }
        }

        // handle keyboard inputs
        document.addEventListener('keydown', handleInput);
