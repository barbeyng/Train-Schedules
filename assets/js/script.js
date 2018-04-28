//  Link to own firebase
var config = {
    apiKey: "AIzaSyBh25ig7vlDzrpVmwensW5fHzUQox__rHU",
    authDomain: "train-schedule-5ea50.firebaseapp.com",
    databaseURL: "https://train-schedule-5ea50.firebaseio.com",
    projectId: "train-schedule-5ea50",
    storageBucket: "train-schedule-5ea50.appspot.com",
    messagingSenderId: "449078900097"
};
firebase.initializeApp(config);

var database = firebase.database();

// Add function to when 'submit' button pressed
$("#data-submit").on("click", function (event) {
    event.preventDefault();

    // Capture user input into a variable
    var trainInput = $("#train-name").val().trim();
    var destinationInput = $("#train-destination").val().trim();
    var timeInput = $("#train-time").val().trim();
    var frequencyInput = $("#train-frequency").val().trim();

    alert("you entered a new train schedule.");

    // Clear the fields
    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");

    // Create new train variable with properties to be pushed to database
    var newTrain = {
        name: trainInput,
        destination: destinationInput,
        time: timeInput,
        frequency: frequencyInput,
    };

    // Push new train and properties to database
    database.ref().push(newTrain);

});

// Create a row in firebase when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().destination);
    // console.log(childSnapshot.val().time);
    // console.log(childSnapshot.val().frequency);

    // Storing into variables to be used later
    var trainName = childSnapshot.val().name;
    var destinationName = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().time;
    // console.log(firstTime);
    var trainFrequency = childSnapshot.val().frequency;
    // console.log(trainFrequency);


    // MATHS

    var timeNow = moment();
    console.log("the current time: " + timeNow);

    // Difference between first train time and now
    var difference = moment().subtract(moment(firstTime), "minutes");
    console.log("minutes between times: " + difference);

    // Find remainder to subtract from frequency
    var remainder = difference % trainFrequency;
    console.log(remainder);

    // Calc time remaining until next train
    var timeRemaining = trainFrequency - remainder;
    console.log("time until next train: " + timeRemaining);

    // Next Train
    var nextTrain = moment().add(timeRemaining, "minutes");
    console.log("arrival time: " + nextTrain);
    
    var nextTrainPretty = moment(nextTrain).format("HH:mm");

    $("#train-data").append("<tr><td>" + trainName + "</td>" +
        " <td> " + destinationName + "</td>" +
        " <td>" + trainFrequency + "</td>" +
        "<td>" + nextTrainPretty + "</td>" +
        "<td>" + timeRemaining + "</td></tr>");
});






