"use strict";

var totalClicks = 0;
var originalIndex = 0;

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.numClicks = 0;
  this.numDisplays = 0;
  this.percentClicked = 0;
  this.originalIndex = originalIndex++;
}

var allProducts = [
  new Product('bag', 'img/bag.jpg'),
  new Product('banana', 'img/banana.jpg'),
  new Product('boots', 'img/boots.jpg'),
  new Product('chair', 'img/chair.jpg'),
  new Product('cthulhu', 'img/cthulhu.jpg'),
  new Product('dragon', 'img/dragon.jpg'),
  new Product('pen', 'img/pen.jpg'),
  new Product('scissors', 'img/scissors.jpg'),
  new Product('shark', 'img/shark.jpg'),
  new Product('sweep', 'img/sweep.jpg'),
  new Product('unicorn', 'img/unicorn.jpg'),
  new Product('usb', 'img/usb.jpg'),
  new Product('watercan', 'img/watercan.jpg'),
  new Product('wineglass', 'img/wineglass.jpg')
];

var imageIndex = [];
var imgOne = document.getElementById('0');
var imgTwo = document.getElementById('1');
var imgThree = document.getElementById('2');

function displayThree() {
  imageIndex[0] = Math.floor(Math.random() * allProducts.length);
  imgOne.setAttribute('src', allProducts[imageIndex[0]].filePath);

  imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  }
  imgTwo.setAttribute('src', allProducts[imageIndex[1]].filePath);

  imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  }
  imgThree.setAttribute('src', allProducts[imageIndex[2]].filePath);

  console.log(imageIndex[0]);
  console.log(imageIndex[1]);
  console.log(imageIndex[2]);
}
displayThree();

// Make sure each image is displayed
//
// push choice into an array
// while (choicesShown.length < allProducts.length) {
//  if (image is in choices) {
//  reroll
//  }
// }
//
// or just force the first five passes

imgOne.addEventListener('click', handleImgClick);
imgTwo.addEventListener('click', handleImgClick);
imgThree.addEventListener('click', handleImgClick);

function handleImgClick(event) {
  allProducts[imageIndex[+event.path[0].id]].numClicks += 1;
  allProducts[imageIndex[0]].numDisplays += 1;
  allProducts[imageIndex[1]].numDisplays += 1;
  allProducts[imageIndex[2]].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    resultButton.removeAttribute('hidden');
  }
  displayThree();
}
//chart data
var data = {
  labels: [],
  datasets: [
    {
      label: 'Times clicked per item',
      fillColor: '#2E9329',
      strokeColor: '#31732E',
      highlightFill:'#72C56E',
      hightlightStroke: '#31732E',
      data: []
    },
    {
      label: 'Times Displayed per item',
      fillColor: '#EDF3F2',
      strokeColor: '#B3CFCE',
      highlightFill: '#F5FAF4',
      hightlightStroke: '#B3CFCE',
      data: []
    }
  ]
};

function resetChartData() {
  for (var j = 0; j < allProducts.length; j++) {
    data.labels.push('0');
    data.datasets[0].data.push('0');
    data.datasets[1].data.push('0');
  }
}
resetChartData();

var resultsCanvas = document.getElementById('resultsCanvas').getContext('2d');
var chartMe = new Chart(resultsCanvas).Bar(data);

var resultButton = document.getElementById('showResults');
var numResultButtonClicks = 0;
resultButton.addEventListener('click', handleResultButtonClick);

function handleResultButtonClick(event) {
  numResultButtonClicks += 1;
  var results = document.getElementById('resultsSection');
  results.removeAttribute('hidden');

  allProducts.sort(function (a, b) {return b.numClicks - a.numClicks;});

  for(var i = 0; i < allProducts.length; i++)
  {
    data.labels[i] = allProducts[i].productName;
    chartMe.datasets[0].bars[i].label = 'Clicked/Displayed';
    chartMe.datasets[0].bars[i].value = allProducts[i].numClicks;
    chartMe.datasets[1].bars[i].value = allProducts[i].numDisplays;
  }
  chartMe.update();

  allProducts.sort(function (a, b) {return a.originalIndex - b.originalIndex;});
}
