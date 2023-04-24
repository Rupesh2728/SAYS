// fetch method for tlogin or tsignup
checkemptytag();
function checkemptytag(){
  let x=document.getElementById('login_sucess').textContent;
  if(x.includes("Incorrect creditionals")){
  
    shiftLogin();
  }
  else{
    console.log("noshift");
  }
  
}

 function shiftLogin() {
  //  console.log('hi');
   let Tlogin = document.querySelector(".logreg-box2");
   let Ulogin = document.querySelector(".logreg-box");
 
   if (Tlogin.style.visibility === "hidden") {
     Tlogin.style.visibility = "visible";
     Ulogin.style.visibility = "hidden";
   } else {
     Tlogin.style.visibility = "hidden";
     Ulogin.style.visibility = "visible";
   }


   
}
 

  