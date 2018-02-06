angular.module('minhasDiretivas', ['services'])
    .directive('meuPainel', function () {
        //directive deve retornar um directive definition object (DDO)
        //Uma diretiva em Angular pode ser usada como 'E' lemento, 'A' tributo ou Comentário

        //ex de elemento:
        //<meu-painel></meu-painel>

        //Ex de attributo:
        //<div meu-painel></div>

        //nome da diretiva está em camelCase, porém na marcação HTML usamos com hífen 
        //é um padrão do Angular caso contrário a diretiva não funcionará
        var ddo = {};

        ddo.restrict = "AE";//veja que é o A e o E do Elemento e Atributo descrito acima

        //Precisamos capturar o título passado pela diretiva para dentro de seu escopo isolado e 
        //fazemos isso adicionando em nosso DDO a propriedade scope
        /*ddo.scope = {
            titulo: '@titulo'
        };*/

        ddo.scope = {
            titulo: '@' //quando o nome do atributo na diretiva na marcação é igual ao nome da propriedade que guardará o seu valor, podemos deixar apenas @
        };

        // ddo.template = 
        //             '<div class="panel panel-default">'
        //         +   '   <div class="panel-heading">'
        //         +   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
        //         +   '   </div>'
        //         +   '   <div class="panel-body" ng-transclude>'
        //         //img entra aqui (elemento filho)
        //         +   '   </div>'
        //         +   '</div>'

        ddo.templateUrl = 'js/directives/meu-painel.html';
        
        ddo.transclude = true;

        return ddo;
    })
    .directive('minhaFoto', function () {
        var ddo = {};
        ddo.restrict = "AE";
        ddo.scope = {
            url: '@',
            titulo: '@' //quando o nome do atributo na diretiva na marcação é igual ao nome da propriedade que guardará o seu valor, podemos deixar apenas @
        };

        ddo.templateUrl = 'js/directives/minha-foto.html';
        return ddo;
    })
    .directive('botaoAcao', function () {
        var ddo = {};
        ddo.restrict = "AE";
        ddo.scope = {
            acao: '&', //usamos & para passar uma referencia a funcao do controller (expressão) onde essa directive esta sendo usada
            nome: '@'
        };

        ddo.templateUrl = 'js/directives/botao-acao.html';
        return ddo;
    })
    .directive('putFocus', function () {
        var ddo = {};
        ddo.restrict = "A";
        // ddo.scope = {
        //     focado: '='
        // };

        ddo.link = function(scope, element) {
            // scope.$watch('focado', function() {
            //     if(scope.focado) {
            //         element[0].focus();
            //         scope.focado = false;
            //     }
            // });

            scope.$on('fotoCadastrada', function() {
                element[0].focus();
            });
        }
 
        return ddo;
    })
    .directive('getTitulos', function () {
        var ddo = {};
        ddo.restrict = "E";
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function($scope, crudFoto, restService) {
            crudFoto.listar()
            .then(function(dado) {
                if(dado.fotos != undefined && dado.fotos.length > 0) {
                    $scope.titulos = dado.fotos.map(function(itemFoto) {
                        return itemFoto.titulo;
                    });
                }
            })
            .catch(function() {
                console.log(dado.msg);
            });
        };

        return ddo;
    });