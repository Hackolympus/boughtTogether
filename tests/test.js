import Axios from "axios";


var fetchData = () => {
    Axios.get('localhost'+'/listing/1').then((res) => {
        console.log(res)
    }).catch(err => console.log(err));
}
var makeGet = () => {
    Axios.get('localhost').then((res) => {
        return res;
    }).catch(err => console.log(err));
}

test('the data is an array of objects', () => {
    expect.assertions(1);
    return fetchData().then(data => {
        expect(typeof data[0]).toBe("Object")
    })
})

test('the statuscode is 200', () => {
    expect.assertions(1);
    return makeGet().then(data => {
        expect (data).toBe(200)
    })
})