$( document ).ready(function() {

    //store necessary keys
    const TWITCH_CLIENT_ID = "cxzy4rz2gbrana3nh73ty2sgvj8s01";
    const VGPC_API_KEY = "d54ae2255c2fe8e39e936c398404eb52844da006";

    var testFunction = function(arg1, arg2){
        console.log(arg1);
    }
    $.ajax({
        url: 'https://www.pricecharting.com/api/products?',
        data: {
            q: 'contra',
            t: VGPC_API_KEY
        },
        success: testFunction,
        });

    // add static example of pulling images first
        
    
});
    // to do

    // need to think about way to pair price and image API requests if it is needed

    // need to convert price to USD (ex. 4009 to $40.09)

    // think of a way to create a dynamic dropdown to filter console based on query, maybe using a GET request to populate an array based on console in the JSON response?
