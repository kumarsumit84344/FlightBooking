const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
require("./config");
const fs = require("fs");
const userSchema = require("./Schemas/user");
const SeatsSchema = require("./Schemas/seats");
const imageSchema = require("./Schemas/image");
const flightSchema = require("./Schemas/flight");
const airlineSchema = require("./Schemas/airlines");
const traveldetailsSchema = require("./Schemas/traveldetails");
const { Console } = require("console");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  let data = new userSchema(req.body);
  let result = await data.save();
  console.log(result);
  res.send(result);
});

app.post("/login", async (req, res) => {
  let loggedUser
  const request = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const data = await userSchema.findOne({ email: request.email });
    if (data) {
      let match = data.password === request.password;
      loggedUser=request.email
      if (match) {
        res.json(("AUTHORIZED", "Login Succesfull"));
        return;
      } else {
        res
          .status(401)
          .json(("UNAUTHORIZED", "Invalid Credentials"));
        return;
      }
    } else {
      res
        .status(404)
        .json(
         (
            "USER_NOT_FOUND",
            `No user found with ${request.email}`
          )
        );
      return;
    }
    throw new Error("User Not Found", "USER_NOT_FOUND");
  } catch (err) {
    console.log(err);
    res.status(500).json(AppUtils.generateError(err.code, err.message));
  }
});


  
app.post("/flight", async (req, res) => {
  let data = new flightSchema(req.body);
  let result = await data.save();
  console.log(result);
  res.send(result);
});
app.get("/flight", async (req, res) => {
  const all_flight = new Array();
  const flight_data = await flightSchema.find();
  for (let data of flight_data) {
    all_flight.push({
      id: data._id,
      name: data.name,
      airport: data.airport,
    });
  }
  res.json({all_flight });
});

app.post("/airlines",async (req, res) => {
  let airline_data = new airlineSchema(req.body);
  await airline_data.save();
  console.log(airline_data);
  res.send(airline_data);
});

app.post("/airlinesdata", async (req, res) => {
  const request = {
    sourceAirport: req.body.sourceAirport,
    destinationAirport: req.body.destinationAirport
  };
  try {
    const data = await airlineSchema.find({ sourceAirport: request.sourceAirport, destinationAirport: request.destinationAirport });
    const all_airlines = new Array();
    if (data) {
      for (let detail of data){
        all_airlines.push({
             name: detail.name,
             source: detail.source,
             sourceAirport:detail.sourceAirport,
             sourceAirportCode:detail.sourceAirportCode,
             departureTime:detail.departureTime,
             layover: detail.layover,
             destination: detail.destination,
             destinationAirport:detail.destinationAirport,
             destinationAirportCode:detail.destinationAirportCode,
             arrivalTime:detail.arrivalTime,
             fare:detail.fare,
             duration:detail.duration
         })

      }
      res.json({all_airlines });
    } else {
      res
        .status(404)
        .json(
         (
            "FLIGHT_NOT_FOUND",
            `No Flight found with ${request.source} to ${request.destination}`
          )
        );
      return;
    }
    
  } catch (err) {
    console.log(err);

  }
  
  
});


app.post("/seats", async (req, res) => {
  const seat_info = new Array();
  let m = 13, n = 6;
  let count = 1;
for( let i = 0; i < m ; i++) {
  let row = []
  for (let j = 0; j < n; j++) {
    let seat = {
      SeatNo : count++,
      color : '',
      booked: false,
      isSelected: false,
      price: '',
    }
    if( j == 0 || j == n - 1) {
      seat.color = '#ff000099';
      seat.price = '1300'
    } else if (  j == 1 || j == n - 2) {
      seat.color = '#00800099';
      seat.price = '700'
    } else {
      seat.color = '#0000ff99';
      seat.price = '500'
    }
    row.push(seat);
    
  }
  seat_info.push(row);
  }
  try {
    for (const data of seat_info) {
      for (const seatdata of data) {
        let seat_data = new SeatsSchema(seatdata);
        await seat_data.save()
      }
    }
    return res.status(200).json({message:'success'})
  }
  catch (error) {
    console.error("An error occurred:", error);
    return res.status(500).json({message:'error'})
  }
  
});

app.get('/seatdata', async (req, res) => {
  // const data = await SeatsSchema.find();
  // res.json({ data: data });
  const all_Seat = new Array();
  const seat_data = await SeatsSchema.find();
  for (let data of seat_data) {
    all_Seat.push({
      SeatNo: data.SeatNo,
      color: data.color,
      booked: data.booked,
      isSelected: data.isSelected,
      price: data.price
    });
  }
  res.json({all_seat: all_Seat });
})

app.post('/addtraveller',async (req, res) => {
   let data = new traveldetailsSchema(req.body);
  let result = await data.save();
  console.log(result);
  res.send(result);
})


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("user_file"), (req, res) => {
//   const file = new imageSchema({
//     name: req.body.name,
//     image: {
//       data: fs.readFileSync("uploads/" + req.file.filename),
//       contentType: "image/png",
//     },
//   });
//   res.send(file);
//   file
//     .save()
//     .then((res) => console.log("image uploaded"))
//     .catch((err) => console.log(err, "error uploading"));
// });

app.listen(3000);
