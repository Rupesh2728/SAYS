let moviequesarr=[];
let questions=[];
async function func1()
{
  let res = await fetch(
    "http://localhost:3000/moviegame/getques",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );

  moviequesarr=await res.json();

for(let i=0;i<moviequesarr.length;i++)
{
   let obj={
    numb: i+1,
    question:moviequesarr[i]["mainques"],
    answer:moviequesarr[i]["correctans"],
    options: [
      moviequesarr[i]["options"][0],
      moviequesarr[i]["options"][1],
      moviequesarr[i]["options"][2],
      moviequesarr[i]["options"][3]
    ]
   }

   questions.push(obj);
}

console.log(questions);
}

func1();





