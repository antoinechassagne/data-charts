/*
* -----------------------------------------------------------------------------
* FETCH DATA
* -----------------------------------------------------------------------------
*/

const retrieveData = () => {
    try {
        fetch('datasets/olympics.json')
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
    console.log(data);
    let medalsPerTeam = [];

    for (let i = 0; i < data.length; i++) {
        let line = data[i];

        let team = line.Team;
        let medals = line.Medal;

        if (medals != 'NA') {
            if (team in medalsPerTeam) {
                medalsPerTeam[team]++;
            } else {
                medalsPerTeam[team] = 1;
            }
        }

    }
    console.log(medalsPerTeam);

    // @TODO
    // - Ajouter les NOC au json
    // - utliser les NOC plutot que les teams
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