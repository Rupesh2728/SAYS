let seefullreview=document.querySelectorAll(".seefullreview");
for(let i=0;i<seefullreview.length;i++)
{
    seefullreview[i].addEventListener("click",function(){
      let uname=seefullreview[i].parentNode.parentNode.children[2].textContent;
      let umail=seefullreview[i].parentNode.parentNode.children[1].textContent;
      let rating=seefullreview[i].parentNode.parentNode.children[3].textContent;
      let treview=seefullreview[i].parentNode.parentNode.children[4].textContent;
    
      document.querySelector(".name-user").children[0].textContent=uname;
      document.querySelector(".name-user").children[1].textContent=umail;
      document.querySelector(".client-comment").children[0].textContent=treview;
      let ratingdiv=document.querySelector(".ratingdiv");
      let trating=document.createElement('div');
      trating.classList.add("rating");
      for(let i=0;i<rating;i++)
      {
        let faicon=document.createElement('i');
        faicon.classList.add("fas");
        faicon.classList.add("fa-star");
        trating.appendChild(faicon);
      }
       let k=5-rating;
      for(let i=0;i<k;i++)
      {
        let faicon=document.createElement('i');
        faicon.classList.add("far");
        faicon.classList.add("fa-star");
        trating.appendChild(faicon);
      }

      ratingdiv.appendChild(trating);
    });
}