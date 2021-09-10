document.addEventListener('DOMContentLoaded', () =>{

    document.querySelector('.icon').onclick = function () {
        var x = document.getElementById("navbarTop");
        if (x.className === "navbarTop") {
          x.className += "Responsive";
        } else {
          x.className = "navbarTop";
        }
        
        if (x.className === 'navbarTopResponsive'){
        document.querySelector('.icon').innerHTML = '<img src="images/icon-close.svg" alt="">';
        }else{
        document.querySelector('.icon').innerHTML = '<img src="images/icon-hamburger.svg" alt="">'    
        }

        console.log(x.className);
        console.log(document.querySelector('.icon').innerHTML);
      }
    
   
      var slideIndex = 1;
      showSlides(slideIndex);
      
      // Next/previous controls
      document.querySelector('#right').onclick = function () {
        showSlides(slideIndex = slideIndex + 1);
      }
      document.querySelector('#left').onclick = function () {
        showSlides(slideIndex = slideIndex - 1);
      }
      
      function showSlides() {
        var i;
        var slides = document.getElementsByClassName("slider");
        var text = document.getElementsByClassName("mainText");
    
        
        console.log(slides.length);
        if (slideIndex > slides.length) {slideIndex = 1;} 
        if (slideIndex < 1) {slideIndex = slides.length;}
        for (i = 0; i < slides.length; i++) {
 
            slides[i].style.display = "none"; 
            text[i].style.display = "none";
        }
        console.log(slideIndex);

        slides[slideIndex-1].style.display = "block";
        text[slideIndex-1].style.display = "block"; 
      }

    
    
});