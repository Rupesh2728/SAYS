let moviename;
let duration=document.querySelector(".duration");
let addshow=document.querySelector(".addshow");
addshow.addEventListener("click",async function(){
    duration.addEventListener("click",async function(){
        moviename=document.querySelector(".selectmovie").value;
        let obj=
        {
         mname:moviename,
        }
     
        let res = await fetch(
         "http://localhost:3000/tschedule/getmoviedetails",
         {
           method: "post",
           body: JSON.stringify(obj),
           headers: {
             "Content-Type": "application/json",
           }
         }
       );
     
       let moviedetails=await res.json();
       duration.value=moviedetails["duration"];  
     });
});


let removeshowbtn=document.querySelectorAll(".scheduleremovebtn");
for(let i=0;i<removeshowbtn.length;i++){

    removeshowbtn[i].addEventListener("click",async function(){
        let removemname=removeshowbtn[i].parentNode.parentNode.children[4].textContent;
        let obj={
            removemname:removemname,
        }

        let res = await fetch(
            "http://localhost:3000/tschedule/removeshow",
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
}
