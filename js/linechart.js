// Code for generating a Chart.js line chart

async function getData(type) {  // type = 'S' or 'P'
    const response = await fetch(`./data/${type}_Table.csv`);
    const data = await response.text();                 // CSV to TEXT format

    const xTemps = [];      // x-axis label = temp values
    const y0Pc = [];      // y-axis Seebeck coefficient or power factor values at x = 0%
    const y5Pc = [];      // y-axis Seebeck coefficient or power factor values at x = 5%
    const y10Pc = [];     // y-axis Seebeck coefficient or power factor values at x = 10%
    const y13Pc = [];     // y-axis Seebeck coefficient or power factor values at x = 13%
    const y17Pc = [];     // y-axis Seebeck coefficient or power factor values at x = 17%
    const y20Pc = [];     // y-axis Seebeck coefficient or power factor values at x = 20%

    // \n - new line character
    // split('\n') - will separate the table into an array of individual rows
    // slice(start, end) - return a new array starting at index "start" up and including "end"
    const table = data.split('\n').slice(1);    // Split by line and remove first row
    // console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const temp = parseFloat(columns[0]);        // Assign temp value
        xTemps.push(temp);                          // Push each temp into array for temps

        const value0Pc = parseFloat(columns[1]);
        y0Pc.push(value0Pc + 14);

        const value5Pc = parseFloat(columns[2]);
        y5Pc.push(value5Pc + 14);

        const value10Pc = parseFloat(columns[3]);
        y10Pc.push(value10Pc + 14);

        const value13Pc = parseFloat(columns[4]);
        y13Pc.push(value13Pc + 14);

        const value17Pc = parseFloat(columns[5]);
        y17Pc.push(value17Pc + 14);

        const value20Pc = parseFloat(columns[6]);
        y20Pc.push(value20Pc + 14);

        console.log(temp, value0Pc, value5Pc, value10Pc, value13Pc, value17Pc, value20Pc);
    });

    return { xTemps, y0Pc, y5Pc, y10Pc, y13Pc, y17Pc, y20Pc };    // Use {} to return multiple values as an object
}

async function createChart(type, elementId) {
    const name = type === 'S' ? 'Seebeck Coefficient' : 'Power Factor'; // Change labels based on type
    const unit = type === 'S' ? 'microV/K' : 'microW/cm·K²';    // Change units based on type
    const data = await getData(type);   // createChart will wait for getData() to process CSV info
    const lineChart = document.getElementById(elementId);
    const myChart = new Chart(lineChart, {  // Construct the chart    
        type: 'line',
        data: {                         // Define data
            labels: data.xTemps,        // x-axis labels
            datasets: [                 // Each object describes one dataset of y-values
                                        //  including display properties.  To add more datasets, 
                                        //  place a comma after the closing curly brace of the last
                                        //  data set object and add another dataset object. 
                {
                    label:    `${name} for x = 0% in ${unit}`,     // Dataset label for legend
                    data:     data.y0Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 0, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 0, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `${name} for x = 5% in ${unit}`,     // Dataset label for legend
                    data:     data.y5Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(255, 122, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgba(255, 122, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `${name} for x = 10% in ${unit}`,     // Dataset label for legend
                    data:     data.y10Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(200, 200, 0, 0.2)',    // Color for data marker
                    borderColor:      'rgba(200, 200, 0, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `${name} for x = 13% in ${unit}`,     // Dataset label for legend
                    data:     data.y13Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 153, 51, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 153, 51, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `${name} for x = 17% in ${unit}`,     // Dataset label for legend
                    data:     data.y17Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(0, 102, 255, 0.2)',    // Color for data marker
                    borderColor:      'rgba(0, 102, 255, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
                {
                    label:    `${name} for x = 20% in ${unit}`,     // Dataset label for legend
                    data:     data.y20Pc,
                    fill:     false,           // Fill area under the linechart (true = yes, false = no)
                    backgroundColor:  'rgba(150, 0, 150, 0.2)',    // Color for data marker
                    borderColor:      'rgba(150, 0, 150, 1)',      // Color for data marker border
                    borderWidth:      1   // Data marker border width
                },
        ]
        },
        options: {                        // Define display chart display options 
            responsive: true,             // Re-size based on screen size
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,
                        text: 'Temperature (°C)',     // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    ticks: {                      // x-axis tick mark properties
                        min: 0,
                        font: {
                            size: 14  
                        },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,
                        text: `${name} (${unit})`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: 5,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: `${name} vs. Temperature Across Indium Concentrations`,
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }       
    });
}

createChart('S', 'lineChartS');
createChart('P', 'lineChartP');