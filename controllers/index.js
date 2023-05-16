const helloFunction = (req, res, next) => {
    res.json('Jason Huang');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('Super awesome person!');
};
module.exports = {helloFunction, returnAnotherPerson};