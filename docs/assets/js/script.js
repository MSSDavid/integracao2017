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
        var busca = $("#busca").val();
        window.location.href = "pesquisar.html?termo="+busca;
    }
}