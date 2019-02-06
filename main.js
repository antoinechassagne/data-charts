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
                chartMap(data);
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

const chartMap = (data) => {
    let medalsPerNoc = [];

    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        let noc = line.NOC;
        let medals = line.Medal;

        if (medals != 'NA') {
            if (noc in medalsPerNoc) {
                medalsPerNoc[noc]++;
            } else {
                medalsPerNoc[noc] = 1;
            }
        }
    }

    console.log(medalsPerNoc);

    // @TODO
    // - Formater NOC en 2 lettres
    // - CF : https://codepen.io/team/amcharts/pen/jzeoay

};

/*
* -----------------------------------------------------------------------------
* PIE CHART
* -----------------------------------------------------------------------------
*/

const chartPie = (data) => {

};

/*
* -----------------------------------------------------------------------------
*  XY CHART
* -----------------------------------------------------------------------------
*/

const chartXy = (data) => {

};