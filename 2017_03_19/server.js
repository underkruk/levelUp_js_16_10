const express   = require("express"),
			app = express(),
	 bodyParser = require('body-parser');


app.use(express.static("./public/"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))


let id = 3; 

const patients = [
	{ id : 1, 
	 first_name: "Samanta",
	 last_name: "Rai",
	 policy_number: "PO1258912",
	 date_birth: "1998-10-27"
	 },	
	{ id : 2, 
		first_name: "Frank", 
		last_name: "Jones",
		policy_number: "AW7893468", 
		date_birth: "1979-10-27" 
	},
	{ id : 3, 
		first_name: "Fozzy", 
		last_name: "Osborn",
		policy_number: "13256987", 
		date_birth: "1990-10-27" 
	},
];




app.get('/patients', function( req, res){

	res.send(patients);

});


app.get("/patient/:patientId", function(req, res) {

	let id = parseFloat(req.params.patientId, 10);

	let index = patients.findIndex(patient => patient.id === id);

	if(index >= 0) {

		let patient =  patients[index];

		res.send(patient);
	};

	 
})


app.delete("/patient/:patientId", (req, res) => {

  let id = parseFloat(req.params.patientId, 10);

  let index = patients.findIndex(patient => patient.id === id);

  patients.splice(index, 1);

  res.send(patients);
});



app.post("/patient", (req, res) => {

	const patient = req.body;

	patient.id = ++id;

	patients.push(patient);

	res.send(patients);

})



app.listen(3300, () =>{
	console.log('Listening on port 3300');
})
