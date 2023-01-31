
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import Form from "./Form.js";
export default function renderModalForm (arr){
    arr.forEach(item => {
        item.addEventListener('click', () => {

            modalsEvents(item)
            new Modal(".modal__form").openModal();
            new Form(".form-modal").init();
        })
    })
}

