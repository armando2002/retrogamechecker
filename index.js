// Pricecharting URL
const VGPC_SEARCH_URL = 'https://www.pricecharting.com/api/products?';
var vgpcapikey = config.VGPC_API_KEY;
// YouTube URL
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var youtubeapikey = config.API_KEY;

// call VGPC for prices
function getApiData(searchTerm, callback) {
    const settings= {
        url: VGPC_SEARCH_URL,
        data: {
            q: `${searchTerm}`,
            t: vgpcapikey
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
			key: youtubeapikey
		},
		dataType: 'json',
		type: 'GET',
		success: callback
	};

	$.ajax(settings);
}

// create a div element containing the game information
function renderResults(result) {
    // variable for parsed price
    const price = parseFloat(result['loose-price'] / 100).toFixed(2);
    const dollarPrice = `Loose price: $${price}`;
    // URL encodings for shop links
    var fixedName = encodeURIComponent(result['product-name']);
    var fixedConsole = encodeURIComponent(result[`console-name`]);

    // add variable for each particular result
    // $("#id").children('.price')
    // added result ID below and make it dynamic for each item

    const results = `<div id="resultId" class="results">
        <h2> ${result['product-name']} </h2>
        <img class="thumbnail" src="coin.png">
        <!-- later on, update the image using the YouTube thumbnail -->
        <h3 class="system"> System: ${result['console-name']} </h3>
        <p class="price"> ${dollarPrice} </p>
        <h4>Shop Now:</h4>
        <button class="btn btn-block" onclick="window.open('https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=`+fixedName+`%20`+fixedConsole+`')"><i class="fab fa-amazon fa-2x"></i></button>
        <button class="btn btn-block" onclick="window.open('https://www.ebay.com/sch/i.html?_nkw=`+fixedName+`%20`+fixedConsole+`&ssPageName=GSTL')"><i class="fab fa-ebay fa-2x"></i></button>        
    </div>`;
    return results;
    }

// function to add each HTML Div to page using .html
function displayResults(data) {
    const results = data.products.map((item, index) => renderResults(item));
    $('.js-main').html(results);
    // count total results and add to page
    const totalResults = Object.keys(results).length;
    const totalResultsHTML = `<h4> Total Results: ${totalResults} </h4>`;
    $('.js-results').html(totalResultsHTML);

    // data.products.forEach
    // getYoutubedata(id)
    // then update the dom for each element, find it select it and use .html to append thumbnail image
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
