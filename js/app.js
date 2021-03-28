'use strict';
let leftIndex;
let centerIndex;
let rightIndex;
//const article=document.getElementById('article');
let click =0;
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

// let view=[];
// for (let i = 0; i < names.length; i++) {

//   view.push(0);

// }
//console.log(view);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//let totalVote=0;
const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const imagesSection = document.getElementById('images-section');
// console.log(leftImage);

// const Products = [];
function Product(name) {
  this.name = name;
  this.path = `./img11/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  //Products.push(this);
  Product.all.push(this);
}
Product.all = [];

for(let i =0;i<names.length;i++){
  new Product(names[i]);
}
//console.log(Product.all);
//onsole.table(Product.all);

function render(){
  leftIndex = randomNumber(0,Product.all.length-1);
  // console.log('left: ', leftIndex, Product.all[leftIndex].path);
  // console.log(leftImage);
  leftImage.src = Product.all[leftIndex].path;
  leftImage.alt = Product.all[leftIndex].name;
  leftImage.title = Product.all[leftIndex].name;
  console.log(leftIndex);

  centerIndex = randomNumber(0,Product.all.length-1);
  // console.log('right: ', leftIndex, Product.all[rigthIndex].path);
  // console.log(leftImage);
  if(centerIndex===leftIndex){
    centerIndex = randomNumber(0,Product.all.length-1);
    centerImage.src = Product.all[centerIndex].path;
    centerImage.alt = Product.all[centerIndex].name;
    centerImage.title = Product.all[centerIndex].name;
  }else{
    centerImage.src = Product.all[centerIndex].path;
    centerImage.alt = Product.all[centerIndex].name;
    centerImage.title = Product.all[centerIndex].name;
  }
  console.log(centerIndex);

  rightIndex = randomNumber(0,Product.all.length-1);
  // console.log('right: ', leftIndex, Product.all[rigthIndex].path);
  // console.log(leftImage);
  if(rightIndex===leftIndex){
    rightIndex = randomNumber(0,Product.all.length-1);
    rightImage.src = Product.all[rightIndex].path;
    rightImage.alt = Product.all[rightIndex].name;
    rightImage.title = Product.all[rightIndex].name;
  }else if(rightIndex===centerIndex) {
    rightIndex = randomNumber(0,Product.all.length-1);
    rightImage.src = Product.all[rightIndex].path;
    rightImage.alt = Product.all[rightIndex].name;
    rightImage.title = Product.all[rightIndex].name;
  } else {
    rightImage.src = Product.all[rightIndex].path;
    rightImage.alt = Product.all[rightIndex].name;
    rightImage.title = Product.all[rightIndex].name;
  }

  console.log(rightIndex);


}

imagesSection.addEventListener('click',voteFor);

function voteFor(event){
  click+=1;
  button();
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
  console.table(Product.all);

  console.log(click);
  render();

}




render();


function button(){
  const endVote =document.getElementById('endVote');
  endVote.style.visibility = 'hidden';
  endVote.addEventListener('click', stopVote);
  console.log(click);
  if (click>=25) {
    endVote.style.visibility = 'visible';
  }
}


function stopVote(){
  // event.preventDefault();
  const ulEl = document.getElementById('list');
  for(let i=0; i< names.length; i++)
  {
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].views} times.` ;
  }}






