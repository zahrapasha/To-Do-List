// section-date
const arrowleft =document.querySelector('.arrow-left')
const rangetime =document.querySelector('.range-time')
const arrowright =document.querySelector('.arrow-right')
const dayWeeks =document.querySelector('.dayWeeks')


let startdate= new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 let q =       String(startdate.getDate()).padStart(2 , '0')
console.log(q);

      

function rangerweek() {
    let Days = [];
    rangetime.innerHTML =''
    dayWeeks.innerHTML=''
    
    for(let i = 0 ; i <7 ; i++ ){
        let current = new Date(startdate)
        current.setDate(startdate.getDate()+i)

         Days.push(current)
         
        }
       
        firstDay = Days[0];
        lastDay = Days[6]   ;     
       let f = String(firstDay.getDate()).padStart(2 , '0') 
       let l = String(lastDay.getDate()).padStart(2 , '0') 

       
        rangetime.textContent=`${f} ${firstDay.toLocaleString("en" , { month : "short"})} - ${l}${lastDay.toLocaleString("en" , {month : "short"})}`
      

         Days.forEach((d , idx)=>{
            let div = document.createElement('div');
            div.className ='day'
            div.dataset.date = d.toDateString();
            div.innerHTML=`${days[d.getDay()]} <br>  ${  String(d.getDate()).padStart(2 , '0')}`
            dayWeeks.appendChild(div)
         

            div.addEventListener('click',()=>{
               document.querySelectorAll(".day").forEach(el => el.classList.remove("active"));
               div.classList.add('active')
                
            })
            if (idx == 3) {
                div.classList.add('active')
            }
         })

      
   }
   
            arrowleft.addEventListener('click',()=>{
              startdate.setDate(startdate.getDate()-7)
              rangerweek();
           })   
            arrowright.addEventListener('click',()=>{
              startdate.setDate(startdate.getDate()-7)
              rangerweek();
           })   
   

    
    rangerweek();

// section-priorityTask

const hightBtn = document.getElementById('hight');
const mediumBtn = document.getElementById('medium');
const lowBtn = document.getElementById('low');
