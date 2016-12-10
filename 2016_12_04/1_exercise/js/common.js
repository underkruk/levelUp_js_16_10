(function(){


	Date.prototype.getCustomFormat = function( dateFormat ){

		return format( this, dateFormat );
		
	}


	function format(date, dateFormat){
		
		let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		let objFormat = { 

			YYYY : date.getFullYear(),
			YY 	 : date.getFullYear().toString().slice(2),
			MM	 : parseInt(date.getMonth()) + 1,
			MMMM : monthNames[date.getMonth()],
			DD	 : date.getDate(),
			HH	 : date.getHours(),
			mm   : date.getMinutes(),
			ss   : date.getSeconds()
		};

		
		let dateTime = dateFormat.trim().includes(" ") ? dateFormat.trim().split(" ") : [dateFormat.trim()],
						dateTostr = "";

		dateTime.forEach(function(el, iter){

			let delimiter = iter == 0 ? "-" : ":";
			
				dateTostr += dateTime[iter].split(delimiter).map(e => objFormat[e]).join(delimiter) + " ";

		})

		 	

		return dateTostr;
	}


let someDate = new Date(2017, 3, 23, 15, 45, 49);

console.log ( someDate.getCustomFormat ( "YY-MMMM-DD HH:mm:ss" ) );
})()


