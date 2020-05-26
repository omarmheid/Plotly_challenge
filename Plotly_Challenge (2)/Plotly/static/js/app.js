//Ploting Charts

function buildPlot(id) {
  //Fetch the JSON data and console log the data
  d3.json("../data/samples.json").then((data) => {
    console.log(data);

    //Grab values from the data json object to build the plots

    //Filter test id's sample data

    var value = data.samples.filter((i) => i.id.tostring() === id)[0];
    console.log(value);

    //Get top 10 OTU sample values

    var samples_values = value.sample_values.slice(0, 10).reverse();

    //Get top 10 OTU sample values

    var top10_otu = value.otu_ids.slice(0, 10).reverse();

    //Define the lables

    var otu_lables = value.otu_labels.slice(0, 10);

    //Plot the bar chart

    var trace1 = {
      type: "bar",
      x: sample_values,
      y: top10_otu.map((d) => "OTU" + d),
      orientation: "h",
      text: otu_lables,
    };

    var data1 = [trace1];

    var layout = {
      title: "Top 10 OTU's",
      yaxis: {
        tickmode: "linear",
      },
    };

    Plotly.newPlot("Bar", data1, layout);

    //Plot the bubble chart

    var trace2 = {
      x: value.otu_ids,
      y: value.sample_values,
      mode: "markers",
      marker: {
        size: value.sample_values,
        color: value.otu_ids,
      },
      text: value.otu_lables,
    };

    var data2 = [trace2];

    var layout_2 = {
      xaxis: { title: "OTU ID" },
      height: 600,
      width: 1000,
    };

    Plotly.newPlot("bubble", data2, layout_2);
  });
}

//Displaying sample metadata

function metadata(id) {
  //Fetch metadata
  d3.json("../data/samples.json").then((data) => {
    //Define metadata and print

    var metadata = data.metadata;
    console.log(metadata);

    //Filter by ID

    var filtered_data = metadata.filter(
      (sample) => sample.id.tostring() === id
    )[0];

    //Select demo info to print data

    var demo_info = d3.select("#sample-metadata");

    //Clear already existing data

    demo_info.html("");

    //Display each key value

    Object.entries(filtered_data).forEach((key) => {
      demo_info.append("h5").text(key[0] + ": " + key[1] + "/n");
    });
  });
}

//Change event function
function optionChange(id) {
  buildPlots(id);
  metadata(id);
}

//Function to render data
function init() {
  //reading the data
  d3.json("../data/samples.json").then((data) => {
    console.log(data);

    //selection of the drop down menu

    var dropdownmenu = d3.select("#selDataset");

    //Set id's as options on the dropdown menu

    data.names.forEach(function (name) {
      dropdownmenu.append("option").text(name).property("value");
    });
    //Display data and plots
    buildPlots(data.names[0]);
    metadata(data.names[0]);
  });
}

init();
