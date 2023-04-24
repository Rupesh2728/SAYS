let editbtnarr=document.querySelectorAll('.editbtn');
let removebtnarr=document.querySelectorAll('.removebtn');

for(let i=0;i<editbtnarr.length;i++)
{
    editbtnarr[i].addEventListener("click",async function()
    {
        let sname=editbtnarr[i].parentNode.parentNode.parentNode.children[3].children[0].value;
        let category=editbtnarr[i].parentNode.parentNode.parentNode.children[4].children[0].value;

        console.log(sname);
        console.log(category);

        let obj={
            sname: sname,
            category: category
          }
         
         
            let res = await fetch(
              "http://localhost:3000/tsnackspage/getsnackdetails",
              {
                method: "post",
                body: JSON.stringify(obj),
                headers: {
                  "Content-Type": "application/json",
                }
              }
            );
            let snackobj = await res.json();

            document.querySelector(".esname").value=snackobj.SnackName;
            document.querySelector(".escategory").value=snackobj.category;
            document.querySelector(".esprice").value=snackobj.price;
            document.querySelector(".esimgurl").value=snackobj.imgurl;
             let oldsname=document.querySelector(".esname").value;
             let oldscategory=document.querySelector(".escategory").value;
              let obj2={
                oldsname:oldsname,
                oldscategory:oldscategory
              }
             let res2 = await fetch(
                "http://localhost:3000/tsnackspage/editsavesnack/olddetails",
                {
                  method: "post",
                  body: JSON.stringify(obj2),
                  headers: {
                    "Content-Type": "application/json",
                  }
                }
              ); 
            })
}


// for(let i=0;i<editbtnarr.length;i++)
// {
//     removebtnarr[i].addEventListener("click",async function()
//     {
//         let sname=removebtnarr[i].parentNode.parentNode.parentNode.children[2].textContent;
//         let category=removebtnarr[i].parentNode.parentNode.parentNode.children[3].textContent;

//         let obj={
//             sname: sname,
//             category: category
//           }
                  
//             let res = await fetch(
//               "http://localhost:3000/tsnackspage/removesnack",
//               {
//                 method: "post",
//                 body: JSON.stringify(obj),
//                 headers: {
//                   "Content-Type": "application/json",
//                 }
//               }
//             );

// })
// }





