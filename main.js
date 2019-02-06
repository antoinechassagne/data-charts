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