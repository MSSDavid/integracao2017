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
              "<a class='navbar-brand' href='index.html' style='padding: 0'>" +
                "<img alt='Logo BES' src='assets/images/es-logo.png' style='height:34px;margin-left: 10px;margin-top: 8px'/>" +
            "</a>" +
            "</div>" +
            "<div id='navbar' class='navbar-collapse collapse'>" +
              "<div class='navbar-form navbar-right'>" +
                "<input type='text' class='form-control' onkeydown='redirecionar()' id='busca' placeholder='Pesquisar...'>" +
              "</div>" +
              "<ul class='nav navbar-nav navbar-right'>" +
                "<li><a href='index.html'>Página Inicial</a></li>" +
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
        var busca = encodeURI(removerAcentos($("#busca").val()));
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
        data.termo = decodeURI(data.termo);
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
                for (j = 0; j < chaves.length; j++){
                    chaves[j] = removerAcentos(chaves[j]).toLowerCase();
                }
                var controle = 0;
                if(removerAcentos(dados[i].titulo).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(removerAcentos(dados[i].area).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(removerAcentos(dados[i].area_swebok).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                }else if(removerAcentos(dados[i].dados).toLowerCase().search(termoFinal) != -1){
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

function removerAcentos( newStringComAcento ) {
  var string = newStringComAcento;
	var mapaAcentosHex 	= {
		a : /[\xE0-\xE6]/g,
        A : /[\xC0-\xC6]/g,
        e : /[\xE8-\xEB]/g,
        E : /[\xC8-\xCB]/g,
        i : /[\xEC-\xEF]/g,
        I : /[\xCC-\xCF]/g,
        o : /[\xF2-\xF6]/g,
        O : /[\xD2-\xD6]/g,
        u : /[\xF9-\xFC]/g,
        U : /[\xD9-\xDC]/g,
        c : /\xE7/g,
        C : /\xC7/g,
        n : /\xF1/g,
        N : /\xD1/g,
	};

	for ( var letra in mapaAcentosHex ) {
		var expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}