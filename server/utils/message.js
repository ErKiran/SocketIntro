var generateMessage= (from,text) => {
    return{
        from,
        text,
        CreatedAt: new Date().getTime()
    };

};
module.exports = {generateMessage};