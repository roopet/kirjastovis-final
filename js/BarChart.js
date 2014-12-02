// Copyright and made by Vividin Ltd. Also contributed by Rivermouth Ltd.
/* Returns new BarChart */
var newBarChart = function() {
	var BarChart = {};
	BarChart.name = 'Maakunnat';
	BarChart.data = [];
	BarChart.colors = [];
	BarChart.categories = [];
	BarChart.restrictedCategoryNames = ["Koko maa", "Maakunta"];
	BarChart.settings = {
		chart: {
			type: 'column'
		},
		title: {
			text: 'Kokoelmat / Asukasluku vuonna'
		},
		subtitle: {
	//		text: 'Klkikkaa nähdäksesi tiedot kunnittain. Uudelleen klikkamaalla paluu maakuntiin.'
		},
		xAxis: {
			categories: BarChart.categories,
			labels: {
                		rotation: -45
                	}
		},
		yAxis: {
		//	max: 32,
			title: {
				text: 'Kokonaislainaus / Asukasluku'
			}
		},
		plotOptions: {
			column: {
				cursor: 'pointer',
				point: {
					events: {
						click: function() {
							var drilldown = this.drilldown;
							if (drilldown) { // drill down
								BarChart.setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);					
							} else { // restore
								BarChart.setChart(BarChart.name, BarChart.categories, BarChart.data);
							}
						}
					}
				},
				dataLabels: {
					enabled: true,
					color: BarChart.colors[2],
					style: {
						fontWeight: 'bold',
						fontSize: '0.6vw'
					}
				} 
			}
		},
		tooltip: {
			formatter: function() {
				var point = this.point,
											s = this.x +':<b>'+ this.y +' lainausta per asukas</b><br/>';
				if (point.drilldown) {
						  s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
				} else {
					s += 'Klikkaa palataksesi maakuntiin';
				}
				return s;
			}
		},
		credits: {
		enabled: false
		},
		series: [{
			name: BarChart.name,
			data: BarChart.data,
			color: 'white'
		}],
		exporting: {
            		sourceWidth: 800,
            	//	sourceHeight: 600,
            		// scale: 2 (default)
            		chartOptions: {
                		subtitle: {
					text: 'Lähde: tilastot.kirjastot.fi',
            				align: 'center',
            				x: 0,
            				y: 35,
                			style: {
                    				"fontSize": "9px",
                    				"color": (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                				}
					}
					}
        	},
		drilldown: {
		//	series: BarChart.setChart,
			activeAxisLabelStyle: {
				textDecoration: 'none'
			//	fontStyle: 'italic'
			}
		}
	};

	BarChart.setChart = function(name, categories, data, color) {
		var chart = BarChart.chart;
		chart.xAxis[0].setCategories(categories, false);
		chart.series[0].remove(false);
		chart.addSeries({
			name: name,
			data: data,
			color: color || 'white'
		}, false);
		chart.redraw();
	};
	
	BarChart.getDataFromMapVis = function(mapVis) {
		var nodes = {};
		var colors = BarChart.colors;
		
		for (var i = 0, l = mapVis.dataTopLevel.length; i < l; ++i) {
			var dat = mapVis.dataTopLevel[i];
			var name = dat.code3;
			
			if (!nodes.hasOwnProperty(name)) {
				nodes[name] = {
					y: dat.value,
					color: colors[3],
					drilldown: {
						name: name,
						categories: [],
						data: [],
						color: colors[0]
					}
				};
			}
		}
		
		for (var i = 0, l = mapVis.data.length; i < l; ++i) {
			var dat = mapVis.data[i];
			if (!nodes.hasOwnProperty(dat.name)) { continue; }
			
			var node = nodes[dat.name];
			
			// Add node's data in order
			var added = false;
			for (var j = 0, jl = node.drilldown.data.length; j < jl; ++j) {
				if (dat.value < node.drilldown.data[j]) {
					node.drilldown.data = 
						node.drilldown.data.splice(0, j, dat.value).concat(node.drilldown.data);
					node.drilldown.categories = 
						node.drilldown.categories.splice(0, j, dat.code3).concat(node.drilldown.categories);
					added = true;
					break;
				}
			}
			if (!added) {			
				node.drilldown.categories.push(dat.code3);
				node.drilldown.data.push(dat.value);
			}
		}
		
		var data = [];
		for (var k in nodes) {
			var node = nodes[k];
			if (node.y != 0 && BarChart.restrictedCategoryNames.indexOf(k) < 0) {
				node.y = (Math.round(node.y*100) / 100);
				data.push(node);
			}
		}
		
		// Sort ASC
		data.sort(function(a, b) {
			return a.y - b.y;
		});
		
		BarChart.categories = [];
		for (var i = 0, l = data.length; i < l; ++i) {
			BarChart.categories.push(data[i].drilldown.name);
		}
		
		return data;
	};
	
	BarChart.start = function () {
		var colors = BarChart.colors,
			categories = BarChart.categories,
			name = 'Maakunnat',
			data = BarChart.data;
		
		BarChart.settings.xAxis.categories = BarChart.categories;
		BarChart.settings.plotOptions.column.dataLabels.color = BarChart.colors[1];
		BarChart.settings.series = [{
			name: BarChart.name,
			data: BarChart.data,
			color: 'white'
		}];

		BarChart.chart = $('#bar-container').highcharts(BarChart.settings).highcharts(); // return chart
	};
	
	bcYear = function () {				
			BarChart.chart.setTitle(null, {text: subtitleValue});
			};
	
	
	
	return BarChart;
};