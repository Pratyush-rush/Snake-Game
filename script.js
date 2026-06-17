const startbutton=document.querySelector(".btn-start");

const modal=document.querySelector(".modal");

const startgamemodal=document.querySelector(".start-game");
const gameovermodal=document.querySelector(".game-over");

const restartbutton=document.querySelector(".btn-restart");

const highscoreElement=document.querySelector("#high-score");
const scoreElement=document.querySelector("#score");
const timeElement=document.querySelector("#time");

let highscore=localStorage.getItem("highscore")||0
highscoreElement.innerText=highscore;
let score=0
let time=`00-00`


let boards=document.querySelector(".boards");
const blockheight=50;
const blockwidth=50;

const col=Math.floor(boards.clientWidth/blockwidth);
const row=Math.floor(boards.clientHeight/blockheight);

//boards.style.gridTemplateColumns = `repeat(${col}, ${blockheight}px)`;
//boards.style.gridTemplateRows = `repeat(${row}, ${blockwidth}px)`;

let blocks=[];
let snake=[{x:1,y:3} //this is head first one
//{x:1,y:4},
//{x:1,y:5}
]; //in starting it have 3 blocks or object

let intervalId=null;
let timeintervalId=null;


for(let i=0;i<row;i++){
    for(let j=0;j<col;j++){

    const block = document.createElement("div");

    block.classList.add("block");

    boards.appendChild(block);
    //block.innerText=`${i}-${j}`
    blocks[`${i}-${j}`]=block;  //as we know array in js is a  object so it creating a key value pair 


    }
}

//const heads=block.createElement("div");
//heads.classList.add("heads")
//heads.style.color

let food=generateFood();
blocks[`${food.x}-${food.y}`].classList.add("food");



let direction="down";

function render(){
      let head;
   

        
    if(direction=="left"){
        head={x:snake[0].x,y:snake[0].y-1};
    
    }

    else if(direction=="right"){
         head={x:snake[0].x,y:snake[0].y+1};
        

    }

    else if(direction=="up"){
         head={x:snake[0].x-1,y:snake[0].y};
         

    }

    else if(direction=="down"){
         head={x:snake[0].x+1,y:snake[0].y};
        

    }

    if(head.x<0 || head.x>=row|| head.y<0 || head.y>=col){
        //alert("game over ")
       
        clearInterval(intervalId);
        modal.style.display="flex";
        startgamemodal.style.display="none";
         gameovermodal.style.display="flex";
       

        return;

    


    }

    snake.forEach(element => {

    if(head.x == element.x && head.y == element.y){

        clearInterval(intervalId);

        modal.style.display = "flex";
        startgamemodal.style.display = "none";
        gameovermodal.style.display = "flex";

        return;
    }

});

    snake.forEach(element=>{
    blocks[`${element.x}-${element.y}`].classList.remove("fill");
    blocks[`${element.x}-${element.y}`].classList.remove("head");
});

    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        snake.unshift(head);

        
        food=generateFood();
         blocks[`${food.x}-${food.y}`].classList.add("food");
         score+=1
         scoreElement.innerText=score

         if(score>highscore){
            highscore=score;
            localStorage.setItem("highscore",highscore.toString())
          
         }

    }

    else{

    snake.unshift(head);   // Normal move
    snake.pop();
}

snake.forEach((element,index)=>{
    if(index==0){
        blocks[`${element.x}-${element.y}`].classList.add("head");
    }else{
        blocks[`${element.x}-${element.y}`].classList.add("fill");
    }
});

   // snake.forEach(element=>{
   //    blocks[`${element.x}-${element.y}`].classList.remove("fill");
   // })

  //   snake.unshift(head); //add this in first of array snake
  //   snake.pop();

    //  snake.forEach(element=>{

    //  blocks[`${element.x}-${element.y}`].classList.add("fill");});

    
    
}

//intervalId=setInterval(()=>{
   

    //render();

//},600) //we are using fps technique to show snake is moving we using 3fps so 300 ms means every 300ms evry element move by 1 block

startbutton.addEventListener("click",()=>{
    modal.style.display="none";
    intervalId=setInterval(()=>{
        render()
    },300)

    timeintervalId=setInterval(()=>{
        let[min,sec]=time.split("-").map(Number);

        if(sec==59){
            min+=1;
            sec=0;

        }
        else{
            sec+=1;
        }

        time=`${min}-${sec}`
        timeElement.innerText=time
    },1000)
})

restartbutton.addEventListener("click",restartgame)



//let isRunning = false;

//document.addEventListener("keydown", (event) => {

 //   if(event.code == "Space"){

  //      modal.style.display = "none";

    //    if(isRunning){
       //     clearInterval(intervalId);
        //    isRunning = false;
      //  }
      //  else{
      //      intervalId = setInterval(render, 500);
       //     isRunning = true;
       // }
    //}

//});

function restartgame(){
    //blocks[`${food.x}-${food.y}`].classList.remove("food")
    snake.forEach((element)=>{
         blocks[`${element.x}-${element.y}`].classList.remove("head");
         blocks[`${element.x}-${element.y}`].classList.remove("fill");
})



    modal.style.display="none"
    score=0;
    time=`00-00`
    highscoreElement.innerText=highscore
    scoreElement.innerText=score;
    timeElement.innerText=time;

    snake=[{x:1,y:3}]
      direction="down";

      generateFood()

  

   

     intervalId=setInterval(()=>{
        render()
    },300)




}

addEventListener("keydown",(event)=>{
    if(event.key=="ArrowUp" && direction!="down"){
        direction="up"
    }

    else if(event.key=="ArrowDown" && direction!="up"){
        direction="down"
    }

     else if(event.key=="ArrowLeft" && direction!="right"){
        direction="left"
    }

   else  if(event.key=="ArrowRight" && direction!="left"){
        direction="right"
    }
})

function generateFood(){

    while(true){

        let newFood = {
            x: Math.floor(Math.random()*row),
            y: Math.floor(Math.random()*col)
        };

        let found = false;

        snake.forEach(element => {
            if(element.x == newFood.x && element.y == newFood.y){
                found = true;
            }
        });

        if(!found){
            return newFood;
        }

    }
}


