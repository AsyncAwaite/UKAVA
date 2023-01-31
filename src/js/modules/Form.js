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
    surname: {
        en: "Enter the surname:",
        ua: `Введіть прізвище`,
    },
    name: {
        en: "Enter the name:",
        ua: `Введіть ім'я`,
    },
    work: {
        en: "Enter the ...:",
        ua: `Введіть місце роботи`,
    }, role: {
        en: "Enter the ...:",
        ua: `Введіть посаду`,
    },
    region: {
        en: "Enter the ...:",
        ua: `Введіть регіон`,
    },
    organisation: {
        en: "Enter the ...:",
        ua: `Введіть сферу діяльності`,
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
        this.path = `${path}/assets/services/telegramSend.php`;
        this.authPath = `${path}/assets/services/sendPulse.php`;

        this.telInput = this.form.querySelector('#tel') ? this.form.querySelector('#tel') : this.form.querySelector('.tel')
        this.mask = this.telInput ? new IMask(this.telInput, maskOptions) : null;
        this.textarea = this.form.querySelector('textarea') ? this.form.querySelector('textarea') : null;
        this.formData = {
            title: '',
            phone: "",
            surname: "",
            name: "",
            email: "",
            region: '',
            work: '',
            role: '',
            organisation: '',
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
            if (input.name === "surname") {
                this.checkNameInput(input);
            }
            if (input.name === "region") {
                this.checkNameInput(input);
            }
            if (input.name === "work") {
                this.checkNameInput(input);
            }
            if (input.name === "role") {
                this.checkNameInput(input);
            }
            if (input.name === "tel") {

                this.checkPhoneInput(input);
            }
            if (input.name === "organisation") {

                this.checkNameInput(input);
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
        btn.innerHTML = `<span class="txt-upper">${!isEn ? ua : en}</span>`;
        this.form.reset();
        if (this.form.dataset.formQuestion) return;
        this.inputs.forEach((input) => {
            input.parentNode.classList = "form__item";
            input.value = '';
            if (input.name == 'tel') {
                this.mask.updateValue();
            }
        });
        this.checkInputs();
    }

    checkEmailInput(input) {
        let {email: {en, ua}} = content;
        let email = !isEn ? ua : en
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
        let template = !isEn ? ua : en;
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
                let field = !isEn ? ua : en;
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
            tel: null,
            surname: null,
            email: null
        };
        let validInputs = false;
        let field = !isEn ? ua : en;
        this.inputs.forEach((input) => {
            if (input.name === "work" || input.name === "role" || input.name === "region") {
                validator = {
                    region: null,
                    work: null,
                    role: null, ...validator
                };
            }
        })
        this.inputs.forEach((input) => {

            if (input.name === "name" || input.name === "surname" || input.name === "work" || input.name === "role" || input.name === "organisation" || input.name === "region") {
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
            } else if (input.name === "tel") {
                if (input.value.indexOf("_") === -1) {
                    this.valid(input);
                    input.nextElementSibling.nextElementSibling.innerText = "";

                    validator.tel = true;
                    return (isValid = true);
                } else {
                    input.parentNode.classList.add("invalid");
                    input.nextElementSibling.nextElementSibling.innerHTML = `${
                        field
                    }`;

                    validator.tel = false;
                    return (isValid = false);
                }
            } else if (input.name === "email") {
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
                if (btn.dataset.trigger == 'school-of-ministers') {
                    fbq('track', 'CompleteRegistration');
                }
                let date = new Date,
                    dateRegistration = [date.getFullYear(), date.getMonth() + 1,
                        date.getDate(),
                    ].join('-');
                let utm = {};
                this.getUtmParameter(location.search, utm);
                let chanel = 'Organic';

                function chanelContent(string) {
                    switch (true) {
                        case new RegExp(`facebook`, 'i').test(string):
                            return 'Facebook';

                        case new RegExp(`instagram`, 'i').test(string):
                            return 'Instagram';
                        case new RegExp(`email`, 'i').test(string):
                            return 'Email';

                        case new RegExp(`SMI`, 'i').test(string):
                            return 'SMI';
                        case new RegExp(`SMS`, 'i').test(string):
                            return 'SMS';
                        case new RegExp(`Viber`, 'i').test(string):
                            return 'Viber';
                        case new RegExp(`LOM`, 'i').test(string):
                            return 'LOM';
                        case new RegExp(`GoogleADS`, 'i').test(string):
                            return 'Google ADS';
                        case new RegExp(`TelegramChanels`, 'i').test(string):
                            return 'Telegram Chanels';
                        default:
                            return 'Organic'
                    }
                }

                if (utm.source) {
                    chanel = chanelContent(utm.source)
                }


                let formContact =
                    {
                        "firstName": this.formData.name,
                        "lastName": this.formData.surname,
                        "phones": [
                            +this.formData.phone.replace(/[^0-9]/g, "")
                        ],
                        "emails": [
                            this.formData.email
                        ],
                        "attributes": [
                            {
                                "name": "імя",
                                "value": this.formData.name,
                                "type": 0
                            },
                            {
                                "name": "прізвище",
                                "value": this.formData.surname,
                                "type": 0
                            },
                            {
                                "name": "посилання",
                                "value": location.href,
                                "type": 3
                            },
                            {
                                "name": "Дата реєстрації",
                                "value": dateRegistration,
                                "type": 2
                            },
                            {
                                "name": "Канал трафіку",
                                "value": chanel,
                                "type": 4
                            },
                        ],

                    }
                for (let key in utm) {
                    if (key) {

                        let obj = {
                            "name": `utm_${key}`,
                            "value": utm[key],
                            "type": 0
                        }
                        formContact.attributes = [obj, ...formContact.attributes]

                    }
                }


                const auth = await fetch(this.authPath, {
                    method: "POST",
                });
                const {token_type, access_token} = await auth.json();
                const contact = await fetch('https://api.sendpulse.com/crm/v1/contacts', {
                    method: "POST",
                    body: JSON.stringify(formContact),
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `${token_type} ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const newContact = await contact.json();
                const dealData = {
                    "pipelineId": getElement('.page-container').dataset.deal,
                    "stepId": getElement('.page-container').dataset.dealStep,
                    "contact": {
                        "id": newContact.data.id,
                    },
                    'status': 1,
                    "attributes": [


                        {
                            "name": "посилання",
                            "value": location.href,
                            "type": 3
                        },

                        {
                            "name": "Канал трафіку",
                            "value": chanel,
                            "type": 4
                        }, {
                            "name": "Назва курсу",
                            "value": this.formData.title,
                            "type": 4
                        },
                    ],

                }
                let event_label = location.pathname.replaceAll("/", "");
                if (event_label.match("25-11")) {
                    event_label = event_label.replaceAll("webinar", "");
                }
                if (!event_label) {
                    event_label = 'home'
                    gtag('event', 'submit', {
                        'event_category': 'form',
                        'event_label': event_label,
                    });
                    location.href = `${location.origin}/thank-you`
                }

                const deal = await fetch(`https://api.sendpulse.com/crm/v1/deals`, {
                    method: 'POST',
                    body: JSON.stringify(dealData),
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `${token_type} ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                })

                // const newDeal = await deal.json()

                let success = await deal.json();

                if (success.success) {
                    fbq('track', 'Contact');
                    gtag('event', 'submit', {
                        'event_category': 'form',
                        'event_label': event_label,
                    });
                    location.href = `${location.origin}/thank-you`
                }


            }


        } catch (error) {
            btn.dataset.form = 'erorr';
            modalsEvents(btn);
            new Modal(".modal__form-answer").openModal();
            this.resetForm(btn);

            console.error("Ошибка:", error);
        }
    }

    getUtmParameter(url, object) {
        if (url) {
            let urlValues;
            urlValues = url.substr(1).split("&");

            const values = urlValues.map((value) => value.split("="));
            values.forEach((item) => {
                const regex = /utm_/i;
                let name = item[0].replace(regex, "");
                object[`${name}`] = item[1]
            });
            return true;
        }
        return false;
    };

    checkNameInput(input) {
        let name = !isEn ? content[input.name].ua : content[input.name].en;
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


                e.submitter.classList.add("disabled");
                e.submitter.innerHTML = `<svg class="icon">
        <use xlink:href="#spinner"></use>
      </svg>`;
                if (!e.submitter.dataset.test) {
                    this.sendToSheet(this.formData);
                }
                this.postData(this.path, this.formData, e.submitter);
            }
        });
    }
}

export default Form;

