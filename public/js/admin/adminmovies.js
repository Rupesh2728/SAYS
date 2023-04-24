let infobtn=document.querySelectorAll(".infobtn");
for(let i=0;i<infobtn.length;i++)
{
    infobtn[i].addEventListener("click",async function(){
      let mname=infobtn[i].parentNode.parentNode.parentNode.children[1].children[0].textContent
      let obj={
        mname:mname,
      }
      
      let res = await fetch('http://localhost:3000/adminmovies/getmovieinfo', {
        method: 'post',
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": 'application/json'
        }
    });

    let movieobj=await res.json();
    document.querySelector(".imgdiv").children[0].src=movieobj["imgurl"];
   let castimgarr=document.querySelectorAll(".castimg");
   let castnamearr=document.querySelectorAll(".castname");
    for(let i=0;i<movieobj["cast"].length;i++)
    {   castnamearr[i].children[0].textContent=movieobj["cast"][i]["castname"];
        castimgarr[i].children[0].src=movieobj["cast"][i]["castimg"];
    }
    document.querySelector(".rdandtime").children[0].children[1].textContent=movieobj["releasedate"];
    document.querySelector(".rdandtime").children[1].children[1].textContent=movieobj["duration"];  
    document.querySelector(".rdandtime").children[2].children[1].textContent=movieobj["genre"];
    document.querySelector(".mabout").children[1].textContent=movieobj["about"];
    })
}