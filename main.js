const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://changanyuexia:OpqZByPOqyxBn08b@cluster0.efgidkh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("emails");

  document.forms[0].onsubmit = function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }

    collection.findOne({ email: email }, function(err, result) {
      if (err) {
        alert("An error occurred while checking the email address");
      } else if (result) {
        alert("Email address already in use");
      } else {
        collection.insertOne({ email: email }, function(err, result) {
          if (err) {
            alert("An error occurred while saving the email address");
          } else {
            alert("Email address saved successfully");
          }
        });
      }
    });
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
