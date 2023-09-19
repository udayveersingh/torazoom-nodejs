const PAGE = 1;
const LIMIT = 10;
const requestHandler = (params) => {

    // manage Pagination data
    const limit = (params.limit) || LIMIT;
    const page = (params.page) || PAGE;    
    const skip = ( (page-1) * limit);

    // Manage Filter Options
    const filter = {};
    for(const [key, value] of Object.entries(params) ){
        if(key !== "populate"){
            filter[key] = value;
        }
    }


    // Handle populate field data
    var populate = false;
    if(params.populate){
        populate = params.populate;
    }

    // Return request parameters as arguments
    return { 
        skip, limit, page, filter, populate
    };
}

module.exports = requestHandler;