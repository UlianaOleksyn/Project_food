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
    console.log(GetTimeRemaining(dedline));

 });