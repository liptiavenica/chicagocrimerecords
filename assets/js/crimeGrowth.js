var crimes=jsonstr;
// num of battery per year
var battery = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// num of other offense per year
var theft = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// num of weapon violation per year
var criminalDmg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

for (crime in crimes){
	battery[crime] = crimes[crime].crimes["battery"];
	theft[crime] = crimes[crime].crimes["theft"];
	criminalDmg[crime] = crimes[crime].crimes["criminal damage"];
}
			
var myChart = {
	type: 'line',
	data: {
		datasets : [
			{ /* objek dataset1 */
				label: "Theft",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.red,
				data: theft,
			},
			{ /* objek dataset2 */
				label: "Criminal Damage",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.orange,
				data: criminalDmg,
			},
			{ /* objek dataset3 */
				label: "Battery",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.green,
				data: battery,
			}],
		labels: ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010","2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"],
	},
	options: {
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Year'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Crime Occurence'
				}
			}]
		},
		title:{
			display:true,
			text:'Chicago Current-Top-Crime Yearly Growth'
		},
		responsive: true,
	},
};

window.onload = function() {
	var ctx = document.getElementById("canvas1").getContext("2d");
	//var ctx2 = document.getElementById("canvas2").getContext("2d");
	new Chart(ctx, myChart);
	//new Chart(ctx2, myChart);
};