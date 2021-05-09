
var app = angular.module('studentApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/all_students.html',    // route for the home page
            controller: 'allCtrl'
        })
        .when('/all_students', {
            templateUrl: 'partials/all_students.html',
            controller: 'allCtrl'
        })
        .when('/add_student', {
            templateUrl: 'partials/add_student.html',    // add a student to db
            controller: 'addCtrl'
        })
        .when('/edit_student', {
            templateUrl: 'partials/edit_student.html',    // edit a student record
            controller: 'editCtrl'
        })
        .otherwise({
            redirectTo: 'partials/all_students.html'        // any other URL goes to home
        });
});

/*   a controller for each page  */
app.controller('allCtrl', function ($scope, $http) {

    $http.get("/showAll")          // get all the students 
        .then(function (response) {
            $scope.students = response.data;
        });
});


app.controller('addCtrl', function ($scope, $http) {

    $scope.addStudent = function () {      // add a student
        $http.post("/addStudent", {
            sid: $scope.sid,       // set up data object
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            major: $scope.major
        })         // post the object data
            .then(function (response) {
                $scope.status = response.data;   //print status of request

                // clear textboxes
                $scope.sid = "";
                $scope.first_name = "";
                $scope.last_name = "";
            });
    };
});

app.controller('editCtrl', function ($scope, $http) {  // edit miles or price of record
    $scope.studentIndex = 0;

    $scope.getOne = function(){
        console.log("Check");
    }
    $scope.updateStudent = function () {
        var student = $scope.students[$scope.studentIndex]
        $http.post("/updateStudent", {
            sid: student.sid,
            miles: student.miles,
            price: student.price
        })
            .then(function (response) {
                $scope.student = $scope.students[$scope.studentIndex];
            });
    }

    $scope.deleteStudent = function () {
        $http.get("/deleteStudent?sid=" + $scope.students[$scope.studentIndex].sid)
            .then(function (response) {
                //$scope.student = response.data;
                console.log($scope.student)
                $scope.maxIndex = $scope.students.length - 1;
                $scope.student = $scope.students[$scope.studentIndex];
            });
    };
});