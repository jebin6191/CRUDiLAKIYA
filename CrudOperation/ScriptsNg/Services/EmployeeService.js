app.service('EmployeeService', function ($http) {
    var urlGet = '';
    this.post = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.put = function (apiRoute, Model) {
        var request = $http({
            method: "put",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.delete = function (apiRoute) {
        var request = $http({
            method: "delete",
            url: apiRoute
        });
        return request;
    }
    this.getAll = function (apiRoute) {

        urlGet = apiRoute;
        return $http.get(urlGet);
    }

   
    this.ReadDepartment = function (apiRoute) {

        urlGet = apiRoute;
        return $http.post(urlGet);
    }

    this.ReadDesignation = function (apiRoute, Model) {

        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;

        //urlGet = apiRoute;
        //return $http.post(urlGet);
    }
    this.ReadAllEmployee = function (apiRoute) {

        urlGet = apiRoute;
        return $http.post(urlGet);
    }
    this.SaveEmployee = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }
    this.UpdateEmployee = function (apiRoute, Model) {
        var request = $http({
            method: "put",
            url: apiRoute,
            data: Model
        });
        return request;
    }

    this.DeleteEmployee = function (apiRoute, Model) {
        var request = $http({
            method: "post",
            url: apiRoute,
            data: Model
        });
        return request;
    }
});