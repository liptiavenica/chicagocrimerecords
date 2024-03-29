<!DOCTYPE html>
<html>
<head>
	<title> CHICAGO CRIME RECORDS </title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="assets/css/w3.css">
	<link rel="stylesheet" href="assets/css/font-awesome.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<link rel="stylesheet" href="assets/css/w3-colors-metro.css">
</head>
<body class="w3-metro-darken">
	<header class="w3-panel w3-center w3-opacity" style="padding-bottom:0px; margin-bottom: 0px">
		<h1 class="w3-xxxlarge w3-text-yellow">CHICAGO CRIME RECORDS</h1>
		<h1 class="w3-xxlarge w3-text-yellow">GROUP 3</h1>
		
		<div class="w3-padding-32">
			<div class="w3-bar w3-border w3-large">
				<span class="w3-bar-item w3-metro-orange"><i class="fa fa-home"></i></span>
				<a href="pages/map.html" class="w3-bar-item w3-button w3-hover-yellow">Crime Map</a>
				<a href="pages/dashboard.html" class="w3-bar-item w3-button w3-hover-yellow">Dashboard</a>
			</div>
		</div>
		
		<h1 class="w3-xlarge">About This Visualization</h1>
		<p>Chicago Crime Records is an application to visualize a map that shows crime scenes around Chicago, USA. Users can get several information about particular crime event, such as type of crime and case status (open or closed case). With Chicago Crime Records, users can find crime scenes on the map, the exact address, occurring time, and more description about the crime itself.
		There are several crime types that occurred in Chicago (e.g. robbery, murder, thievery, etc.). Users can choose crime type(s) which they want to know about. As another feature, users can search crime events during the time range.
		Beside crime map as the main feature, a dashboard is also built in this application. On this dashboard, several other information (which is more general) are provided in form of charts.
		<p class="w3-hover-text-amber" onclick="toggle('icon','memberList')"><span class="w3-large">GROUP MEMBERS <i id="icon" class="fa fa-arrow-down"></i></span></p>
		<div id="memberList" class="w3-container w3-hide">
			<h1 class="w3-xlarge">Tobias Krauth - Trisna Ari Roshinta - Liptia Venica - Hidayaturrahman - Teza Nugroho Alaudin - Maria Veronica Claudia M. - Jadequeline Marsha Pricila</h1>
		</div>
		<hr>
		<a href="pages/howto.html" target="_blank" class="w3-button w3-metro-orange w3-hover-yellow">HOW TO USE</a>
		<a href="pages/eval.html" class="w3-button w3-metro-orange w3-hover-yellow">EVALUATION</a>
		</p>
	</header>
	<script>
		function toggle(icon, id) {
		  var x = document.getElementById(id);
		  var arrow = document.getElementById(icon);
		  if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
			arrow.className = "fa fa-arrow-up";
		  } else {
			x.className = x.className.replace(" w3-show", "");
			arrow.className = "fa fa-arrow-down";
		  }
		}
	</script>
</body>
</html>
