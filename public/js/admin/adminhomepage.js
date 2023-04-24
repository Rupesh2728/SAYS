let seefullquery=document.querySelectorAll('.seefullreview');
for(let i=0;i<seefullquery.length;i++)
{
    seefullquery[i].addEventListener("click",async function(){

        let username=seefullquery[i].parentNode.parentNode.children[4].textContent;
        let message=seefullquery[i].parentNode.parentNode.children[5].textContent;
        let umail=seefullquery[i].parentNode.parentNode.children[2].textContent;
       
        document.querySelector('.uname').textContent=username;
        document.querySelector('.uquery').textContent=message;
        document.querySelector('.umail').textContent=umail;
       });
}


let acceptbtn=document.querySelectorAll(".acceptbtn");
for(let i=0;i<acceptbtn.length;i++)
{
    acceptbtn[i].addEventListener("click",async function(){
      let temail=acceptbtn[i].parentNode.parentNode.children[2].textContent;
      let obj={
        temail:temail,
      }
      let res = await fetch('http://localhost:3000/adminhome/accepttheatre', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": 'application/json'
        }
    }); 

    let k=await res.json();
    k=k.k;

    if(k==1)
    {
        location.replace("http://localhost:3000/adminhome")
    }

    })
}

let rejectbtn=document.querySelectorAll(".rejectbtn");
for(let i=0;i<rejectbtn.length;i++)
{
    rejectbtn[i].addEventListener("click",async function(){
      let temail=rejectbtn[i].parentNode.parentNode.children[2].textContent;
      let obj={
        temail:temail,
      }
      let res = await fetch('http://localhost:3000/adminhome/rejecttheatre', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": 'application/json'
        }
    }); 

    let k=await res.json();
    k=k.k;

    if(k==1)
    {
        location.replace("http://localhost:3000/adminhome")
    }
    
    })
}
