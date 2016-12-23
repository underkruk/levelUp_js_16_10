(function(){


let id = prompt("Введите ID персонажа от 1 до 87");


(id >= 1 && id <= 87) ? getPerson( id ) : info();


function getPerson( id ){

    
    fetch("http://swapi.co/api/people/" + id + "/")


    	.then( res => res.json())

    	.then( res =>{

    		let name  	 	 = res.name,

	    		link_species = res.species,

	    		link_films   = res.films;

	    		console.log ("Name:\t\t" + name);


    		let getFilms   = link_films.map( link => fetch(link)

    								   .then(film => film.json()));


    		Promise.all( getFilms ).then(res => ( console.log( "Films:\t\t" + res.map(film => film.title).join("\n\t\t\t") ))) ;


    		let getSpecies = res.species.map( link => fetch( link )

    		    						.then( result => result.json() )

    		    						.then( res => {

    		    							console.log("Language:\t" + res.language);

    		    							console.log( "Species:\t" + res.name);

    		    							let link_people = res.people;

    		    							let getPeople = link_people.map(link => fetch(link)

    		    														.then(people => people.json()));

    		    							Promise.all( getPeople ).then( people => 

                                             console.log("Same origin:" + people.map(person => person.name).join("\n\t\t\t") ));    		    							    	    							

    		    						}));   	
        
    	})

		.catch(function(e){

				console.log(e);

			})
}
    	  	

function info(){

	alert("Такого песонажа нет. Попробуйте еще раз!"); 

	location.reload()
}

})()