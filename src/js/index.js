import preloadImages from "./preload-images";

const images = document.querySelectorAll(".gallery__image");
preloadImages(images).then(() => {
  console.log("other page logic and aniamtions can start now");
});
