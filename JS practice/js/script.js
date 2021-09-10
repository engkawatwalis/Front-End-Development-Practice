document.addEventListener('DOMContentLoaded', function() {
    var rate;
    function fetchit() {
            // Send a GET request to the URL
            fetch('http://data.fixer.io/api/latest?access_key=490967cfb95f603e55f3ee5380cb7b72&format=1')
            // Put response into json form
            .then(response => response.json())
            .then(data => {
            
            console.log(data);

                // Get rate from data
                rate = data.rates;
                var currency = Object.keys(rate)
            
                
                // Get available currency from data
                for(var i=0; i<currency.length; i++){
                    document.querySelector('#original-cur').innerHTML = document.querySelector('#original-cur').innerHTML 
                    + '<option value="' + currency[i] + '">' + currency[i] + '</option>' ;

                    document.querySelector('#dest-cur').innerHTML = document.querySelector('#dest-cur').innerHTML 
                    + '<option value="' + currency[i] + '">' + currency[i] + '</option>' ;
                }
            
                
            })
    
                // Catch any errors and log them to the console
            .catch(error => {
                    console.log('Error:', error);
            });

        }
    
    fetchit();
    
    
    document.querySelector('form').onsubmit = function() {
        
        var amount = document.querySelector('#amount').value;
            var from = document.querySelector('#original-cur').value;
            var to = document.querySelector('#dest-cur').value;
            var exchangeRate = rate[to]/rate[from];
            var exchangeAmount = amount * exchangeRate;
            document.querySelector('#exchangeAmount').innerHTML = '<h2>' + amount + from  + ' is equal to ' + exchangeAmount.toFixed(2) + to + '</h2>';

        
        
    // Prevent default submission
    return false;

    }
});