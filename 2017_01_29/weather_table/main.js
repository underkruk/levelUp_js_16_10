;(function(){

    "use strict";

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

    let response   =  {};  

    let $degree      = $('input:checked').val(),
        degree_icon  = get_degree_icon($degree);      




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

            response = data;

            weatherTable( response);          
            
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

function weatherTable( weather_data ){

    let currently = weather_data.currently,
        daily     = weather_data.daily.data;

        getCurrentlyWeather( currently ); 

        getDayliWeather( daily, currently.time )

}


function getCurrentlyWeather( currently ){

    let $currently_icon     = $('#currently_icon'),
        $currently_summary  = $('#currently_summary'),
        $currently_temp     = $('#currently_temp'),
        $currently_time     = $('#currently_time'),
        $currently_date     = $('#currently_date'),
        $currently_humidity = $('#currently_humidity'),
        $currently_barometer= $('#currently_barometer'),
        $currently_temp_icon= $('#currently_temp_icon');

    let date            = new Date( currently.time*1000 ),
        current_num_day = date.getDay(),
        date_str        = date.getDate() + " " + long_name_months[date.getMonth()],
        time_str        = '';

    if (!date.getHours() == 0 && !date.getMinutes() ==0){

        time_str = long_name_days[date.getDay()] +" "+date.getHours()+":"+date.getMinutes();

    }else{

         time_str = long_name_days[date.getDay()];
    }    
               

    $currently_icon.addClass( icons[currently.icon] );

    $currently_summary.text( currently.summary);

        if( !currently.temperature_manually){

            $currently_temp.text( convert_from_fareng_to_celsium (currently.temperature, $degree));

            $currently_temp_icon.addClass(degree_icon);

        }else{

            $currently_temp.text( currently.temperature_manually);

        }

    $currently_time.text(time_str);
    $currently_date.text(date_str);
    $currently_humidity.text( parseInt(currently.humidity*100) + "%");
    $currently_barometer.text( convert_from_pescal_to_mmhg(currently.pressure) + "мм.рт" );
}

function getDayliWeather( daily, currently_time ){

    let $daily_weather_container = $('#daily_weather_container'),

        $html_daily = '',

        column = 4;        

        daily.forEach( (el, iter) =>{

             let daily_day      = new Date( el.time*1000 ),
                 daily_num_day  = daily_day.getDay();       

            if ( el.time >= currently_time && column > 0){        

                let  shot_day   = shot_name_days[daily_num_day],
                     dayly_date = daily_day.getDate() + "." + (daily_day.getMonth() + 1),           
                     daily_icon = icons[el.icon];
                 
                $html_daily += 

                    `<div class="col-md-3 col-xs-3">               
                         <div class="item" title="${el.summary}">
                             <a href="${el.time}">
                                <p class="align-center">${shot_day}</p>
                                <p class="align-center">${dayly_date}</p>
                                <p class="align-center">
                                    <i class="wi ${daily_icon}"></i>
                                </p>
                                <p class="align-center" >
                                    <span>${ convert_from_fareng_to_celsium(el.temperatureMin, $degree)}</span>
                                <i class="wi ${degree_icon}"></i>
                                &nbsp;/&nbsp;
                                 <span>${convert_from_fareng_to_celsium(el.temperatureMax, $degree)}</span>
                                <i class="wi ${degree_icon}"></i>
                                </p>
                             </a>     
                        </div>                     
                     </div>`;

                column--;
        }

        $daily_weather_container.html( $html_daily );

        })
}



$('#daily_weather_container').on('click','a', function(ev){

    var timeStap = $(this).attr('href');

    ev.preventDefault();  

   let $currently_selected = response.daily.data.find( el =>{
        if (el.time == timeStap){
            return el;
        };
    })

   if( $currently_selected ){
       $currently_selected['temperature_manually'] = `${convert_from_fareng_to_celsium($currently_selected.temperatureMin, $degree)}/${convert_from_fareng_to_celsium($currently_selected.temperatureMax, $degree)}`
       getCurrentlyWeather( $currently_selected );
   }     
    
})



$("input[type='radio']").on('change', function(ev){

    $degree = $('input:checked').val();

    $('#currently_temp_icon').removeClass( degree_icon );

    degree_icon  = get_degree_icon($degree);

    weatherTable( response );

})



function convert_from_pescal_to_mmhg(value){

    return parseInt(0.750061683*value);

}

function convert_from_fareng_to_celsium(value, degree){

    if(degree == 0) return value;

    if(degree == 1) return parseInt(((value - 32)/2) + ((value - 32)/2)*0.1);

}

function get_degree_icon($degree){

    if( $degree == 0) return "wi-fahrenheit";

    if( $degree == 1)  return "wi-celsius";    

}


})();