import {header} from "./elements.js";
const burger = () => {
    if (header) {
        const headerNav = header.querySelector(".header__menu");
        const burger = header.querySelector(".burger");
        if (screen.availWidth <= 1024){
            header.classList.add('--hide')
        }
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            header.classList.toggle('--hide');
            header.classList.toggle('--show');
            headerNav.classList.toggle("active");
            document.body.classList.toggle("active");
        });
    }
};
export default burger;
