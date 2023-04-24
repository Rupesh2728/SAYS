let suggestions = []; 
let k;
getAllsuggestion();
async function getAllsuggestion() {

    
    let res = await fetch("http://localhost:3000/home/getsuggestion", {

        method: "get",
        headers: {
            "Content-Type": "application/json",
        }


    });


     k = await res.json();
    
    



    for (let i = 0; i < k.length; i++) {
        suggestions.push(k[i].tName);
    }

    console.log(suggestions);
}
  
  
  
  