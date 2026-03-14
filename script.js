const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active')
  })
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active')
  })
}

function showPopup(message,type){

   let popup = document.getElementById("news-popup");
   let icon = document.getElementById("popup-icon");
   let text = document.getElementById("popup-text");

   text.innerText = message;

   if(type === "success"){
      popup.style.background = "#088178";
      icon.className = "fas fa-check-circle";
   }
   else if(type === "error"){
      popup.style.background = "#e52132";
      icon.className = "fas fa-times-circle";
   }
   else{
      popup.style.background = "#fa5f06";
      icon.className = "fas fa-exclamation-triangle";
   }

   popup.classList.add("show");

   setTimeout(()=>{
      popup.classList.remove("show");
   },2000);
}

document.getElementById("news-btn").addEventListener("click", function(){

   let email = document.getElementById("news-email").value.trim();

   let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

   if(email === ""){
      showPopup("Please enter email","warning");
      return;
   }

   if(!pattern.test(email)){
      showPopup("Invalid email format","error");
      return;
   }

   showPopup("Subscribed Successfully","success");
   document.getElementById("news-email").value = "";
});


window.addEventListener("load", function(){
  document.body.classList.add("show");
});


