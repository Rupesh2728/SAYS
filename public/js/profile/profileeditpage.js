

let k = 0;
let temp = 0;

document.querySelector('.creditcardlogo').addEventListener("click", function () {
   if ((k == 0 && temp == 0) || (k != 1 && temp == 0)) {
      if (document.querySelector('.carddetailsmodificationlogin').style.display == "none") {
         document.querySelector('.carddetailsmodificationlogin').style.display = "block";
         document.querySelector('.carddetailsmodificationlogin').style.height = "10rem";
         document.querySelector('.editcarddetails').style.height = "35rem";
      }
      else {
         document.querySelector('.carddetailsmodificationlogin').style.display = "none";
         document.querySelector('.div3').style.height = "8rem";
      }
   }

   if (document.querySelector('.carddetailsdiv').style.display == "block")
      k = 1;

})

document.querySelector('.showpassword').addEventListener("click", function () {
   if (document.querySelector('.passwordipbox').type === "password")
      document.querySelector('.passwordipbox').type = "text";
   else
      document.querySelector('.passwordipbox').type = "password";
})

document.querySelector('.loginbtn').addEventListener("click", async function () {
   

   let User_ReferenceNumber=document.getElementById('card_check_userid').value;
   let profilepassword=document.getElementById('card_check_Profilepassword').value;
  
   obj = { email: User_ReferenceNumber, password: profilepassword };
   // console.log(obj);
   let res = await fetch('http://localhost:3000/profile/profileeditpage/checklogin', {
       method: 'post',
       body: JSON.stringify(obj),
       headers: {
           "Content-Type": 'application/json'
       }
   });
   console.log(res);
   let k=await res.json();
   console.log((k));
   if (k.s) {
     
      document.querySelector('.carddetailsdiv').style.display = "block";
      document.querySelector('.carddetailsdiv').style.zIndex = 1;
      document.querySelector('.carddetailsmodificationlogin').style.zIndex = -1;
      document.querySelector('.carddetailsmodificationlogin').style.display = "none";  
   
   }

   else {
       
     alert("nonono");
   }
    

  
})



document.querySelector('.checkboxasking').addEventListener("click", function () {
   console.log(document.querySelector('.div3').style.getPropertyValue("display"));

   if (document.querySelector('.div3').style.display == "none") {
      document.querySelector('.div3').style.display = "block";
      document.querySelector('.div3').style.backgroundColor = "white";
      document.querySelector('.carddetailsmodificationlogin').style.display = "none";
      document.querySelector('.div3').style.height = "7rem";
   }
   else {
      document.querySelector('.div3').style.display = "none";
      document.querySelector('.div3').style.backgroundColor = "#161d2f";
      //   document.querySelector('.carddetailsdiv').style.display="none";
   }

})
// 

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
   

setvalues();

async function setvalues(){


  let res=await fetch("http://localhost:3000/profile/laptopprofilepage/getdetails",{

    
  method:'get',

  headers:{
   "Content-Type": 'application/json'
  }


  }); 

  let k=await res.json();
  
  k=k[0];
  console.log(k);
  console.log(k.DOB);

  const date = new Date(k.DOB); 
  const formattedDate = date.toISOString().slice(0,10);

  document.querySelector('input[name="First_Name"]').value =k.firstName;
  document.querySelector('input[name="Last_Name"]').value =k.lastName;
  document.querySelector('input[name="Mobile_Number"]').value =k.MobileNumber;
  document.querySelector('input[name="email"]').value =k.email;
  document.querySelector('select[name="gender"]').value =k.Gender;
  document.querySelector('input[name="DOB"]').value = formattedDate;
  document.querySelector('input[name="Login_password"]').value ='#########';
  document.querySelector('input[name="Card_Name"]').value =k.cardName ;
  document.querySelector('input[name="Card_Number"]').value =k.cardNumber;
  document.querySelector('input[name="CVV"]').value ='###';
  document.querySelector('input[name="Expiry"]').value ='##';
  document.querySelector('input[name="Profile_password"]').value ='#########';
  

 



}
   






