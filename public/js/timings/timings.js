let clickcount=0;
console.log("hi");
function submitForms() {

    clickcount++;
    if (clickcount== 1) {
     return;
    }
    
    console.log("came here rey timings submit");
    const timingsform = document.getElementById('time_filter');
    timingsform .submit();
  }


  updatefilter();

  function updatefilter(){


  let x=document.getElementById("timevalue").textContent;
  console.log(x);

  if(x.includes("Show All")){
    document.querySelector('select[name="time"]').value="Show All";
  }
  else if(x.includes("6:00 AM")){
    document.querySelector('select[name="time"]').value="6:00 AM";
  }

  else if(x.includes("9:00 AM")){
    document.querySelector('select[name="time"]').value="9:00 AM";
  }

   else if(x.includes("2:00 PM")){
    document.querySelector('select[name="time"]').value="2:00 PM";
  }

  else if(x.includes("6:00 PM")){
    document.querySelector('select[name="time"]').value="6:00 PM";
  }

  else if(x.includes("9:00 PM")){
    document.querySelector('select[name="time"]').value="9:00 PM";
  }

 
  }