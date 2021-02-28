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
 //   clearTimeout(timer);
    }
   // const timer = setTimeout(openedModalWindow, 5000);

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

// class for menu__item
let contanier = document.querySelector('.menu__field .container');

    class MenuCard {
        constructor(src, alt, title, descr, price, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
         }

         addCard(block, className){
             let div = document.createElement("div");
             console.log(this.classes);
             if (this.classes.length == 0){
                div.classList.add("menu__item");
             }
             else{
                this.classes.forEach(className => div.classList.add(className));
             }

             div.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
         div.classList.add(className);
         block.append(div);
         } 
    }

      new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        "229",
        "menu__item",
        "big"
      ).addCard(contanier);

      new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        "550",
      ).addCard(contanier);

      new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        "430",
        "menu__item"
      ).addCard(contanier);


 });