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
                displayPieChart(data);
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
    console.log(formatedData);

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

    // Add some data
    polygonSeries.data = formatedData;
};

/*
* -----------------------------------------------------------------------------
* PIE CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the pie chart
const pieChartData = (data) => {

};

// FUNCTION - Display the map chart
const displayPieChart = (data) => {
    const formatedData = pieChartData(data);

    // @TODO Initialization du chart pie
};

/*
* -----------------------------------------------------------------------------
*  XY CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the xy chart
const xyChartData = (data) => {

};

// FUNCTION - Display the map chart
const displayXyChart = (data) => {
    const formatedData = xyChartData(data);

    // @TODO Initialization du chart xy
};