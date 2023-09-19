
function httpResponse(json){
    const response = {
        success: json.success || true,
    }

    if(json.data){
        response.data = json.data;
    }else if(json.error){
        response.error = json.error;
    }else{
        response.unknown = json;
    }

    return response;
}

module.exports = httpResponse();