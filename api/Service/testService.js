function test(bool) {
    if (bool) return Promise.resolve({
        status: "good",
        message: "esh"
    }); 
    else return Promise.reject(new Error('you sent empty string'));
} 

module.exports = {
    test
}