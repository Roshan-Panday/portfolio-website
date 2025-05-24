document.addEventListener("DOMContentLoaded", function(){
  console.log("Global JavaScript Loaded");

  // Auto-detect image function – tries multiple extensions until one loads successfully
  function autoDetectImage(basePath, baseName, extensions, callback) {
    let attempt = 0;
    function tryNext() {
      if (attempt >= extensions.length) {
        callback(null);
        return;
      }
      const ext = extensions[attempt];
      attempt++;
      const testImg = new Image();
      const url = basePath + baseName + ext;
      testImg.src = url;
      testImg.onload = function() { callback(url); };
      testImg.onerror = tryNext;
    }
    tryNext();
  }
  // Expose the function globally
  window.autoDetectImage = autoDetectImage;

  // Auto-detect and set the logo image for all elements with id "dynamicLogo"
  autoDetectImage("assets/img/project-logos/", "logo1", [".jpg", ".jpeg", ".png"], function(url) {
    if (url) {
      document.querySelectorAll("#dynamicLogo").forEach(el => el.src = url);
    } else {
      console.error("Logo image not found!");
    }
  });

  // Smooth scrolling for internal anchors
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
  });

  // Change navbar background on scroll
  window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    navbar.style.background = window.scrollY > 50 ? "#333" : "#222";
  });
});
