document.addEventListener("DOMContentLoaded", function(){
  console.log("Certifications page loaded");
  const container = document.querySelector(".certifications-grid");
  const exts = [".jpg", ".jpeg", ".png"];

  // Load certificates c1 to c8
  for (let i = 1; i <= 8; i++) {
    (function(index) {
      const div = document.createElement("div");
      div.className = "certificate-item";
      window.autoDetectImage("assets/img/certificates/", "c" + index, exts, function(url) {
        if (url) {
          div.innerHTML = `
            <img src="${url}" alt="Certificate ${index}">
            <h2>Certificate Title ${index}</h2>
            <p>Short description for certificate ${index}.</p>
          `;
        } else {
          console.error("Certificate " + index + " not found.");
          div.innerHTML = `
            <h2>Certificate Title ${index}</h2>
            <p>Short description for certificate ${index}.</p>
          `;
        }
      });
      container.appendChild(div);
    })(i);
  }
});
