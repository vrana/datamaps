var radius=480,splines=[],cluster=d3.layout.cluster().size([360,radius-120]).sort(null).value(function(e){return e.size}),bundle=d3.layout.bundle(),line=d3.svg.line.radial().interpolate("bundle").tension(.85).radius(function(e){return e.y}).angle(function(e){return e.x/180*Math.PI}),vis=d3.select("#chart").append("svg").attr("width",radius*2).attr("height",radius*2).append("g").attr("transform","translate("+radius+","+radius+")");d3.json("../data/flare-imports.json",function(e){var t=cluster.nodes(packages.root(e)),n=packages.imports(t);vis.selectAll("path.link").data(splines=bundle(n)).enter().append("path").attr("class","link").attr("d",line),vis.selectAll("g.node").data(t.filter(function(e){return!e.children})).enter().append("g").attr("class","node").attr("transform",function(e){return"rotate("+(e.x-90)+")translate("+e.y+")"}).append("text").attr("dy",".31em").attr("text-anchor",function(e){return e.x<180?"start":"end"}).attr("transform",function(e){return e.x<180?"translate(8)":"rotate(180)translate(-8)"}).text(function(e){return e.key})}),d3.select(window).on("mousemove",function(){vis.selectAll("path.link").data(splines).attr("d",line.tension(Math.min(1,d3.event.clientX/960)))})