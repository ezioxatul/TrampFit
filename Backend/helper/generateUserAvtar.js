
const generateUserAvtar = (fullName) => {
    fullName = fullName.split(' ');
    let name = '';

    fullName.map((val) => {
        name += val[0]
    })

    return name.toUpperCase();
}


module.exports = generateUserAvtar;