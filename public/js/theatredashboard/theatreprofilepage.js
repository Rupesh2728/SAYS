updatevalues();

async function updatevalues(){

let res=await fetch('http://localhost:3000/theatreprofilepage/getdetails',{
 
method:'get',
headers: {
    "Content-Type": 'application/json'
}

});

let k=await res.json();
k=k[0];


document.getElementById('REFnumber').innerHTML=k.tReferenceNumber;
document.getElementById('Address').innerHTML=k.street+","+k.city+","+k.state;
document.getElementById('TheatreName').innerHTML=k.tName;
document.getElementById('phnNumber').innerHTML=k.tNumber1;
document.getElementById('mailid').innerHTML=k.temail;
document.getElementById('License_Number').innerHTML=k.licensenum;


}