import { gsap } from "gsap";
import { preloadImage } from "./utils.js";

// Preloader function

// This function uses a particular kind of animations for the preloaders, but you can replace them with yours

const preloadImages = (images) => {
  return new Promise((resolve, reject) => {
    const totalImages = images.length;
    let imagesLoaded = 0;

    const preloader = document.querySelector(".preloader");
    const preloaderLoader = document.querySelector(".preloader__loader");
    const counter = document.querySelector(".counter");
    const counterText = document.querySelector(".counter__text");

    images.forEach(async (image) => {
      await preloadImage(image);

      // Image has loaded
      imagesLoaded++;

      // Get the percentage of the images loaded
      const percentage = Math.round((imagesLoaded / totalImages) * 100);

      // Animate the value of the counter, such that it counts up from the previous percent to the new percent
      const Cont = { val: parseInt(counterText.innerHTML) };
      gsap.to(Cont, {
        val: percentage,
        duration: 1,
        onUpdate: function () {
          counterText.innerHTML = Math.round(Cont.val);
        },
      });

      // Animate the colored preloader heights to the percentage of what's loaded
      gsap.to(preloaderLoader, {
        duration: 1,
        height: `${percentage}%`,
        ease: "power4.inOut",
      });

      // if percentage  === 100, it means all iamges are preloaded.
      if (percentage === 100) {
        const preloaderDoneTL = gsap.timeline({
          defaults: { ease: "power4.inOut" },
        });

        preloaderDoneTL.to(counter, {
          duration: 0.2,
          opacity: 0,
          delay: 1, // To make sure the last height (100%) is shown, before this animation starts
        });

        preloaderDoneTL.to(
          preloaderLoader,
          {
            y: "-100%",
            duration: 1.5,
          },
          "-=0.1"
        );

        preloaderDoneTL.to(
          preloader,
          {
            y: "-100%",
            duration: 1.5,
            // Other logic or animations on the page asides the preloader can now start
            onComplete: resolve,
          },
          "-=1.4"
        );
      }
    });
  });
};

export default preloadImages;
