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
              "<form class='navbar-form navbar-right'>" +
                "<input type='text' class='form-control' placeholder='Pesquisar...'>" +
              "</form>" +
              "<ul class='nav navbar-nav navbar-right'>" +
                "<li><a href='#'>Wiki</a></li>" +
              "</ul>" +
            "</div>" +
          "</div>" +
        "</nav>";
    $wrapper.insertAdjacentHTML('beforeend', HTMLNovo);
}


$('.area').on("click", function(){
  $('.artigo').slideUp();
  area = $(this).attr("data-area");
  $('#artigo-'+area).slideDown();
});