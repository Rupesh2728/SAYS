$(document).ready(function () {
    $('.location select').selectpicker();
  });
  
  let locimg=document.querySelector('.locfind');
  locimg.addEventListener("click",function()
  {    
     let location=document.querySelector('.location');
        if (location.style.display!=="none") 
        {
            location.style.display = "none";
        } 
  
        else 
        {
          location.style.display = "block";
        }
  
        let locname=document.querySelector('.location button');
          console.log(locname.textContent);
  })
  