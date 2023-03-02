import IMask from "imask";
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import {getElement} from "./helpers.js";

// const content = {
//   field: "Поле обов'язкове для заповнення",
//   template: "Заповніть відповідно до шаблону",
//
//   send: "Відправити",
//
//   name: `Введіть ім'я`,
//
//   thankTitle: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
// };
let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const content = {
    field: {
        en: "This field is required",
        ua: "Поле обов'язкове для заповнення",
    },
    template: {
        en: "Fill in according to the template",
        ua: "Заповніть відповідно до шаблону",
    },
    send: {
        en: "Send",
        ua: "Відправити",
    },
    name: {
        en: "Enter the name:",
        ua: `Введіть ім'я`,
    },

    email: {
        en: "Fill in according to the template: test@tect.com",
        ua: `Заповніть відповідно до шаблону: test@tect.com`,
    },

    thankTitle: {
        en: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
        ua: "Дякуємо, ми зв'яжемося з Вами найближчим часом!",
    },
};
let maskOptions = {
    mask: "+38 (000) 000 - 00 - 00",
    lazy: false,
};

class Form {
    constructor(form) {
        this.form = document.querySelector(form);
        this.inputs = this.form.querySelectorAll("input");
        // this.path = `${path}/assets/services/telegramSend.php`;
        this.path = `/assets/services/telegramSend.php`;

        this.telInput = this.form.querySelector('#phone') ? this.form.querySelector('#phone') : this.form.querySelector('.phone')
        this.mask = new IMask(this.telInput, maskOptions);
        this.textarea = this.form.querySelector('textarea') ? this.form.querySelector('textarea') : null;
        this.formData = {
            title: '',
            phone: "",
            name: "",
            email: "",
            link: location.href
        };
    }

    createMask(input) {
        let maskOptions = {
            mask: "+38 (000) 000 - 00 - 00",
            lazy: false,
        };
        let mask = new IMask(input, maskOptions);
        mask.updateValue();
    }

    checkInputs() {

        this.inputs.forEach((input) => {
            if (input.name === "name") {
                this.checkNameInput(input);
            }
            if (input.name === "phone") {
                this.checkPhoneInput(input);
            }
            if (input.name === 'email') {
                this.checkEmailInput(input)
            }
        });
        // if (this.textarea) {
        //     this.textarea.addEventListener('input', () => {
        //         console.log(this.textarea.value)
        //     })
        // }
    }

    resetForm(btn) {
        this.formData = {
            title: '',
            phone: "",
            surname: "",
            name: "",
            email: "",
            link: location.href
        };
        let {send: {ua, en}} = content;
        btn.dataset.form = '';
        btn.classList.remove("disabled");
        btn.innerHTML = `<span class="txt-upper">${ua}</span>`;
        this.form.reset();
        if (this.form.dataset.formQuestion) return;
        this.inputs.forEach((input) => {
            input.parentNode.classList = "form__item";
            input.value = '';
            if (input.name == 'phone') {
                this.mask.updateValue();
            }
        });
        this.checkInputs();
    }

    checkEmailInput(input) {
        let {email: {en, ua}} = content;
        let email = ua;
        let isValid = false;

        input.addEventListener("input", () => {
            if (input.value.match(validRegex)) {
                this.valid(input);
                isValid = true;
                this.formData.email = input.value;
            } else {
                this.invalid(input);
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.nextElementSibling.innerHTML = `${
                    email
                }`;
            } else {
                input.nextElementSibling.nextElementSibling.innerText = "";
            }
        });
    }

    checkPhoneInput(input) {
        let {template: {en, ua}} = content;
        let template = ua;
        let isValid = false;
        this.mask.updateValue()

        input.addEventListener("input", () => {
            if (input.value.indexOf("_") === -1) {
                this.valid(input);
                this.formData.phone = input.value.substr(1);
                isValid = true;
            } else {
                this.invalid(input);
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.nextElementSibling.innerHTML = `${template}`;
            } else {
                input.nextElementSibling.nextElementSibling.innerText = "";
            }
        });
    }

    valid(input) {
        input.parentNode.classList.add("valid");
        input.parentNode.classList.remove("invalid");
    }

    invalid(input) {
        input.parentNode.classList.add("invalid");
        input.parentNode.classList.remove("valid");
    }

    validateEmptyField() {
        let {field: {ua, en}} = content;
        let isValid = true;
        if (this.form.dataset.formQuestion) {
            if (!this.textarea.value.trim()) {
                let field = ua;
                this.textarea.nextElementSibling.innerHTML = `${
                    field
                }`;
                return (isValid = false);
            } else {
                this.textarea.nextElementSibling.innerText = "";
                return (isValid = true);
            }
        }
        let validator = {
            name: null,
            phone: null,
            email: null
        };
        let validInputs = false;
        let field = ua;
        this.inputs.forEach((input) => {

            if (input.name === "name") {
                if (!input.value.trim()) {
                    input.parentNode.classList.add("invalid");
                    input.nextElementSibling.nextElementSibling.innerHTML = `${
                        field
                    }`;
                    return (isValid = false);
                } else {
                    this.valid(input);
                    input.nextElementSibling.nextElementSibling.innerText = "";

                    validator[input.name] = true;
                    return (isValid = true);
                }
            }
            if (input.name === "phone") {
                if (input.value.indexOf("_") === -1) {
                    this.valid(input);
                    input.nextElementSibling.nextElementSibling.innerText = "";

                    validator.phone = true;
                    return (isValid = true);
                } else {
                    input.parentNode.classList.add("invalid");
                    input.nextElementSibling.nextElementSibling.innerHTML = `${
                        field
                    }`;

                    validator.phone = false;
                    return (isValid = false);
                }
            }
            if (input.name === "email") {
                if (!input.value.match(validRegex)) {
                    input.parentNode.classList.add("invalid");
                    input.nextElementSibling.nextElementSibling.innerHTML = `${
                        field
                    }`;
                    return (isValid = false);
                } else {
                    this.valid(input);
                    input.nextElementSibling.nextElementSibling.innerText = "";

                    validator.email = true;
                    return (isValid = true);
                }
            }
        });
        for (let key in validator) {
            if (!validator[key]) return validInputs = false;
            validInputs = true;
        }
        if (validInputs) {
            return isValid;
        }
    }

    async sendToSheet(data) {
        try {
            const sheetsData = new FormData();
            for (let key in data) {
                sheetsData.append(`${key}`, `${data[key]}`);
            }
            const result = await fetch(
                "https://script.google.com/macros/s/AKfycbwFLvu7MShp9xsydD7exK7pLzre6plmHZWocCt94Xzsy_6KCvGWnk37WJqPBgQEzX1E/exec",
                {
                    method: "POST",
                    body: sheetsData,
                }
            );
            console.log(result)
        } catch (e) {
            console.log(e);
        }


    }


    async postData(url, data, btn) {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            //
            if (this.form.dataset.formQuestion) {
                btn.dataset.form = 'success';
                modalsEvents(btn);
                new Modal(".modal__form-answer").openModal();
                this.resetForm(btn);
            } else {


                location.href = `${location.origin}/thank-you`

            }


        } catch (error) {
            btn.dataset.form = 'erorr';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);

            console.error("Ошибка:", error);
        }
    }

    checkNameInput(input) {
        let name = content[input.name].ua;
        let isValid = false;
        input.addEventListener("keypress", function (e) {
            if (!e.key.match(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґЁёЭэЪъ\s]/)) {
                e.preventDefault();
            }
        });
        input.addEventListener("input", () => {
            if (input.value.length >= 2) {
                this.valid(input);
                this.formData[input.name] = input.value.trim();
                isValid = true;
            } else {
                this.invalid(input);
                this.formData[input.name] = ''
                isValid = false;
            }
            if (!isValid) {
                input.nextElementSibling.nextElementSibling.innerHTML = `${name}`;
            } else {
                input.nextElementSibling.nextElementSibling.innerText = "";
            }
        });
    }

    init() {
        this.checkInputs();
        this.form.addEventListener("submit", (e) => {
            this.formData.title = this.form.dataset.form;
            e.preventDefault();
            if (this.validateEmptyField()) {
                if (this.textarea) {
                    this.formData.textarea = this.textarea.value;
                    if (this.form.dataset.formQuestion) {
                        this.formData.formQuestion = 1;
                    }


                }
                if (this.form.querySelectorAll('.modal-addons__item').length) {
                    this.formData.addons = [];
                    this.form.querySelectorAll('.modal-addons__item').forEach(item => {
                        if (item.classList.contains('active')) {
                            const name = item.querySelector('.name').innerText;
                            const count = item.querySelector('.count');
                            this.formData.addons = [`${name} - ${count.firstElementChild.innerText} ${count.lastElementChild.innerText}`, ...this.formData.addons];
                        }
                    })
                    this.formData.addons = this.formData.addons.join('; ')
                }

                e.submitter.classList.add("disabled");
                e.submitter.innerHTML = `<span class="spinner-btn">
<svg class="icon">
        <use xlink:href="#spinner"></use>
      </svg>
</span>`;
                if (!e.submitter.dataset.test) {
                    // this.sendToSheet(this.formData);
                }
                console.log(this.formData)
                // this.postData(this.path, this.formData, e.submitter);
            }
        });
    }
}

export default Form;

