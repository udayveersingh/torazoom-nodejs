const throwError = (error) => {
    console.log("Error: ", error);
    throw new Error(`Error: ${error}`);
}

module.exports = throwError;