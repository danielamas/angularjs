angular.module('minhasDiretivas', []).directive('meuPainel', function () {
    //directive definition object (DDO)
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

    ddo.template = 
                '<div class="panel panel-default">'
            +   '   <div class="panel-heading">'
            +   '        <h3 class="panel-title text-center">{{titulo}}</h3> '
            +   '   </div>'
            +   '   <div class="panel-body" ng-transclude>'
            //img entra aqui (elemento filho)
            +   '   </div>'
            +   '</div>'
    
    
    ddo.transclude = true;

    return ddo;
});