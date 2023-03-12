export default function clickInfo(id,language){
  document.querySelectorAll(".card").forEach((card)=>{
    const btn = card.querySelector(".btnShow");
    const moreInfo = card.querySelector(".moreInfo");
    if (btn.id===id){
      moreInfo.classList.toggle("active");
      if (moreInfo.classList.contains("active") && language==="Ru"){
        btn.textContent="Свернуть";
      }
      else if(moreInfo.classList.contains("active") && language=="En"){
        btn.textContent="Hide more";
      }
      else{
        if(language==="Ru"){
          btn.textContent="Развернуть";
        }
        else{
          btn.textContent="Show more";
        }
      }
    }
    else{
      if (moreInfo.classList.contains("active") && language==="Ru"){
        btn.textContent="Свернуть";
      }
      else if(moreInfo.classList.contains("active") && language=="En"){
        btn.textContent="Hide more";
      }
      else{
        if(language==="Ru"){
          btn.textContent="Развернуть";
        }
        else{
          btn.textContent="Show more";
        }
      }
    }
  })
}
