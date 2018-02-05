angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams) {
    $scope.foto = {};
    $scope.msg = '';

    if($routeParams.fotoId) {
        $http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        })
        .error(function(erro) {
            $scope.msg = 'Não foi possível recuperar a foto com ID ' + $routeParams.fotoId;
            console.log(erro);
        });
    }

    $scope.submeter = function() {
        if($scope.formulario.$valid) {
            if($scope.foto._id) {
                $http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
                .success(function(){
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                    $scope.msg = 'Foto atualizado com sucesso';
                })
                .error(function(erro) {
                    $scope.msg = 'Não foi possível atualizar a foto.';
                    console.log(erro);
                });
            } else {
                $http.post('v1/fotos', $scope.foto)
                .success(function(){
                    $scope.foto = {};
                    $scope.formulario.$setPristine();
                    $scope.msg = 'Foto cadastrada com sucesso';
                })
                .error(function(erro) {
                    $scope.msg = 'Não foi possível cadastrar a foto.';
                    console.log(erro);
                });
            }
        }
    };
});