document.addEventListener("DOMContentLoaded", function(){
  console.log("Contact page loaded");
  const form = document.querySelector("form");
  form.addEventListener("submit", function(event){
    event.preventDefault();
    alert("Message sent successfully!");
    form.reset();
  });
});
