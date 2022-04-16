// Function to validate form
function formValidation() {
    const form = document.querySelector('form');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const name = document.getElementById('name');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const country = document.getElementById('country');
    const postal = document.getElementById('postal');
    
    // Show input error message
    function showError(input, message) {
        const formControl = input.parentElement.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('.message');
        small.innerText = message;
        small.style.display = 'unset';
    }
    
    // Show success outline 
    function showSuccess(input) {
        const formControl = input.parentElement.parentElement;
        const small = formControl.querySelector('.message');
        formControl.className = 'form-control success';
        if (small.style.display === 'unset') {
            small.style.display = 'none';
        };
    }
    
    // Check email validation
    function checkEmail(input) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid');
        }
    }
    
    // Check phone number validation
    function checkNumber(input) {
        let check = false;
        let number = parseInt(input.value);
        if (Number.isInteger(number)) {
            showSuccess(input);
            check = true;
            return check;
        } else {
            showError(input, 'Phone number must be a number');
            return check;
        }
    }
    
    // Check if alphabetical characters only
    function checkAlfa(input) {
        let check = false;
        const alfa = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/;
        if (alfa.test(input.value.trim())) {
            showSuccess(input);
            check = true;
            return check;
        } else {
            showError(input, 'Name can only be letters of the alphabet');
            return check;
        }
    }
    
    // Check Required field
    function checkRequired(inputArr) {
        let check = false;
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
                return check;
            } else {
                showSuccess(input);
                check = true;
                return check;
            }
        })
        return check;
    }
    
    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        } else {
            showSuccess(input);
        }
    }
    
    // Get field name
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Event listener
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (checkRequired([email, phone, name, address, city, country, postal])) {
            checkLength(address, 6, 90);
            checkLength(city, 3, 35);
            checkLength(postal, 4, 16);
            checkEmail(email);
            if (checkAlfa(name)) {
                checkLength(name, 3, 50);
            }
            if (checkNumber(phone)) {
                checkLength(phone, 10, 13);
            }
        }
    })
}

// Function for managing a shopping cart
function shoppingCartInformation() {
    const decrease = document.querySelectorAll('.item-amount div:nth-of-type(1)');
    const increase = document.querySelectorAll('.item-amount div:nth-of-type(2)');
    const total = document.querySelector('.cart-total-price span');
    let shippingPrice = parseFloat(document.querySelector('.shipping-price span').innerText);
    let allItemInCart = Array.prototype.slice.call(document.querySelectorAll('.amount'));

    // Check if all items in cart are empty
    const isEmptyInCart = (element) => {
        if (element.innerText < 1) {
            return true;
        } return false;
    };

    // Listener function to set the number of values ​​in the shopping cart
    function incartAmount() {
        const amount = this.parentElement.querySelector('.amount');
        let amountInCart = amount.innerText;
        let price = parseFloat(this.parentElement.parentElement.querySelector('.price span').innerText);
        let priceTotal = parseFloat(total.innerText);
        let newTotalPrice = 0;

        // Check whether the user reduces the item or adds the item
        if (this.querySelector('span').classList.contains('add-icon')) {
            amount.innerText = parseInt(amountInCart) + 1;
            if (priceTotal > 0) {
                newTotalPrice = priceTotal + price;
                total.textContent = newTotalPrice.toFixed(2);
            } else {
                newTotalPrice = shippingPrice + price;
                total.textContent = newTotalPrice.toFixed(2);
            }
        } else {
            if (amountInCart > 0 ) {
                amount.innerText = parseInt(amountInCart) - 1;
                if (priceTotal > 0) {
                    newTotalPrice = priceTotal - price;
                    total.textContent = newTotalPrice.toFixed(2);
                }
            }
        }

        // Check if all items are empty
        if (allItemInCart.every(isEmptyInCart)) {
            total.textContent = 0;
        }
    }

    // Event listener
    increase.forEach(button => {
        button.addEventListener('click', incartAmount);
    });
    decrease.forEach(button => {
        button.addEventListener('click', incartAmount);
    });
}

// Execute all existing functions
shoppingCartInformation();
formValidation();