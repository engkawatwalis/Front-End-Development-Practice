document.addEventListener('DOMContentLoaded', () =>{

  var billAmount = 0;
  var peopleNum = 1;
  var tipPercentage = 0;
  var tipAmountPerson = 0;
  var totalAmountPerson = 0;
  updateTip();
  updateTotal();

  // Function to update Tip Amount per person
  function updateTip() {
    tipAmountPerson = (billAmount * tipPercentage)/peopleNum;
    document.querySelector('#tipAmount').innerHTML = '<span>$' + tipAmountPerson.toFixed(2) + '</span>';
    if (tipAmountPerson > 0){
      document.querySelector('#tipAmount').style.color = "#38AC9E";
    } else{
      document.querySelector('#tipAmount').style.color = "hsl(185, 41%, 84%)";
    }
  }
  // Function to update Total Amount per person
  function updateTotal() {
    totalAmountPerson = (billAmount/peopleNum)+tipAmountPerson;
    console.log(totalAmountPerson);
    document.querySelector('#totalAmount').innerHTML = '<span>$' + totalAmountPerson.toFixed(2) + '</span>';
    if (totalAmountPerson > 0){
      document.querySelector('#totalAmount').style.color = "#38AC9E";
    } else{
      document.querySelector('#totalAmount').style.color = "hsl(185, 41%, 84%)";
    }
  }
  // Function to display 'please enter only number' caution for bill amount input
  function wrongInput1() {
    document.querySelector('#wrongInput1').style.display = 'inline-flex';
  }

  // Function to NOT display 'please enter only number' caution for bill amount input
  function returnWrong1() {
    document.querySelector('#wrongInput1').style.display = 'none';
  }

  // Function to display 'please enter only number' caution for number of people input
  function wrongInput2() {
    document.querySelector('#wrongInput2').style.display = 'inline-flex';
  }

  // Function to NOT display 'please enter only number' caution for number of people input
  function returnWrong2() {
    document.querySelector('#wrongInput2').style.display = 'none';
  }


  // Function to update results when user type in 'Bill Amount'
  document.querySelector('.billAmount').onchange = function() {
    billAmount = parseInt(document.querySelector('.billAmount').value);
    if (typeof billAmount === 'number' && !isNaN(billAmount)){
      updateTip();
      updateTotal();
      returnWrong1();
    }else if(isNaN(billAmount)){ 
      wrongInput1();
    }
  }
  // Function to update results when user type in 'number of people'
  document.querySelector('.peopleNum').onchange = function() {
    peopleNum = parseInt(document.querySelector('.peopleNum').value);
    if (typeof peopleNum === 'number' && !isNaN(peopleNum)){
      updateTip();
      updateTotal();
      returnWrong2();
    }else if(isNaN(peopleNum)){
      wrongInput2();
    }
  }
  
  // Function to update results when user select tip percentage
  document.querySelectorAll('.btn-check').forEach(function(button){
    button.onclick = function(){
    tipPercentage = button.value;
    if (typeof billAmount === 'number' && !isNaN(billAmount) && typeof peopleNum === 'number' && !isNaN(peopleNum)){
    updateTip();
    updateTotal();
    }
  }
  });

  // Function to reset application when reset button is clicked
  document.querySelector('#reset').onclick = function(){
    billAmount = 0;
    peopleNum = 1;
    tipPercentage = 0;
    tipAmountPerson = 0;
    totalAmountPerson = 0;
    document.querySelector('.billAmount').value = "";
    document.querySelector('.peopleNum').value = "";
    updateTip();
    updateTotal();
    returnWrong1();
    returnWrong2();
  }


  
  
    
});