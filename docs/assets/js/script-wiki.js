//Insere a tag NAV no html
function inserirTopo(classe){
    var $wrapper = document.querySelector('.'+classe),
    HTMLNovo = "<nav class='navbar navbar-default'>" + 
          "<div class='container-fluid'>" + 
            "<!-- Brand and toggle get grouped for better mobile display -->" + 
            "<div class='navbar-header'>" + 
              "<button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>" + 
                "<span class='sr-only'>Toggle navigation</span>" + 
                "<span class='icon-bar'></span>" + 
                "<span class='icon-bar'></span>" + 
                "<span class='icon-bar'></span>" + 
              "</button>" + 
              "<a class='navbar-brand' href='index.html' style='padding: 0'><img alt='Logo BES' src='assets/images/es-logo.png' style='height:34px;margin-left: 10px;margin-top: 8px'/></a>" + 
            "</div>" + 
            "<!-- Collect the nav links, forms, and other content for toggling -->" + 
            "<div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>" + 
              "<div class='navbar-form navbar-right'>" +
              "<label for='busca' style='display: none;'>Pesquisa</label>" +
                "<input type='text' class='form-control' onkeydown='redirecionar(event)' id='busca' placeholder='Pesquisar...'>" + 
              "</div>" + 
              "<ul class='nav navbar-nav navbar-right'>" + 
              "<li><a target='_blank' href='http://inf.ufg.br/sites/default/files/uploads/es/ppcESPrograd.pdf'>Documento PPC</a></li>";
        var query = location.search.slice(1);
        var partes = query.split('&');
        var data = {};
        partes.forEach(function (parte) {
            var chaveValor = parte.split('=');
            var chave = chaveValor[0];
            var valor = chaveValor[1];
            data[chave] = valor;
        });
        if ((data.hasOwnProperty("visao")) && (!!data.visao)){
            HTMLNovo = HTMLNovo + 
                "<li><a href='ppc-completo.html'>Visão Padrão</a></li>" +
                    "<li><a href='index.html'>Página Inicial</a></li>" +
                  "</ul>" +
                "</div>" +
              "</div>" +
            "</nav>";
        }else{
            HTMLNovo = HTMLNovo + 
                            "<li><a href='ppc-completo.html?visao=swebok'>Visão do Swebok ®</a></li>" +
                            "<li><a href='index.html'>Página Inicial</a></li>" +
                        "</ul>" +
                    "</div><!-- /.navbar-collapse -->" + 
                "</div><!-- /.container-fluid -->" + 
            "</nav>";
        }
    $wrapper.insertAdjacentHTML('beforeend', HTMLNovo);
}

//Ajusta o menu esquerdo quando a tela é recarregada
function ajustaMenu() {
    altura = parseInt($(window).height()) - 50;
    $(".menu").css("height", "auto");
}

//Insere o menu lateral na Wiki
function inserirMenu(){
    var $menu = document.querySelector('.row');
    //Insere o botão do menu Responsivo
    $menu.insertAdjacentHTML('afterbegin', "<button onclick='mostraMenu()' style='border: 0;padding: 0;width: 100%'><li id='menu-responsive'>MENU <img id='icon-down-menu' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaBAMAAABbZFH9AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnUExURf///////////////////////0dwTP///////////////////0dwTKQGtAMAAAANdFJOU24M4/4fxwCIwi1fUQBYMQZQAAAAjklEQVQYGZ3OsQkCQRCF4QFhOzgw18TsuBfYgRZgA67IIBqamdqDFiBYp+/NLLihOMFxP9/t7Jn3Y334/7XdtEWX4nZcLFu91m4HTIlnoNgJSJwBb6u7xD0w8vYBWPEkiVtc+PAg/dlceBWp6h3TU6eihBySTJgUFSjKIupUK2Lpqt4i8st85VM7v/N7fQD3PXedpR3ftwAAAABJRU5ErkJggg=='></li></button>");
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    //Verifica se na URL foi passado o termo Visão=Swebok
    if ((data.hasOwnProperty("visao")) && (!!data.visao)){
        //Pega os dados do Json
        $.getJSON("assets/data/dados.json", function(data) {
          //Guarda os dados dos tópicos em uma variável
          var dados = data.topicos;
          //Define as áreas do Swebok
          var areas = ["Requisitos de Software", "Design de Software", "Construção de Software", "Teste de Software", "Gerência de Engenharia de Software", "Processo de Engenharia de Software", "Qualidade de Software", "Prática em Engenharia de Software Profissional", "Economia em Engenharia de Software", "Fundamentos da Computação", "Fundamentos Matemáticos", "Fundamentos da Engenharia", "Específico do PPC"];
          var $menu = document.querySelector('.menu');
          //Insere os títulos das áreas no menu
          for(i = 0; i < areas.length; i++){
                var id = areas[i].replace( /\s/g, '' );
                $menu.insertAdjacentHTML('beforeend', "<li class='principal-area' id="+id+" data-area="+i+"><h2 class='titulo-area-principal'>"+areas[i]+"</h2></li>");
          }
          $menu.insertAdjacentHTML('beforeend', "</ul>");
          //Insere os tópicos dentro de cada área
          for(i = 0; i < dados.length; i++){
              var id = dados[i].area_swebok.replace( /\s/g, '' );
              var $area = document.querySelector('#'+id);
              $area.insertAdjacentHTML('beforeend', "<li class='topico' data-area="+i+"><a href="+dados[i].url+'.html?visao=Swebok'+">"+dados[i].titulo+"</a></li>");
          }
        });
    //Caso não for passado na URL a visão=Swebok
    }else{
        //Pega os dados do Json
        $.getJSON("assets/data/dados.json", function(data) {
          var dados = data.areas;
          var areas = [];
          var urls = [];
          //Pega as áreas dos tópicos e urls das áreas
          for (i = 0; i < dados.length; i++){
              if(areas.indexOf(dados[i].nome) == -1){
                  areas.push(dados[i].nome);
                  urls.push(dados[i].url);
              }
          }
          var $menu = document.querySelector('.menu');
          $menu.insertAdjacentHTML('beforeend', "<ul>");
          //Insere as áreas de cada tópico no menu
          for(i = 0; i < areas.length; i++){
              var id = areas[i].replace( /\s/g, '' );
              //Caso a área não tenha uma URL
              if(urls[i] != null){
                  $menu.insertAdjacentHTML('beforeend', "<li class='principal-area' id="+id+" data-area="+i+"><a class='link-titulo-area-principal' href="+urls[i]+'.html'+"><h2 class='titulo-area-principal'>"+areas[i]+"</h2></a></li>");
              //Caso a área tenha uma URL (insere o li com <a>)
              }else{
                  $menu.insertAdjacentHTML('beforeend', "<li class='principal-area' id="+id+" data-area="+i+"><h2 class='titulo-area-principal'>"+areas[i]+"</h2></li>");
              }
          }
          //Armazena os tópicos em uma variável
          var dados2 = data.topicos;
          $menu.insertAdjacentHTML('beforeend', "</ul>");
          //Insere os tópicos em cada área
          for(i = 0; i < dados2.length; i++){
              var id = dados2[i].area.replace( /\s/g, '' );
              var $area = document.querySelector('#'+id);
              $area.insertAdjacentHTML('beforeend', "<li class='topico' id="+id+" data-area="+i+"><a href="+dados2[i].url+'.html'+">"+dados2[i].titulo+"</a></li>");
          }
        });
    }
}

//Mostra o menu da wiki
function mostraMenu(){
    $(".menu").slideToggle();
}

//Redireciona para a página de pesquisa quando apertado enter dentro do input de pesquisa (#busca)
function redirecionar(event){
    var e = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (e == 13){
        var busca = encodeURI(removerAcentos($("#busca").val()));
        window.location.href = "pesquisar.html?termo="+busca;
    }
}

//Função de pesquisa no arquivo dados.json
function realizaPesquisa(){
    //Pega os dados enviados via GET na URL
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;
    });
    //verifica se a key é "Termo"
    if ((data.hasOwnProperty("termo")) && (!!data.termo)){
        var $conteudo = document.querySelector('.conteudo');
        data.termo = decodeURI(data.termo);
        //Pega a última letra do termo pesquisado
        var letraFinal = data.termo.charAt(data.termo.length-1);
        //Tratamento para palavras no plural
        //Caso a última letra for 's' é removido as últimas duas letras do termo pesquisado
        if(letraFinal == 's' || letraFinal == 'S'){
            var termoFinal = data.termo.substr(0,(data.termo.length - 2));
        }else{
            var termoFinal = data.termo;
        }
        //Passa o termo pesquisado para minúsculo
        termoFinal = termoFinal.toLowerCase();
        //Pega o JSON
         $.getJSON("assets/data/dados.json", function(data) {
            //Pega as áreas no JSON
            var dados2 = data.areas;
            //Laço insere as áreas que possuem URL nos resultados na pesquisa
            for(i = 0; i <dados2.length; i++){
                //Inicia variável de controle
                var controle = 0;
                if(dados2[i].url != null){
                    //Faz a pesquisa no nome da área
                    if(removerAcentos(dados2[i].nome).toLowerCase().search(termoFinal) != -1){
                        controle = 1;
                    }
                    //Faz a pesquisa nos dados da área
                    if(removerAcentos(dados2[i].dados).toLowerCase().search(termoFinal) != -1){
                        controle = 1;
                    }
                }
                //Caso a variável de controle seja setada 1 (dados compatíveis com o termo), é inserido no HTML o link para URL da área encontrada
                if(controle == 1){
                    $conteudo.insertAdjacentHTML('beforeend', '<li class="resultado-pesquisa"><a href='+ dados2[i].url +'.html'+'>'+
                    '<h3>' + dados2[i].nome + '</h1>'+
                    '<p> Tópico principal PPC</p>'+
                    '</li></a>'
                    );
                }
            }
            //Pega os tópicos no arquivo JSON
            var dados = data.topicos;
            //Laço que pesquisa nos tópicos do JSON
            for (i = 0; i < dados.length; i++){
                //Salva as palavras chaves do tópico em um array
                var chaves = dados[i].palavras_chaves;
                for (j = 0; j < chaves.length; j++){
                    chaves[j] = removerAcentos(chaves[j]).toLowerCase();
                }
                //Inicia variável de controle
                var controle = 0;
                //Pesquisa o termo digitado no título do tópico
                if(removerAcentos(dados[i].titulo).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                //Pesquisa o termo digitado na área do tópico
                }else if(removerAcentos(dados[i].area).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                //Pesquisa o termo digitado na área do Swebok do tópico
                }else if(removerAcentos(dados[i].area_swebok).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                //Pesquisa o termo digitado nos dados do tópico
                }else if(removerAcentos(dados[i].dados).toLowerCase().search(termoFinal) != -1){
                    controle = 1;
                //Pesquisa o termo digitado nas palavras chaves do tópico
                }else if(chaves.indexOf(termoFinal) != -1){
                    controle = 1;
                }
                
                //Caso a variável de controle seja setada 1 (dados compatíveis com o termo), é inserido no HTML o link para URL do tópico encontrado
                if(controle == 1){
                    $conteudo.insertAdjacentHTML('beforeend', '<li class="resultado-pesquisa "><a href='+ dados[i].url +'.html'+'>'+
                    '<h3>' + dados[i].titulo + '</h1>'+
                    '<p>Área: ' + dados[i].area + '</p>'+
                    '<p>Área Swebok: ' + dados[i].area_swebok + '</p>'+
                    '</li></a>'
                    );
                }
            }
            
        });
        $conteudo.insertAdjacentHTML('beforeend', "<h1>Resultados da pesquisa “" + data.termo +"”</h1>");
    //Caso não seja passado nada na URL irá aparecer "Nenhum termo pesquisado!"
    }else{
        var $conteudo = document.querySelector('.conteudo');
        $conteudo.insertAdjacentHTML('beforeend', '<h1>Nenhum termo pesquisado!</h1>');
    }
}


//Essa função remove acentos de uma string
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