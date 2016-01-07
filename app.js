// Chat init
var ctx = document.getElementById("myChart").getContext("2d");
// Datasets array are hardcoded to 2 for exaple purpose
// It means 2 CPU cores
// TODO , implement dataset dynamically

var data = {
    labels: [],
    datasets: [
        {
            label: "Core 0",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
        },
        {
            label: "Core 1",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
        }
    ]
};

//Chart Options
var options = {
  animation : false,//Deactivate animation
  scaleOverride : true,
	scaleSteps : 10,// The number of steps in  scale
	scaleStepWidth : 10,// The value jump in the scale
	scaleStartValue : 0//The scale starting value
};
//Chart Init
var myLineChart = new Chart(ctx).Line(data, options);


//Update chart data and view
function upadateData(values){

  if(myLineChart.datasets[0].points.length > 8 ){
      myLineChart.removeData();
  }
  time = new Date().toLocaleTimeString();
  myLineChart.addData(values,String(time));
}

// Get a firebase database reference
var ref = new Firebase("https://<your-firebase-app>.firebaseio.com/");
// Attach an asynchronous callback to read the data at firebase reference

ref.on("value", function(snapshot) {
  var cpu = snapshot.val();
  upadateData(cpu.cpu)
}, function (errorObject) {
console.log("The read failed: " + errorObject.code);
});
