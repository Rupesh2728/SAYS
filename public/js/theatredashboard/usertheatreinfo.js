let editbtn=document.querySelector('.editbtn');
editbtn.addEventListener('click',function(){
    document.querySelector('.theatreimgurl1').removeAttribute('readonly');   
    document.querySelector('.theatreimgurl2').removeAttribute('readonly');
    document.querySelector('.theatreimgurl3').removeAttribute('readonly');
    document.querySelector('.screentype').removeAttribute('readonly');
    document.querySelector('.about').removeAttribute('readonly');
    document.querySelector('.sound').disabled=false;
    document.querySelector('.Ttype').disabled=false;
    document.querySelector('.snacks').disabled=false;
    document.querySelector('.submitbtn').disabled=false;
})  

async function info(){
    
    let res1 = await fetch('http://localhost:3000/usertheatre/getreffnum', {
       method: 'get',
       headers: {
           "Content-Type": 'application/json'
       }
   });

   let treffnum=await res1.json();
   treffnum=treffnum.treffnum;
    
    let obj={
        treffnum:treffnum,
    }

    let res = await fetch('http://localhost:3000/usertheatre/getinfo', {
       method: 'post',
       body: JSON.stringify(obj),
       headers: {
           "Content-Type": 'application/json'
       }
   });
   let infoobj=await res.json();
   if(infoobj.k==1)
   {
    console.log("No document in about theatre collection!!!");
   }
   else{
    infoobj=infoobj.tinfo;
   document.querySelector('.theatreimgurl1').value=infoobj["imgurl1"]
   document.querySelector('.theatreimgurl2').value=infoobj["imgurl2"];
   document.querySelector('.theatreimgurl3').value=infoobj["imgurl3"];
   document.querySelector('.screentype').value=infoobj["screentype"];
   document.querySelector('.about').value=infoobj["about"];
   document.querySelector('.snacks').value=infoobj["snacks"];
   document.querySelector('.Ttype').value=infoobj["Ttype"];
   document.querySelector('.sound').value=infoobj["sound"]; 
   }
}

info();