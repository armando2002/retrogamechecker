$( document ).ready(function() {

    //store necessary keys
    const TWITCH_CLIENT_ID = "cxzy4rz2gbrana3nh73ty2sgvj8s01";
    const VGPC_API_KEY = "d54ae2255c2fe8e39e936c398404eb52844da006";
    const GB_KEY = "4481200dc9e8799d83b4735342f8419d172c16cf";

    var testFunction = function(arg1){
        console.log(arg1);

    }
    
    var testFunction2 = function(arg2){
        console.log(arg2);
    }
    // call VGPC for prices
    $.ajax({
        url: 'https://www.pricecharting.com/api/products?',
        data: {
            q: 'contra',
            t: VGPC_API_KEY
        },
        // make a 2nd ajax call to twitch to grab images based on IDs (if they match)
        success: testFunction,
        });

    // call Twitch for image based on ID from VGPC
    $.ajax({
        url: 'https://api.twitch.tv/helix/games',
        data: {
            'Client-ID': TWITCH_CLIENT_ID,
            id: '12139',
        },
        success: testFunction2,
    });

    // add static example of pulling images first
        
    
});
    // TO DO

        // need to think about way to pair price and image API requests if it is needed

        // need to convert price to USD (ex. 4009 to $40.09)
        // parseFloat(4009/100).toFixed(2) per Krishna

        // think of a way to create a dynamic dropdown to filter console based on query, maybe using a GET request to populate an array based on console in the JSON response?
