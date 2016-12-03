(function(){

    //исходный объект

    let obj = {
        num: 1.24,
        str: "not very long string",
        f: function(){
        return this.str.split('');
    },
        arr: ["some", "array", {someProp: "value"}],
        prop: { key: 1 },
        empty: null,
        last: 0
    }


    function create_new_object(someObj){

        let new_object = Object.create(null);

        new_object['количество собственных свойств'] = Object.getOwnPropertyNames(someObj).length;

        new_object.propTypes = Object.keys(someObj).map(function(el){

                return typeof someObj[el];

            });

        new_object.propNames = Object.keys(someObj);

        //изменяем исходный объект

        Object.keys(someObj).forEach(function(el){

            if (typeof someObj[el] === "number"){

                someObj[el] = parseFloat(someObj[el]).toFixed(2);

            }else if (typeof someObj[el] === "string"){

                someObj[el] = someObj[el].charAt(0).toUpperCase() + someObj[el].slice(1);

            }
        });

       Object.freeze(someObj);

        return new_object;
    }


obj.name = "some name"; //добавляем новое свойство name в исходный объект;

console.log(create_new_object(obj));
console.log(obj);

obj.color ="green"; //свойство color не добавится, так как объект не расширяемый
})();
