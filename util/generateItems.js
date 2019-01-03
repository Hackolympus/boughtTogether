var fs = require("fs");
var db = require("../db/mongoose_db").db;

const read = callback => {
  fs.readFile("ipsum.txt", (err, data) => {
    if (err) {
      callback(null, 0);
    } else {
      //data = JSON.parse(fileData)
      callback(null, data);
    }
  });
};

const genArr = (err, data) => {
  data = data.toString().split(" ");
  let n = 101;
  let arr = [];
  var genPriceDollars = () => {
    dollar = Math.random()
      .toString()
      .slice(16);
    if (dollar === undefined || dollar[0] == 0) {
      return genPriceDollars();
    } else {
      return Number(dollar);
    }
  };
  var genPriceCents = () => {
    cents = Math.random()
      .toString()
      .slice(2, 4);
    return Number(cents);
  };
  for (let i = 0; i < n; i++) {
    let temp = {
      title: String,
      author: String,
      id: i,
      relevantItems: [],
      boughtTogether: []
    };
    //title, author
    let rand = Math.floor(Math.random() * n);
    temp.title = data[rand];
    rand = Math.floor(Math.random() * n);
    temp.author = data[rand];
    rand = Math.floor(Math.random() * n);
    temp.author = temp.author + " " + data[rand];
    // temp.imgUrl = temp.title + ' - ' + temp.author;

    //author
    //rating
    temp.rating = Number((Math.random() * 5).toString().slice(0, 3));
    temp.ratingCount = Number((Math.random() * 5).toString().slice(15));

    //prime status
    temp.prime = Boolean(Math.round(Math.random()));

    //price
    temp.priceDollars = genPriceDollars();
    temp.priceCents = genPriceCents();
    temp.price = Number(temp.priceDollars + "" + temp.priceCents);
    //end
    arr.push(temp);
  }

  var genRelItems = (obj, arr) => {
    // for (let i = 0; i < arr.length; i++) {
      // let tempArr = [];l
      let tempObj = {};
      let tempLength = Math.floor(Math.random() * 25)+15;
      for (let j = 0; j < tempLength; j++) {
        // tempArr.push(arr[Math.floor(Math.random() * n)]);
        // arr[i].relevantItems = tempArr;
        let rand = arr[Math.floor(Math.random() * n)].id;      
       
        if(!tempObj[rand]) { 
        tempObj[rand] = rand;
        obj.relevantItems.push(rand)
      }
    }
  };

  var genBuyTogether = (obj, arr) => {
    // for (let i = 0; i < arr.length; i++) {
      // let tempArr = [];
      let tempObj = {};
      let tempLength = Math.floor(Math.random() * 4);
      for (let j = 0; j < tempLength; j++) {
        // tempArr.push(arr[Math.floor(Math.random() * n)]);
        // arr[i].boughtTogether = tempArr;
        let rand = arr[Math.floor(Math.random() * n)].id
        
        if(!tempObj[rand]) {
        tempObj[rand] = rand;
        obj.boughtTogether.push(rand)
      }
    }
    obj.boughtTogether.unshift(obj.id)
  };
  var itemModel = db.model;
  //make objectID 
  for (let i = 0; i < arr.length; i++) {
      arr[i] = new itemModel(arr[i]);
  }

    //make relevantitems and boughttogether then save
  arr.map(item => {
    genRelItems(item, arr);
    genBuyTogether(item, arr);
    item.save(err => {
      if (err) {
        console.log(err);
      }
    });
    console.log(item, 'saved');
  });
};

read(genArr);
