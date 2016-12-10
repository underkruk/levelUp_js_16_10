;(function(){

	let personal = [];

    "use strict";
    function Bar(name, barmans = [], waiters = [], drinks = [], orders = [], monyeTips){
		this.name 		= name;
		this.barmans 	= barmans;
		this.waiters 	= waiters;
		this.drinks		= drinks;
		this.orders		= orders;
		this.monyeTips 	= monyeTips;
    }


    Bar.prototype.addDrinks = function( drink, count){

    this.drinks.forEach(function(el){

    	if(el.drinkName == drink){

			el.count += count;
    	}
    })

    }

    
    Bar.prototype.addNewPerson = function( person, post ){

    	if(post === "barman"){

    		this.barmans.push( person )

    	} else if (post === "waiter"){

    	 this.waiters.push( person ); 

    	 }   	
    }


    Bar.prototype.firePerson = function( person, post ){

    	if(post === "barman" && this.barmans.length > 0){

			this.barmans = this.barmans.filter(el => !(el.name == person.name && el.age == person.age))

    	}else if( post === "waiter" && this.waiters.length > 0){

 			this.waiters = this.waiters.filter(el => !(el.name == person.name && el.age == person.age))
    	}
			
    }

    Bar.prototype.getMonyeTips = function(){

    	let total_personal = this.barmans.length + this.waiters.length;

    	let tips = (this.monyeTips / total_personal);

    	let count_tips = 0;

    	this.barmans.forEach(function(el){

    		el.tips = tips;

    		count_tips += tips;

    	})    

		this.waiters.forEach(function(el){

		    el.tips = tips;

		    count_tips += tips;

		})

		this.monyeTips -= count_tips;

    }

    Bar.prototype.getOrder = function (drink, count){

    	this.orders.push({drink: count});
    }

    function Person(name, age){

    	this.name = name;
    	this.age  = age;
    }

    function Barman(name, age, coctail){

    	this.coctail = coctail;

			Person.apply(this, arguments);
    }

    function Waiter (name, age){

			Person.apply(this, arguments);

    }

    Waiter.prototype.getOrder = function(drink, total){

		console.log(Bar.prototype.getOrder.call(this, drink));
    }

Barman.prototype.constructor = Object.create(Person.prototype);
Barman.prototype.constructor = Barman;

Waiter.prototype.constructor = Object.create(Person.constructor);
Waiter.prototype.constructor = Waiter;


let drinks = [{
	drinkName : "vodka",
	count: 5
},
{
	drinkName: "wine",
	count: 10
}, 
{
	drinkName: "rom",
	count: 2
},
{
	drinkName: "juice",
	count: 20
},
{
	drinkName: "wiski",
	count: 5
}]



let laguna = new Bar("Laguna", [], [], drinks, [], 100);

console.log(laguna);

let vano   = new Barman ("Vano", 30, "LongIland");
let sasho  = new Barman ("Sasho", 20, "Margarita");
let masha  = new Waiter("Masha", 21);
let anton  = new Waiter("Anton", 24);

laguna.addDrinks("vodka", 10);
laguna.addDrinks("wiski", 1);


laguna.addNewPerson(vano, "barman");
laguna.addNewPerson(sasho, "barman");
laguna.addNewPerson(masha, "waiter");
laguna.addNewPerson(anton, "waiter");

console.log(laguna);

laguna.firePerson(vano, "barman");
laguna.firePerson(anton, "waiter");

laguna.getMonyeTips();

console.log(laguna);

})();