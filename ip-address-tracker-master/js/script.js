document.addEventListener('DOMContentLoaded', () =>{
  var ipAddress = '8.8.8.8';
  var apiRequest = 'https://geo.ipify.org/api/v1?apiKey=at_W14AVJSbJ7pb31kzaU6gRSSbaKcjq&'+ipAddress;
  var domain;
  var location;
  var isp;

  function updateResult(ipAddress, location, isp){
    var updateIP = ipAddress;
    var updateLocation = location.city + ", " + location.region + " " + location.country;
    var updateTimeZone = location.timezone;
    var updateISP = isp;

    document.querySelector('#ipAddress').innerText = updateIP;
    document.querySelector('#location').innerText = updateLocation;
    document.querySelector('#timeZone').innerText = updateTimeZone;
    document.querySelector('#ISP').innerText = updateISP;

  }

  function buildMap()  {
    document.getElementById('map').innerHTML = "<div id='mapid' style='width: 100%;'></div>";
    mymap = L.map('mapid').setView([location.lat, location.lng], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoiZW5na2F3YXQiLCJhIjoiY2t0Y3VhaWNvMjljODJubXVqcnoxdjFxZyJ9.l4b_VyA1pjxyy9eCXGFzDQ'
                }).addTo(mymap);
                var marker = L.marker([location.lat, location.lng]).addTo(mymap);
}



  function fetchit() {
          // Send a GET request to the URL
          fetch(apiRequest)
          // Put response into json form
          .then(response => response.json())
          .then(data => {
            console.log(data);    
            ipAddress = data.ip;
            location = data.location;
            isp = data.isp;
            if(data.code === 400){
              return;
            } else{
            buildMap()
            updateResult(ipAddress, location, isp);
            }
        
          })

          // Catch any errors and log them to the console
          .catch(error => {
                  console.log('Error:', error);
          });

      }
  
  fetchit();
  
  document.querySelector('form').onsubmit = function(){
    input = document.querySelector('input').value;
    console.log(input);
    if (input.includes('@')){
      apiRequest = 'https://geo.ipify.org/api/v1?apiKey=at_W14AVJSbJ7pb31kzaU6gRSSbaKcjq&'+'email='+input;
    } else if(input.includes('.co') || input.includes('.io')){
      apiRequest = 'https://geo.ipify.org/api/v1?apiKey=at_W14AVJSbJ7pb31kzaU6gRSSbaKcjq&'+'domain='+input;
    } else {
      apiRequest = 'https://geo.ipify.org/api/v1?apiKey=at_W14AVJSbJ7pb31kzaU6gRSSbaKcjq&'+'ipAddress='+input;
    }
    
    fetchit();

    return false;
  }
  
});