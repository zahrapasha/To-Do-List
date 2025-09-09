// section-date
const arrowleft =document.querySelector('.arrow-left')
const rangetime =document.querySelector('.range-time')
const arrowright =document.querySelector('.arrow-right')
const dayWeeks =document.querySelector('.dayWeeks')


let startdate= new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let q =      String(startdate.getDate()).padStart(2 , '0')
console.log(q);

localStorage.setItem('date',` ${String(new Date().getDate()).padStart(2 , '0')} ${days[new Date().getDay()]} `)   

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
const buttonsPriority =document.querySelectorAll('.PriorityBtn');
const CreateEditeButtons =document.querySelector('.buttons-edit-delete');
const EditTaskBtn = document.getElementById('editTask');
const DeleteTaskBtn = document.getElementById('DeleteTask');
const satarttimeinput = document.getElementById('satarttime');
const endtimeinput = document.getElementById('endtime');
const numberTask = document.getElementById('number-Task');
const searchinout = document.getElementById('search');

const tasklist =document.querySelectorAll('.tasklist')
const colorTask =document.querySelector('.color-task')
let number =0


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

// ..............

if (!localStorage.getItem('arrayStarttime')) {
   ArrayStartTime=[];
   
}
else{
   ArrayStartTime = localStorage.getItem('arrayStarttime').split(',')
  
}
// .............

if (!localStorage.getItem('arrayEndTime')) {
   ArrayEndTime=[];
   
}
else{
   ArrayEndTime = localStorage.getItem('arrayEndTime').split(',')
  
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




   
createTaskBtn.addEventListener('click',createNewtask)
function createNewtask() {
   

   // let idx = localStorage.getItem('idx');
   let name = nameinput.value;
   let message =messageinput.value
   let datetask =localStorage.getItem('date');
   let color =localStorage.getItem('colortask');
   let startTime =satarttimeinput.value;
   let endTime = endtimeinput.value;
   
   
   
   
   createTaskpage.style.display='none';
   homepage.style.display='block';

   let li = createElement(name , datetask , color , message  , startTime , endTime);
   
   placeelement(datetask , li);

   saveElement(name , datetask , color , message, startTime , endTime)

}


function createElement(name , datetask , color , message , startTime , endTime) {

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
   element.classList.add('Task');
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
   else{
   //  go to edit page
    homepage.style.display='none';
    createTaskpage.style.display='block';
    CreateEditeButtons.style.display='block'
    createTaskBtn.style.display='none';
   //  delete Task 
    DeleteTaskBtn.addEventListener('click',()=>{
       taskCount(element);
       homepage.style.display='block';
       createTaskpage.style.display='none';
       deletTask(name , datetask , color , message , startTime , endTime);
    })
   //  editTask
   EditTaskBtn.addEventListener('click',()=>{
       taskCount(element);
       deletTask(name , datetask , color , message , startTime , endTime);
       homepage.style.display='block';
       createTaskpage.style.display='none';
       createNewtask();

   })
   }
    showinfoElemnt(message , color , name , startTime , endTime)
      
   })


    const colordiv = element.querySelector('.color-task');
    colordiv.style.backgroundColor=color

   

   return element

     
}

function showinfoElemnt(message , color , name ,startTime , endTime) {

   resetButtonsColor()

   if (color == '#FAD9FF') {
      lowBtn.style.backgroundColor='#FAD9FF'
      lowBtn.style.color='black'
      lowBtn.style.color = 'black'
   }
   if (color == '#D7F0FF') {
      mediumBtn.style.backgroundColor='#D7F0FF'
      mediumBtn.style.color='D7F0FF'
      mediumBtn.style.color = 'black'
   }
   if (color == '#FACBBA') {
      hightBtn.style.backgroundColor='#FACBBA'
      hightBtn.style.color='D7F0FF'
      hightBtn.style.color = 'black'
   }
   
   messageinput.value = message;
   nameinput.value = name;
   satarttimeinput.value =startTime;
   endtimeinput.value = endTime;
   // console.log(idx);
 
   }   
 

function saveElement(name , datetask , color , message,startTime , endTime) {

   ArrayName.push(name);
   Arraydatetask.push(datetask);
   ArrayColor.push(color);
   ArrayMessage.push(message);
   ArrayStartTime.push(startTime);
   ArrayEndTime.push(endTime);


   localStorage.setItem('arrayname' , ArrayName);
   localStorage.setItem('arraycolor' ,ArrayColor);
   localStorage.setItem('arraydatetask' ,Arraydatetask);
   localStorage.setItem('arraymessage' ,ArrayMessage);
   localStorage.setItem('arrayStarttime',ArrayStartTime);
   localStorage.setItem('arrayEndTime',ArrayEndTime);
   
}
    
function resetButtonsColor() {
      buttonsPriority.forEach((btn)=>{
      btn.style.backgroundColor='transparent'
      btn.style.color='#ffff'

   })
}

function deletTask(name , datetask , color , message , startTime , endTime) {

   let numberName = ArrayName.indexOf(name);
   let numberdatatask = Arraydatetask.indexOf(datetask);
   let numberColor = ArrayColor.indexOf(color);
   let numberMessage = ArrayMessage.indexOf(message);
   let numberstarttime = ArrayStartTime.indexOf(startTime);
   let numberendtime = ArrayEndTime.indexOf(endTime);

   ArrayName.splice(numberName , 1);
   Arraydatetask.splice(numberdatatask , 1);
   ArrayColor.splice(numberColor , 1);
   ArrayMessage.splice(numberMessage , 1);
   ArrayStartTime.splice(numberstarttime , 1);
   ArrayEndTime.splice(numberendtime , 1);


   localStorage.setItem('arrayname' , ArrayName);
   localStorage.setItem('arraycolor' ,ArrayColor);
   localStorage.setItem('arraydatetask' ,Arraydatetask);
   localStorage.setItem('arraymessage' ,ArrayMessage);
   localStorage.setItem('arrayEndTime' , ArrayStartTime);   
   localStorage.setItem('arrayStarttime',ArrayEndTime);
 
}
window.addEventListener('load',loadpage)
  function loadpage() {
   
  
    for (let i = 0; i < ArrayName.length; i++) {

         let li =  createElement(ArrayName[i] , Arraydatetask[i] , ArrayColor[i] , ArrayMessage[i] , ArrayStartTime[i],ArrayEndTime[i])

         placeelement(Arraydatetask[i] , li)
         
         numberTask.innerHTML = tasklist[0].childElementCount
         
      
      
      }
      }
   
function placeelement(date , li) {
         
          let today = new Date();
          let tomorrow =new Date(today);
          tomorrow.setDate(tomorrow.getDate()+1);
         
         if (date == ` ${ String(new Date().getDate()).padStart(2 , '0')} ${days[new Date().getDay()]} `) {
            tasklist[0].appendChild(li);
            numberTask.innerHTML=tasklist[0].childElementCount
            
               return;
            }
      
         if (date == ` ${ String(tomorrow.getDate()).padStart(2 , '0')} ${days[tomorrow.getDay()]} `) {
         
            tasklist[1].appendChild(li)
            return;
         }
         else{
            tasklist[2].appendChild(li)
         }
         
        
        
        
      }
function taskCount(element) {
   element.remove()
   numberTask.innerHTML = tasklist[0].childElementCount
   
}

searchinout.addEventListener('keyup',(event)=>{
    const textsearched =searchinout.value.toString().toLowerCase().trim();
    const todaysTasks = tasklist[0].querySelectorAll('.Task .task-item');
    const tommorroeTasks = tasklist[1].querySelectorAll('.Task .task-item');
    const nexDays = tasklist[2].querySelectorAll('.Task .task-item');
     
    todaysTasks.forEach((t)=>{   
       if (t.textContent.toLowerCase().trim().includes(textsearched)) {
         t.parentElement.parentElement.style.display= '';
         
       }
       else{
         t.parentElement.parentElement.style.display= 'none';

       }
     
    })
    tommorroeTasks.forEach((t)=>{
       if (t.textContent.toLowerCase().trim().includes(textsearched)) {
         
                  t.parentElement.parentElement.style.display= '';

         
       }
       else{
                t.parentElement.parentElement.style.display= 'none';

       }
     
    })   
     nexDays.forEach((t)=>{
       if (t.textContent.toLowerCase().trim().includes(textsearched)) {
         t.parentElement.parentElement.style.display= '';
         
       }
       else{
        t.parentElement.parentElement.style.display= 'none';

       }
     
    })
   

}) 

