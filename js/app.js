'use strict';
var data = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'watercan', 'wineglass'];
var allProducts = [];
var imageIndex = [];
var totalClicks = 0;
function Product(productName) {
  this.productName = productName;
  this.filePath = 'img/' + productName + '.jpg';
  this.numClicks = 0;
}
data.forEach(function (item, index, array) {
  allProducts.push(new Product(item));
});
function displayThree() {
  imageIndex[0] = Math.floor(Math.random() * allProducts.length);
  imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  while (imageIndex[1] === imageIndex[0])  {
    imageIndex[1] = Math.floor(Math.random() * allProducts.length);
  }
  while (imageIndex[2] === imageIndex[0] || imageIndex[2] === imageIndex[1]) {
    imageIndex[2] = Math.floor(Math.random() * allProducts.length);
  }
  document.getElementById('0').setAttribute('src', allProducts[imageIndex[0]].filePath);
  document.getElementById('1').setAttribute('src', allProducts[imageIndex[1]].filePath);
  document.getElementById('2').setAttribute('src', allProducts[imageIndex[2]].filePath);
}
displayThree();
document.getElementById('0').addEventListener('click', handleImgClick);
document.getElementById('1').addEventListener('click', handleImgClick);
document.getElementById('2').addEventListener('click', handleImgClick);
function handleImgClick(event) {
  allProducts[imageIndex[+event.path[0].id]].numClicks += 1;
  allProducts[imageIndex[0]].numDisplays += 1;
  allProducts[imageIndex[1]].numDisplays += 1;
  allProducts[imageIndex[2]].numDisplays += 1;
  totalClicks += 1;
  if (totalClicks === 15) {
    document.getElementById('showResults').removeAttribute('hidden');
  }
  displayThree();
}
var data = {
  labels: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  datasets: [{
    label: 'Times clicked per item',
    fillColor: '#2E9329', strokeColor: '#31732E',
    highlightFill:'#72C56E', hightlightStroke: '#31732E',
    data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }]};
var chartMe = new Chart(document.getElementById('resultsCanvas').getContext('2d')).Bar(data);
document.getElementById('showResults').addEventListener('click', handleResultButtonClick);
function handleResultButtonClick(event) {
  document.getElementById('resultsSection').removeAttribute('hidden');
  allProducts.forEach(function (item, index, array) {
    data.labels[index] = array[index].productName;
    chartMe.datasets[0].bars[index].value = array[index].numClicks;
  });
  chartMe.update();
}
