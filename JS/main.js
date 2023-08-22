

/*------------------------------------- navigation menu -------------------------*/

(() =>{

    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open")
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    // attach an event handler to document
    document.addEventListener("click",(event) =>{
           if(event.target.classList.contains('link-item')){
              if(event.target.hash !==""){
                  // prevent default anchor click behavior
                  event.preventDefault();
                  const hash = event.target.hash;
                  // deactive existing active 'section'
                  document.querySelector(".section.active").classList.add("hide");
                  document.querySelector(".section.active").classList.remove("active");
                  // active new 'section'
                  document.querySelector(hash).classList.add("active");
                  document.querySelector(hash).classList.remove("hide");
                //   deactive existing active navigation menu 'link-item'
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                if(navMenu.classList.contains("open")){
                // activate new navigation menu 'link-item'
                event.target.classList.add("active","inner-shadow");
                event.target.classList.remove("outer-shadow","hover-in-shadow");
                // hide navigation menu
                hideNavMenu();
               }
               else{
                   let navItems = navMenu.querySelectorAll(".link-item");
                   navItems.forEach((item) =>{
                       if(hash === item.hash){
                         // activate new navigation menu 'link-item'
                         item.classList.add("active","inner-shadow");
                         item.classList.remove("outer-shadow","hover-in-shadow");
                       }
                   })
                   fadeOutEffect();
               }
                   // add hash (#) to url
                   window.location.hash = hash;
             }
           }
           
    })

})();

/*-------------------------------about section tabs----------------------*/
(() =>{
       const aboutSection = document.querySelector(".about-section"),
       tabsContainer = document.querySelector(".about-tabs");

       tabsContainer.addEventListener("click", (event) =>{
           /* if event.target contains 'tab-item' class and not contains 'active' class */
           if(event.target.classList.contains("tab-item") && 
           !event.target.classList.contains("active")){
               const target = event.target.getAttribute("data-target");
            //    deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
            // activate new 'tab-item'
            event.target.classList.add("active","outer-shadow");
            
            // deactivate existing active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
           
           }
       })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}


/*-------------------------------------------- portfolio filter and popup ----------------------------*/ 

(() =>{

    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshort;

    /* filter portfolio items*/
    filterContainer.addEventListener("click", (event)=>{
            if(event.target.classList.contains("filter-item") && ! event.target.classList.contains("active")){
               //deactivate existing active 'filter-item'
               filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
               // activate new 'filter item'
               event.target.classList.add("active","outer-shadow");
               const target = event.target.getAttribute("data-target");
               portfolioItems.forEach((item) =>{
                  if(target === item.getAttribute("data-category") || target === 'all'){
                      item.classList.remove("hide");
                      item.classList.add("show");
                  }
                  else{
                      item.classList.remove("show");
                      item.classList.add("hide");
                  }
               })
            }
    })
    
    portfolioItemsContainer.addEventListener("click", (event) =>{
            if(event.target.closest(".portfolio-item-inner")){
                const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
                // get the portfolioItem index
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
                screenshorts = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
                // convert screenshots into array
                screenshorts = screenshorts.split(",");
                if (screenshorts.length === 1){
                    prevBtn.style.display="none";
                    nextBtn.style.display="none";
                }
                else{
                    prevBtn.style.display="block";
                    nextBtn.style.display="block";
                }
                slideIndex = 0;
                popupToggle();
                popupSlideshow();
                popupDetails();
            }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if (projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshorts[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* Activate loader until the popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active")
        popupImg.src=imgSrc;
        popupImg.onload = () =>{
            // deactivate loader after the popupImg loaded
            popup.querySelector(".pp-loader").classList.remove("active")
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + "of" + screenshorts.length;

    }
    
    // next slide
    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshorts.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex ++;
        }
        popupSlideshow();
    })

    // prev slide
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex.screenshorts.length-1
        }
        else{
            slideIndex --;
        }
        popupSlideshow();
        console.log("slideIndex:" + slideIndex);
    })

    function popupDetails(){
        // if the project item details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return; /* end function execution */
        }
        projectDetailsBtn.style.display="block";
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("_").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if (projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 +"px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer. scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();

/*---------------------------------------------- testimonial slider ---------------------------------------*/

(() =>{

    const slideContainer = document.querySelector(".testi-slider-container"),
    slides = slideContainer.querySelectorAll(".testi-item");
   slideWidth =slideContainer.offsetWidth;
   prevBtn =document.querySelector(".testi-slider-nav .prev"),
   nextBtn =document.querySelector(".testi-slider-nav .next");
   activeSlider = slideContainer.querySelector(".testi-item.active");
   let slideIndex = Array.from(activeSlider.parentElement.children).indexOf(activeSlider);

   // set width of all slides
   slides.forEach((slide) =>{
       slide.style.width = slideWidth + "px";
   })
   // set width of sliderContainer
   slideContainer.style.width = slideWidth * slides.length + "px";

   nextBtn.addEventListener("click", () =>{
       if(slideIndex === slides.length-1){
           slideIndex = 0;
       }
       else{
       slideIndex++;
       }
       slider();
   })
   prevBtn.addEventListener("click", () =>{
       if(slideIndex === 0){
           slideIndex =slides.length-1;
       }
       else{
           slideIndex--;
       }
       slider();
   })

   function slider(){
       // deactive existing active slides 
       slideContainer.querySelector(".testi-item.active").classList.remove("active");
       // active new slide
       slides[slideIndex].classList.add("active");
    slideContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
   }
   slider();

})();


/*----------------------------------------- hide all sections except active ----------------------------------------------------*/
(() =>{

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

})();


window.addEventListener("load", () =>{
    // preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display="none";
    },600)
})

// video player hidder

var videoPlayer = document.getElementById("videoPlayer");
var myVideo = document.getElementById("myVideo");
var videoPlayer1 = document.getElementById("videoPlayer1");
var myVideo1 = document.getElementById("myVideo1");
var videoPlayer2 = document.getElementById("videoPlayer2");
var myVideo2 = document.getElementById("myVideo2");
var videoPlayer3 = document.getElementById("videoPlayer3");
var myVideo3 = document.getElementById("myVideo3");
var videoPlayer4 = document.getElementById("videoPlayer4");
var myVideo4 = document.getElementById("myVideo4");
var videoPlayer5 = document.getElementById("videoPlayer5");
var myVideo5 = document.getElementById("myVideo5");
var videoPlayer6 = document.getElementById("videoPlayer6");
var myVideo6 = document.getElementById("myVideo6");
var videoPlayer7 = document.getElementById("videoPlayer7");
var myVideo7 = document.getElementById("myVideo7");
var videoPlayer8 = document.getElementById("videoPlayer8");
var myVideo8 = document.getElementById("myVideo8");
var videoPlayer9 = document.getElementById("videoPlayer9");
var myVideo9 = document.getElementById("myVideo9");
var videoPlayer10 = document.getElementById("videoPlayer10");
var myVideo10 = document.getElementById("myVideo10");


// video stop function
function stopVideo(){
    videoPlayer.style.display = "none";
    videoPlayer1.style.display = "none";
    videoPlayer2.style.display = "none";
    videoPlayer3.style.display = "none";
    videoPlayer4.style.display = "none";
    videoPlayer5.style.display = "none";
    videoPlayer6.style.display = "none";
    videoPlayer7.style.display = "none";
    videoPlayer8.style.display = "none";
    videoPlayer9.style.display = "none";
    videoPlayer10.style.display = "none";
}

function playVideo(url){
    myVideo.src = url;
    videoPlayer.style.display = "block";
}
function playVideo1(url){
    myVideo1.src = url;
    videoPlayer1.style.display = "block";
}
function playVideo2(url){
    myVideo2.src = url;
    videoPlayer2.style.display = "block";
}
function playVideo3(url){
    myVideo3.src = url;
    videoPlayer3.style.display = "block";
}
function playVideo4(url){
    myVideo4.src = url;
    videoPlayer4.style.display = "block";
}
function playVideo5(url){
    myVideo5.src = url;
    videoPlayer5.style.display = "block";
}
function playVideo6(url){
    myVideo6.src = url;
    videoPlayer6.style.display = "block";
}
function playVideo2(url){
    myVideo7.src = url;
    videoPlayer7.style.display = "block";
}
function playVideo8(url){
    myVideo8.src = url;
    videoPlayer8.style.display = "block";
}
function playVideo9(url){
    myVideo9.src = url;
    videoPlayer9.style.display = "block";
}
function playVideo10(url){
    myVideo10.src = url;
    videoPlayer10.style.display = "block";
}