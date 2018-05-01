$( document ).ready(function() {

    //store necessary keys
    const TWITCH_CLIENT_ID = "cxzy4rz2gbrana3nh73ty2sgvj8s01";
    const VGPC_API_KEY = "d54ae2255c2fe8e39e936c398404eb52844da006";
    const GB_KEY = "4481200dc9e8799d83b4735342f8419d172c16cf";


    // create a div element containing the game information
    function renderResults(result) {
        // variable for parsed price
        const price = parseFloat(result['loose-price'] / 100).toFixed(2);
        const dollarPrice = `Loose price: $${price}`;

        const results = `<div class="results">
            <h2 class="title"> ${result['product-name']} </h2>
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

    // call VGPC for prices
    $.ajax({
        url: 'https://www.pricecharting.com/api/products?',
        data: {
            q: 'contra',
            t: VGPC_API_KEY
        },
        success: displayResults,
        });

    // add static example of pulling images first
        
    
});
    // TO DO

        // need to think about way to pair price and image API requests if it is needed - TBD, IDs do not match between APIs and no API has prices except VGPC

        // NICE TO HAVE

        // think of a way to create a dynamic dropdown to filter console based on query,
        // maybe using a GET request to populate an array based on console in the JSON response?
