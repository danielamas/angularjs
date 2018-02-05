angular.module('alurapic').controller('FotoController', function ($scope, $http) {
    $scope.foto = {};
    $scope.msg = '';

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            $http.post('v1/fotos', $scope.foto)
            .success(function(){
                $scope.foto = {};
                $scope.msg = 'Foto cadastrada com sucesso';
            })
            .error(function(erro) {
                $scope.msg = 'Não foi possível cadastrar a foto.';
                console.log(erro);
            });
        }
    };
});