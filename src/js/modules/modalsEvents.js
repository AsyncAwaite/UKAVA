// import { modalBody, modal } from "./elements";


import {modal, modalBody} from "./elements.js";

export default function modalsEvents(target) {
    if (target.hasAttribute('data-speaker-descr')) {
        renderDescrModal(target);
    }
    if (target.hasAttribute('data-review')) {
        renderReviewModal(target);
    }
    if (target.hasAttribute('data-form')) {
        renderFormAnswer(target)
    }
    if (target.hasAttribute('data-trigger')) {
        renderFormModal(target)
    }
    if (target.hasAttribute('data-form-question')) {
        renderFormAnswer(target);
    }


}

function renderReviewModal(target) {
    let {author, course, review} = reviews.find(({postId}) => postId == target.dataset.review);
    modal.classList.add('modal__review');
    modalBody.classList.add('review')
    modalBody.innerHTML = `
            <div class="reviews-item bgc_ac txt-primary flex --dir-col ">
        <div class="txt-medium  reviews-item__title mb-15">
        <div>${!isEn ? 'Курс:' : 'Course:'}</div>
    <div>${course}</div>
</div>
    <div class="reviews-item__text txt-sm mb-20">
        ${review}



    </div>
    <div class="reviews-item__footer flex --just-end">

        <div class="reviews-item__author fz__text">
            ${author}
            
        </div>
    </div>

</div>
            `
    modalBody.nextElementSibling.innerHTML = `<svg class="icon">
                <use xlink:href="#close"></use>
            </svg>`
}

function renderDescrModal(target) {
    let nameKey = !isEn ? 'name' : 'name_en';
    let speaker = speakers.find(el => el[nameKey] === target.dataset.speakerDescr);
    let name = !isEn ? speaker.name : speaker.name_en;
    let descr = !isEn ? speaker.desr : speaker.desr_en;
    modal.classList.add('modal__speaker-descr');
    modalBody.classList.add('speaker')
    modalBody.innerHTML = `
            <div class="name">
                ${name}
            </div>
            <div class="descr">
             ${descr}
            </div>   
            `
}

function renderFormModal(target) {
    let title = '';
    switch (target.dataset.trigger) {
        case 'singapoore':
            title = '"Сінгапурська школа Державного управління"';
            break;
        case 'school-of-ministers':
            title = '"Школа міністрів"';
            break;
        case 'charity':
            title = '"Благодійність. Де і як шукати гроші на свої проєкти"';
            break;
        case 'volunteering-charity-money':
            title = '"ВОЛОНТЕРСТВО. БЛАГОДІЙНІСТЬ. ГРОШІ."';
            break;
        case 'webinar':
            title = '"Вебінар"';
            break;
        case 'webinar-new':
            title = 'ГРОМАДСЬКІ ТА БЛАГОДІЙНІ ОРГАНІЗАЦІЇ: ЗВІТНІСТЬ та ОПОДАТКУВАННЯ';
            break;
        case 'webinar-type':
            title = `"${target.dataset.lectionType}"`;
            break;
        case 'information-space':
            title = '"Як влаштований інформпростір 21 століття"';
            break;
        case 'community':
            title = '"Стійкість громад в умовах військової агресіі-modal-modal"';
            break;
        case 'webinar-reporting-organization':
            title = '"ЗВІТУВАННЯ ГРОМАДСЬКИХ ТА БЛАГОДІЙНИХ ОРГАНІЗАЦІЙ. ГУМАНІТАРНА ДОПОМОГА: ОФОРМЛЕННЯ, ОБЛІК, ЗВІТНІСТЬ"';
            break;
        default:
            title = 'з головної сторінки';
            break
    }
    //
    modal.classList.add('modal__form');
    modalBody.classList.add('modal-form', 'bgc_ac')
    let formTitle, formName, formSurname, formMob, formEmail, formBtn, formRegion, formWork, formRole, formActivity, formActivityItems, formSources;
    if (!isEn) {
        formTitle = 'Заповніть форму нижче';
        formName = 'Імʼя';
        formSurname = 'Прізвище';
        formMob = 'Номер телефону';
        formEmail = 'Email';
        formBtn = 'відправити';
        formRegion = 'Регіон';
        formWork = "Місце роботи";
        formRole = "Посада";
        formActivity='Сфера діяльності';
        formActivityItems='(ГО / БФ / БО)';
        formSources = "Якими профільними джерелами інформації ви користуєтесь"
    } else {
        formTitle = 'COMPLETE THE FORM BELOW';
        formName = 'Name';
        formSurname = 'Surname';
        formMob = 'Phone number';
        formEmail = 'Email';
        formBtn = 'SEND';
        formRegion = 'Region';
        formWork = "Workplace";
        formRole = "Position"
        formActivity='Field of activity';
        formActivityItems='(NGO / CF / CO)';
        formSources = "Sources of information you are using"

    }
    //
    modalBody.innerHTML = `
                  <h3 class="txt-white txt-upper">
                  <span>${!isEn ? 'ЗалишАЙТЕ ЗАЯВКУ НА НАВЧАННЯ,' : 'Apply to study -'}</span><span>${!isEn ? 'щоб забронювати місце' : 'book participation'} </span>
                  </h3>
                  <form class="form form_bgc-ac form-modal"  data-form='Форма ${title}'>
                        <h4 class="form__title txt-upper pos-r">
                            ${formTitle}
                        </h4>
                        <div class="form__items">
                            <div class="form__item">
                                <input type="text" id="name-modal" name="name">
                                <label for="name-modal">${formName}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="surname-modal" name="surname">
                                <label for="surname-modal">${formSurname}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="tel" name="tel">
                                <label for="tel" class="label__tel">${formMob}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="email-modal" name="email">
                                <label for="email-modal">${formEmail}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__btn">
                                <button class="btn" type="submit" data-form data-success="${target.dataset.trigger}">
                                    <span class="txt-upper">
                                    ${formBtn}
                                    </span>
                                </button>
                            </div>
                        </div>
                  </form>
    `;

    if (target.dataset.trigger == 'webinar') {
        modalBody.parentElement.classList.add('modal-webinar')
        modalBody.innerHTML = `
                  <h3 class="txt-white txt-upper">
                  ${!isEn ? 'реєструйтесь для перегляду вебінару' : 'REGISTER TO WATCH WEBINAR'}
                  
                  </h3>
                  <form class="form form_bgc-ac form-modal"  data-form='Форма ${title}'>
                        <h4 class="form__title txt-upper pos-r">
                        ${formTitle}

                        </h4>

                        <div class="form__items">
                           <div class="form__item">
                                <input type="text" id="name-modal" name="name">
                                <label for="name-modal">${formName}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="surname-modal" name="surname">
                                <label for="surname-modal">${formSurname}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="tel" name="tel">
                                <label for="tel" class="label__tel">${formMob}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="email-modal" name="email">
                                <label for="email-modal">${formEmail}</label>
                                <div class="form__message"></div>
                            </div>
                            
                              <div class="form__item">
                                <input type="text" id="region-modal" name="region">
                                <label for="region-modal">${formRegion}</label>
                                <div class="form__message"></div>

                            </div>
                            <div class="form__item">
                                <input type="text" id="work-modal" name="work">
                                <label for="work-modal">${formWork}</label>
                                <div class="form__message"></div>

                            </div>
                            <div class="form__item">
                                <input type="text" id="role-modal" name="role">
                                <label for="role-modal">${formRole}</label>
                                <div class="form__message"></div>

                            </div>
                            <div class="form__btn">
                                <button class="btn" type="submit" data-form data-success="${target.dataset.trigger}">
                                    <span class="txt-upper">
                               ${formBtn}
                                    </span>
                                </button>

                            </div>
                        </div>
                    </form>
    `;
    }
    if (target.dataset.trigger == 'webinar-new' || target.dataset.trigger == 'webinar-reporting-organization') {

        modalBody.parentElement.classList.add('modal-webinar')

        modalBody.innerHTML = `
                  <h3 class="txt-white txt-upper">
                  ${target.dataset.trigger == 'webinar-reporting-organization' ? !isEn ? 'ЗАЛИШАЙТЕ ЗАЯВКУ НА НАВЧАННЯ ВЖЕ ЗАРАЗ' : ' APPLY TO STUDY NOW ' : !isEn ? 'реєструйтесь для перегляду вебінару' : 'REGISTER TO WATCH WEBINAR'}
               

                  </h3>
                  <form class="form form_bgc-ac form-modal"  data-form='Форма ${title}'>
                        <h4 class="form__title txt-upper pos-r">
                          ${formTitle}

                        </h4>

                        <div class="form__items">
                       <div class="form__item">
                                <input type="text" id="name-modal" name="name">
                                <label for="name-modal">${formName}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="surname-modal" name="surname">
                                <label for="surname-modal">${formSurname}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="tel" name="tel">
                                <label for="tel" class="label__tel">${formMob}</label>
                                <div class="form__message"></div>
                            </div>
                            <div class="form__item">
                                <input type="text" id="email-modal" name="email">
                                <label for="email-modal">${formEmail}</label>
                                <div class="form__message"></div>
                            </div>
                                <div class="form__item">
                            <input type="text" id="organisation" name="organisation">
                            <label for="organisation">
                                <span>${formActivity}</span>
                                <span class="txt-sm">${formActivityItems}</span>

                            </label>
                            <div class="form__message"></div>

                        </div>

                        <div class="form__item">
                                <span>${formSources}
                         </span>


                            <textarea id="text"></textarea>
                            <div class="form__message"></div>
                        </div>
                        
                            <div class="form__btn">
                                <button class="btn" type="submit" data-form data-success="${target.dataset.trigger}">
                                    <span class="txt-upper">
                                  ${formBtn}
                                    </span>
                                </button>

                            </div>
                        </div>
                        
                    </form>
    `;
    }
    modalBody.nextElementSibling.innerHTML = `<svg class="icon">
                <use xlink:href="#close"></use>
            </svg>`
}

function renderFormAnswer(target) {
    modal.classList.add('modal__form-answer');
    modalBody.classList.add('form-answer', 'flex', '--justify-center', '--align-center', '--dir-col');
    let title, subtitle;
    if (target.dataset.form == 'success') {
        title = !isEn ? 'дякуюємо!' : 'thank you!';
        subtitle = !isEn ? 'Ваше питання успішно доставлено!' : '';
    } else {
        title = !isEn ? 'Упс...!' : '...';
        subtitle = !isEn ? "Виникла помилка! Спробуйте пізніше!" : '';
    }
    modalBody.innerHTML = `

           <div class="logo mb-40">
                <svg class="icon"  viewBox="0 0 102 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.0354 24.9178L50.4588 0.300781L92.892 24.9178L91.3034 27.6673L50.4588 3.96673L9.60448 27.6673L8.0354 24.9178Z" fill="#9BC4E2"/>
                    <path d="M7.42871 55.2151H8.04436V57.8774H7.42871V55.2151ZM11.8009 57.0531L12.7143 55.2151H13.5037V57.8774H12.888V56.1693L12.0394 57.8774H11.5624L10.7137 56.1693V57.8774H10.098V55.2151H10.8875L11.8009 57.0531ZM18.0386 56.2733V56.7913H16.1528V57.3408H18.1367V57.8774H15.5371V55.2151H18.1182V55.7516H16.1528V56.2733H18.0386ZM22.348 55.2151H22.9637V57.8774H22.348V56.7876H20.7486V57.8774H20.133V55.2151H20.7486V56.251H22.348V55.2151ZM25.0172 55.2151H25.6329V57.8774H25.0172V55.2151ZM30.8607 56.5463C30.8607 56.6601 30.8816 56.7696 30.9235 56.8748C30.9654 56.9789 31.0314 57.071 31.1213 57.1515C31.2125 57.2307 31.3297 57.2945 31.4726 57.3427C31.6168 57.3909 31.7907 57.4151 31.9941 57.4151C32.121 57.4151 32.2387 57.404 32.3472 57.3817C32.4556 57.3594 32.55 57.3346 32.6301 57.3074C32.7237 57.2752 32.8089 57.2387 32.8852 57.1979L33.1792 57.6305C33.1053 57.6911 33.0116 57.745 32.8982 57.792C32.8501 57.8118 32.7952 57.8315 32.7337 57.8514C32.672 57.87 32.6036 57.8866 32.5284 57.9015C32.4544 57.9164 32.3724 57.9281 32.2825 57.9368C32.1937 57.9467 32.0976 57.9517 31.9941 57.9517C31.6933 57.9517 31.4319 57.9145 31.2101 57.8402C30.9894 57.7647 30.8058 57.6633 30.6591 57.5357C30.5136 57.4071 30.4052 57.258 30.3337 57.0884C30.2622 56.9176 30.2265 56.7368 30.2265 56.5463C30.2265 56.3556 30.2622 56.1755 30.3337 56.0059C30.4052 55.8352 30.5136 55.686 30.6591 55.5586C30.8058 55.4298 30.9894 55.3284 31.2101 55.2541C31.4319 55.1786 31.6933 55.1409 31.9941 55.1409C32.0976 55.1409 32.1937 55.1458 32.2825 55.1556C32.3724 55.1643 32.4544 55.1767 32.5284 55.1928C32.6036 55.2077 32.672 55.225 32.7337 55.2448C32.7952 55.2634 32.8501 55.2825 32.8982 55.3023C33.0116 55.3493 33.1053 55.4026 33.1792 55.462L32.8852 55.8946C32.8089 55.8549 32.7237 55.8191 32.6301 55.7869C32.55 55.7597 32.4556 55.7349 32.3472 55.7126C32.2387 55.6892 32.121 55.6774 31.9941 55.6774C31.7907 55.6774 31.6168 55.7015 31.4726 55.7498C31.3297 55.798 31.2125 55.8624 31.1213 55.9428C31.0314 56.0221 30.9654 56.1142 30.9235 56.2195C30.8816 56.3247 30.8607 56.4336 30.8607 56.5463ZM37.605 56.2733V56.7913H35.7191V57.3408H37.703V57.8774H35.1033V55.2151H37.6845V55.7516H35.7191V56.2733H37.605ZM40.315 55.7516V56.5425H41.4225C41.5716 56.5425 41.6826 56.5078 41.7553 56.4385C41.828 56.3692 41.8644 56.2721 41.8644 56.1471C41.8644 56.0221 41.828 55.9249 41.7553 55.8556C41.6826 55.7863 41.5716 55.7516 41.4225 55.7516H40.315ZM39.6993 57.8774V55.2151H41.4225C41.5864 55.2151 41.7338 55.2361 41.8644 55.2782C41.9962 55.319 42.1084 55.3791 42.2009 55.4583C42.2933 55.5375 42.3642 55.6353 42.4135 55.7516C42.4629 55.8668 42.4875 55.9985 42.4875 56.1471C42.4875 56.2956 42.4629 56.4281 42.4135 56.5443C42.3642 56.6595 42.2933 56.7566 42.2009 56.8359C42.1084 56.9151 41.9962 56.9757 41.8644 57.0178C41.7338 57.0586 41.5864 57.079 41.4225 57.079H40.315V57.8774H39.6993ZM47.076 55.2151V55.7516H45.0995V57.8774H44.4838V55.2151H47.076ZM49.0168 55.2151H49.6325V57.8774H49.0168V55.2151ZM53.7699 57.8774V56.9603H52.7918L52.2611 57.8774H51.5752L52.152 56.8804C51.9758 56.821 51.8396 56.7288 51.7434 56.6037C51.6485 56.4775 51.601 56.3148 51.601 56.1155C51.601 55.9979 51.6214 55.8853 51.6621 55.7776C51.7039 55.6687 51.7674 55.5728 51.8525 55.4898C51.9376 55.4057 52.0454 55.3388 52.1761 55.2894C52.308 55.2398 52.4638 55.2151 52.6439 55.2151H54.3855V57.8774H53.7699ZM52.6439 55.7516C52.5637 55.7516 52.4965 55.7615 52.4423 55.7814C52.3893 55.8012 52.3461 55.8278 52.3129 55.8611C52.2809 55.8946 52.2581 55.9336 52.2444 55.9781C52.2309 56.0215 52.2241 56.0672 52.2241 56.1155C52.2241 56.1638 52.2309 56.2102 52.2444 56.2547C52.2581 56.298 52.2809 56.3364 52.3129 56.3699C52.3461 56.4033 52.3893 56.4299 52.4423 56.4497C52.4965 56.4695 52.5637 56.4794 52.6439 56.4794H53.7699V55.7516H52.6439ZM61.2107 55.2151H61.8264V57.8774H61.2107V56.7876H59.6114V57.8774H58.9957V55.2151H59.6114V56.251H61.2107V55.2151ZM66.7329 57.8774H66.1172V55.9428L64.6455 57.8774H63.8616V55.2151H64.4773V57.1496L65.949 55.2151H66.7329V57.8774ZM70.7205 57.8774H70.1049V56.9156C70.0198 56.9342 69.9415 56.9627 69.87 57.0011C69.7998 57.0382 69.7356 57.0809 69.6778 57.1292C69.6211 57.1774 69.5699 57.2295 69.5242 57.2851C69.4799 57.3408 69.4405 57.3966 69.406 57.4522C69.3258 57.5822 69.263 57.7239 69.2173 57.8774H68.6016C68.6461 57.6732 68.7236 57.4795 68.8346 57.2963C68.8815 57.2183 68.9375 57.1391 69.0029 57.0586C69.0682 56.9769 69.1453 56.899 69.234 56.8247C69.3228 56.7504 69.4238 56.6824 69.5372 56.6205C69.6519 56.5574 69.7807 56.5048 69.9237 56.4627C69.825 56.4281 69.7381 56.3884 69.6629 56.3439C69.5889 56.298 69.5212 56.2517 69.4595 56.2046C69.398 56.1576 69.34 56.1112 69.2858 56.0654C69.2328 56.0196 69.1779 55.9788 69.1212 55.9428C69.0657 55.9058 69.0059 55.8753 68.9419 55.8519C68.879 55.8284 68.8068 55.8154 68.7255 55.8129V55.2151C68.8377 55.2151 68.9369 55.2286 69.0232 55.2559C69.1094 55.2832 69.1884 55.319 69.2598 55.3636C69.3313 55.4082 69.398 55.4595 69.4595 55.5177C69.5224 55.5746 69.5859 55.6334 69.65 55.694C69.7153 55.7535 69.7843 55.8122 69.857 55.8705C69.9298 55.9286 70.0124 55.9813 70.1049 56.0283V55.2151H70.7205V56.0283C70.813 55.9813 70.8956 55.9286 70.9683 55.8705C71.0411 55.8122 71.1094 55.7535 71.1735 55.694C71.2388 55.6334 71.3023 55.5746 71.364 55.5177C71.4269 55.4595 71.4941 55.4082 71.5655 55.3636C71.637 55.319 71.7158 55.2832 71.8022 55.2559C71.8885 55.2286 71.9877 55.2151 72.0998 55.2151V55.8129C72.0186 55.8154 71.9458 55.8284 71.8817 55.8519C71.8188 55.8753 71.759 55.9058 71.7023 55.9428C71.6468 55.9788 71.592 56.0196 71.5378 56.0654C71.4848 56.1112 71.4274 56.1576 71.3659 56.2046C71.3042 56.2517 71.2358 56.298 71.1606 56.3439C71.0866 56.3884 71.0004 56.4281 70.9017 56.4627C71.0447 56.5048 71.1729 56.5574 71.2863 56.6205C71.3997 56.6824 71.5008 56.7504 71.5896 56.8247C71.6783 56.899 71.7553 56.9769 71.8207 57.0586C71.8872 57.1391 71.9439 57.2183 71.9908 57.2963C72.1005 57.4795 72.1781 57.6732 72.2237 57.8774H71.6081C71.5624 57.7239 71.4996 57.5822 71.4194 57.4522C71.3849 57.3966 71.3449 57.3408 71.2993 57.2851C71.2548 57.2295 71.2038 57.1774 71.1458 57.1292C71.0891 57.0809 71.0251 57.0382 70.9535 57.0011C70.8832 56.9627 70.8056 56.9342 70.7205 56.9156V57.8774ZM76.3074 55.2151H76.9231V57.8774H76.3074V56.7876H74.7082V57.8774H74.0925V55.2151H74.7082V56.251H76.3074V55.2151ZM80.6519 57.9517C80.3511 57.9517 80.0899 57.9145 79.868 57.8402C79.6474 57.7647 79.4637 57.6633 79.317 57.5357C79.1716 57.4071 79.063 57.258 78.9915 57.0884C78.9201 56.9176 78.8843 56.7368 78.8843 56.5463C78.8843 56.3556 78.9201 56.1755 78.9915 56.0059C79.063 55.8352 79.1716 55.686 79.317 55.5586C79.4637 55.4298 79.6474 55.3284 79.868 55.2541C80.0899 55.1786 80.3511 55.1409 80.6519 55.1409C80.9527 55.1409 81.2134 55.1786 81.434 55.2541C81.6559 55.3284 81.8396 55.4298 81.985 55.5586C82.1317 55.686 82.2408 55.8352 82.3123 56.0059C82.3838 56.1755 82.4195 56.3556 82.4195 56.5463C82.4195 56.7368 82.3838 56.9176 82.3123 57.0884C82.2408 57.258 82.1317 57.4071 81.985 57.5357C81.8396 57.6633 81.6559 57.7647 81.434 57.8402C81.2134 57.9145 80.9527 57.9517 80.6519 57.9517ZM80.6519 57.4151C80.8553 57.4151 81.0285 57.3909 81.1714 57.3427C81.3157 57.2945 81.4328 57.2307 81.5227 57.1515C81.614 57.071 81.6806 56.9789 81.7225 56.8748C81.7644 56.7696 81.7853 56.6601 81.7853 56.5463C81.7853 56.4336 81.7644 56.3247 81.7225 56.2195C81.6806 56.1142 81.614 56.0221 81.5227 55.9428C81.4328 55.8624 81.3157 55.798 81.1714 55.7498C81.0285 55.7015 80.8553 55.6774 80.6519 55.6774C80.4485 55.6774 80.2748 55.7015 80.1305 55.7498C79.9875 55.798 79.8705 55.8624 79.7793 55.9428C79.6892 56.0221 79.6234 56.1142 79.5814 56.2195C79.5395 56.3247 79.5185 56.4336 79.5185 56.5463C79.5185 56.6601 79.5395 56.7696 79.5814 56.8748C79.6234 56.9789 79.6892 57.071 79.7793 57.1515C79.8705 57.2307 79.9875 57.2945 80.1305 57.3427C80.2748 57.3909 80.4485 57.4151 80.6519 57.4151ZM86.9711 55.2151V55.7516H84.9946V57.8774H84.3789V55.2151H86.9711ZM90.5278 57.9517C90.2271 57.9517 89.9658 57.9145 89.7439 57.8402C89.5233 57.7647 89.3396 57.6633 89.1929 57.5357C89.0475 57.4071 88.939 57.258 88.8674 57.0884C88.796 56.9176 88.7602 56.7368 88.7602 56.5463C88.7602 56.3556 88.796 56.1755 88.8674 56.0059C88.939 55.8352 89.0475 55.686 89.1929 55.5586C89.3396 55.4298 89.5233 55.3284 89.7439 55.2541C89.9658 55.1786 90.2271 55.1409 90.5278 55.1409C90.8286 55.1409 91.0893 55.1786 91.3099 55.2541C91.5318 55.3284 91.7155 55.4298 91.861 55.5586C92.0077 55.686 92.1167 55.8352 92.1882 56.0059C92.2597 56.1755 92.2954 56.3556 92.2954 56.5463C92.2954 56.7368 92.2597 56.9176 92.1882 57.0884C92.1167 57.258 92.0077 57.4071 91.861 57.5357C91.7155 57.6633 91.5318 57.7647 91.3099 57.8402C91.0893 57.9145 90.8286 57.9517 90.5278 57.9517ZM90.5278 57.4151C90.7312 57.4151 90.9044 57.3909 91.0474 57.3427C91.1916 57.2945 91.3087 57.2307 91.3987 57.1515C91.49 57.071 91.5565 56.9789 91.5984 56.8748C91.6404 56.7696 91.6612 56.6601 91.6612 56.5463C91.6612 56.4336 91.6404 56.3247 91.5984 56.2195C91.5565 56.1142 91.49 56.0221 91.3987 55.9428C91.3087 55.8624 91.1916 55.798 91.0474 55.7498C90.9044 55.7015 90.7312 55.6774 90.5278 55.6774C90.3244 55.6774 90.1507 55.7015 90.0065 55.7498C89.8634 55.798 89.7464 55.8624 89.6552 55.9428C89.5652 56.0221 89.4993 56.1142 89.4573 56.2195C89.4154 56.3247 89.3944 56.4336 89.3944 56.5463C89.3944 56.6601 89.4154 56.7696 89.4573 56.8748C89.4993 56.9789 89.5652 57.071 89.6552 57.1515C89.7464 57.2307 89.8634 57.2945 90.0065 57.3427C90.1507 57.3909 90.3244 57.4151 90.5278 57.4151Z" fill="#1F1F1FFF"/>
                    <path d="M9.27871 33.1924H13.836L7.66349 38.3145L13.9184 45.0586H9.65781L5.2571 40.3087L3.96326 41.3846V45.0586H0.477295V33.1924H3.96326V37.6029L9.27871 33.1924ZM33.8601 33.1924H37.346V42.1459H40.321V33.1924H43.807V45.0586H27.3991V33.1924H30.8851V42.1459H33.8601V33.1924ZM59.4304 42.1459C59.6062 41.7982 59.7601 41.4038 59.8919 40.9625C60.0238 40.5211 60.1364 40.0578 60.2297 39.5723C60.3232 39.0868 60.4001 38.5931 60.4605 38.0911C60.5265 37.5891 60.5814 37.1009 60.6254 36.6264C60.7188 35.5176 60.7682 34.3729 60.7737 33.1924H71.9568V42.1459H73.5885V47.0859H70.1025V45.0586H61.1857V47.0859H57.6998V42.1459H59.4304ZM68.4708 42.1459V36.1051H64.1773C64.1773 36.3754 64.1691 36.6844 64.1525 37.0319C64.1361 37.374 64.1113 37.7325 64.0784 38.1077C64.0454 38.4773 64.0015 38.8551 63.9465 39.2413C63.8916 39.6275 63.8284 39.9999 63.757 40.3584C63.6856 40.7115 63.6031 41.0425 63.5097 41.3514C63.4164 41.6604 63.312 41.9251 63.1965 42.1459H68.4708ZM96.019 42.5099C95.7772 42.9402 95.5218 43.3318 95.2526 43.6849C94.9888 44.038 94.6757 44.3414 94.3131 44.5952C93.9504 44.8489 93.522 45.0448 93.0275 45.1828C92.533 45.3206 91.9397 45.3896 91.2474 45.3896C90.7585 45.3896 90.3244 45.3676 89.9453 45.3234C89.5718 45.2792 89.2531 45.2296 88.9894 45.1744C88.6872 45.1138 88.4207 45.0393 88.19 44.951L89.4179 42.2864C89.5168 42.3251 89.6267 42.3583 89.7476 42.3857C89.8465 42.4133 89.9618 42.4355 90.0937 42.452C90.2311 42.4685 90.3712 42.4768 90.514 42.4768C90.6788 42.4768 90.8162 42.4547 90.926 42.4106C91.0414 42.3665 91.1375 42.3086 91.2144 42.2368C91.2969 42.1596 91.3656 42.0741 91.4205 41.9803C91.4755 41.881 91.5276 41.7762 91.5771 41.6659L86.7313 33.1924H90.687L93.9588 39.1006L97.2387 33.1924H101.194L96.019 42.5099Z" fill="#1F1F1FFF"/>
                    <path  d="M7.38623 51.7939H93.5596" stroke="#1F1F1FFF"/>
                </svg>
            </div>
            <h3 class="txt-upper">${title}</h3>
            <h4 class="mb-20 f-light ">${subtitle}</h4>

            `
}
