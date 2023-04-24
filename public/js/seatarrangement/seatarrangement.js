let mname=document.querySelector('.mname').textContent;
let tReff=document.querySelector('.treff').textContent;
let stime=document.querySelector('.stime').textContent;
let pprice=document.querySelector('.pprice').textContent;
let nprice=document.querySelector('.nprice').textContent;
let screenname=document.querySelector('.sname').textContent;
let seatarr;








const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seats");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const proceedbtn=document.getElementById('Proceed_btn')
function updateSelectedCount() {
  const selectedpseats = document.querySelectorAll(".premium.Selected");
  const selectednseats = document.querySelectorAll(".Selected");
  const selectedpseatsCount = selectedpseats.length;
  console.log(selectedpseatsCount);
  const selectednseatsCount = selectednseats.length-selectedpseats.length;
  console.log(selectednseatsCount);
  const selectedseatsCount=selectedpseatsCount+selectednseatsCount;
 
  if(selectedseatsCount>4){
         
        document.getElementById('Proceed_btn').disabled=true;
        count.innerText = " more than 4 seats";
        total.innerText = "0"

  }

  else if(selectedseatsCount==0){
    document.getElementById('Proceed_btn').disabled=true;
        count.innerText = " no seat";
        total.innerText = "0"
  }
  else
  {
 document.getElementById('Proceed_btn').disabled=false;
  
  count.innerText = selectedseatsCount;
  total.innerText = (selectednseatsCount*Number(nprice)+selectedpseatsCount*Number(pprice));
}

}

for(let i=0;i<seats.length;i++)
{

  seats[i].addEventListener("click", () => {
    if (seats[i].classList.contains("seats") && !seats[i].classList.contains("SoldOut")) 
    {
      if(seats[i].classList.contains("Selected"))
      {         
        seats[i].classList.remove("Selected"); 
        
      }
  
      else if(!seats[i].classList.contains("Selected")){
        seats[i].classList.add("Selected");
      }
  
      updateSelectedCount();   
    }
  });

}



proceedbtn.addEventListener("click",async function(){
  let obj={
    tReff:tReff,
    sname:screenname,
  }

  let res = await fetch('http://localhost:3000/movies/seatarrangement/getseatarr', {
    method: 'post',
    body: JSON.stringify(obj),
    headers: {
        "Content-Type": 'application/json'
    }
});
seatarr=await res.json();
let numrows=seatarr.numrows;
let numcols=seatarr.numcols;
seatarr=seatarr.userbookingseatarr;


let indexarr=[];
  for(let i=0;i<seats.length;i++)
  {
     if(seats[i].classList.contains("Selected"))
       {  indexarr.push(i);
       }
  }

let seatnumarr=[];
  for(let i=0;i<indexarr.length;i++)
  {
    let m=Math.floor(indexarr[i]/numcols);
    let n=indexarr[i]%(numcols);
    seatarr[m][n]=4;
    n+=1;
    let asciiCode =m+65;
    let letter = String.fromCharCode(asciiCode);
    let seat=letter+n;
    seatnumarr.push(seat);
  }

  let obj3={
    seatarr:seatarr,
    tReff:tReff,
    sname:screenname,
  }

  
let obj1=
{
  MovieName:mname,
  time:stime,
  screenname:screenname,
  seatnumarr:seatnumarr,
  tReff:tReff
}


let res2 = await fetch('http://localhost:3000/movies/seatarrangement/addticket', {
    method: 'post',
    body: JSON.stringify(obj1),
    headers: {
        "Content-Type": 'application/json'
    }
});
let k=await res2.json();
let res3 = await fetch('http://localhost:3000/movies/seatarrangement/updateseatsarr', {
    method: 'post',
    body: JSON.stringify(obj3),
    headers: {
        "Content-Type": 'application/json'
    }
  });

  let k1=await res3.json();
  console.log(k);
  console.log(k1);

  if(k1.k==1 && k.k==1)
  {
    location.replace("http://localhost:3000/recentbooking")
  }
})













