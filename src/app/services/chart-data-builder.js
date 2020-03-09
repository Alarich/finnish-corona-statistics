let colorArray = [
    '#3366cc',
    '#dc3912',
    '#ff9900',
    '#109618',
    '#990099',
    '#0099c6',
    '#dd4477',
    '#66aa00',
    '#b82e2e',
    '#316395',
    '#3366cc',
    '#994499',
    '#22aa99',
    '#aaaa11',
    '#6633cc',
    '#e67300',
    '#8b0707',
    '#651067',
    '#329262',
    '#5574a6',
    '#3b3eac',
    '#b77322',
    '#16d620',
    '#b91383',
    '#f4359e',
    '#9c5935',
    '#a9c413',
    '#2a778d',
    '#668d1c',
    '#bea413',
    '#0c5922',
    '#743411',
];

export default class ChartDataBuilder {
    static getInfectionByRegionConfig(infectionsByRegion) {
        // Remove empty entries
        let labelsWithCounts = [];
        for (let region of Object.keys(infectionsByRegion)) {
            if (infectionsByRegion[region] === 0) {
                delete infectionsByRegion[region];
                continue;
            }
            labelsWithCounts.push(`${region} ${infectionsByRegion[region]}`);
        }
        return {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: Object.values(infectionsByRegion),
                        backgroundColor: [...new Array(Object.keys(infectionsByRegion).length)].map(
                            (_ignore, i) => colorArray[i]
                        ),
                    },
                ],
                labels: labelsWithCounts,
            },
            options: {
                aspectRatio: window.innerWidth > 720 ? 2 : 0.75,
                title: {
                    fontSize: 18,
                    display: true,
                    text: 'Tartuntojen määrä sairaanhoitopiireittäin',
                },
                legend: {
                    position: window.innerWidth > 720 ? 'right' : 'bottom',
                    align: 'start',
                    labels: {
                        fontSize: 18,
                    },
                },
            },
        };
    }
    static getInfectionSourceCountryChart(sourceCountries) {
        let labelsWithCounts = [];
        for (let country of Object.keys(sourceCountries)) {
            labelsWithCounts.push(`${country} ${sourceCountries[country]}`);
        }
        return {
            type: 'doughnut',
            data: {
                datasets: [
                    {
                        data: Object.values(sourceCountries),
                        backgroundColor: [...new Array(Object.keys(sourceCountries).length)].map(
                            (_ignore, i) => colorArray[i]
                        ),
                    },
                ],
                labels: labelsWithCounts,
            },
            options: {
                title: {
                    fontSize: 18,
                    display: true,
                    text: 'Tartuntojen lähdemaat',
                },
                legend: {
                    position: window.innerWidth > 720 ? 'right' : 'bottom',
                    labels: {
                        fontSize: 18,
                    },
                },
            },
        };
    }

    static getInfectionsByDayChart(infectionByDay, deathsByDay) {
        let labels = [...new Set([...Object.keys(infectionByDay), ...Object.keys(deathsByDay)])];
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sairastumiset',
                        data: Object.values(infectionByDay),
                        backgroundColor: colorArray[0],
                    },
                    {
                        label: 'Kuolontapaukset',
                        data: Object.values(deathsByDay),
                        backgroundColor: colorArray[1],
                    },
                ],
            },
            options: {
                title: {
                    display: true,
                    text: 'Sairastumiset ja kuolontapaukset päivittäin',
                    fontSize: 18,
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        fontSize: 18,
                    },
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                        },
                    ],
                },
            },
        };
    }
}