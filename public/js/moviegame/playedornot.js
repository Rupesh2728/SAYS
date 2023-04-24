async function allowfunc()
{
    let res2=await fetch(
        "http://localhost:3000/moviegame/getplayed",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      let isplayedobj=await res2.json();
      let isplayed=isplayedobj.isplayed;
      if(isplayed)
      {
        document.querySelector(".showtimebtn").disabled = true;
        document.querySelector(".showtimebtn").style.backgroundColor="#8B0000";
        document.querySelector(".showtimebtn").style.color="white";
      } 
     
      document.querySelector('.continuebtn').addEventListener("click",async function(){
        let obj={
          isplayed:true,
      }

  
      let res=await fetch(
          "http://localhost:3000/moviegame/getplayed",
          {
            method: "post",
            body: JSON.stringify(obj),
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
      })
     
}
allowfunc();