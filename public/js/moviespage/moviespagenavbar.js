

$('.selectpicker').change(function (e) {
  console.log(e.target.value);
$('.selectpicker').val(e.target.value);
});

$('.selectpicker').val("Nellore");
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
