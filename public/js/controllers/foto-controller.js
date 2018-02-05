angular.module('alurapic').controller('FotoController', function ($scope, $routeParams, crudFoto, restService) {
    $scope.foto = {};
    $scope.msg = '';

    crudFoto.listar($routeParams.fotoId)
    .then(function(dados) {
        $scope.foto = dados.foto;
        console.log(dados.msg);
    })
    .catch(function(dados) {
        $scope.msg = dados.msg; 
    });

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            crudFoto.cadastrar($scope.foto)
            .then(function(dados) {
                $scope.foto = {};
                $scope.formulario.$setPristine();
                $scope.msg = dados.msg;
            })
            .catch(function(dados) {
                $scope.msg = dados.msg;
            });
        }
    };
});