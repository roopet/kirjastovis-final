// Copyright and made by Vividin Ltd. Also contributed by Rivermouth Ltd.
Highcharts.setOptions({
    lang: {
        decimalPoint: ',',
        thousandsSep: ' '
    }
});


$(function() {
	var path = location.hash.substring(1);
	var MapVis, BarChart;

	window.openView = function(newPath) {
		location.hash = newPath;
		location.reload();
	};

	window.addEventListener("hashchange", function() {
		openView(location.hash.substring(1));
	}, false);

	openLainauksetPa = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Kokonaislainaus / Asukasluku';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Kokonaislainaus / Asukasluku';
		BarChart.settings.series.name = 'Kokonaislainaus / Asukasluku';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' lainausta asukasta kohden</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
			s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();


		MapVis.csvUrl = 'csv/lainauksetpa.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Kokonaislainaus / Asukasluku';

		MapVis.mapChartSettings.title.text = 'Kokonaislainaus / Asukasluku';
		MapVis.mapChartSettings.legend.title.text = 'Lainaukset / Asukasluku';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 10
			}, {
				from: 10,
				to: 13
			}, {
				from: 13,
				to: 17
			}, {
				from: 17,
				to: 20
			}, {
				from: 20,
				to: 24
			}, {
				from: 24
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Lainauksia asukasta kohden: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,1) + '</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};

		MapVis.mapChartSettings.series[0].name = 'Kokonaislainaus / Asukasluku';

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openKokoelmat = function() {			
		BarChart = newBarChart();
		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Kokoelmat / Asukasluku';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Kokoelmat / Asukasluku';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' kappaletta asukasta kohden</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
			s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/kokoelmat.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Kokoelmat / Asukasluku';
//		MapVis.countryChartSettings.subtitle.text = 'Paina shift/control pohjassa ja klikkaa kuntia verrataksesi niitä';

		MapVis.mapChartSettings.title.text = 'Kokoelmat / Asukasluku';
		MapVis.mapChartSettings.legend.title.text = 'Kokoelmat / Asukasluku';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 5
			}, {
				from: 5,
				to: 8
			}, {
				from: 8,
				to: 11
			}, {
				from: 11,
				to: 15
			}, {
				from: 15,
				to: 25
			}, {
				from: 25
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Kokoelmat asukasta kohden: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,1) + '</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};
		MapVis.mapChartSettings.series[0].name = 'Kokoelmat / Asukasluku';

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openAotunnit = function() {			
		BarChart = newBarChart();
		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Aukiolotunnit';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Aukiolotunnit';
		BarChart.settings.plotOptions.column.dataLabels.formatter = function () {
                	var point = this.point,
                	sx = this.y / 1000;
                	return Highcharts.numberFormat(sx,1) + "k";
            	};
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			sf = this.y;
			var s = this.x +': <b>'+ Highcharts.numberFormat(sf,0) +' aukiolotuntia</b><br/>';
			if (point.drilldown) {
				s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';		
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/aotunnit.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Aukiolotunnit';
//		MapVis.countryChartSettings.subtitle.text = 'Paina shift/control pohjassa ja klikkaa kuntia verrataksesi niitä';

		MapVis.mapChartSettings.title.text = 'Aukiolotunnit';
		MapVis.mapChartSettings.legend.title.text = 'Aukiolotunnit';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {

		dataClasses: [{
				to: 1000
			}, {
				from: 1000,
				to: 2000
			}, {
				from: 2000,
				to: 5000
			}, {
				from: 5000,
				to: 20000
			}, {
				from: 20000,
				to: 30000
			}, {
				from: 30000
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Aukiolotunteja: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,0) + '</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};
		MapVis.mapChartSettings.series[0].name = 'Aukiolotunnit';

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openKaynnit = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Fyysiset käynnit / Asukasluku';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Fyysiset käynnit / Asukasluku';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' käyntiä asukasta kohden</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/kaynnit.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Fyysiset käynnit / Asukasluku';

		MapVis.mapChartSettings.title.text = 'Fyysiset käynnit / Asukasluku';
		MapVis.mapChartSettings.legend.title.text = 'Käynnit / Asukasluku';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 5
			}, {
				from: 5,
				to: 8
			}, {
				from: 8,
				to: 9
			}, {
				from: 9,
				to: 12
			}, {
				from: 12,
				to: 18
			}, {
				from: 18
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Kirjastokäyntejä asukasta kohden: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,1) + '</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};
		MapVis.mapChartSettings.series[0].name = 'Fyysiset käynnit / Asukasluku';

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openHankinnatPa = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Hankinnat / (As.luku / 1000)';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Hankinnat / (Asukasluku / 1000)';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,0) +' hankintaa (1000 as. kohden)</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/hankinnatpa.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Hankinnat / (As.luku/1000)';

		MapVis.mapChartSettings.title.text = 'Hankinnat / (As.luku/1000)';
		MapVis.mapChartSettings.legend.title.text = 'Hankinnat / (As.luku/1000)';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 250
			}, {
				from: 250,
				to: 300
			}, {
				from: 300,
				to: 400
			}, {
				from: 400,
				to: 500
			}, {
				from: 500,
				to: 1000
			}, {
				from: 1000
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Hankintoja / (As.luku/1000): ' + '<br><b>' + this.point.value + ' kpl' +'</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};
		MapVis.mapChartSettings.series[0].name = 'Hankinnat / (As.luku/1000)';		

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openHankinnat = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Hankinnat (kpl)';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Hankinnat';
		BarChart.settings.plotOptions.column.dataLabels.formatter = function () {
                	var point = this.point,
                	sx = this.y / 1000;
                	return Highcharts.numberFormat(sx,1) + "k";
            	};
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			sf = this.y;
			var s = this.x +': <b>'+ Highcharts.numberFormat(sf,0) +' hankintaa</b><br/>';
			if (point.drilldown) {
				s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';		
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/hankinnat.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Hankinnat';

		MapVis.mapChartSettings.title.text = 'Hankinnat';
		MapVis.mapChartSettings.legend.title.text = 'Hankinnat (kpl)';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 1000
			}, {
				from: 1000,
				to: 2000
			}, {
				from: 2000,
				to: 5000
			}, {
				from: 5000,
				to: 10000
			}, {
				from: 10000,
				to: 50000
			}, {
				from: 50000
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Hankintoja: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,0) + ' kpl' +'</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
		};
		MapVis.mapChartSettings.series[0].name = 'Hankinnat';		

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openLainaukset = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Lainaukset (kpl)';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Lainaukset'; 
		BarChart.settings.plotOptions.column.dataLabels.formatter = function () {
                	var point = this.point,
                	sx = this.y / 1000000;
                	return Highcharts.numberFormat(sx,2) + "M";
            	};
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			sf = this.y;
			var s = this.x +': <b>'+ Highcharts.numberFormat(sf,0) +' lainausta</b><br/>';
			if (point.drilldown) {
				s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';		
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/kokonaislainaus.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Lainaukset';
		

		MapVis.mapChartSettings.title.text = 'Lainaukset';
		MapVis.mapChartSettings.legend.title.text = 'Lainaukset';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 20000
			}, {
				from: 20000,
				to: 100000
			}, {
				from: 100000,
				to: 200000
			}, {
				from: 200000,
				to: 1000000
			}, {
				from: 1000000,
				to: 3000000
			}, {
				from: 3000000
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Lainauksia: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,0) + ' kpl' +'</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
		};
		MapVis.mapChartSettings.series[0].name = 'Lainaukset';		

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openToimintakulut = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Toimintakulut / Asukasluku';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Toimintakulut / Asukasluku';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' euroa asukasta kohden</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/toimintakulut.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Toimintakulut / Asukasluku';

		MapVis.mapChartSettings.title.text = 'Toimintakulut / Asukasluku';
		MapVis.mapChartSettings.legend.title.text = 'Euroa / Asukasluku';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 40
			}, {
				from: 40,
				to: 50
			}, {
				from: 50,
				to: 60
			}, {
				from: 60,
				to: 75
			}, {
				from: 75,
				to: 100
			}, {
				from: 100
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Asukasta kohden: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,1) + ' €' +'</b>';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
			};
		MapVis.mapChartSettings.series[0].name = 'Toimintakulut / Asukasluku';		

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openLainaajia = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Lainaajia / Asukasluku';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Lainaajia / Asukasluku';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' % asukkaista lainaajia</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/lainaajia.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
	//	MapVis.mapChartSettings.tooltip.valueSuffix = '%';
		MapVis.countryChartSettings.title.text = 'Lainaajia / Asukasluku';

		MapVis.mapChartSettings.title.text = 'Lainaajia / Asukasluku';
		MapVis.mapChartSettings.legend.title.text = 'Lainaajia väestöstä';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.legend.valueDecimals = "0";
		MapVis.mapChartSettings.legend.valueSuffix = '%';
		MapVis.mapChartSettings.colorAxis = {

			dataClasses: [{
				to: 25
			}, {
				from: 25,
				to: 30
			}, {
				from: 30,
				to: 35
			}, {
				from: 35,
				to: 40
			}, {
				from: 40,
				to: 50
			}, {
				from: 50
			}] 
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
  				var t = '<b>Kunta: ' + this.point.id + '</b><br>' + 'Lainaajien osuus: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,1) + ' %';
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;

				
		};
		MapVis.mapChartSettings.series[0].name = 'Lainaajaa / Asukasluku';	

		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});
	};

	openHtv = function() {
		BarChart = newBarChart();

		BarChart.colors = Highcharts.getOptions().colors;
		

		BarChart.settings.title.text = 'Henkilötyövuodet / (As.luku/1000)';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Henkilötyövuodet / (As.luku/1000)';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			s = this.x +': <b>'+ Highcharts.numberFormat(this.y,1) +' henkilötyövuotta / (As.luku/1000)</b><br/>';
			if (point.drilldown) {
			s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';
			}
			return s;
		};


		MapVis = newMapVis();

		MapVis.csvUrl = 'csv/htv.csv';

		MapVis.countryChartSettings.tooltip.shared = true;
		MapVis.countryChartSettings.title.text = 'Henkilötyövuosia / (As.luku/1000)';

		MapVis.mapChartSettings.title.text = 'Henkilötyövuosia / (As.luku/1000)';
		MapVis.mapChartSettings.legend.title.text = 'Henkilötyövuosia' + '<br>' + '/ (As.luku/1000)';
		MapVis.mapChartSettings.legend.layout = "vertical";
		MapVis.mapChartSettings.legend.valueDecimals = "1";
		MapVis.mapChartSettings.colorAxis = {
			dataClasses: [{
				to: 0.5
			}, {
				from: 0.5,
				to: 0.6
			}, {
				from: 0.6,
				to: 0.8
			}, {
				from: 0.8,
				to: 1
			}, {
				from: 1,
				to: 1.3
			}, {
				from: 1.3
			}]
		};
		MapVis.mapChartSettings.tooltip.formatter = function() {
  				var t = '<b>Kunta: ' + this.point.id + '</b><br>' + 'Henkilötyövuodet / (As.luku/1000): ' + '<br><b>' + Highcharts.numberFormat(this.point.value,2);
				if (this.point.value === 0) { if (this.point.id === "Siikalatva" || this.point.id === "Mänttä-Vilppula" || this.point.id === "Sastamala" || this.point.id === "Kemiönsaari" || this.point.id === "Parainen" || this.point.id === "Raasepori" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2009.';
				} else if (this.point.id === "Akaa" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2007.';
				} else if (this.point.id === "Vöyri" ) {
				t += '<br>' + this.point.id + ' ei sisällä tietoja vuodelta ' + subtitleValue + ',' + '<br>' + 'koska kunta on perustettu vuonna 2011.';
				}} else {
				t += '';
				}
				return t;
		};
		MapVis.mapChartSettings.series[0].name = 'Henkilötyövuosia / (As.luku/1000)';		
		
		MapVis.start(function() {
			BarChart.data = BarChart.getDataFromMapVis(MapVis);
			BarChart.start();
		});

	};

	openTapahtumat = function() {
		BarChart = newBarChart();


		BarChart.colors = Highcharts.getOptions().colors;

		BarChart.settings.title.text = 'Tapahtumien määrä (kpl)';
		BarChart.settings.subtitle.text = subtitleValue;
		BarChart.settings.yAxis.title.text = 'Tapahtumien määrä';
		BarChart.settings.tooltip.formatter = function() {
			var point = this.point,
			sf = this.y;
			var s = this.x +': <b>'+ Highcharts.numberFormat(sf,0) +' tapahtumaa</b><br/>';
			if (point.drilldown) {
				s += 'Klikkaa nähdäksesi '+ 'maakunnan' +' kunnat';
			} else {
				s += 'Klikkaa palataksesi maakuntiin';		
			}
			return s;
		};

		TapaMap = function() {
			MapVis = newMapVis();

			MapVis.csvUrl = 'csv/tapahtumat.csv';

			MapVis.countryChartSettings.tooltip.shared = true;
			MapVis.countryChartSettings.title.text = 'Tapahtumien määrä';

			MapVis.mapChartSettings.title.text = 'Tapahtumien määrä';
			MapVis.mapChartSettings.legend.title.text = 'Tapahtumia';
			MapVis.mapChartSettings.legend.layout = "vertical";
			MapVis.mapChartSettings.colorAxis = {
				dataClasses: [{
					to: 5
				}, {
					from: 5,
					to: 30
				}, {
					from: 30,
					to: 100
				}, {
					from: 100,
					to: 500
				}, {
					from: 500,
					to: 1000
				}, {
					from: 1000
				}]
			};
			MapVis.mapChartSettings.tooltip.formatter = function() {
			var t = '<b>' + this.point.id + '</b><br>' + 'Tapahtumia: ' + '<br><b>' + Highcharts.numberFormat(this.point.value,0) + ' kpl' +'</b>';
				if (this.point.value === 0) { if (subtitleValue === 2012 || subtitleValue === 2013) { if (this.point.id === "Ruokolahti" || this.point.id === "Pyhäranta" || this.point.id === "Hämeenkoski" ) {
				t += '';
				}} else { 				 
				t += '<br>' + 'Tapahtumia on tilastoitu vasta vuodesta 2012 lähtien.';
				}} else {
				t += '';
				}
				return t;
			};
			MapVis.mapChartSettings.series[0].name = 'Tapahtumien määrä';

			MapVis.start(function() {

				BarChart.data = BarChart.getDataFromMapVis(MapVis);
				BarChart.start();

			});
		};
		return TapaMap();
	};


	switch (path) {
		case "lainauksetpa":
			openLainauksetPa();
			break;
		case "kokoelmat":
			openKokoelmat();
			break;
		case "aotunnit":
			openAotunnit();
			break;
		case "kaynnit":
			openKaynnit();
			break;
		case "hankinnatpa":
			openHankinnatPa();
			break;
		case "hankinnat":
			openHankinnat();
			break;
		case "lainaukset":
			openLainaukset();
			break;
		case "toimintakulut":
			openToimintakulut();
			break;
		case "lainaajia":
			openLainaajia();
			break;
		case "htv":
			openHtv();
			break;
		case "tapahtumat":
			openTapahtumat();

			break;
	}

	window.MAP = MapVis;
});