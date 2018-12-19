var fs = require('fs')

const read = (callback) => {
    fs.readFile('ipsum.txt', (err, data) => {
      if (err) {
        callback(null, 0); 
      } else {
        //data = JSON.parse(fileData)
        callback(null, data);
      }
    });
  };

  const genArr = (err, data) => {
    data = data.toString().split(' ');
    let n = 100
    let arr = [];
    var genPriceDollars = () => {
        dollar = Math.random().toString().slice(16)
        if (dollar === undefined || dollar[0] == 0 ) {
           return genPriceDollars()
        }
        else {
        return Number(dollar)
        }
    }
    var genPriceCents = () => {
        cents = Math.random().toString().slice(2,4)
        return Number(cents)
        }
    for (let i = 0; i < n; i++) {
        let temp = {
            title : String,
            author : String,
            id: i
        }
        //title, author
         let rand = Math.floor(Math.random()*n)
            temp.title = data[rand];
            rand = Math.floor(Math.random()*n)
            temp.author = data[rand]
            rand = Math.floor(Math.random()*n)
            temp.author = temp.author + " " + data[rand];
           // temp.imgUrl = temp.title + ' - ' + temp.author;
        
        //author
        //rating
        temp.rating = Number((Math.random()*5).toString().slice(0,3))

        //prime status
        temp.prime = Boolean(Math.round(Math.random()));

        //price
        temp.priceDollars = genPriceDollars();
        temp.priceCents = genPriceCents()

        //end
        arr.push(temp);
    }

    var genRelItems = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let tempArr = [];
            let tempLength = Math.floor(Math.random() * 30);
            for (let j = 0; j < tempLength; j++) {
                tempArr.push(arr[Math.floor(Math.random() * 100)]);
                arr[i].relevantItems = tempArr;

            }
        }
    }

    var genBuyTogether = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            let tempArr = [];
            let tempLength = Math.floor(Math.random() * 4);
            for (let j = 0; j < tempLength; j++) {
                tempArr.push(arr[Math.floor(Math.random() * 100)]);
                arr[i].boughtTogether = tempArr;

            }
        }
    }
    genRelItems(arr);
    genBuyTogether(arr);
    console.log(arr);
  }



  read(genArr);