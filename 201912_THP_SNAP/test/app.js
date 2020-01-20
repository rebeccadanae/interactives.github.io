var zipData = [
                 { year: "2009", values:
                                              [
                                                {geo_level:'National', grpValue:.726696},
                                                {geo_level:'State', grpValue:1},
                                                {geo_level:'County', grpValue:1}
                                              ]
                 },
                 { year: "2017", values:
                                              [
                                                {geo_level:'National', grpValue:.227346},
                                                {geo_level:'State', grpValue:1},
                                                {geo_level:'County', grpValue:1}
                                              ]
                 }
                  ];


                  var margin = {top: 60, right: 60, bottom: 100, left: 100},
                    width = 400 - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;



    var x0  = d3.scaleBand().rangeRound([0, width], .5).padding(0.25);
    var x1  = d3.scaleBand().padding(0.05);
    var y   = d3.scaleLinear().rangeRound([0, height]);

    var xAxis = d3.axisTop().scale(x0)

    var yAxis = d3.axisLeft().scale(y);

    var color = d3.scaleOrdinal()
                  .range(["#053769","#65a4e5","#ff5e1a"]);

    var svg = d3.select('body').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var categoriesNames = zipData.map(function(d) { return d.year; });
    var rateNames       = zipData[0].values.map(function(d) { return d.geo_level; });

    x0.domain(categoriesNames);
    x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(zipData, function(year) { return d3.max(year.values, function(d) { return d.grpValue; }); })]);

    svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);


    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)


    var slice = svg.selectAll(".slice")
      .data(zipData)
      .enter().append("g")
      .attr("class", "g")
      .attr("transform",function(d) { return "translate(" + x0(d.year) + ",0)"; });

      slice.selectAll("rect")
      .data(function(d) { return d.values; })
        .enter().append("rect")
            .attr("width", x1.bandwidth())
            .attr("x", function(d) { return x1(d.geo_level); })
             .style("fill", function(d) { return color(d.geo_level) })
             .attr("y", 0)
             .attr("height", function(d) { return y(d.grpValue ); })
            .on("mouseover", function(d) {
                d3.select(this).style("fill", d3.rgb(color(d.geo_level)).darker(2));
            })
            .on("mouseout", function(d) {
                d3.select(this).style("fill", color(d.geo_level));
            });
