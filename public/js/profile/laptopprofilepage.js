updatevalues();

async function updatevalues(){

let res=await fetch('http://localhost:3000/profile/laptopprofilepage/getdetails',{
 
method:'get',
headers: {
    "Content-Type": 'application/json'
}

});

let k=await res.json();
k=k[0];

  
let strdate="";
for(let i=0;i<10;i++)
strdate+=k.DOB[i];

strdate = strdate.split('-').reverse().join('-');


document.getElementById('Firstname+LastName').innerHTML=k.firstName+" "+k.lastName;
document.getElementById('UserReferenceNumber').innerHTML=k.UserReferenceNumber;
document.getElementById('Firstname').innerHTML=k.firstName;
document.getElementById('Lastname').innerHTML=k.lastName;
document.getElementById('emailID').innerHTML=k.email;
document.getElementById('MobileNumber').innerHTML=k.MobileNumber;
document.getElementById('gender').innerHTML=k.Gender;
document.getElementById('DOB').innerHTML=strdate
document.getElementById('cardname').innerHTML=k.cardName;
document.getElementById('cardnum').innerHTML=k.cardNumber;
document.getElementById('cvv').innerHTML='XXX';
document.getElementById('Expiry').innerHTML='XX';
document.getElementById('emailID2').innerHTML=k.email;


}