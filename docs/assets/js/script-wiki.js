function inserirTopo(classe){
    var $wrapper = document.querySelector('.'+classe),
    HTMLNovo = "<nav class='navbar navbar-default navbar-fixed-top'>" +
          "<div class='container-fluid'>" +
            "<div class='navbar-header'>" +
              "<button type='button' class='navbar-toggle collapsed' data-toggle'collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>" +
                "<span class='sr-only'>Toggle navigation</span>" +
                "<span class='icon-bar'></span>" +
                "<span class='icon-bar'></span>" +
                "<span class='icon-bar'></span>" +
              "</button>" +
              "<a class='navbar-brand' href='#' style='padding: 0'>" +
                "<img alt='Logo BES' src='assets/images/es-logo.png' style='height:34px;margin-left: 10px;margin-top: 8px'/>" +
            "</a>" +
            "</div>" +
            "<div id='navbar' class='navbar-collapse collapse'>" +
              "<div class='navbar-form navbar-right'>" +
                "<input type='text' class='form-control' onkeydown='redirecionar()' id='busca' placeholder='Pesquisar...'>" +
              "</div>" +
              "<ul class='nav navbar-nav navbar-right'>" +
                "<li><a href='ppc-completo.html'>PPC Completo</a></li>" +
              "</ul>" +
            "</div>" +
          "</div>" +
        "</nav>";
    $wrapper.insertAdjacentHTML('beforeend', HTMLNovo);
}

function ajustaMenu() {
    altura = parseInt($(window).height()) - 50;
    $(".menu").css("height", altura+"px");
}

function inserirMenu(){
    $.getJSON("assets/data/dados.json", function(data) {
      var dados = data.topicos;
      var areas = [];
      var urls = [];
      for (i = 0; i < dados.length; i++){
          if(areas.indexOf(dados[i].area) == -1){
              areas.push(dados[i].area);
              urls.push(dados[i].url);
          }
      }
      var $menu = document.querySelector('.menu');
      $menu.insertAdjacentHTML('beforeend', "<ul>");
      for(i = 0; i < areas.length; i++){
          $menu.insertAdjacentHTML('beforeend', "<li class='principal-area' id="+urls[i]+" data-area="+i+"><h2 class='titulo-area-principal'>"+areas[i]+"</h2></li>");
      }
      $menu.insertAdjacentHTML('beforeend', "</ul>");
      for(i = 0; i < dados.length; i++){
          var $area = document.querySelector('#'+dados[i].url);
          $area.insertAdjacentHTML('beforeend', "<li class='topico' id="+dados[i].titulo+" data-area="+i+"><a href="+dados[i].url+'.html'+">"+dados[i].titulo+"</a></li>");
      }
    });
}

function redirecionar(){
    if (event.keyCode == 13){
        var busca = $("#busca").val();
        window.location.href = "pesquisar.html?termo="+busca;
    }
}

function realizaPesquisa(){
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    if ((data.hasOwnProperty("termo")) && (!!data.termo)){
        var $conteudo = document.querySelector('.conteudo');
        var letraFinal = data.termo.charAt(data.termo.length-1);
        if(letraFinal == 's'){
            var termoFinal = data.termo.substr(0,(data.termo.length - 2));
        }else{
            var termoFinal = data.termo;
        }
        termoFinal = termoFinal.toLowerCase();
        $conteudo.insertAdjacentHTML('beforeend', '<ul>');
         $.getJSON("assets/data/dados.json", function(data) {
            var dados = data.topicos;
            for (i = 0; i < dados.length; i++){
                var chaves = dados[i].palavras_chaves;
                var controle = 0;
                if(dados[i].titulo.toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(dados[i].area.toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(dados[i].area_swebok.toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(dados[i].dados.toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(chaves.indexOf(termoFinal) != -1){
                    controle = 1;
                }
                
                if(controle == 1){
                    $conteudo.insertAdjacentHTML('beforeend', '<li><a href='+ dados[i].url +'.html'+'>'+
                    '<h3>' + dados[i].titulo + '</h1>'+
                    '<p>' + dados[i].descricao + '</p>'+
                    '</li></a>'
                    );
                }
            }
        });
        $conteudo.insertAdjacentHTML('beforeend', '</ul>');
        $conteudo.insertAdjacentHTML('beforeend', '<h1>Você pesquisou: '+ termoFinal +'</h1>');
    }else{
        var $conteudo = document.querySelector('.conteudo');
        $conteudo.insertAdjacentHTML('beforeend', '<h1>Nenhum termo pesquisado!</h1>');
    }
}