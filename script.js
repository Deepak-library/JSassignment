document.getElementById("image").addEventListener("click", displayImage);

function displayImage(){
    document.getElementById("image").style.display="none";
}

document.getElementById("paragraph").addEventListener("click", changecolor);
let op=0;
function changecolor(){
    document.getElementById("paragraph").style.backgroundColor="rgb(235, 15, 52,"+(op=op+0.1)+")";
}

var x = document.querySelectorAll("ul li");

x[0].addEventListener("mouseover",changegb);
x[x.length-1].addEventListener("mouseover",changegb);
x[0].addEventListener("mouseout",returnbg)
x[x.length-1].addEventListener("mouseout",returnbg)

function changegb(){
    var a = document.querySelectorAll("ul");
    a[0].style.backgroundColor="pink";
}
function returnbg(){
    var b = document.querySelectorAll("ul");
    b[0].style.backgroundColor="white";
}

function addnewlist(e){
    e.target.insertAdjacentHTML('afterend', '<li class="new">New list- what do you prefer?</li>');
    var newlist =document.querySelectorAll(".new");
    console.log(newlist)
    if(newlist.length!=0)
    {
        for(var ele of newlist){
            ele.addEventListener("click",function(ele){addnewlist(ele)});
        }
        
       
    }
}

var matches = document.querySelectorAll("li");
for(var elem of matches) {  
    elem.addEventListener("click",function(elem){addnewlist(elem)});

    // function(elem){elem.target.insertAdjacentHTML('afterend', '<li class="new">New list- what do you prefer?</li>');
    
    
}
    

var inputbox=document.getElementsByTagName('input');
inputbox[0].addEventListener("keyup",function(e){writeonp(e)});

function writeonp(e){
    var para=document.getElementsByTagName('p');
    para[1].innerHTML=e.target.value;//innerHTML('afterend',e.target.value);
}

var button=document.getElementsByTagName('button');

button[1].addEventListener("click",bold);
function bold(){
    var para=document.getElementsByTagName('p');
    let val=para[1].textContent;
    console.log(val);

    var s1=val.substring(0,(val.length/2))
    var s2=val.substring((val.length/2),val.length)
    var s3="<b>"+s1+"</b>"+s2;
    para[1].innerHTML=s3;
    this.remove();
}

button[0].addEventListener("click",clear);
function clear(){
    var para=document.getElementsByTagName('p');
    para[1].innerHTML="";
    var inputbox=document.getElementsByTagName('input');
    inputbox[0].value="";

    var but=document.getElementsByTagName('button');
    if(but.length==1){
    button[0].insertAdjacentHTML('afterend', '<button>Important</button>');
    var b=document.getElementsByTagName('button');
    b[1].addEventListener("click",bold);
}
   inputbox[0].focus();
    
}

var head=document.getElementsByTagName("h2");
head[0].addEventListener("click",fetch1);

async function fetch1(){
    console.log("i");
    try{
    var data= await fetch("http://localhost:8000/data",{method:"GET",headers:{"content-type":"application/json"} }).then(a=>a.json()).then(a=>{
        console.log(a);
        var allp=document.getElementsByTagName("p");
allp[2].innerText=a.para;
    });
}catch(e){
    console.log(e);

}
}
let val=0;
var currency=document.getElementsByTagName("input");
currency[1].addEventListener("blur",function(e){
    e.preventDefault();
    // let r=e.target.va
console.log(e.target.value);
if(isNaN(e.target.value)){
    alert("please enter a number");
}else{
val=parseInt(e.target.value)
}
})


var select=document.getElementsByTagName("select");
var cfrom=select[0].value;
var cTo=select[1].value;
console.log(cTo)

select[0].addEventListener("change",function(e){cfrom=e.target.value;console.log(cfrom)})
select[1].addEventListener("change",function(e){cTo=e.target.value;console.log(cTo);

(async function fetch2(){
    console.log("i");
    try{
    var data= await fetch("http://localhost:8000/change",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({"amount":val,"cfrom":cfrom,"cTo":cTo}) }).then(a=>a.json()).then(a=>{
        if(a.value==-1)
        alert("error")
        else
        alert(cTo+" "+a.value)
    });
      

    }
catch(e){
    console.log(e);

}
})()

})