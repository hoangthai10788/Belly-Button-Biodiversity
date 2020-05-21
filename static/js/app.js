function init() {
    d3.json("data/samples.json").then((incomingdata) => {
        
        console.log(incomingdata);

        var ids = incomingdata.samples.map(id => id.id);


        var selector = d3.select("#selDataset");

        ids.forEach((id) => {
            selector
                .append("option")
                .text(id)
                .property("value", id);
        });

        var defaultplot = incomingdata.samples[0];
        
        charts(defaultplot);
        demographic_info(defaultplot);

    });
}



function charts(data) {

    d3.json("data/samples.json").then((incomingdata) => {

        incomingdata.samples.forEach((sample) => {

            var labels = sample.otu_ids.slice(0,10);

            var values = sample.sample_values.slice(0,10).reverse();

            var hovertext = sample.otu_labels.slice(0,10);
            
            var trace1 = {
                x: values,
                y: toString(labels),
                type: "bar",
                hoverinfo: hovertext,
                orientation: "h"
            };
            var data = [trace1];


            Plotly.newPlot("bar",data);

            // Variables for bubble chart

            var x = sample.otu_ids;
            var y = sample.sample_values;
            var text_value = sample.otu_labels;

            var trace2 = {
               x: x,
               y: y,
               text: text_value,
               mode: "markers",
               marker: {
                   color: x,
                   size: y
               } 
            };

            var layout2 = {
                xaxis: {title: "OTU ID"},
            }

            var data2 = [trace2];
            
            Plotly.newPlot("bubble", data2, layout2);    
        });       
    })
}

function demographic_info(data) {
    
    d3.json("data/samples.json").then((incomingdata) => {
        
        var selector = d3.select("#sample-metadata");
        Object.entries(incomingdata.metadata[0]).forEach(([key, value]) => {
            selector.append("p").text(`${key}: ${value}`);
        });
    });
}
    

init();