
import modalsEvents from "./modalsEvents.js";
import Modal from "./modal.js";
import Form from "./Form.js";
export default function renderModalForm (arr){
    arr.forEach(item => {
        item.addEventListener('click', () => {

            modalsEvents(item)

            new Modal(".modal").openModal();
            if (item.dataset.target == 'addons'){
                new Form(".modal-addons__form").init();
            }
            if (item.dataset.target == 'business-plan'){
                new Form(".form-business").init();
            }

        })
    })
}

