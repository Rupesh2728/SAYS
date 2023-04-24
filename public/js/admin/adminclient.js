let removebtn=document.querySelectorAll(".removebtn");
for(let i=0;i<removebtn.length;i++)
{
    removebtn[i].addEventListener("click",async function()
    {
        let ureffnum=removebtn[i].parentNode.parentNode.parentNode.children[2].textContent;
    let obj={
        ureffnum:ureffnum,
    }

    let res = await fetch('http://localhost:3000/adminclient/removeuser', {
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
        console.log("User Succesfully deleted from all db's");
        location.replace("http://localhost:3000/adminclient");
    }
    })
}