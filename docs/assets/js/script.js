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
                "<li><a href='ppc-completo.html'>PPC Completo</a></li>" +
              "</ul>" +
            "</div>" +
          "</div>" +
        "</nav>";
    $wrapper.insertAdjacentHTML('beforeend', HTMLNovo);
}

$(".visao-swebok").on("click", function(){
  areas = ["Area 123", "Area 456", "Area 678", "Area 8910", "Area 111213", "Area 141516", "Area 171819", "Area 202122"];
  roda = $(".wheel").find("li");
  for(i = 0; i < roda.length; i++){
    $(".wheel").find("li").find("input").eq(i).attr("data-area", (i + 11));
    $(".wheel").find("li").find("input").eq(i).attr("placeholder", areas[i]);
  }
  $(".artigo").slideUp();
  $("#artigo-swebok").slideDown();
});

$(".visao-padrao").on("click", function(){
  areas = ["Area ABC", "Area DCE", "Area FGH", "Area IJK", "Area LMN", "Area OPQ", "Area RST", "Area UVX"];
  roda = $(".wheel").find("li");
  for(i = 0; i < roda.length; i++){
    $(".wheel").find("li").find("input").eq(i).attr("data-area", (i + 1));
    $(".wheel").find("li").find("input").eq(i).attr("placeholder", areas[i]);
  }
  $(".artigo").slideUp();
  $("#artigo-principal").slideDown();
});

function redirecionar(){
    if (event.keyCode == 13){
        var busca = encodeURI(removerAcentos($("#busca").val()));
        window.location.href = "pesquisar.html?termo="+busca;
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