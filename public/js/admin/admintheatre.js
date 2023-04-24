let removebtn=document.querySelectorAll(".removebtn");
for(let i=0;i<removebtn.length;i++)
{
    removebtn[i].addEventListener("click",async function()
    {
        let treffnum=removebtn[i].parentNode.parentNode.parentNode.children[1].textContent;
    let obj={
        treffnum:treffnum,
    }

    let res = await fetch('http://localhost:3000/admintheatre/removetheatre', {
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
        console.log("Theatre Succesfully deleted from all db's");
        location.replace("http://localhost:3000/admintheatre");
    }
    })
}