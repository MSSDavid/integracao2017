//Insere a tag NAV no html, na classe selecionada
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
                "<input type='text' name='busca' class='form-control' onkeydown='redirecionar()' id='busca' placeholder='Pesquisar...'>" + 
              "</div>" + 
              "<ul class='nav navbar-nav navbar-right'>" + 
                "<li><a href='ppc-completo.html'>PPC Completo</a></li>" + 
              "</ul>" + 
            "</div><!-- /.navbar-collapse -->" + 
          "</div><!-- /.container-fluid -->" + 
        "</nav>";
    $wrapper.insertAdjacentHTML('beforeend', HTMLNovo);
}

//Muda da visão Padrão para Visão do Swebok
$(".visao-swebok").on("click", function(){
  //Esconde o donut
  $(".donut").hide('slow');
  //Mostra as tiles
  $(".tiles-box").show('slow');
  //Some o artigo inicial
  $(".artigo").slideUp();
  //Muda a cor dos botões
  $(".visao-swebok").addClass("botao-visao-apertado");
  $(".visao-padrao").removeClass("botao-visao-apertado");
});

//Muda da visão do Swebok para Visão Padrão
$(".visao-padrao").on("click", function(){
  //Esconde as tiles
  $(".tiles-box").hide('slow');
  //Mostra o donut
  $(".donut").show('slow');
  //Mostra o artigo inicial
  $(".artigo").slideUp();
  $("#artigo-principal").slideDown();
  //Muda a cor dos botões
  $(".visao-swebok").removeClass("botao-visao-apertado");
  $(".visao-padrao").addClass("botao-visao-apertado");
});


//Mostra o artigo referente a Tile clicada (visão Swebok)
$(".tiles").on("click", function(){
    var area = $(this).attr('data-area');
    $(".bg-fundo-preto").show();
    $("#"+area).show();
    $("#"+area).find(".artigo").show();
});

//Fecha um artigo aberto pelo botão X
$(".botao-fechar").on("click", function(){
    $(".msg-flutuante").hide();
    $(".bg-fundo-preto").hide();
});

//Fecha um artigo aberto clicando fora dele (na parte escura)
$(document).mouseup(function(e) 
{
    var container = $(".msg-flutuante");
    var container2 = $(".bg-fundo-preto");

    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
        container2.hide();
    }
});

//Fecha um artigo aberto clicando no botão "Esc" do teclado
$(function() {
    $(document).keyup(function(e) {
     if (e.keyCode == 27) {
        $(".msg-flutuante").hide();
        $(".bg-fundo-preto").hide();
      }
    });
})

//Redireciona para a página de pesquisa quando apertado enter dentro do input de pesquisa (#busca)
function redirecionar(){
    if (event.keyCode == 13){
        var busca = encodeURI(removerAcentos($("#busca").val()));
        window.location.href = "pesquisar.html?termo="+busca;
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