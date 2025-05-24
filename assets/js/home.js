document.addEventListener("DOMContentLoaded", function(){
  console.log("Home page loaded");

  // Simple typewriter effect for the hero heading
  const textElement = document.getElementById("typewriter");
  const texts = [
    "Roshan Panday", "Freelancer", "Website Designer",
    "Content Creator", "Graphics Designer", "Analyst", "AI Specialist"
  ];
  let index = 0;
  setInterval(() => {
    textElement.textContent = texts[index];
    index = (index + 1) % texts.length;
  }, 3000);
});
