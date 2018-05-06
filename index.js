// Pricecharting API Key and URL
const VGPC_API_KEY = "d54ae2255c2fe8e39e936c398404eb52844da006";
const VGPC_SEARCH_URL = 'https://www.pricecharting.com/api/products?';
// YouTube API Key and URL
const API_KEY = 'AIzaSyAhE7phirGx9wlS2auDO9cIcG_s0NY8ra8';
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

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

// call YouTube for thumbnail image from 1st video result, currenty not working or used
function getThumbnail(searchTerm, callback) {
	const settings = {
		url: YOUTUBE_SEARCH_URL,
		data: {
			q: `${searchTerm}`,
			part: 'snippet',
			key: API_KEY
		},
		dataType: 'json',
		type: 'GET',
		success: callback
	};

	$.ajax(settings);
}

// grab an image with the jsob blurb for each item and somehow store an image an array that matches the json index with



// create a div element containing the game information
function renderResults(result) {
    // variable for parsed price
    console.log(result);
    const price = parseFloat(result['loose-price'] / 100).toFixed(2);
    const dollarPrice = `Loose price: $${price}`;

    // add in image here to div element
    var fixedName = encodeURIComponent(result['product-name']);
    var fixedConsole = encodeURIComponent(result[`console-name`]);
    const results = `<div class="results">
        <h2> ${result['product-name']} </h2>
        <!-- add image to left -->
        <h3 class="system"> System: ${result['console-name']} </h3>
        <p class="price"> ${dollarPrice} </p>
        <h4>Shop Now:</h4>
        <button class="btn btn-block" onclick="window.open('https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=`+fixedName+`%20`+fixedConsole+`')"><i class="fab fa-amazon fa-2x"></i></button>
        <button class="btn btn-block" onclick="window.open('https://www.ebay.com/sch/i.html?_nkw=`+fixedName+`%20`+fixedConsole+`&ssPageName=GSTL')"><i class="fab fa-ebay fa-2x"></i></button>        
    </div>`;
    return results;
    }

// add total results to page by counting total # of items in JSON response

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
        // add total results to top of page
        // add a max # of items per page and prev and next page buttons

        // NICE TO HAVE

        // think of a way to create a dynamic dropdown to filter console based on query,
        // maybe using a GET request to populate an array based on console in the JSON response
