;(function(){
	"use strict";

let users = [
	{name: "Victor",lastName:"Peete",age:"30", id:"user1", def: true},
	{name: "Irene", lastName:"Elbaz",age:"20", id:"user2"},
	{name: "Alison",lastName:"Rinzel",age:"40",id:"user3"},
	{name: "Rosa",lastName:"Aguilar",age:"30", id:"user4"}
];



window.addEventListener("popstate", function(ev){		

	if (!ev.state || !ev.state.id) return;

	let user = users.find(el => el.id === ev.state.id);

	show_user_information(user);
});




document.body.addEventListener("click", function(ev){

	if(ev.target.localName === "a") {

		ev.preventDefault();

		let id = ev.target.getAttribute("href").slice(1);

		let user = users.find(el => el.id === id );	

		show_user_information(user);

		history.pushState({  id }, null, `${location.origin}/${id}/?name=${user.name}&lastName=${user.lastName}&age=${user.age}`)
		
	
	}
});


function show_user_information(person){

		document.getElementById("name").textContent = `Name: ${person.name}`;	

		document.getElementById("lastName").textContent = `Last Name: ${person.lastName}`;	

		document.getElementById("age").textContent = `Age: ${person.age}`;

		document.getElementById("user_logo").classList.remove( "dis_logo" );	
}


})()