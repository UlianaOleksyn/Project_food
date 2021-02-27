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

contanier.innerHTML = "";



// function addClass(element, className){
//    element.classList.add(className);
// }

    class MenuCard {
        constructor(src, alt, title, descr, price){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
         }

         addCard(block, className){
             let div = document.createElement("div");
             div.innerHTML = ` <div class="menu__item">
             <img src=${this.src} alt=${this.alt}>
             <h3 class="menu__item-subtitle">${this.title}</h3>
             <div class="menu__item-descr">${this.descr}</div>
             <div class="menu__item-divider"></div>
             <div class="menu__item-price">
                 <div class="menu__item-cost">Цена:</div>
                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
             </div>
         </div>`;
         div.classList.add(className);
         block.append(div);


         } 

    }


//          addCart(block){
//             let img = document.createElement("img");
//             let titleH3 = document.createElement("h3");
//             let descrDiv = document.createElement("div");
//             const line = document.createElement("div");
//             let priceDiv = document.createElement("div");
//             let costDiv = document.createElement("div");
//             let totalDiv = document.createElement("div");
//             let totalSpan = document.createElement("span");


//             img.src = this.src;
//             img.alt = this.alt;
//             block.append(img);
//             addClass(titleH3, "menu__item-subtitle");
//             titleH3.innerHTML = this.title;
//             block.append(titleH3);
//             addClass(descrDiv, "menu__item-descr");
//             descrDiv.innerHTML = this.descr;
//             block.append(descrDiv);
//             addClass(line, "menu__item-divider");
//             block.append(line);
//             addClass(priceDiv, "menu__item-price");
//             block.append(priceDiv);
//             addClass(costDiv, "menu__item-cost");
//             costDiv.innerHTML = "Цена:";
//             priceDiv.append(costDiv);
//             addClass(totalDiv, "menu__item-total");
//             priceDiv.append(totalDiv);
//             totalSpan.innerHTML = this.price;
//             totalDiv.append(totalSpan);
//             totalDiv.append(" грн/день");
//                     }
//     }



     const fitnes = new MenuCard();
     fitnes.src = "img/tabs/vegy.jpg";
     fitnes.alt = "vegy";
     fitnes.title = 'Меню "Фитнес"';
     fitnes.descr = 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!';
     fitnes.price = "229";
     fitnes.addCard(contanier, "menu__item");

     const premium = new MenuCard();
     premium.src = "img/tabs/elite.jpg";
     premium.alt = "elite";
     premium.title = 'Меню “Премиум”';
     premium.descr = 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!';
     premium.price = "550";
     premium.addCard(contanier, "menu__item");


     const post = new MenuCard();
     post.src = "img/tabs/post.jpg";
     post.alt = "post";
     post.title = 'Меню "Постное"';
     post.descr = 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.';
     post.price = "430";
     post.addCard(contanier, "menu__item");


      
    
     



 });