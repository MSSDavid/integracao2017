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
        		
        // Insert first line of text into middle of donut pie chart 2
        donut2.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insert second line of text into middle of donut pie chart 2
        donut2.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
        		
        // Insert first line of text into middle of donut pie chart 3
        donut3.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insert second line of text into middle of donut pie chart 3
        donut3.insert("text", "g")
            .text("de Software")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", ".85em")
        		.style("fill", "#000");
        		
        // Insert first line of text into middle of donut pie chart 4
        donut4.insert("text", "g")
            .text("Engenharia")
            .attr("class", "middle")
            .attr("text-anchor", "middle")
        		.attr("dy", "-.55em")
        		.style("fill", "#000");
        // Insert second line of text into middle of donut pie chart 4
        donut4.insert("text", "g")
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
    .call(centerText());
    
  d3.select("#donut-chart2 svg")
    .datum(seedData())
    .transition().duration(400)
    .call(donutChart)
    .call(centerText());
    

  d3.select("#donut-chart3 svg")
    .datum(seedData())
    .transition().duration(300)
    .call(donutChart)
    .call(centerText());
    
  d3.select("#donut-chart4 svg")
    .datum(seedData())
    .transition().duration(350)
    .call(donutChart)
    .call(centerText());
    
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
       $("#svg").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg2").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg3").find("path").eq(i).attr("id", "slice"+i+"");
       $("#svg4").find("path").eq(i).attr("id", "slice"+i+"");
    }
    $("path").on("click", function (){
      $(".artigo").show();
      $(".bg-fundo-preto").show();
      $("#id-"+$(this).attr("id")).show();
    });
});