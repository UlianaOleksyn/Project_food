"use strict";
 window.addEventListener("DOMContentLoaded", ()=>{
 
    // Tabs
     const tabsParent = document.querySelector('.tabheader__items'),
           tabs = tabsParent.querySelectorAll('.tabheader__item'),
           tabsContent = document.querySelectorAll('.tabcontent');

    function hideContent(){
        tabsContent.forEach(item =>{
            item.classList.add('hide', 'fade');
            item.classList.remove('show');
        });
        tabs.forEach(item =>{
            item.classList.remove('tabheader__item_active');
        });
    }

    function showContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }


hideContent();
showContent();

    tabsParent.addEventListener("click", (event)=>{
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) =>{
                if (target == item){
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    // Timer
const TimerBox = document.querySelector('.timer'),
       dedline = new Date('2021-03-01');
    function GetTimeRemaining(endTime){
        const t = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 *24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / ( 1000 * 60) % 60),
              seconds = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    
    function GetZero(num){
        if (num >=0 && num < 10){
            return `0${num}`;
        }
        else{
            return `${num}`;
        }
    }

    function writeTimer(ParentBox, endTime){
        let days = ParentBox.querySelector('#days'),
              hours = ParentBox.querySelector('#hours'),
              minutes = ParentBox.querySelector('#minutes'),
              seconds = ParentBox.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock(){
            const  t = GetTimeRemaining(endTime);
            days.innerHTML = GetZero(t.days);
            hours.innerHTML = GetZero(t.hours);
            minutes.innerHTML = GetZero(t.minutes);
            seconds.innerHTML = GetZero(t.seconds); 
            
            if (t.total <= 0){
                clearInterval(timerInterval);
            }
        }
    }

    writeTimer(TimerBox, dedline);

    // Modal
    const modalOpen = document.querySelectorAll("[data-modal]"),
          modalClose = document.querySelector('[data-close]'),
          modalWindow = document.querySelector(".modal");
    let couterScrolDown = 1;


    function openedModalWindow(){
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
    }

    function closedModalWindow(){
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";
        clearTimeout(timer);
    }
    const timer = setTimeout(openedModalWindow, 5000);

    modalOpen.forEach(item =>{
        item.addEventListener("click", openedModalWindow);
    });

    modalClose.addEventListener("click", closedModalWindow);

    modalWindow.addEventListener('click', (event)=>{
        if(event.target === modalWindow){
            closedModalWindow();
        }
    });
    
    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape" && modalWindow.classList.contains('show')){
            closedModalWindow();
        }
    });

    window.addEventListener("scroll", () =>{
        if (couterScrolDown == 1) {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
                openedModalWindow();
                couterScrolDown++;
            }
        }
    });

    console.log(window.pageYOffset);
    console.log(document.documentElement.clientHeight);

    console.log(document.documentElement.scrollHeight);


 });