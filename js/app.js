'use strict';
let leftIndex;
let centerIndex;
let rightIndex;
let click =0;
let attempt=25;


const names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass'
];
const namesext = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];

let views2=[];
let votes2=[];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');



function Product(name, namesext) {
  this.name = name;
  this.path =`./img11/${namesext}`;
  this.votes = 0;
  this.views = 0;

  Product.all.push(this);
}
Product.all = [];

for(let i =0;i <= names.length-1;i++){
  new Product(names[i],namesext[i]);

}


console.log('nam',names);


let names2=[];

function render(){


  leftIndex = randomNumber(0,Product.all.length-1);
  while(names2.includes(leftIndex)){
    leftIndex = randomNumber(0,Product.all.length-1);
    names2.shift();}

  leftImage.src = Product.all[leftIndex].path;
  leftImage.alt = Product.all[leftIndex].name;
  leftImage.title = Product.all[leftIndex].name;

  names2.push(leftIndex);

  centerIndex = randomNumber(0,Product.all.length-1);

  while(centerIndex===leftIndex||names2.includes(centerIndex)){
    centerIndex = randomNumber(0,Product.all.length-1);
    names2.shift();
  }
  centerImage.src = Product.all[centerIndex].path;
  centerImage.alt = Product.all[centerIndex].name;
  centerImage.title = Product.all[centerIndex].name;
  names2.push(centerIndex);



  rightIndex = randomNumber(0,Product.all.length-1);

  while((rightIndex===leftIndex) || (rightIndex===centerIndex)||names2.includes( rightIndex )){
    rightIndex = randomNumber(0,Product.all.length-1);
    names2.shift();
  }
  rightImage.src = Product.all[rightIndex].path;
  rightImage.alt = Product.all[rightIndex].name;
  rightImage.title = Product.all[rightIndex].name;
  names2.push(rightIndex);

  
  console.log('names2',names2);





}

imagesSection.addEventListener('click',voteFor);
const endVote =document.getElementById('endVote');
endVote.style.visibility = 'hidden';
endVote.addEventListener('click', stopVote);


function voteFor(event){
  click+=1;
  console.log('click',click);
  // button();


  if (click>=attempt) {
    endVote.style.visibility = 'visible';
    imagesSection.removeEventListener('click',voteFor);

  }

  if(event.target.id !== 'images-section'){

    if(event.target.id === rightImage.id)
    {
      Product.all[rightIndex].votes++;
      Product.all[leftIndex].views++;
      Product.all[centerIndex].views++;
      Product.all[rightIndex].views++;

    }
    else if(event.target.id === centerImage.id){
      Product.all[centerIndex].votes++;
      Product.all[leftIndex].views++;
      Product.all[centerIndex].views++;
      Product.all[rightIndex].views++;

    }
    else{
      Product.all[leftIndex].votes++;
      Product.all[leftIndex].views++;
      Product.all[centerIndex].views++;
      Product.all[rightIndex].views++;

    }

  }



  render();



}

render();




// function button(){

//

//   // if (click>=attempt) {
//   //   endVote.style.visibility = 'visible';
//   //   imagesSection.removeEventListener('click',voteFor);

//   // }

// }


function stopVote(){

  const ulEl = document.getElementById('list');
  for(let i=0; i< names.length; i++)
  {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.` ;
    votes2.push(Product.all[i].votes);
    views2.push(Product.all[i].views);

    endVote.removeEventListener('click', stopVote);

    chartRender();
  }



}
function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'Products Votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes2
      },
      {
        label: 'Products Views',
        backgroundColor: 'yellow',
        borderColor: 'rgb(255, 99, 132)',
        data: views2
      }]
    },
    // Configuration options go here
    options: {}
  });
}
