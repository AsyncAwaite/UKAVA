import {getElement} from "./helpers.js";

const handleMarquee = function () {
  if (!getElement(".marquee")) return;
  const marquee = document.querySelectorAll(".marquee");
  let speed = 1.2;
  marquee.forEach((item) => {
    const content = item.querySelector("span");
    const elWidth = content.offsetWidth;
    let progress = 1;
    function loop() {
      progress = progress - speed;
      if (progress <= elWidth * -1) {
        progress = 0;
      }
      item.style.transform = "translateX(" + progress + "px)";
      window.requestAnimationFrame(loop);
    }
    const quantity = Math.round(window.innerWidth / elWidth);
    for (let i = 0; i < quantity + 3; i++) {
      let clone = content.cloneNode(true);
      item.appendChild(clone);
    }
    loop();
  });
};
export default handleMarquee;
