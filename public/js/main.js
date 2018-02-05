const directivesArray   = ['minhasDiretivas'];
const ngArray           = ['ngAnimate', 'ngRoute'];

function dependencias() {
    return ngArray.concat(directivesArray);
}

angular.module('alurapic', dependencias())
.config(function($routeProvider, $locationProvider)  {

    $locationProvider.html5Mode(true);//deixa de trabalhar com # na url ex: localhost:3000/fotos
    //e nao localhost:3000/#/fotos

    $routeProvider.when('/fotos', {
        templateUrl: 'partials/principal.html',
        controller: 'FotosController'
    });

    $routeProvider.when('/fotos/new', {
        templateUrl: 'partials/foto.html',
        controller: 'FotoController'
    });

    $routeProvider.when('/fotos/edit/:fotoId', {
        templateUrl: 'partials/foto.html',
        controller: 'FotoController'
    });

    $routeProvider.otherwise({
        redirectTo: '/fotos'
    });
    
});
