//store necessary keys
const VGPC_API_KEY = "d54ae2255c2fe8e39e936c398404eb52844da006";
const GB_KEY = "4481200dc9e8799d83b4735342f8419d172c16cf";
const VGPC_SEARCH_URL = 'https://www.pricecharting.com/api/products?';

// call VGPC for prices
function getApiData(searchTerm, callback) {
    const settings= {
        url: VGPC_SEARCH_URL,
        data: {
            q: `${searchTerm}`,
            t: VGPC_API_KEY
        },
        dataType: 'json',
        type: 'GET',
        success: callback
    };

        $.ajax(settings);
    }

// grab an image with the jsob blurb for each item and somehow store an image an array that matches the json index with



// create a div element containing the game information
// add in the image for the game from the google api function


function renderResults(result) {
    // variable for parsed price
    console.log(result);
    const price = parseFloat(result['loose-price'] / 100).toFixed(2);
    const dollarPrice = `Loose price: $${price}`;

    // add in image here to div element
    const results = `<div class="results">
        <h2> ${result['product-name']} </h2>
        <!-- add image to left -->
        <h3 class="system"> System: ${result['console-name']} </h3>
        <p class="price"> ${dollarPrice} </p>
    </div>`;
    return results;
    }

// function to add each HTML Div to page using .html
function displayResults(data) {
    const results = data.products.map((item, index) => renderResults(item));
    // debug to see results
    console.log(results);
    $('.js-main').html(results);
}

function watchSubmit() {
    $('.js-search-form').submit(event => {
        event.preventDefault();

        // remove contra placeholder and either replace with query or make blank


		// find the value of the entry in the input box with class .js-query 
		const queryTarget = $(event.currentTarget).find('.js-query');
		// add query variable = text entry
		const query = queryTarget.val();
		// clear out the input
		queryTarget.val("");
		// call the API using the query variable as arg1 and the displayGitHubSearchData function as a callback using the results
		getApiData(query, displayResults);

    });
}

$(watchSubmit);


    // TO DO

        // need to think about way to pair price and image API requests if it is needed - TBD, IDs do not match between APIs and no API has prices except VGPC

        // NICE TO HAVE

        // think of a way to create a dynamic dropdown to filter console based on query,
        // maybe using a GET request to populate an array based on console in the JSON response?
