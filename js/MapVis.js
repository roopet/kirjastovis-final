// Copyright and made by Vividin Ltd. Also contributed by Rivermouth Ltd.
$(function () {
    Highcharts.setOptions({
     //   colors:['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8d4653', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
		colors:	['#7cb5ec', "#F3EA3C", "#369A22", "#981B39", "#02BADD", "#F537F3", "#FE8E20", "#AAB517", "#2D48AC", "#E4A8C5", "#E22590", "#5B6316", "#B424A7", "#5D3015", "#CF78F5", "#57306B", "#B07E1F", "#E67484", "#3D7EB2", "#15964C", "#8A4FDB", "#CFB14B", "#6BC45B", "#12701B", "#71AB0C", "#8E114D", "#F153F7"]
	});
});
var mapCHart

/* Returns MapVis */
var newMapVis = function() {
	
	var MapVis = {};
	MapVis.csvUrl = undefined;
	MapVis.data = [];
	MapVis.countryChartSettings = {
		chart: {
			spacingLeft: 0
		},
		credits: {
			enabled: false
		},
//		colors: ['#562F1E', '#AF7F24', '#263249', '#5F7F90', '#D9CDB6'],
		title: {
			text: null
		},
		subtitle: {
			text: null
		},
		xAxis: {
			tickPixelInterval: 50,
			crosshair: true
		},
		yAxis: {
			title: null,
			opposite: true
		},
		exporting: {
            	//	sourceWidth: 450,
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
		tooltip: {
			formatter: function (tooltip) {
                		var items = this.points || splat(this),
                   		series = items[0].series,
                    		s;

                		// sort the values
                		items.sort(function(a, b){
                    		return ((a.y < b.y) ? -1 : ((a.y > b.y) ? 1 : 0));
                		});
                		items.reverse();

                		return tooltip.defaultFormatter.call(this, tooltip);
            		},
			shared: true
		},
		plotOptions: {
			series: {
				animation: {
					duration: 500
				},
				colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', 
   '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
				marker: {
					enabled: false
				},
				threshold: 0,
				pointStart: null
			}
		}
	};
        

        
	MapVis.mapChartSettings = {
		title : {
			text : 'Kokoelmat / Asukasluku',
			"fontSize": "13px"
		},


		subtitle: {
			text: subtitleValue,
                	floating: true,
                	style: {
                    	"fontSize": "14px",
                    	"color": (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                	}
		},
		
		exporting: {
            		sourceWidth: 450,
            		sourceHeight: 600,
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
			},
			title : {
			text : 'Kokoelmat / Asukasluku - ' + subtitleValue,
			"fontSize": "11px"
		}
			}
        	},

		mapNavigation: {
			enabled: true,
			buttonOptions: {
				verticalAlign: 'bottom'
			}
		},

		legend: {
			title: {
				text: 'Kokoelmat / Asukasluku',
				style: {
					color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
				}
			},
			align: 'left',
			verticalAlign: 'middle',
			y: 10,
			floating: true,
			layout: 'horizontal',
			valueDecimals: 0,
			symbolRadius: 0,
			symbolHeight: 14
		},

		colorAxis: {
			max: 30
		},

		tooltip: {
			formatter: function () {
				return '<b>Kunta: ' + this.point.id + '</b><br>' +
				'Lainauksia per asukas: ' + this.point.value + '<br> <br>' + 'Klikkaa nähdäksesi kehitys';
			}
		},
		
		credits: {
			enabled: false
		},

		series : [
			{
				name: 'Kunnat',
				data : MapVis.data,
				mapData: mapBase,
				joinBy: ['id', 'code3'],
				allowPointSelect: true,
				cursor: 'pointer',
				states: {
					select: {
						color: '#a4edba',
						borderColor: 'black',
						dashStyle: 'shortdot'
					}
				}
			}, {
				name: 'Maakunnat',
				type: 'mapline',
				data : MapVis.data,
				mapData: Highcharts.maps.maakunnat,
				joinBy: ['id', 'code3'],
				lineWidth: 2,
				allowPointSelect: 'true',		
				cursor: 'pointer',
				states: {
					select: {
						color: '#a4edba',
						borderColor: 'black',
						dashStyle: 'shortdot'
					}
				} 
				//		]
		/*	}, {
				name: 'Suomi',
				type: 'mapline',
			//	data : MapVis.data,
			//	mapData: Highcharts.maps.suomi,
				joinBy: ['nimi', 'code3'],
			//	name: 'Kokoelmat / Asukasluku',
				lineWidth: 3,
				allowPointSelect: true,		
				cursor: 'pointer',
				states: {
					select: {
						color: '#a4edba',
						borderColor: 'red',
						dashStyle: 'shortdot'
					} 
				} */
				//		]
			}
		]
	};
	


	MapVis.start = function (onReadyCallback) {
		$.get(MapVis.csvUrl, function (csv) {

			// Case-specific CSV string splitting
			function CSVtoArray(text) {
				text = text
					.substring(1, text.length - 2)
					.replace(/^"/, '')
					.replace(/",$/, '')
				//	.replace(/"0"/, null)
					.split('","');
				return text;
			}

			csv = csv.split(/\n/);

			var countries = {},
			//	mapChart,
				countryChart,
				numRegex = /^[0-9\.]+$/,
				quoteRegex = /\""/g;
			
			MapVis.categories = CSVtoArray(csv[0]).slice(2, 17);

			// Parse the CSV into arrays, one array each kunta
			$.each(csv.slice(1), function (j, line) {
				var row = CSVtoArray(line),
					data = row.slice(2, 17);

				$.each(data, function (i, val) {

					val = val.replace(quoteRegex, '');
					if (numRegex.test(val)) {
						val = parseFloat(val);
					} else if (!val) {
						val = null;
					}
					data[i] = val;
				});
				countries[row[1]] = {
					name: row[0],
				//	koodi: row[2],
					code3: row[1],
					data: data
				};
			});
			
			updateData = function () {
				MapVis.data = [];
				MapVis.dataTopLevel = [];
				for (var code3 in countries) {
					var value = null,
					//    year,
						itemData = countries[code3].data,
					//	i = itemData.length;
						i = yearValue;

					while (i--) {
						if (typeof itemData[i] === 'number') {
							value = itemData[i];
					//        year = categories[i];
							break;
						}
					}
					
					var dat = {
						name: countries[code3].name,
						code3: code3,
						value: value
					};
					
					if (countries[code3].name.toLowerCase() == "maakunta") {
						MapVis.dataTopLevel.push(dat);
					}
					MapVis.data.push(dat);
				}
			
				if (onReadyCallback) onReadyCallback();
			};


			// Wrap point.select to get to the total selected pointz
			Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

				proceed.apply(this, Array.prototype.slice.call(arguments, 1));

				var points = mapChart.getSelectedPoints();
				
				if (points.length) {

					if (!countryChart) {
						MapVis.countryChartSettings.plotOptions.series.pointStart = parseInt(MapVis.categories[0]);
						countryChart = $('#info').highcharts(MapVis.countryChartSettings).highcharts();
					}
					
					$.each(points, function (i, i2) {
						var seriesParams = {
							name: countries[this.code3].name,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'line'
						};
						var seriesParamsx = {
							name: countries[this.code3].code3,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'line'
						};
						// Update
						if (countryChart.series[i]) {
							countryChart.series[i].update(seriesParamsx, false);
						} else {
							countryChart.addSeries(seriesParamsx, false);
						}
				
						if (countryChart.series[i2]) {
							countryChart.series[i].update(seriesParams, false);
						} else {
							countryChart.addSeries(seriesParams, false);
					
						}
						console.log(this.id);
					//	console.log(points.i);
					//	$("#e10_2").select2("val", "Kolari");
					//	$("#e10_2").select2("data", [{id: countries[this.code3].code3, text: countries[this.code3].code3}]);
						$("#e10_2").select2("data", [{id: this.id, text: this.id}]);
					//	$("#e10_2").select2("val", countries[this.code3].code3);
					//	$("#e10_2").val(countries[this.code3].code3).trigger("change");

				//	$("#e8_2_set2").click(function () { $("#e8_2").select2("data", [{id: "CA", text: "California"},{id:"MA", text: "Massachusetts"}]); });
						
					});
					while (countryChart.series.length > points.length) {
						countryChart.series[countryChart.series.length - 1].remove(false);
					}
					countryChart.redraw();

				} else {
					if (countryChart) {
						mapChart.get("Koko maa").select();
				//		mapChart.get("suomi").select(true, true);

					}
				}
				

			
			});
			
			updateData();
			
			MapVis.mapChartSettings.series[0].data = MapVis.data;

			// Initiate the map chart
			mapChart = $('#map-container').highcharts('Map', MapVis.mapChartSettings).highcharts();
			console.log(mapChart);

			// Pre-select area
			mapChart.get("Koko maa").select();

			
			sliderUpdate = function () {
				updateData();
				mapChart.setTitle(null, {text: subtitleValue});
				$('#map-container').highcharts().series[0].setData(MapVis.data);
			};

			updateMap = function () {
				var map = $('#map-container');
				map.highcharts().series[0].update({
                		mapData: mapBase
            		});
			};
			
		/*	fullScreenall = function () {
			requestFullScreen(elem);
			$('.needreflow').each(function() { $(this).highcharts().reflow(); });
			$("#info").highcharts().setSize(width, 600);
			}; */

		});
	};
	
	return MapVis;  
};

var mapBase = Highcharts.maps.kirjastot1a;


$("input[type='radio']").bind( "change", function(event, ui) {
  var vals = $(this).val() || [];
      console.log(vals);
      if (vals === "choice-1") {
      mapBase = Highcharts.maps.kirjastot1a;
      } else {
      mapBase = Highcharts.maps.maakunnat;
      }
      updateMap();
      
});

var yearValue;
var subtitleValue;

$("[data-slider]")
    .each(function () {
      var input = $(this);
      $("<span>")
        .addClass("output")
        .insertAfter($(this));
    })
    .bind("slider:ready", function (event, sliderChange) {
      $(this)
        .nextAll(".output:first")
          .html(sliderChange.value.toFixed(0));
       yearValue = sliderChange.value.toFixed(0);
       subtitleValue = parseInt(yearValue) + 1998;
       $('#str').html(subtitleValue);
    })    
    .bind("slider:changed", function (event, sliderChange) {
      $(this)
        .nextAll(".output:first")
          .html(sliderChange.value.toFixed(0));
       yearValue = sliderChange.value.toFixed(0);
       subtitleValue = parseInt(yearValue) + 1998;
		var chart = $('#map-container').highcharts();
       $('#str').html(subtitleValue);
       chart.zoom();
		sliderUpdate();
       bcYear();
    });