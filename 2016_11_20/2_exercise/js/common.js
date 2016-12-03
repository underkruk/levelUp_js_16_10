(function() {

    let student = {
        first_name: "Volodymyr",
        last_name: "Kriukov",
        age: 30,
        courses: [
            {
                course: "javascript",
                professor: "Yuriy Stryzhekozin",
                duration: 96,
                progress: 0.3,
                marks: [5, 4, 5, 4]
            },
            {
                course: "php",
                professor: "Ivan Ivanov",
                duration: 160,
                progress: 0.1,
                marks: [3, 3, 5, 4]
            },
            {
                course: "html",
                professor: "Code School",
                duration: 36,
                progress: 1,
                marks: [5, 4, 5, 4, 5, 5, 5]
            }
        ],
        getFullName: function () {
            return `${this.first_name} ${this.last_name}`;
        },
        getAge: function () {
            let year = this.age > 1 ? "years" : "year";
            return `${this.age} ${year} old!`;
        },
        getCourses: function () {
            return this.courses.map(function (e) {
                return e.course;
            }).join(", ");
        },
        addNewCourse: function (teacherName, course, duration) {
            let new_course = {
                course: course,
                professor: teacherName,
                duration: duration,
                progress: 0,
                marks: []
            };
             this.courses.push(new_course);
        },
        getAvarageMarkByCourse: function (someCourse) {

            let result = null;

            this.courses.forEach(function (e) {

                if (e.course.toLowerCase() === someCourse.toLowerCase() && e.marks.length > 0) {

                    let total = e.marks.reduce(function (tmp, el) {
                        return tmp + el;
                    });

                    result = parseFloat(total / e.marks.length).toFixed(2);

                }
            })
            return result;
        },

        getAvarageMark: function () {
            let sum_marks = 0, count_marks = 0;
            this.courses.forEach(function (e) {
                if (e.marks.length > 0) {
                    sum_marks += e.marks.reduce(function (tmp, el) {

                        return tmp + el;
                    });

                    count_marks += e.marks.length;
                }
            });

            return parseFloat(sum_marks / count_marks).toFixed(2);
        },

        addMark: function (someCourse, mark) {
            mark = parseInt(mark);
            if (mark >= 1 && mark <= 5) {
                this.courses.forEach(function (e) {
                    if (e.course.toLowerCase() === someCourse.toLowerCase()) {

                        e.marks.push(mark);

                    }
                })
            }

        },

        addProgress: function (someCourse, hours) {

            this.courses.forEach(function (el) {
                if (el.course.toLowerCase() === someCourse.toLowerCase() && hours >= 0 && hours <= el.duration) {

                    el.progress = parseFloat(hours / el.duration).toFixed(2);
                }
            })
        },

        getProgress: function () {

            let str = "";

            this.courses.forEach(function (el) {

                str += `${el.course} - ${el.progress} `;
            })

            return str;
        }


    };
    console.log(student.getFullName());
    console.log(student.getAge());
    console.log(student.getCourses());
    console.log(student.addNewCourse("Anton Geraschenko", "css", 36));
    console.log(student.courses);
    console.log(student.getAvarageMarkByCourse('php'));
    console.log(student.getAvarageMarkByCourse('css')); //проверка на null, если массив оценок пустой
    console.log(student.getAvarageMark());
    console.log(student.addMark('css', 5));
    console.log(student.addProgress("css", 30));
    console.log(student.courses[3]);                    // проверка, что оценка для курса по СSS добавилась
    console.log(student.getProgress());
})();



