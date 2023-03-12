export default function scrollLang(){
  window.onscroll= () => {
    const tabs = document.querySelector(".tabs");
    const cardLine = document.querySelector(".cardLine");
    if (tabs){
      if(window.pageYOffset>60 && cardLine.scrollHeight>1000){
        tabs.classList.add("fixed");
      }
      else{
        tabs.classList.remove("fixed");
      }
    }
  }
}