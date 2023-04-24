

const startbtn = document.querySelector(".startbtn button");
const instructionsbox = document.querySelector(".instructions");
const quitbtn = instructionsbox.querySelector(".buttons .quitbtn");
const continue_btn = instructionsbox.querySelector(".buttons .continuebtn");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeCount = document.querySelector(".timer .timer_sec");
const timerbox=document.querySelector(".timerbox");
const description=document.querySelector(".about");
const leaderboard=document.querySelector(".leaderboard");
const leaderboardbtn=document.querySelector(".gotoleaderboard");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = leaderboard.querySelector(".leaderboard .quit");
const leaderboardtitle=document.querySelector(".leaderboardtitle");
let gotoleaderboardbtn=document.querySelectorAll('.gotoleaderboard');


let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;


startbtn.onclick = ()=>{
    instructionsbox.classList.add("activeinstructions");
    startbtn.style.display="none"; //show info box
    description.style.display="none";
}


quitbtn.onclick = ()=>{
    instructionsbox.classList.remove("activeinstructions"); 
    startbtn.style.display="block";
    description.style.display="block";
}

leaderboardbtn.addEventListener('click',function()
{  
    gotoleaderboardbtn[1].style.display="block";
    result_box.style.display="none";
    leaderboardtitle.style.display="block";
})

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1)
    { 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        startTimer(timeValue);
        next_btn.classList.remove("show"); 
    }
    else{
        clearInterval(counter); 
        timerbox.style.visibility="hidden";
        showResult();
    }
}


function showQuetions(index){
    const que_text = document.querySelector(".question");
    
    let que_tag ='<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer)
{
    clearInterval(counter); 
   
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns)
    {   userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }
    
    else
    {
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ 
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
}

function showResult()
{
    instructionsbox.classList.remove("activeinstructions"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 1)
    { 
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else
    {
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time)
{
    counter = setInterval(timer, 1000);
    function timer()
    {
        timeCount.textContent = time; 
        time--; 
        if(time < 9)
        { 
            timeCount.textContent = "0" + timeCount.textContent; //add a 0 before time value
        }

        if(time < 0)
        { 
            clearInterval(counter); 
          
            const allOptions = option_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++)
            {
                if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
                    option_list.children[i].classList.add("correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                }
            }

            for(i=0; i < allOptions; i++)
            {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function queCounter(index)
{
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

async function getleaderboarddetails(){
   console.log("Yes iam in getleaderbaorddetailsfunc");
    let res2=await fetch(
        "http://localhost:3000/moviegame/getleaderboard",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

        let leaderboardarr=await res2.json();
        console.log(leaderboardarr);
        let leaderboardtable=document.querySelector('.leaderboardtable');
          const table = document.createElement('table');
          const thead = document.createElement('thead');
          const headingRow = document.createElement('tr');
          headingRow.classList.add('headingrow');
          const headers = ['Rank', 'MailId', 'Name', 'Score'];
          
          headers.forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headingRow.appendChild(th);
          });
          
          thead.appendChild(headingRow);
          table.appendChild(thead);
        
          const tbody = document.createElement('tbody');
          for(let i=0;i<leaderboardarr.length;i++)
          {  let obj=leaderboardarr[i];
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            td1.textContent =i+1;
            const td2 = document.createElement('td');
            td2.textContent = obj.email;
            const td3 = document.createElement('td');
            td3.textContent = obj.firstName;
            const td4 = document.createElement('td');
            td4.textContent = obj.points;
           
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
    
            tbody.appendChild(tr);
          }
    
          table.appendChild(tbody);
          leaderboardtable.appendChild(table);
}



gotoleaderboardbtn[0].addEventListener("click",async function(){
    leaderboard.style.display="block";
    result_box.style.display="none";
    leaderboardtitle.style.display="block";
    timerbox.style.visibility="none";
    quiz_box.classList.remove("activeQuiz");
    description.style.display="none";
    instructionsbox.style.display="none";
    document.querySelector('.showtimebtn').style.display="none";
    gotoleaderboardbtn[0].style.display="none";
    getleaderboarddetails();
   });

gotoleaderboardbtn[1].addEventListener("click",async function(){
    leaderboard.style.display="block";
    result_box.style.display="none";
    instructionsbox.style.display="none";
    leaderboardtitle.style.display="block";
    timerbox.style.visibility="none";
    quiz_box.classList.remove("activeQuiz");   
    let obj={
        points:userScore,
    }

    let res = await fetch(
     "http://localhost:3000/moviegame/addgamescore",
     {
       method: "post",
       body: JSON.stringify(obj),
       headers: {
         "Content-Type": "application/json",
       }
     }
   );
   let k=await res.json();
   k=k.k;
   if(k==1){
     getleaderboarddetails();
   }
})


continue_btn.onclick=()=>
{
    instructionsbox.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    instructionsbox.style.display="none";
    timerbox.style.visibility="visible";
    document.querySelector('.backbtn').disabled = true;
    gotoleaderboardbtn[0].style.display="none";
    document.querySelector('.backbtn').style.display="none";
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
}


  