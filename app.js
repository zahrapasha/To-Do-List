// section-date
const arrowleft =document.querySelector('.arrow-left')
const rangetime =document.querySelector('.range-time')
const arrowright =document.querySelector('.arrow-right')
const dayWeeks =document.querySelector('.dayWeeks')


let startdate= new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let q =      String(startdate.getDate()).padStart(2 , '0')
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
               localStorage.setItem('idx',idx)
               document.querySelectorAll(".day").forEach(el => el.classList.remove("active"));
               div.classList.add('active')
               localStorage.setItem('date' , ` ${ String(d.getDate()).padStart(2 , '0')} ${days[d.getDay()]} `)
               localStorage.setItem('day', `${d.getDate()}`)
               // localStorage.setItem('weekday',`${days[d.getDay()]}`)
            if (idx == 1) {
               localStorage.setItem('tomorrow', 'yes' );
               
            }
            else{
               localStorage.setItem('tomorrow', 'No' );
               
            }
   
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

// Home page
const addtaskBtn =document.querySelector('.add-task-Btn')
const homepage = document.querySelector('.home-page')
const createTaskpage = document.querySelector('.create-task-page')



addtaskBtn.addEventListener('click',()=>{
   homepage.style.display='none';
   createTaskpage.style.display='block'
})

















// section create Task

const nameinput =document.getElementById('name')
const messageinput =document.getElementById('message')
const createTaskBtn=document.getElementById('create-task-button')
const hightBtn = document.getElementById('hight');
const mediumBtn = document.getElementById('medium');
const lowBtn = document.getElementById('low');
const buttonsPriority =document.querySelectorAll('.PriorityBtn')
const CreateEditeButtons =document.querySelector('.buttons-edit-delete')

const tasklist =document.querySelectorAll('.tasklist')
const colorTask =document.querySelector('.color-task')


let ArrayName ;
let ArrayColor;
let Arraydatetask;
let ArrayMessage;
  
if (!localStorage.getItem('arrayname')) {
   ArrayName=[];
}
else{
   ArrayName = localStorage.getItem('arrayname').split(',')
}

// .........

if (!localStorage.getItem('arraycolor')) {
   ArrayColor=[];
}
else{
   ArrayColor = localStorage.getItem('arraycolor').split(',')
}

// ...........

if (!localStorage.getItem('arraydatetask')) {
   Arraydatetask=[];
}
else{
   Arraydatetask = localStorage.getItem('arraydatetask').split(',')
}

// .............

if (!localStorage.getItem('arraymessage')) {
   ArrayMessage=[];
}
else{
   ArrayMessage = localStorage.getItem('arraymessage').split(',')
}











localStorage.setItem('colortask' , ' #D7F0FF')
let colorBtn ='medium';
hightBtn.addEventListener('click',()=>{
   
    resetButtonsColor()
   
    hightBtn.style.backgroundColor='#FACBBA'
    hightBtn.style.color='black'
    colorBtn='hight'
    localStorage.setItem('colortask','#FACBBA')
})
mediumBtn.addEventListener('click',()=>{

    resetButtonsColor()

    mediumBtn.style.backgroundColor='#D7F0FF'
    mediumBtn.style.color='black'
    colorBtn='medium'
    localStorage.setItem('colortask','#D7F0FF')


})
lowBtn.addEventListener('click',()=>{
  
   resetButtonsColor()
    
    lowBtn.style.backgroundColor='#FAD9FF'
    lowBtn.style.color='black'
    colorBtn='Low'
    localStorage.setItem('colortask','#FAD9FF')

})


   let today = new Date();
   let tomorrow =new Date(today);
   tomorrow.setDate(tomorrow.getDate()+1);

   
createTaskBtn.addEventListener('click',()=>{
   let idx = localStorage.getItem('idx');
   let name = nameinput.value;
   let message =messageinput.value
   let datetask =localStorage.getItem('date');
   let color =localStorage.getItem('colortask');
   
   
   
   createTaskpage.style.display='none';
   homepage.style.display='block';

   let li = createElement(name , datetask , color , message , idx);
   

   if (datetask== ` ${ String(new Date().getDate()).padStart(2 , '0')} ${days[new Date().getDay()]} `) {
      tasklist[0].appendChild(li)
      console.log('t');
      
   }
   if (datetask == ` ${ String(tomorrow.getDate()).padStart(2 , '0')} ${days[tomorrow.getDay()]} `) {
      tasklist[1].appendChild(li)
   }

   saveElement(name , datetask , color , message)


})

function createElement(name , datetask , color , message , idx) {

    let element = document.createElement('li')
       element.innerHTML+=` <div id="sign" class="sign">

                   </div>
                   <div class="color-task">
                     
                   </div>
                   <div class="info-task">
                       <p class="task-item">${name}</p>
                       <div class="task-history-info">
                           <svg class="icon-calender" width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5.1667 1V3.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M11.8333 1V3.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M4.3333 10.1668H11" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M4.3333 13.4998H8.49996" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                         <path d="M11.8333 2.24982C14.6083 2.39982 16 3.45816 16 7.37482V12.5248C16 15.9582 15.1667 17.6748 11 17.6748H6C1.83333 17.6748 1 15.9582 1 12.5248V7.37482C1 3.45816 2.39167 2.40816 5.16667 2.24982H11.8333Z" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                         </svg>

                         <p class="task-history">${datetask}</p>
                      
                       </div>
                    </div>`
   element.addEventListener('click',(e)=>{
    if (e.target.id == 'sign' ) {
      e.target.classList.toggle('done')
      if (e.target.classList.contains('done')) {
              e.target.innerHTML=`<svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.47485 5.00003L5.15385 8.67903L12.5249 1.32103" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
   `   
      }else{

         e.target.innerHTML=''
      }
    }
    else if (e.target.nodeName =='svg') {
      e.target.parentElement.classList.remove('done')
      e.target.parentElement.innerHTML=''
    }
   //  go to edit page
    homepage.style.display='none';
    createTaskpage.style.display='block';
    CreateEditeButtons.style.display='block'
    createTaskBtn.style.display='none';

    showinfoElemnt(message , color , name , idx)
      
   })

    
    const colordiv = element.querySelector('.color-task');
    colordiv.style.backgroundColor=color

   

   return element

     
}

function showinfoElemnt(message , color , name , idx) {

   resetButtonsColor()

   if (color == '#FAD9FF') {
      lowBtn.style.backgroundColor='#FAD9FF'
      lowBtn.style.color='black'
   }
   if (color == 'D7F0FF') {
      mediumBtn.style.backgroundColor='#D7F0FF'
      mediumBtn.style.color='D7F0FF'
   }
   if (color == '#D7F0FF') {
      hightBtn.style.backgroundColor='#D7F0FF'
      hightBtn.style.color='D7F0FF'
   }

   messageinput.value = message
   nameinput.value = name
   console.log(idx);
 
   }   
 



function saveElement(name , datetask , color , message ) {

   ArrayName.push(name);
   Arraydatetask.push(datetask);
   ArrayColor.push(color);
   ArrayMessage.push(message);

   localStorage.setItem('arrayname' , ArrayName);
   localStorage.setItem('arraycolor' ,ArrayColor);
   localStorage.setItem('arraydatetask' ,Arraydatetask);
   localStorage.setItem('arraymessage' ,ArrayMessage);

   
}

window.addEventListener('load',()=>{
  
   for (let i = 0; i < ArrayName.length; i++) {

        let li =  createElement(ArrayName[i] , Arraydatetask[i] , ArrayColor[i] , ArrayMessage[i])
        let today = new Date();
        let tomorrow =new Date(today);
        tomorrow.setDate(tomorrow.getDate()+1);

        if (Arraydatetask[i] == ` ${ String(new Date().getDate()).padStart(2 , '0')} ${days[new Date().getDay()]} `) {
           tasklist[0].appendChild(li);
               
           }
        if (Arraydatetask[i] == ` ${ String(tomorrow.getDate()).padStart(2 , '0')} ${days[tomorrow.getDay()]} `) {
         
           tasklist[1].appendChild(li)
           
        }
   
      
      
      
   
}})
      
function resetButtonsColor() {
      buttonsPriority.forEach((btn)=>{
      btn.style.backgroundColor='transparent'
      btn.style.color='#ffff'

   })
}
