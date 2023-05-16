const helloFunction = (req, res, next) => {
    res.json('Ella Yang');
};

const returnAnotherPerson = (req, res, next) => {
    res.json('Super awesome person!');
};
module.exports = {helloFunction, returnAnotherPerson};