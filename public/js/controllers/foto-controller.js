angular.module('alurapic').controller('FotoController', function ($scope, $routeParams, restService) {
    $scope.foto = {};
    $scope.msg = '';

    if($routeParams.fotoId) {
        restService.get({fotoId: $routeParams.fotoId}, function(foto){
            $scope.foto = foto;
        },
        function(error){
            $scope.msg = 'Não foi possível recuperar a foto com ID ' + $routeParams.fotoId;
            console.log(error);    
        });
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            if($scope.foto._id) {
                restService.update({fotoId: $scope.foto._id}, $scope.foto, 
                function() {
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                    $scope.msg = 'Foto atualizada com sucesso';
                }, 
                function(error) {
                    $scope.msg = 'Não foi possível atualizar a foto.';
                    console.log(error);
                });
            } else {
                restService.save($scope.foto, function() {
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                    $scope.msg = 'Foto cadastrada com sucesso';
                }, 
                function(error) {
                    $scope.msg = 'Não foi possível cadastrar a foto.';
                    console.log(error);
                });
            }
        }
    };
});