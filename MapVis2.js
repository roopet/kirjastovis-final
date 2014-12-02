$(function () {
    Highcharts.setOptions({
        colors:['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8d4653', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
    });
});

/* Returns MapVis */
var newMapVis = function() {
	
	var MapVis = {}
	MapVis.csvUrl = undefined;
	MapVis.csvUrl2 = undefined;
	MapVis.data = [];
	MapVis.datax = [];
	mapdatatest = [];
//	testiarvox = 8;
	MapVis.countryChartSettings = {
		chart: {
		//	height: 350,
			height: kCharth,
			spacingLeft: 0
		},
		credits: {
			enabled: false
		},
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
			//	title : {
			//		text : 'Kokoelmat / Asukasluku - ' + testiarvoy,
			//		"fontSize": "11px"
			//		}
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
		//	pointFormat: '<span style="color:{series.color}">{series.name}</span> : <b>{point.y}</b><br/>'
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
				pointStart: null,
        		}
		},
		series: [{
           //     name: 'All visits',
                data: MapVis.data,
                lineWidth: 4,
                marker: {
                    radius: 4
                }
            }, {
          //      name: 'New visitors',
                data: MapVis.datax
            }]
	};
        

        
	MapVis.mapChartSettings = {
		title : {
			text : 'Kokoelmat / Asukasluku',
			"fontSize": "13px"
		},

		subtitle: {
			text: testiarvoy,
                //	y: 250,
                //	y: stitleheight,
                //	x: -140,
                //	x: stitlewidth,
                	floating: true,
                	style: {
                    	"fontSize": "14px",
                    	"color": (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                	},
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
                	},
			},
			title : {
			text : 'Kokoelmat / Asukasluku - ' + testiarvoy,
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
		//	backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)',
			symbolRadius: 0,
			symbolHeight: 14
		},

		colorAxis: {
			max: 30,
		},

		tooltip: {
			formatter: function () {
				return '<b>Kunta: ' + this.point.nimi + '</b><br>' +
				'Lainauksia per asukas: ' + this.point.value + '<br> <br>' + 'Klikkaa nähdäksesi kehitys';
	//               'Lainauksia per asukas: ' + Highcharts.numberFormat(this.y, 1) ;
			}
	//             footerFormat: '<span style="font-size: 10px">Klikkaa nähdäkseksi kehitys</span>'
		},
		
		credits: {
			enabled: false
		},

		series : [
			{
				name: 'Kunnat',
				data : MapVis.data,
			//	mapData: Highcharts.maps.kirjastotiso2,
			//	mapData: Highcharts.maps.kirjastot1a,
			//	mapData: Highcharts.maps.maakunnat,
				mapData: searchtesti,
				joinBy: ['nimi', 'code3'],
			//	joinBy: ['name', 'koodi'],
			//	name: 'Kokoelmat / Asukasluku',
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
			//	data : MapVis.data,
				mapData: Highcharts.maps.maakunnat,
				joinBy: ['nimi', 'code3'],
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
		  $.get(MapVis.csvUrl2, function(csv2) {

			// Very simple and case-specific CSV string splitting
			function CSVtoArray(text) {
				text = text
					.substring(1, text.length - 2)
					.replace(/^"/, '')
					.replace(/",$/, '')
					.split('","');
				return text;
				
			};

			csv = csv.split(/\n/);
			csv2 = csv2.split(/\n/);

			var countries = {},
				mapChart,
				countryChart,
			//	numRegex = /^[0-9\.]+$/,
				numRegex = /^[0-9\.]+$/,
				quoteRegex = /\""/g;
			
			MapVis.categories = CSVtoArray(csv[0]).slice(2, 17);
			MapVis.categories2 = CSVtoArray(csv2[0]).slice(2, 17);

			// Parse the CSV into arrays, one array each kunta
			$.each(csv.slice(1), function (j, line) {
				var row = CSVtoArray(line),
				//	data = row.slice(2, 17);
					data = row.slice(2, 17);
					datax = row.slice(18, 30);

				$.each(data, function (i, val) {

					val = val.replace(quoteRegex, '');
		   //         val = val;
					if (numRegex.test(val)) {
			//            val = parseInt(val);
						val = parseFloat(val);
					} else if (!val) {
						val = null;
					}
					data[i] = val;
				});
				$.each(datax, function (i, val) {

					val = val.replace(quoteRegex, '');
		   //         val = val;
					if (numRegex.test(val)) {
			//            val = parseInt(val);
						valx = parseFloat(val);
					} else if (!val) {
						valx = null;
					}
					datax[i] = val;
				}); 
				countries[row[1]] = {
					name: row[0],
				//	koodi: row[2],
					code3: row[1],
					data: data,
					datax: datax
				};
			}); 
			
			updateData = function () {
				MapVis.data = [];
			//	console.log(MapVis.csvUrl2);
				MapVis.dataTopLevel = [];
				for (var code3 in countries) {
					var value = null,
					//    year,
						itemData = countries[code3].data,
					//	i = itemData.length;
						i = testiarvox;

					while (i--) {
						if (typeof itemData[i] === 'number') {
							value = itemData[i];
					//        year = categories[i];
							break;
						}
					}
					
					var dat = {
						name: countries[code3].name,
					//	name: countries[koodi].name,
					//	koodi: koodi,
						code3: code3,
						value: value,
				  //      year: year
					};
					
					if (countries[code3].name.toLowerCase() == "maakunta") {
						MapVis.dataTopLevel.push(dat);
					}
					MapVis.data.push(dat);
				}
			
				if (onReadyCallback) onReadyCallback();
			};
			
			// Add lower case codes to the data set for inclusion in the tooltip.pointFormat
	  //      var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);
	  //      var mapData = Highcharts.geojson(Highcharts.maps['countries/fi/fi-all']);
	  //      var mapData = Highcharts.geojson(Highcharts.maps['kirjastot1']);
	  //      $.each(mapData, function () {
	  //          this.id = this.properties['hc-key']; // for Chart.get()
	  //          this.id = this.name; // for Chart.get()
	  //          this.flag = this.id.replace('UK', 'GB').toLowerCase();
	  //      });

			// Wrap point.select to get to the total selected pointz
	//	 newCountryChart = function() {
			Highcharts.wrap(Highcharts.Point.prototype, 'select', function (proceed) {

				proceed.apply(this, Array.prototype.slice.call(arguments, 1));

				var points = mapChart.getSelectedPoints();
				
				if (points.length) {

					if (!countryChart) {
						MapVis.countryChartSettings.plotOptions.series.pointStart = parseInt(MapVis.categories[0]);
						countryChart = $('#info').highcharts(MapVis.countryChartSettings).highcharts();
					}
					
					$.each(points, function (i, i2) {
						var seriesParams = [{
						//	name: this.nimi,
							name: countries[this.code3].name,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'area'
							}, {
            					//	name: this.nimi,
							name: countries[this.code3].name,
							data: countries[this.code3].datax,
							type: points.length > 1 ? 'line' : 'area'
        					}]
						var seriesParamsx = {
							name: countries[this.code3].code3,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'area'
						};
				//		console.log(seriesParams, seriesParamsx);
						// Update
						if (countryChart.series[i]) {
							countryChart.series[i].update(seriesParamsx, false);
						} else {
							countryChart.addSeries(seriesParamsx, false);
						}
						
				//		console.log(this.nimi, countries[this.code3].data);
				
						if (countryChart.series[i2]) {					
							countryChart.series[i2].update(seriesParams, false);
						} else {
							countryChart.addSeries(seriesParams, false);
						}
						console.log(this.nimi, countries[this.code3].data);
					
				/*	$.each(points, function (i, i2) {
						var seriesParams = {
						//	name: this.nimi,
							name: countries[this.code3].name,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'area'
						};
						var seriesParamsx = {
							name: countries[this.code3].code3,
							data: countries[this.code3].data,
							type: points.length > 1 ? 'line' : 'area'
						};
				//		console.log(seriesParams, seriesParamsx);
						// Update
						if (countryChart.series[i]) {
							countryChart.series[i].update(seriesParamsx, false);
						} else {
							countryChart.addSeries(seriesParamsx, false);
						}
						
				//		console.log(this.nimi, countries[this.code3].data);
				
						if (countryChart.series[i2]) {					
							countryChart.series[i].update(seriesParams, false);
						} else {
							countryChart.addSeries(seriesParams, false);
						}
						console.log(this.nimi, countries[this.code3].data); */
						
					});
					while (countryChart.series.length > points.length) {
						countryChart.series[countryChart.series.length - 1].remove(false);
					}
					countryChart.redraw();

				} else {
			//		$('#info #flag').attr('class', '');
			//		$('#info h2').html('');
			//		$('#info .subheader').html('');
					if (countryChart) {
						countryChart = countryChart.destroy();
					}
				}
				

			
			});
		//	};
		//	return newCountryChart();
			
			updateData();
			
			MapVis.mapChartSettings.series[0].data = MapVis.data;

			// Initiate the map chart
			mapChart = $('#map-container').highcharts('Map', MapVis.mapChartSettings).highcharts();
			console.log(mapChart);

			// Pre-select a country
			mapChart.get("suomi").select();
			
			Testi2 = function () {
				updateData();
				mapChart.setTitle(null, {text: testiarvoy});
			//	BarChart.setTitle(null, {text: testiarvoy});
				$('#map-container').highcharts().series[0].setData(MapVis.data);
			};
			
			updateMap = function () {
			$('#map-container').highcharts().series[0].update({
                		mapData: searchtesti
            		});	
		
			};
			
			fullScreenall = function () {
			requestFullScreen(elem);
			$('.needreflow').each(function() { $(this).highcharts().reflow(); });
			$("#info").highcharts().setSize(width, 600);
		//	$('#map-container').highcharts().reflow();
		//	$('#info').highcharts(MapVis.countryChartSettings).highcharts.reflow();
		//	$('#country-chart').highcharts().reflow();
		//	$('#highcharts-5').highcharts().reflow();
		//	countryChart.reflow();
		//	$('#bar-container').highcharts().reflow();
			};
			
		/*	function(mapChart){
    var setHeight = function() {
        mapChart.setSize(mapChart.chartWidth, $(window).height() - 20);
    }
    
    $(window).resize(setHeight);
       
    setHeight();
});
			*/
		});
		});
	};
	
	return MapVis;  
};

var wheight = $( window ).height();
var wwidth = $( window ).width();
var stitleheight = wheight / 3 - 10;
var stitlewidth = wwidth * 0.000001 - wwidth * 0.1;
var kCharth = wheight * 0.48;
//var stitlewidth = 10 //wwidth / 200;
//alert(stitleheight);

var searchtesti = Highcharts.maps.kirjastot1a;  
//var searchtesti = [];

$('#button100').click(function() {
  //      Testi2();
        alert(searchtesti);
    });	
    
function myFunction() {
    $("input[type='radio']:first").attr("checked",true).checkboxradio("refresh");
};



$("input[type='radio']").bind( "change", function(event, ui) {
  var vals = $(this).val() || [];
      console.log(vals);
//      searchtesti = vals;
      if (vals === "choice-1") {
      searchtesti = Highcharts.maps.kirjastot1a;
      } else {
      searchtesti = Highcharts.maps.maakunnat;
      }
//      alert(searchtesti)
      updateMap();
//	newMapVis();
//	MapVis.start();
      
      
});


		

//$("[data-slider]").simpleSlider("setValue", "10")
//$(function() {
$("[data-slider]")
    .each(function () {
      var input = $(this);
      $("<span>")
        .addClass("output")
        .insertAfter($(this));
    })    
    .bind("slider:ready", function (event, testiarvo) {
      $(this)
        .nextAll(".output:first")
          .html(testiarvo.value.toFixed(0));
       testiarvox = testiarvo.value.toFixed(0);
       testiarvoy = parseInt(testiarvox) + 1998;
       $('#str').html(testiarvoy);
    })    
    .bind("slider:changed", function (event, testiarvo) {
      $(this)
        .nextAll(".output:first")
          .html(testiarvo.value.toFixed(0));
       testiarvox = testiarvo.value.toFixed(0);
       testiarvoy = parseInt(testiarvox) + 1998;
       $('#str').html(testiarvoy);
       Testi2();
       bcYear();
    });