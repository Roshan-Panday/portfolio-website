document.addEventListener("DOMContentLoaded", function(){
  console.log("Gallery page loaded");
  const exts = [".jpg", ".jpeg", ".png"];
  
  // Load thumbnails t1 to t20
  const thumbContainer = document.querySelector(".gallery-grid");
  for (let i = 1; i <= 20; i++) {
    (function(index) {
      const img = document.createElement("img");
      img.className = "gallery-item";
      img.alt = "Thumbnail " + index;
      img.loading = "lazy";
      window.autoDetectImage("assets/img/project-thumbnails/", "t" + index, exts, function(url) {
         if (url) {
           img.src = url;
         } else {
           console.error("Thumbnail " + index + " not found.");
         }
      });
      thumbContainer.appendChild(img);
    })(i);
  }
  
  // Load logos (logo1 to logo4) into the logos section
  const logosContainer = document.querySelector(".logos-grid");
  for (let i = 1; i <= 4; i++) {
    (function(index) {
      const img = document.createElement("img");
      img.className = "logo-item";
      img.alt = "Logo " + index;
      img.loading = "lazy";
      window.autoDetectImage("assets/img/project-logos/", "logo" + index, exts, function(url) {
         if (url) {
           img.src = url;
         } else {
           console.error("Logo " + index + " not found.");
         }
      });
      logosContainer.appendChild(img);
    })(i);
  }
});
