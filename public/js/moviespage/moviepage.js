

let clickcount=0;

function submitForms() {

    clickcount++;
    if (clickcount == 1) {
     return;
    }
    
    console.log("came here rey");
   
    var form1Data = new FormData(document.getElementById("form1"));
    var form2Data = new FormData(document.getElementById("form2"));
    var form3Data = new FormData(document.getElementById("form3"));

    // console.log(form3Data.location.value);
    
    for (var pair of form2Data.entries()) {
       form1Data.append(pair[0], pair[1]);
    }
    for (var pair of form3Data.entries()) {
      form1Data.append(pair[0], pair[1]);
   }
 
    
    const formcreated = document.getElementById('formcreated');
   
    formcreated.innerHTML="";
    
    // Create new form fields based on the form data
    for (const [name, value] of form1Data.entries()) {
    
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      formcreated.appendChild(input);
    }
    
   
    
 
    formcreated.submit();
  }

  lcheck_filterchangedornot();

  function lcheck_filterchangedornot(){

    let x=document.getElementById('checkLangfileter').textContent;
    
    if(x.includes("Telugu")){
     
        document.querySelector('select[name="Lang"]').value="Telugu"; 
      
    }
    else if(x.includes("Tamil")){
     
        document.querySelector('select[name="Lang"]').value="Tamil"; 
      
    }
    else if(x.includes("Hindi")){
     
        document.querySelector('select[name="Lang"]').value="Hindi"; 
      
    }

    else{
      console.log("noshift-language");
    }



  }
    

  gcheck_filterchangedornot();

function gcheck_filterchangedornot(){

    let x= document.getElementById('checkGenrefilter').textContent;
    
    if(x.includes("Thriller")){
     
        document.querySelector('select[name="Genre"]').value="Thriller"; 
      
    }
    else if(x.includes("Horror")){
     
        document.querySelector('select[name="Genre"]').value="Horror"; 
      
    }
    else if(x.includes("Comedy")){
     
        document.querySelector('select[name="Genre"]').value="Comedy"; 
      
    }

    else{
      console.log("noshift-genre");
    }



  }
   
 checklocationchanged();
 
 function checklocationchanged(){
  

  let x=document.getElementById('checklocation').textContent;

  if(x.includes("Vijayawada")){
     
    document.querySelector('input[name="location"]').value="Vijayawada";
    $('.selectpicker').val("Vijayawada");
    
  }
  else if(x.includes("Vishakapatnam")){
     
    document.querySelector('input[name="location"]').value="Vishakapatnam";
    $('.selectpicker').val("Vishakapatnam");
    
  }
  else if(x.includes("Guntur")){
     
    document.querySelector('input[name="location"]').value="Guntur";
    $('.selectpicker').val("Guntur");
    
  }
  else if(x.includes("Nellore")){
     
    document.querySelector('input[name="location"]').value="Nellore";
    $('.selectpicker').val("Nellore");
    
  }
  else if(x.includes("Guntur")){
     
    document.querySelector('input[name="location"]').value="Sullurpeta";
    $('.selectpicker').val("Sullurpeta");
    
  }
  else if(x.includes("Guntur")){
     
    document.querySelector('input[name="location"]').value="Tada";
    $('.selectpicker').val("Tada");
    
  }
  else if(x.includes("Guntur")){
     
    document.querySelector('input[name="location"]').value="Rajmundry";
    $('.selectpicker').val("Rajmundry");
    
  }
  else if(x.includes("Srikakulam")){
     
    document.querySelector('input[name="location"]').value="Srikakulam";
    $('.selectpicker').val("Srikakulam");
    
  }
 }
  
  $('.selectpicker').change(function (e) {

     
    $('.selectpicker').val(e.target.value);
    let str=e.target.value;
    
    console.log(str);
    document.querySelector('input[name="location"]').value=str;
    // console.log(document.querySelector('input[name="location"]').value);
    submitForms();
    submitForms();
  });





  
  let suggestions = [];
  console.log(document.querySelector('input[name="location"]').value);
  getAllsuggestion();
  async function getAllsuggestion() {
  
      
      let res = await fetch("http://localhost:3000/movies/getsuggestion", {
  
          method: "post",
          body:JSON.stringify({city:document.querySelector('input[name="location"]').value}),
          headers: {
              "Content-Type": "application/json",
          }
  
  
      });
  
  
      let k = await res.json();
      // console.log(k);
      for (let i = 0; i < k.length; i++) {
          suggestions.push(k[i].MovieName);
      }
  
      console.log(suggestions);
  }