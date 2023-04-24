
document.querySelector('.loclogo').addEventListener("click",function()
{   
   
     if(document.querySelector('.addlocations').style.display=="none")
         { document.querySelector('.addlocations').style.display="block";
           document.querySelector('.addlocations').style.height="10rem";
            document.querySelector('.editlocation').style.height="50rem";
            document.querySelector('.addlocations').style.zIndex=1;
         } 
      else 
        { 
         document.querySelector('.addlocations').style.display="none";
          document.querySelector('.div3').style.height="8rem";
        }       
})



// document.querySelector('.submitbtn').addEventListener("click",function(){  
//        document.querySelector('.addlocations').style.zIndex=-1;
//        document.querySelector('.addlocations').style.display="none";
//        document.querySelector('.div3').style.height="8rem";
// })


document.querySelector('.checkboxasking').addEventListener("click",function()
{   
   if(document.querySelector('.div3').style.display=="none")
   {  document.querySelector('.div3').style.display="block";
      document.querySelector('.addlocations').style.display="none";
      document.querySelector('.div3').style.height="7rem";
   }
   else 
  { document.querySelector('.div3').style.display="none";
  }
})

function submitForms() {

   
   var form1Data = new FormData(document.getElementById("form1"));
   var form2Data = new FormData(document.getElementById("form2"));
   
   for (var pair of form2Data.entries()) {
      form1Data.append(pair[0], pair[1]);
   }

   
   const formcreated = document.getElementById('formcreated');
  
   formcreated.innerHTML="";
   
   // Create new form fields based on the form data
   for (const [name, value] of form1Data.entries()) {
   
     const input = document.createElement('input');
     input.type = 'hidden';
     input.name = name;
     input.value = value;
     formcreated.appendChild(input);
   }
   
  
   

  let demo = document.getElementById('demo');
  demo.click();
 }
updatevalues();

async function updatevalues(){

let res=await fetch('http://localhost:3000/tprofile/getdetails',{
 
method:'get',
headers: {
    "Content-Type": 'application/json'
}

});

let k=await res.json();
k=k[0];



document.querySelector('input[name="Theatre_Name"]').value =k.tName;
document.querySelector('input[name="Theatre_EmailID"]').value =k.temail;
document.querySelector('input[name="Contact_Number1"]').value =k.tNumber1;
document.querySelector('input[name="Contact_Number2"]').value =k.tNumber2;
document.querySelector('input[name="Street"]').value =k.street;
document.querySelector('input[name="City"]').value =k.city;
document.querySelector('input[name="State"]').value =k.state;
document.querySelector('input[name="pincode"]').value =k.pincode ;
document.querySelector('input[name="License_Number"]').value =k.licensenum;
document.querySelector('input[name="Login_Password"]').value ='#########';
document.querySelector('input[name="nearbyplace1"]').value =k.nearbyplace1;
document.querySelector('input[name="nearbyplace2"]').value =k.nearbyplace2;
document.querySelector('input[name="nearbyplace3"]').value =k.nearbyplace3;
document.querySelector('input[name="nearbyplace4"]').value =k.nearbyplace4;



}