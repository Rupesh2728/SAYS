
let screenname;
let screencapacity;
let numrows;
let numcols;
let nextbtn=document.querySelector('.nextbtn');
let seats;
let es=0;
let ds=1;
let ns=2;
let ps=3;
let arrangementarr=[];


let numberofcols;

let closebtn=document.querySelectorAll('.closebtn');
for(let i=0;i<closebtn.length;i++)
{
  closebtn[i].addEventListener("click",function(){
    console.log("closebtn");
     location.reload();
   });
}

let addscreenbtn=document.querySelector(".addscreenbtn");
addscreenbtn.addEventListener("click",function(){
  arrangementarr=[];
});
  

nextbtn.addEventListener("click",function()
{
 screenname=document.querySelector(".screenname").value;
 screencapacity=document.querySelector(".screencapacity").value;
 numrows=document.querySelector(".numrows").value;
 numcols=document.querySelector(".numcols").value;
 nextbtn=document.querySelector('.nextbtn');
 console.log(screenname);



 // Seat Arrangement display using js
const mainarrangement = document.querySelector('.mainarrangement');
const seatHeading = document.createElement('div');
seatHeading.classList.add('seatheading');
mainarrangement.append(seatHeading);
const alphabetDiv = document.createElement('div');
alphabetDiv.classList.add('alphabet');
alphabetDiv.style.border = '0';
seatHeading.appendChild(alphabetDiv);
for (let i = 1;i<=numcols;i++) 
{
  const seatNumDiv = document.createElement('div');
  seatNumDiv.classList.add('seatnum');
  seatNumDiv.textContent = i;
  seatHeading.appendChild(seatNumDiv);
}


for(let i=0;i<numrows;i++)
{ 
const mainarrangement = document.querySelector('.mainarrangement'); 
const seatRow = document.createElement('div');
seatRow.classList.add('seatrow');
mainarrangement.append(seatRow);
const alphabetDiv = document.createElement('div');
alphabetDiv.classList.add('alphabet');

let aplhanum=i+65;
const letter=String.fromCharCode(aplhanum);
alphabetDiv.textContent =letter;

seatRow.appendChild(alphabetDiv);

  for (let j=1;j<=numcols;j++) 
  {
    const seatDiv = document.createElement('div');
    seatDiv.classList.add('seat');
    seatRow.appendChild(seatDiv);
  }
const br = document.createElement('br');
mainarrangement.appendChild(br);
}

seats=document.querySelectorAll('.seat');
for(let i=0;i<numrows;i++)
{  arr=[];
    for(let j=0;j<numcols;j++)
     arr.push(ns);
     arrangementarr.push(arr);
}

numberofcols=numcols;
})


document.querySelector('.pc').addEventListener('click',()=>{
  if(document.querySelector('.pc').checked)
      {
        document.querySelector('.es').disabled=true;
        document.querySelector('.dc').disabled=true;
      }
    else
       {
        document.querySelector('.es').disabled=false;
        document.querySelector('.dc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {  
        seats[i].addEventListener('click',()=>
        {      console.log("seat clicked!!!");
               let m=Math.floor(i/numberofcols);
               let n=i%(numberofcols);
            if(!seats[i].classList.contains('premium'))
               {   
                 seats[i].classList.add('premium');
                 arrangementarr[m][n]=ps;
               }
            else
             {  seats[i].classList.remove('premium'); 
                 arrangementarr[m][n]=ns;
             }
        })
    }

});

document.querySelector('.dc').addEventListener('click',()=>{
    if(document.querySelector('.dc').checked)
      {
        document.querySelector('.es').disabled=true;
        document.querySelector('.pc').disabled=true;
      }
    else
       {
        document.querySelector('.es').disabled=false;
        document.querySelector('.pc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {   
        seats[i].addEventListener('click',()=>
        {     let m=Math.floor(i/numberofcols);
               let n=i%(numberofcols);
             if(!seats[i].classList.contains('disabled'))
              {   
                seats[i].classList.add('disabled');
                arrangementarr[m][n]=ds;    
              }
              
            else
              {  seats[i].classList.remove('disabled'); 
                 arrangementarr[m][n]=ns;
              }  
        })
    }
});


  document.querySelector('.es').addEventListener('click',()=>{
    if(document.querySelector('.es').checked)
      {
        document.querySelector('.pc').disabled=true;
        document.querySelector('.dc').disabled=true;
      }
    else
       {
        document.querySelector('.pc').disabled=false;
        document.querySelector('.dc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {   
        seats[i].addEventListener('click',()=>
        {     let m=Math.floor(i/numberofcols);
                let n=i%(numberofcols);

            if(!seats[i].classList.contains('empty'))
               { seats[i].classList.add('empty');
                  arrangementarr[m][n]=es;
               }
            else
              { seats[i].classList.remove('empty');   
                arrangementarr[m][n]=ns;
              }
        })
    }
  });


  let submitbtn=document.querySelector('.submitbtn');
  submitbtn.addEventListener("click",async function(){
     console.log(arrangementarr);
    let obj=
    {
      screenname:screenname,
      screencapacity:screencapacity,
      numrows:numrows,
      numcols:numcols,
      seatarr:arrangementarr,
    }

    console.log(obj);

    let res = await fetch(
      "http://localhost:3000/tschedule/addscreen",
      {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    let k = await res.json();
    k=k.confirm;
    if(k==1)
    {    
        location.reload();
        console.log("Relaoded page!!!");
    }
  })







let oldscreenname;
let oldnumrows;
let oldnumcols;
let editscreenbtnarr=document.querySelectorAll('.arrangementeditbtn');
  for(let i=0;i<editscreenbtnarr.length;i++)
  {
       editscreenbtnarr[i].addEventListener("click",async function(){
        let sname=editscreenbtnarr[i].parentNode.parentNode.children[1].textContent;
        let obj={
          screenname:sname,
        }
        let res = await fetch(
          "http://localhost:3000/tschedule/getscreendetails",
          {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
  
        let infoobj= await res.json();
        oldscreenname=infoobj.screenname;
        let oldscap=infoobj.screencapacity;
         oldnumrows=infoobj.numrows;
         oldnumcols=infoobj.numcols;     
        arrangementarr=infoobj.originalseatarrangementarr;

         document.querySelector('.escreenname').value=infoobj.screenname;
         document.querySelector('.escreencapacity').value=infoobj.screencapacity;
         document.querySelector('.enumrows').value=infoobj.numrows;
         document.querySelector('.enumcols').value=infoobj.numcols;
       })
  }



let editnextbtn=document.querySelector(".editnextbtn");
  editnextbtn.addEventListener("click",function(){
    if(document.querySelector('.enumrows').value!=oldnumrows || document.querySelector('.enumcols').value!=oldnumcols)
      {  arrangementarr=[];

        for(let i=0;i<document.querySelector('.enumrows').value;i++)
        {  arr=[];
           for(let j=0;j<document.querySelector('.enumcols').value;j++)
           arr.push(ns);
           arrangementarr.push(arr);
        }

          const mainarrangement = document.querySelector('.editmainarrangement');
          const seatHeading = document.createElement('div');
          seatHeading.classList.add('seatheading');
          mainarrangement.append(seatHeading);
          const alphabetDiv = document.createElement('div');
          alphabetDiv.classList.add('alphabet');
          alphabetDiv.style.border = '0';
          seatHeading.appendChild(alphabetDiv);
          for (let i =1;i<=document.querySelector('.enumcols').value;i++) 
            {
              const seatNumDiv = document.createElement('div');
              seatNumDiv.classList.add('seatnum');
              seatNumDiv.textContent = i;
              seatHeading.appendChild(seatNumDiv);
            }


          for(let i=0;i<document.querySelector('.enumrows').value;i++)
          { 
            const mainarrangement = document.querySelector('.editmainarrangement'); 
            const seatRow = document.createElement('div');
            seatRow.classList.add('seatrow');
            mainarrangement.append(seatRow);
            const alphabetDiv = document.createElement('div');
            alphabetDiv.classList.add('alphabet');

            let aplhanum=i+65;
            const letter=String.fromCharCode(aplhanum);
              alphabetDiv.textContent =letter;

              seatRow.appendChild(alphabetDiv);

              for (let j=1;j<=document.querySelector('.enumcols').value;j++) 
              {
               const seatDiv = document.createElement('div');
               seatDiv.classList.add('seat');
                seatRow.appendChild(seatDiv);
              }
            const br = document.createElement('br');
            mainarrangement.appendChild(br);
             }

            
          }

          else
          {
            const mainarrangement = document.querySelector('.editmainarrangement');
            const seatHeading = document.createElement('div');
            seatHeading.classList.add('seatheading');
             mainarrangement.append(seatHeading);
           const alphabetDiv = document.createElement('div');
          alphabetDiv.classList.add('alphabet');
         alphabetDiv.style.border = '0';
            seatHeading.appendChild(alphabetDiv);
          let collength=arrangementarr[0].length;  
          let rowlength=arrangementarr.length;
             for (let i = 1;i<=collength;i++) 
             {
               const seatNumDiv = document.createElement('div');
                seatNumDiv.classList.add('seatnum');
               seatNumDiv.textContent = i;
                seatHeading.appendChild(seatNumDiv);
             }


                for(let i=0;i<rowlength;i++)
              { 
                 const mainarrangement = document.querySelector('.editmainarrangement'); 
                 const seatRow = document.createElement('div');
                 seatRow.classList.add('seatrow');
                 mainarrangement.append(seatRow);
                 const alphabetDiv = document.createElement('div');
                 alphabetDiv.classList.add('alphabet');

                  let aplhanum=i+65;
                   const letter=String.fromCharCode(aplhanum);
                alphabetDiv.textContent =letter;

           seatRow.appendChild(alphabetDiv);

           for (let j=0;j<collength;j++) 
           {
            if(arrangementarr[i][j]==0)
            {
              const seatDiv = document.createElement('div');
              seatDiv.classList.add('seat');
              seatDiv.classList.add('empty');
              seatRow.appendChild(seatDiv);
            }

            else if(arrangementarr[i][j]==1)
            {
              const seatDiv = document.createElement('div');
              seatDiv.classList.add('seat');
              seatDiv.classList.add('disabled');
               seatRow.appendChild(seatDiv);
            }

            else if(arrangementarr[i][j]==2)
            {
              const seatDiv = document.createElement('div');
              seatDiv.classList.add('seat');
               seatRow.appendChild(seatDiv);
            }

            else if(arrangementarr[i][j]==3)
            {
              const seatDiv = document.createElement('div');
              seatDiv.classList.add('seat');
              seatDiv.classList.add('premium');
              seatRow.appendChild(seatDiv);
            }
            
           }
         const br = document.createElement('br');
         mainarrangement.appendChild(br);
          }  
        }


        numberofcols=document.querySelector(".enumcols").value;
        seats=document.querySelectorAll('.seat');
         });



document.querySelector('.epc').addEventListener('click',()=>{
  if(document.querySelector('.epc').checked)
      {
        document.querySelector('.ees').disabled=true;
        document.querySelector('.edc').disabled=true;
      }
    else
       {
        document.querySelector('.ees').disabled=false;
        document.querySelector('.edc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {  
        seats[i].addEventListener('click',()=>
        {      console.log("seat clicked!!!");
               let m=Math.floor(i/numberofcols);
               let n=i%(numberofcols);
            if(!seats[i].classList.contains('premium'))
               {   
                 seats[i].classList.add('premium');
                 arrangementarr[m][n]=ps;
               }
            else
             {  seats[i].classList.remove('premium'); 
                 arrangementarr[m][n]=ns;
             }
        })
    }

});


document.querySelector('.edc').addEventListener('click',()=>{
    if(document.querySelector('.edc').checked)
      {
        document.querySelector('.ees').disabled=true;
        document.querySelector('.epc').disabled=true;
      }
    else
       {
        document.querySelector('.ees').disabled=false;
        document.querySelector('.epc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {   
        seats[i].addEventListener('click',()=>
        {     let m=Math.floor(i/numberofcols);
               let n=i%(numberofcols);
             if(!seats[i].classList.contains('disabled'))
              {   
                seats[i].classList.add('disabled');
                arrangementarr[m][n]=ds;    
              }
              
            else
              {  seats[i].classList.remove('disabled'); 
                 arrangementarr[m][n]=ns;
              }  
        })
    }
});


  document.querySelector('.ees').addEventListener('click',()=>{
    if(document.querySelector('.ees').checked)
      {
        document.querySelector('.epc').disabled=true;
        document.querySelector('.edc').disabled=true;
      }
    else
       {
        document.querySelector('.epc').disabled=false;
        document.querySelector('.edc').disabled=false;
       }

    for(let i=0;i<seats.length;i++)
    {   
        seats[i].addEventListener('click',()=>
        {     let m=Math.floor(i/numberofcols);
                let n=i%(numberofcols);

            if(!seats[i].classList.contains('empty'))
               { seats[i].classList.add('empty');
                  arrangementarr[m][n]=es;
               }
            else
              { seats[i].classList.remove('empty');   
                arrangementarr[m][n]=ns;
              }
        })
    }
  });



let SAsavebtn=document.querySelector(".SAsavebtn");
SAsavebtn.addEventListener("click",async function(){
      let sname=document.querySelector('.escreenname').value;
      let scapacity=document.querySelector('.escreencapacity').value;
      let snumcols=document.querySelector('.enumcols').value;
      let snumrows=document.querySelector('.enumrows').value;
  let obj={
    oldsname:oldscreenname,
    sname:sname,
     scapacity:scapacity,
     snumrows:snumrows,
     snumcols:snumcols,
     editedSA:arrangementarr,
  }

  let res = await fetch(
    "http://localhost:3000/tschedule/editsavescreen",
    {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  let k = await res.json();
  k=k.confirm;
  if(k==1)
  {    
      location.reload();
      console.log("Relaoded page!!!");
  }
})

let removebtn=document.querySelectorAll(".removebtn");
for(let i=0;i<removebtn.length;i++)
{
  removebtn[i].addEventListener("click",async function(){
      let scrname=removebtn[i].parentNode.parentNode.children[1].textContent;
      let obj={
        scrname:scrname,
      }

      let res = await fetch(
        "http://localhost:3000/tschedule/removescreen",
        {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      let k = await res.json();
      k=k.confirm;
      if(k==1)
      {    
          location.reload();
          console.log("Relaoded page!!!");
      }
  });
}






