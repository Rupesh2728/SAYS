let toaddress=document.querySelector(".toaddress");
toaddress.addEventListener("click",function(){
    if(toaddress.value=="None")
     {
        document.querySelector(".tomail").disabled=false;
     }

     else
     {
        document.querySelector(".tomail").disabled=true;
     }
})