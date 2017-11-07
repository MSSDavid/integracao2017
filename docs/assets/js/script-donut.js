// Create the donut pie chart and insert it onto the page
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
  
  	// Insert text into the center of the donut
  	function centerText() {
			return function() {
        var svg = d3.select("svg");

    		var donut = svg.selectAll("g.nv-slice").filter(
          function (d, i) {
            return i == 0;
          }
        );
        
        // Insert first line of text into middle of donut pie chart
        donut.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insert second line of text into middle of donut pie chart
        donut.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
      }
    }
  
  // Put the donut pie chart together
  d3.select("#donut-chart svg")
    .datum(seedData())
    .transition().duration(500)
    .call(donutChart)
    .call(centerText())
    .call(pieSlice());
    
  return donutChart;
});


// Seed data to populate donut pie chart
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

$(function(){
    var slicespie = $("path");
    for(i = 0; i < slicespie.length; i++){
     $("svg").find("path").eq(i).attr("id", "slice"+i+"");
    }
    $("path").on("click", function (){
      $(".artigo").show();
      $(".bg-fundo-preto").show();
      $("#id-"+$(this).attr("id")).show();
    });
});
