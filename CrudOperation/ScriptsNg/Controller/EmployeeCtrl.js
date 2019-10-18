
app.controller('EmployeeCtrl', ['$scope', 'EmployeeService',
    function ($scope, EmployeeService) {

        // Base Url 
        var baseUrl = '/api/Employee/';

        $scope.btnText = "Save";
        $scope.EmployeeId = 0;
        $scope.SaveUpdate = function () {
            var wloc = {

                home: $scope.LocHome ? "Y" : "N",
                office: $scope.LocOffice ? "Y" : "N"
            }
            var Employee = {
                EmployeeName: $scope.EmployeeName,
                DepartmentId: $scope.selectedDepartment.DepartmentId,
                DesignationId: $scope.selectedDesignation.DesignationId,
                Salary: $scope.Salary,
                EmployeeId: $scope.EmployeeId,
                Gender: $scope.selectedGender,
                DateofBirth: $scope.selectedDOB,
                WrkLocationAllowed: JSON.stringify(wloc)
            }
            if (!$scope.IsEditing) {
                var apiRoute = baseUrl + 'SaveEmployee/';
                var saveEmployee = EmployeeService.SaveEmployee(apiRoute, Employee);
                saveEmployee.then(function (response) {
                    if (response.data != "") {
                        alert("Data Save Successfully");
                        $scope.ReadAllEmployee();
                        $scope.Clear();

                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
            else {
                var apiRoute = baseUrl + 'UpdateEmployee/';
                var UpdateEmployee = EmployeeService.UpdateEmployee(apiRoute, Employee);
                UpdateEmployee.then(function (response) {
                    if (response.data != "") {
                        alert("Data Update Successfully");
                        $scope.ReadAllEmployee();
                        $scope.Clear();


                    } else {
                        alert("Some error");
                    }

                }, function (error) {
                    console.log("Error: " + error);
                });
            }
        }

        $scope.EditEmployee = function (row) {

            $scope.btnText = "Update";

            $scope.IsEditing = true;
            $scope.EmployeeName = row.EmployeeName;
            $scope.EmployeeId = row.EmployeeId;
            $scope.Salary = row.Salary;
            $scope.selectedDOB = new Date(row.DateofBirth);
            $scope.selectedGender = row.Gender;
            var loc = JSON.parse(row.WrkLocationAllowed);
            $scope.LocHome = loc.home == "Y" ? true : false;
            $scope.LocOffice = loc.office == "Y" ? true : false;

            for (var i = 0; i < $scope.Department.length; i++) {
                if ($scope.Department[i].DepartmentId == row.DepartmentId) {
                    $scope.selectedDepartment = $scope.Department[i];

                    var inputdata = {
                        DepartmentId: $scope.selectedDepartment.DepartmentId
                    }

                    var apiRoute = baseUrl + 'ReadDesignation/';
                    var employee = EmployeeService.ReadDesignation(apiRoute, inputdata);
                    employee.then(function (response) {

                        $scope.Designation = response.data;

                        for (var j = 0; j < $scope.Designation.length; j++) {
                            if ($scope.Designation[j].DesignationId == row.DesignationId) {
                                $scope.selectedDesignation = $scope.Designation[j];
                            }
                        }
                    },
                    function (error) {
                        console.log("Error: " + error);
                    });
                }
            }

        }



        $scope.DeleteEmployee = function (row) {
            debugger
            var Employee = {

                EmployeeId: row.EmployeeId
            }
            var apiRoute = baseUrl + 'DeleteEmployee/';
            var DeleteEmployee = EmployeeService.DeleteEmployee(apiRoute, Employee);
            DeleteEmployee.then(function (response) {
                if (response.data != "") {
                    alert("Data Delete Successfully");
                    $scope.ReadAllEmployee();
                    $scope.Clear();


                } else {
                    alert("Some error");
                }

            }, function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.ReadDepartment = function () {
            var apiRoute = baseUrl + 'ReadDepartment/';
            var employee = EmployeeService.ReadDepartment(apiRoute);
            employee.then(function (response) {
                debugger
                $scope.Department = response.data;

            },
            function (error) {
                console.log("Error: " + error);
            });
        }


        $scope.ReadDesignation = function () {
            var inputdata = {
                DepartmentId: $scope.selectedDepartment.DepartmentId
            }
            var apiRoute = baseUrl + 'ReadDesignation/';
            var employee = EmployeeService.ReadDesignation(apiRoute, inputdata);
            employee.then(function (response) {
                debugger
                $scope.Designation = response.data;

            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.ReadAllEmployee = function () {
            var apiRoute = baseUrl + 'ReadAllEmployee/';
            var student = EmployeeService.ReadAllEmployee(apiRoute);
            student.then(function (response) {
                debugger
                $scope.EmployeeList = response.data;

            },
            function (error) {
                console.log("Error: " + error);
            });
        }

        $scope.ngModelOpts = {
            timezone: '-04:00'
        };

        $scope.dateOptions = {
            formatDay: 'd',
            formatYear: 'yy',
            startingDay: 0,
            showWeeks: false,
            ngModelOptions: $scope.ngModelOpts
        };

        $scope.dt = new Date('Sun Aug 07 2016 18:00:00 GMT-1000 (Hawaiian Standard Time)');

        $scope.open1 = function () {
            $scope.popup1.opened = true;
        };

        $scope.format = 'mediumDate';
        $scope.popup1 = {
            opened: false
        };

  
 

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(1970, 1, 1),
            startingDay: 1
        };
        $scope.open = function () {
            $scope.popup.opened = true;
        };
        $scope.popup = {
            opened: false
        };
        function getDayClass(data) {
            var date = data.date,
            mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }
            return '';
        }

   



        $scope.ReadDepartment();
        $scope.ReadAllEmployee();

        $scope.btnText = "Save";
        $scope.IsEditing = false;

        $scope.Clear = function () {
            $scope.EmployeeId = 0;
            $scope.EmployeeName = null;
            $scope.DepartmentId = null;
            $scope.selectedDepartment = null;
            $scope.selectedDesignation = null;
            $scope.selectedGender = null;
            $scope.selectedDOB = null;
            $scope.LocHome = null;
            $scope.LocOffice = null;
           
            $scope.Salary = null;
            $scope.Designation = [];
            $scope.btnText = "Save";
        }
    }]);