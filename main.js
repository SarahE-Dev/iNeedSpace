


document.querySelector('#search').addEventListener('click', ()=>{
    document.querySelector('#display-section').innerHTML = '';
    let street = $('#address').val()
    let city = $('#city').val()
    let state = $('#state').val()
    let zip = $('#zip-code').val()
    let country = $('#country').val()
    let norad = $('#norad').val()
    let completeAddress = `${street}+${city}+${state}+${zip}+${country}`
    console.log(completeAddress);
    let addressToUse = completeAddress.split(' ')
    addressToUse = addressToUse.join('+')
    
    console.log(addressToUse);
    let geoURL = `https://geocode.maps.co/search?q=${addressToUse}`
    
        fetch(geoURL)
            .then(res=>res.json())
            .then(data=>{
                let latitude = data[0].lat;
                let longitude = data[0].lat;
                let location = data[0].display_name;
                satelliteFetch(latitude, longitude, norad, location)
                console.log(data);
                document.querySelector('#address').value = '';
                document.querySelector('#city').value = '';
                document.querySelector('#state').value = '';
                document.querySelector('#country').value = '';
                document.querySelector('#zip-code').value = '';
                document.querySelector('#norad').value = '';
                
            })
})
    


function satelliteFetch(lat, lon, nor, loc){
    fetch(`https://satellites.fly.dev/passes/${nor}?lat=${lat}&lon=${lon}&limit=1`)
        .then(res=>res.json())
        .then(data=>{
            let timeSet = new Date(data[0].set.utc_datetime)
            let time = timeSet.toTimeString()
            let date = timeSet.toDateString()
            let timeCulm = new Date(data[0].culmination.utc_datetime)
            let culmTime = timeCulm.toTimeString()
            let dateCulm = timeCulm.toDateString()
            let riseTime = new Date(data[0].rise.utc_datetime)
            let timeRise = riseTime.toTimeString()
            let dateRise = riseTime.toDateString()
            let html = `<div class="card rounded-4" style="width: 30rem;">
            <div class="card-header">
                <h4>${loc}</h1>
            </div>
            <div class="card-body">
                <p>${date}</p>
                <p>Satellite will be visible: ${data[0].visible}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Rise: ${timeRise}</li>
              <li class="list-group-item">Culminate: ${culmTime}</li>
              <li class="list-group-item rounded-4">Set: ${time}</li>
            </ul>
          </div>`
            console.log(data);
            $('#display-section').append(html)

            
        })
}

