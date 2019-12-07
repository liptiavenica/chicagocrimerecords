var crimeMap = [5.33,5.33,5.17,3.33,5.25,4.92];

var crimeGrowth = [5,5.25,5,2.67,5.33,0];

var heatmap = [4.58,4.08,4.33,3.67,4.58,4.83];


			
var myChart = {
	type: 'radar',
	data: {
		datasets : [
			{ /* objek dataset1 */
				label: "Crime Map",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.red,
				data: crimeMap,
			},
			{ /* objek dataset2 */
				label: "Crime Growth",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.green,
				data: crimeGrowth,
			},
			{ /* objek dataset3 */
				label: "Heatmap",
				//backgroundColor: window.chartColors.grey,
				borderColor: window.chartColors.yellow,
				data: heatmap,
			}],
		labels : ['Appealing and interesting', 'Information clearness', 'Insight', 'Idioms appropriateness', 'Visual encoding', 'Interactivity']
	},
	options: {
		title:{
			display:true,
			text:'Aspects Point Radar'
		},
		responsive: true,
		scale: {
			ticks : {
				display : false
			}
		}
	},
};

window.onload = function() {
	var ctx = document.getElementById("canvas1").getContext("2d");
	new Chart(ctx, myChart);
};