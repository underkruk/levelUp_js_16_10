;(function(){


	let $bg_container 		= $('.bg-container'),
		$container	 		= $('.containter'),
		$nav	 			= $('nav'),
		$patientsList		= $('#patientsList'),
		$patients_container = $('#patients_container'),
		$add_new_patient	= $('#add_new_patient'),
		$form_new_patient	= $('#form_new_patient'),
		$content			= $('#content'),
		$form_new_patients 	= $('#form_new_patient form')
		$patient_detail		= $('#patient_detail');



//выводит список пациентов при загрузке странички

	$(window).on('load', function(){

		$patientsList.addClass('active');

		$patients_container.show();	

		$bg_container.css('height', ($(window).height() - $nav.height()));

		getPatientsList();
	
	});


	//вызов формы для добавления нового пациентов

	$add_new_patient.on('click', function(ev){

		$patientsList.removeClass('active');

		$add_new_patient.addClass('active');

		$patients_container.hide();

		$patient_detail.hide();

		$form_new_patient.show();

		ev.preventDefault();
	})

		
	//сабмит формы для создания нового пациента

	$form_new_patients.on('submit', function(ev){

		ev.preventDefault();

		let first_name    = $('#first_name').val(),
			last_name  	  = $('#last_name').val(),
			policy_number = $('#policy_number').val(),
			date_birth 	  = $('#date_birth').val();
		
			fetch('/patient', {
				method: "POST",
				body: JSON.stringify({ first_name, last_name, policy_number, date_birth}),
				headers:{
					"content-type" : "application/json"
				}
			}).
			then( res => res.json()).

			then( res => {

				location.reload();

			}).
			catch( e => console.error(e))

	});



	//вывод всей информации о пациенте

	$('#patients_container').on('click', function(ev){

		if(ev.target.tagName == "H4"){

			let patient_id = $(ev.target).attr('data-id');

			getPatientDetails( patient_id )

		}

	})	




	//загрузка списка пациентов

	$patientsList.on('click', function(ev){		

		$patientsList.addClass('active');

		$add_new_patient.removeClass('active');

		$patients_container.show();	

		$form_new_patient.hide();

		$patient_detail.html('');

		getPatientsList();	

		ev.preventDefault();
		
	});


	//удаление пациента

	$patient_detail	.on('click', function(ev){
		
		if( ev.target.id == "delete"){

			let patient_id = $(ev.target).attr('data-id');					
		
			deletePatient( patient_id );

		}	

	});


	$( window ).on('resize', function() {	

		 $bg_container.css('height', ($(window).height() - $nav.height()));	 
		 
	});	

	



function getPatientsList(){

	fetch("/patients").
		  then(res => res.json()).
		  then(res => {

		  	let patientsList = res,
		  				html = '';

		  	patientsList.forEach((el, iter) =>{

		  		html += `<div class="item-one">
							<h4 class="text-center" data-id=${el.id}>${el.first_name} ${el.last_name}</h4>							
							<p>Policy number: <span>${el.policy_number}</span></p>
							<p>Date of Birth: <span>${el.date_birth}</span></p>			
						</div>`

		  	})

		  	$patients_container.html(html);

		  }).
		  catch(e => console.error(e));

}




function deletePatient( patientId ){

	 fetch(`/patient/${patientId}`, {
    	method: "DELETE"
	  }).
	  then(res => res.json()).

	  then(res => {			

	  	location.reload() 

	  	}).
	  catch(e => console.error(e));

}



function getPatientDetails( patientId ){

	fetch("/patient/" + patientId, {method: "GET"}).

		  then(res => res.json()).

		  then( res => {

		  	let patient = res;

		  	$patientsList.removeClass('active');

		  	$patients_container.hide();		  	

		  		let $patient_detail = $('#patient_detail'),

		  			html = '';

		  			html = `<h1 class="text-center"> ${patient.first_name} ${patient.last_name}</h1>
		  					<p class="text-center">Policy number: <span>${patient.policy_number}</span></p>	
		  					<p class="text-center">Date of birth: <span>${patient.date_birth}</span></p>		  					
		  					<button class="button" id="delete" data-id=${patient.id}>Delete</button>
		  			`;

		  			$patient_detail.show();

		  			$patient_detail.html( html );  			
		  	
		  }).
	catch(e => console.log(e))

}


})();

