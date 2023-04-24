let tobj;
var treferencenum="";
gettheatrereferrencenum();
async function gettheatrereferrencenum() {
 
  let res = await fetch("http://localhost:3000/tmdashboard/gettreffnum", {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    }
  });
  treferencenum = await res.json();
  console.log(treferencenum);
}

gettheatredetails();
async function gettheatredetails() 
{
  let res = await fetch(
    "http://localhost:3000/tmdashboard/gettheatredetails",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
 tobj = await res.json();
console.log(tobj);
}

var castimg = document.querySelectorAll(".castimg");
var castname = document.querySelectorAll(".castname");
var rd = document.querySelector(".rd").children[1];
var duration = document.querySelector(".duration").children[1];
var genre = document.querySelector(".genre").children[1];
var about = document.querySelector(".about").children[1];
var movieimg = document.querySelector(".imgdiv").children[0];
var infobtn = document.querySelectorAll(".infobtn");

var moviename;
var movieobj;
for (let i = 0; i < infobtn.length; i++) 
{
  infobtn[i].addEventListener("click", async function () {
    moviename =infobtn[i].parentNode.parentNode.parentNode.children[1].children[0].textContent;
    let obj={
      mname: moviename,
    }
   
   
      let res = await fetch(
        "http://localhost:3000/tmdashboard/getmoviedetails",
        {
          method: "post",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      movieobj = await res.json();
    genre.textContent = movieobj['genre'];
    about.textContent = movieobj['about'];
    duration.textContent = movieobj["duration"];
    rd.textContent = movieobj["releasedate"];
    movieimg.src = movieobj["imgurl"];
    for (let i = 0; i < castname.length; i++) 
    {
      castimg[i].children[0].src = movieobj["cast"][i]['castimg'];
      castname[i].children[0].textContent = movieobj["cast"][i]['castname'];
    }

    console.log("Info btn clicked!!!");
  });
}


var rentbtn=document.querySelectorAll('.rentbtn');
for(let i=0;i<rentbtn.length;i++)
{
   rentbtn[i].addEventListener("click",async function(){
   let moviename= rentbtn[i].parentNode.parentNode.children[1].children[0].textContent;
   let obj={
    mname: moviename,
  }
 
 
    let res = await fetch(
      "http://localhost:3000/tmdashboard/getmoviedetails",
      {
        method: "post",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    let mobj=await res.json();
   
   document.querySelector('#movietitle').value=moviename;
    document.querySelector('#tname').value=tobj['tName'];
    document.querySelector('#temail').value=tobj['temail'];
    document.querySelector('#rentaldate').value=mobj['releasedate'];
     })
}


