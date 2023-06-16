class Validar {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-validationCPF'
        ]
    }

    validate(form) {
        let clearvalidations = document.querySelectorAll('form .error-validation');
        if (clearvalidations.length > 0) {
            this.closeValidations(clearvalidations);
        }

        let inputs = form.getElementsByTagName('input');
        let inputsArray = [...inputs];

        inputsArray.forEach(function (input) {
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {
                    let metodo = this.validations[i].replace('data-', '').replace('-', '');
                    let value = input.getAttribute(this.validations[i]);
                    this[metodo](input, value);
                }
            }
        }, this);

    }

    required(input) {
        let inputValue = input.value;
        let errorsInputreq = input.style.border = '2px solid #e63636';
        if (inputValue == '') {
            this.printMessage(input, 'Insira seu CPF');
            errorsInputreq;
            document.getElementById('check').style.display = 'none';

        } else if (inputValue !== '') {
            errorsInputreq = input.style.border = '';

        }


    }

    minlength(input, minValue) {
        let inputLength = input.value.length;
        let errorsInputreq = input.style.border = '2px solid #e63636';
        if (inputLength < minValue) {
            this.printMessage(input, `CPF deve conter ${minValue} digitos.`);
            errorsInputreq;
            document.getElementById('check').style.display = 'none';

        } else if (inputLength >= minValue) {
            errorsInputreq = input.style.border = '';

        }
    }


    validationCPF(input) {
        const cpf = new ValidateCPF(input.value)
        let errorsInputreq = input.style.border = '2px solid #e63636';

        if (!cpf.valida()) {
            this.printMessage(input, 'CPF invalido');
            document.getElementById('check').style.display = 'none';
            return false;
        } else {
            errorsInputreq = input.style.border = '2px solid #11e268';
            document.getElementById('check').style.display = 'inline-block';

        }

        return true
    }


    printMessage(input, msg) {
        const errorsQtd = input.parentNode.querySelector('.error-validation');

        if (errorsQtd === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }

    closeValidations(validations) {
        validations.forEach(removal => removal.remove());
    }

}

const form = document.getElementById("registerCPF");
const submit = document.getElementById("btnValidate");
const input = (document.getElementById("cpf"))
const validar = new Validar();


submit.addEventListener('click', function (e) {
    e.preventDefault();

    validar.validate(form);

});

input.addEventListener("keyup", function (e) {
    var v = e.target.value.replace(/\D/g, "");

    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    v = v.replace(/(\d{3})(\d)/, "$1.$2");

    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = v;
})