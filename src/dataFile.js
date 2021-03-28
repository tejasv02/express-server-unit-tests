const data = {};

function getData() {
    return data;
}


function setData(key, value) {
    data[key] = value;
}


module.exports = {getData, setData};