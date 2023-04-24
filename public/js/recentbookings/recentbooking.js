
let showticket=document.querySelectorAll(".showticket");
for(let i=0;i<showticket.length;i++)
{
    showticket[i].addEventListener("click",async function(){
        let TicketId=showticket[i].parentNode.parentNode.children[0].textContent;
         let obj1={
            TicketId:TicketId,
         }
         console.log(obj1);
        let res1=await fetch(
            "http://localhost:3000/recentbooking/getticketinfo",
            {
              method: "post",
              body: JSON.stringify(obj1),
              headers: {
                "Content-Type": "application/json",
              }
            }
          );
          let tobj=await res1.json();
            
          
          document.querySelector(".mimg").src=tobj["Movieimgurl"];
          document.querySelector(".mname").textContent=tobj["MovieName"];
          document.querySelector(".theatrename").textContent=tobj["theatrename"];
          document.querySelector(".sname").textContent=tobj["screenname"];
          let seatstr="";
          for(let i=0;i<tobj["seats"].length;i++)
          {  if(i==tobj["seats"].length-1)
                seatstr+=tobj["seats"][i];
             else
                 seatstr+=tobj["seats"][i]+",";
          }
          document.querySelector(".seatnum").textContent=seatstr;
          document.querySelector(".showtime").textContent=tobj["time"];
    })
}