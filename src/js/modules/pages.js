import {getElement, getElements} from "./helpers.js";
import renderModalForm from "./renderModalForm.js";
export default function pages() {
const pages = ['charity', 'school-of-ministers', 'webinar','webinar-type', 'information-space', 'singapoore', 'community', 'webinar-new', 'webinar-reporting-organization' ]
    pages.forEach(item => {

        if (getElement(`.${item}`)) {
            renderModalForm(getElements(`[data-trigger="${item}"]`));
            if (getElement(`.${item}`).dataset.charity) {
                renderModalForm(getElements('[data-trigger="volunteering-charity-money"]'));
            }
        };
    })
}