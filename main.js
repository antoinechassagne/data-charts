/*
* -----------------------------------------------------------------------------
* FETCH DATA
* -----------------------------------------------------------------------------
*/

// IFFE for init (fetch -> data treatments -> chart display)
{
    try {
        fetch('olympics.json')
            .then(response => response.json())
            .then(data => {
                displayMapChart(data);
                displayBarChart(data);
                displayXyChart(data);
                listenOnSelects(data);
            });
    } catch (error) {
        console.error(error);
        window.getElementByTagName.innerHTML = "<div class=\"fetch-error\">Erreur lors du chargement des données.</div>"
    }
}

/*
* -----------------------------------------------------------------------------
* SELECTS LISTENER
* -----------------------------------------------------------------------------
*/
const listenOnSelects = (data) => {
    const mapSelect = document.querySelector('.charts');
    mapSelect.addEventListener('change', (e) => {
        const select = e.target;
        const value = select.value;
        const id = select.getAttribute('id');

        if (id === 'mapSelect') {
            displayMapChart(data, value);
        } else if (id === 'barSelect') {
            displayBarChart(data, value);
        } else if (id === 'xySelect') {
            displayXyChart(data, value);
        }

    })
};

/*
* -----------------------------------------------------------------------------
* MAP CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the chart map
const mapChartData = (data, selectValue) => {
    let formatedData = [];
    let obj = {};

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        let noc = line.NOC.slice(0, -1); // format NOC with 2 characters
        let medals = line.Medal;

        if (medals !== 'NA' && selectValue === 'All') {
            if (noc in obj) {
                obj[noc]++;
            } else {
                obj[noc] = 1;
            }
        } else if (medals !== 'NA' && selectValue !== 'All') {
            if (noc in obj && medals === selectValue) {
                obj[noc]++;
            } else if (medals === selectValue) {
                obj[noc] = 1;
            }
        }
    }

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            let dataObj = {
                id: key,
                value: obj[key]
            };
            formatedData.push(dataObj);
        }
    }

    return formatedData
};

// FUNCTION - Display the map chart
const displayMapChart = (data, selectValue = 'All') => {
    const formatedData = mapChartData(data, selectValue);

    let chart = am4core.create("chartOne", am4maps.MapChart);

    // Set map definition
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Disable zoom with wheel
    chart.chartContainer.wheelable = false;

    // Create map polygon series
    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add our medal data
    polygonSeries.data = formatedData;

    // Fill color based on value
    polygonSeries.heatRules.push({
        "property": "fill",
        "target": polygonSeries.mapPolygons.template,
        "min": am4core.color("#FFFFFF"),
        "max": am4core.color("#EBBD01")
    });
};

/*
* -----------------------------------------------------------------------------
* BAR CHART
* -----------------------------------------------------------------------------
*/

// FUNCTION - Prepare the data for the bar chart
const barChartData = (data) => {
    let formatedData = [];
    let obj = {};

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        let age = line.Age;

        if (age !== 'NA') {
            if (age in obj) {
                obj[age]++;
            } else {
                obj[age] = 1;
            }
        }

    }

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            let dataObj = {
                category: key,
                valueY: obj[key]
            };
            formatedData.push(dataObj);
        }
    }

    return formatedData
};

// FUNCTION - Display the bar chart
const displayBarChart = (data) => {
    const formatedData = barChartData(data);

    // Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.useTheme(am4themes_kelly);

    // Create chart instance
    let chart = am4core.create("chartTwo", am4charts.XYChart3D);
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    chart.data = formatedData;
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Titles
    valueAxis.title.text = "Nombre d'athlètes";
    categoryAxis.title.text = "Âge";

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "valueY";
    series.dataFields.categoryX = "category";
    series.name = "Âge des athlètes";
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
const xyChartData = (data, selectValue) => {
    let formatedData = [];
    let obj = {};

    for (let i = 0; i < data.length; i++) {
        let line = data[i];
        let year = line.Year;
        let season = line.Season;

        if (selectValue === 'All') {
            if (year in obj) {
                obj[year]++;
            } else {
                obj[year] = 1;
            }
        } else {
            if (year in obj && season === selectValue) {
                obj[year]++;
            } else if (season === selectValue) {
                obj[year] = 1;
            }
        }

    }

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            let dataObj = {
                participant: key,
                valueY: obj[key]
            };
            formatedData.push(dataObj);
        }
    }

    return formatedData
};

// FUNCTION - Display the xy chart
const displayXyChart = (data, selectValue = 'All') => {
    const formatedData = xyChartData(data, selectValue);

    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("chartThree", am4charts.XYChart);

    chart.data = formatedData;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "participant";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    categoryAxis.dataFields.Value = "valueY";


    // Create series
    let series1 = chart.series.push(new am4charts.LineSeries());
    series1.dataFields.valueY = "valueY";
    series1.dataFields.categoryX = "participant";
    series1.strokeWidth = 3;
    series1.tensionX = 0.8;
    series1.bullets.push(new am4charts.CircleBullet());

    // Titles
    valueAxis.title.text = "Nombre d'athlètes";
    categoryAxis.title.text = "Années";

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
};

