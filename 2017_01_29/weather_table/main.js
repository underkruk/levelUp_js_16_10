;(function(){

    let icons = {
        'clear-day'     : 'wi-day-sunny',
        'clear-night'   : 'wi-night-clear',
        'rain'          : 'wi-rain',
        'snow'          : 'wi-snow',
        'sleet'         : 'wi-sleet',
        'wind'          : 'wi-windy',
        'fog'           : 'wi-fog',
        'cloudy'        : 'wi-cloudy',
        'partly-cloudy-day'  : 'wi-night-partly-cloudy',
        'partly-cloudy-night': 'wi-night-alt-partly-cloudy'
    };

    let shot_name_days = {
            '0' : 'Нд',
            '1' : 'Пн',
            '2' : 'Вт',
            '3' : 'Ср',
            '4' : 'Чт',
            '5' : 'Пт',
            '6' : 'Cб'
        };
    let long_name_days = {
            '0' : 'Недiля',
            '1' : 'Понедiлок',
            '2' : 'Вiвторок',
            '3' : 'Середа',
            '4' : 'Четвер',
            '5' : 'Пятниця',
            '6' : 'Cуббота'
    }    
    let long_name_months = {
            '0' : 'Сiчень',
            '1' : 'Лютий',
            '2' : 'Березень',
            '3' : 'Квiтень',
            '4' : 'Травень',
            '5' : 'Червень',
            '6' : 'Липень',
            '7' : 'Серпень',
            '8' : 'Вересень',
            '9' : 'Жовтень',
            '10': 'Листопад',
            '11': 'Грудень' 
        }



navigator.geolocation.getCurrentPosition( onAllow, onError);

function onAllow( data ){

    let latitude 	= data.coords.latitude,
    	longitude 	= data.coords.longitude,
    	key    		= "47b1f8dae7cc49e6cba2e66cadd059c3",
    	origin		= "https://api.darksky.net/forecast",
        lang        = "lang=uk";



    $.ajax({
        url: `${origin}/${key}/${latitude},${longitude}?${lang}`,
        dataType: "jsonp",
        success: function( data ){        
            console.log( data ); 
            weatherTable( data )          
            
        },
        error: function(){
            $("#weather-container").html('').append(
        `<h1 class="error_message">Error</h1>`
        );
        }
    })

}

function onError(){
    $("#weather-container").html('').append(
        `<h1 class="error_message">Unable to location!</h1>`
        );
}

function weatherTable( data ){

let currently = data.currently;

let $currently_icon     = $('#currently_icon'),
    $currently_summary  = $('#currently_summary'),
    $currently_temp     = $('#currently_temp'),
    $currently_time     = $('#currently_time'),
    $currently_date     = $('#currently_date'),
    $currently_humidity = $('#currently_humidity'),
    $currently_barometer= $('#currently_barometer');

    let date     = new Date( currently.time*1000 ),
        current_num_day = date.getDay(),
        time_str = long_name_days[date.getDay()] +" "+date.getHours()+":"+date.getMinutes(),
        date_str = date.getDate() + " " + long_name_months[date.getMonth()];

    $currently_icon.addClass( icons[currently.icon] ); 
    $currently_summary.text( currently.summary);
    $currently_temp.text( currently.temperature);
    $currently_time.text(time_str);
    $currently_date.text(date_str);
    $currently_humidity.text( currently.humidity*100 + "%");
    $currently_barometer.text( convert_from_pesacal_to_mmhg(currently.pressure) + "мм.рт" );
     

    let daily   = data.daily.data,
    $daily_weather_container = $('#daily_weather_container'),
    $html_daily = '',
    column = 4;

    console.log(daily);

    daily.forEach( (el, iter) =>{

     let daily_day = new Date( el.time*1000 ),
         daily_num_day = daily_day.getDay();       

    if ( el.time >= currently.time && column > 0){        

        let  shot_day   = shot_name_days[daily_num_day],
             dayli_date = daily_day.getDate() + "." + (daily_day.getMonth() + 1);           
             daily_icon = icons[el.icon];
         
        $html_daily += 
            `<div class="col-md-3 col-xs-3">
                <div class="item" title="${el.summary}">    
                    <p class="align-center">${shot_day}</p>
                    <p class="align-center">${dayli_date}</p>
                    <p class="align-center">
                        <i class="wi ${daily_icon}"></i>
                    </p>
                    <p class="align-center" >
                        <span>${el.apparentTemperatureMin}</span>
                    <i class="wi wi-fahrenheit"></i>
                    &nbsp;/&nbsp;
                     <span>${el.apparentTemperatureMax}</span>
                    <i class="wi wi-fahrenheit"></i>
                    <p>
                </div>    
             </div>`;

        column--;
    }

    $daily_weather_container.html( $html_daily );

    })
}


let $daily_weather_container = $('#daily_weather_container');

$daily_weather_container.on('click', function(ev){
    console.log(ev);
})



function convert_from_pesacal_to_mmhg(value){

    return parseInt(0.750061683*value);

}


})();