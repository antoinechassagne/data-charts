/*
* -----------------------------------------------------------------------------
* FETCH DATA
* -----------------------------------------------------------------------------
*/

const retrieveData = () => {
    try {
        fetch('olympics.json')
            .then(response => response.json())
            .then(data => {
                displayMapChart(data);
                displayHistChart(data);
                displayXyChart(data);
            });
    } catch (error) {
        console.error(error);
        window.getElementByTagName.innerHTML = "<div class=\"fetch-error\">Erreur lors du chargement des données.</div>"
    }
};

retrieveData();

/*
* -----------------------------------------------------------------------------
* MAP CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the chart map
const mapChartData = (data) => {
    let formatedData = [];
    let medalsPerNoc = {};

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        let noc = line.NOC.slice(0, -1); // format NOC with 2 characters
        let medals = line.Medal;

        if (medals != 'NA') {
            if (noc in medalsPerNoc) {
                medalsPerNoc[noc]++;
            } else {
                medalsPerNoc[noc] = 1;
            }
        }
    }

    for (key in medalsPerNoc) {
        if (medalsPerNoc.hasOwnProperty(key)) {
            let country = {
                id: key,
                value: medalsPerNoc[key]
            };
            formatedData.push(country);
        }
    }

    return formatedData

};

// FUNCTION - Display the map chart
const displayMapChart = (data) => {
    const formatedData = mapChartData(data);

    // @TODO Initialization du chart map
    // @TODO Voir exemple : https://codepen.io/team/amcharts/pen/jzeoay
    // Create map instance
    var chart = am4core.create("chartOne", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}:{value}";
    polygonTemplate.fill = am4core.color("#E8E8E8");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("blue");

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add our medal data
    polygonSeries.data = formatedData;
};

/*
* -----------------------------------------------------------------------------
* PIE CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the pie chart
const histChartData = (data) => {
        let formatedData2 = [];
        let nbrofage = {};

        for (let i = 0; i < data.length; i++) {
            let line = data[i];
            let age = line.Age
            
            if (age != 'NA') {
                if (age in nbrofage) {
                    nbrofage[age]++;
                } else {
                    nbrofage[age] = 1;
                }
        }
    }
        for (key in nbrofage) {
            if (nbrofage.hasOwnProperty(key)) {
                let athleteage = {
                    category: key,
                    valueY: nbrofage[key]
                };
                formatedData2.push(athleteage);
            }
        }

        return formatedData2
        
};

// FUNCTION - Display the map chart
const displayHistChart = (data) => {
    const formatedData2 = histChartData(data);


    // @TODO Initialization du chart pie
    // Themes begin
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

// Create chart instance
var chart = am4core.create("chartTwo", am4charts.XYChart3D);
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.title.text = "Age";
chart.data = formatedData2;
var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Number of athletes";

// Create series
var series = chart.series.push(new am4charts.ColumnSeries3D());
series.dataFields.valueY = "valueY";
series.dataFields.categoryX = "category";
series.name = "Age of the Olympics atheltes";
series.tooltipText = "{Category}: [bold]{valueY}[/]";
// Add cursor
chart.cursor = new am4charts.XYCursor();
};
/*
* -----------------------------------------------------------------------------
*  XY CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the xy chart
const xyChartData = (data) => {
let formatedData3 = [];
let partbyyear = {};

for (let i = 0; i < data.length; i++) {
    let line = data[i];
    let year = line.Year

    if (year != 'NA') {
        if (year in partbyyear) {
            partbyyear[year]++;
        } else {
            partbyyear[year] = 1;
        }
    }
}
for (key in partbyyear) {
    if (partbyyear.hasOwnProperty(key)) {
        let partyear = {
            participant: key,
            valueY: partbyyear[key]
        };
        formatedData3.push(partyear);
    }
}

return formatedData3


};

// FUNCTION - Display the map chart
const displayXyChart = (data) => {
    const formatedData3 = xyChartData(data);

   am4core.useTheme(am4themes_animated);

   // Create chart instance
   var chart = am4core.create("chartThree", am4charts.XYChart);

    chart.data = formatedData3;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "participant";
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    categoryAxis.dataFields.Value = "valueY";


// Create series
var series1 = chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "valueY";
series1.dataFields.categoryX = "participant";
series1.strokeWidth = 3;
series1.tensionX = 0.8;
series1.bullets.push(new am4charts.CircleBullet());

// Add cursor
chart.cursor = new am4charts.XYCursor();
};