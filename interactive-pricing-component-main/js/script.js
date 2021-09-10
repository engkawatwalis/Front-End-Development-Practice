document.addEventListener('DOMContentLoaded', () =>{
  var package = "3";
  function updatePrice() {
    
  }
  document.querySelector('#priceRange').onchange = function(){
  package = document.querySelector('#priceRange').value;
  var price = document.querySelector('#priceNum');
  var pageView = document.querySelector('.pageView');
  console.log(price, package);

    switch(package){
      case "1":
        price.innerHTML = '<span>$8.00</span>'
        pageView.innerHTML = '10K PAGEVIEWS'
        break;
      case "2":
        price.innerHTML = '<span>$12.00</span>';
        pageView.innerHTML = '50K PAGEVIEWS'
        break;
      case "3":
        price.innerHTML = '<span>$16.00</span>';
        pageView.innerHTML = '100K PAGEVIEWS'
        break;
      case "4":
        price.innerHTML = '<span>$24.00</span>';
        pageView.innerHTML = '500K PAGEVIEWS'
        break;
      case "5":
        price.innerHTML = '<span>$36.00</span>';
        pageView.innerHTML = '1M PAGEVIEWS'
        break;
      
    
  }
  }
    
});