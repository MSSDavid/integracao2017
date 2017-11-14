//Função obtida através do CodePen(https://codepen.io)
//Autor: Meredith (https://codepen.io/MeredithU)
//Link: https://codepen.io/MeredithU/pen/LVVoNE
//A função abaixo cria o Donut (roda interativa) na tela
nv.addGraph(function() {
  var donutChart = nv.models.pieChart()
  		.x(function(d) {
        return d.label
      })
  		.y(function(d) {
        return d.value
      })
  		.showLabels(true)
  		.showLegend(false)
  		.labelThreshold(.05)
  		.labelType("key")
  		.color(["#965251", "#00b3ca", "#7dd0b6", "#e38690", "#ead98b", "#ccc", "#012302"])
  		.tooltipContent(
        function(key, y, e, graph) { return 'Custom tooltip string' }
      ) // This is for when I turn on tooltips
  		.tooltips(false)
  		.donut(true)
  		.donutRatio(0.30);
  
  	// Insere o texto no meio do donut
  	function centerText() {
			return function() {
        var svg = d3.select("svg");
        var svg2 = d3.select("#svg2");
        var svg3 = d3.select("#svg3");
        var svg4 = d3.select("#svg4");
    		var donut = svg.selectAll("g.nv-slice").filter(
          function (d, i) {
            return i == 0;
          }
        );
        var donut2 = svg2.selectAll("g.nv-slice").filter(
          function (d, i) {
            return i == 0;
          }
        );
        var donut3 = svg3.selectAll("g.nv-slice").filter(
          function (d, i) {
            return i == 0;
          }
        );
        var donut4 = svg4.selectAll("g.nv-slice").filter(
          function (d, i) {
            return i == 0;
          }
        );
        
        // Insere a primeira linha do donut maior
        donut.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insere a segunda linha do donut maior
        donut.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
        		
        // Insere a primeira linha do segundo donut maior
        donut2.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insere a segunda linha do segundo donut maior
        donut2.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
        		
        // Insere a primeira linha do terceiro donut maior
        donut3.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insere a segunda linha do terceiro donut maior
        donut3.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
        		
        // Insere a primeira linha do quarto donut maior
        donut4.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insere a segunda linha do quarto donut maior
        donut4.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
      }
    }
  
  // Insere o donut maior na tela
  d3.select("#donut-chart svg")
    .datum(seedData())
    .transition().duration(500)
    .call(donutChart)
    .call(centerText());
  
  // Insere o segundo donut maior na tela
  d3.select("#donut-chart2 svg")
    .datum(seedData())
    .transition().duration(400)
    .call(donutChart)
    .call(centerText());
    
  // Insere o terceiro donut maior na tela
  d3.select("#donut-chart3 svg")
    .datum(seedData())
    .transition().duration(300)
    .call(donutChart)
    .call(centerText());
  
  // Insere o quarto donut maior na tela
  d3.select("#donut-chart4 svg")
    .datum(seedData())
    .transition().duration(350)
    .call(donutChart)
    .call(centerText());
  
  return donutChart;
});


// Dados que irão povoar o donut
function seedData() {
  return [
    {
      "label": "Perfil do Bacharel",
      "value": 14.28571
    },
    {
      "label": "TCC - Estágio - Pesquisa",
      "value": 14.28571
    },
    {
      "label": "Equivalências",
      "value": 14.28571
    },
    {
      "label": "Bibliografia",
      "value": 14.28571
    },
    {
      "label": "Requisitos Legais",
      "value": 14.28571
    },
    {
      "label": "Matérias",
      "value": 14.28571
    },
    {
      "label": "Apresentação do Curso",
      "value": 14.28571
    }
  ];
}

//A função abaixo insere ID's nos elementos do Donut e mostra o artigo do elemento quando clicado
$(function(){
    //Insere os IDs nos donuts
    var slicespie = $("path");
    for(i = 0; i < slicespie.length; i++){
       $("#svg").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg2").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg3").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg4").find("path").eq(i).attr("id", "slice"+i+"");
    }
    //Abre o artigo quando um elemnto do donut é apertado
    $("path").on("click", function (){
      $(".artigo").show();
      $(".bg-fundo-preto").show();
      $("#id-"+$(this).attr("id")).show();
    });
});