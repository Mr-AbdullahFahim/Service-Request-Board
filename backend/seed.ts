import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "./config/db";
import JobRequest from "./models/JobRequest";

const seedData = [
  {
    title: "Leaking Kitchen Sink",
    description: "The pipe under the kitchen sink is leaking heavily. Need immediate assistance as the water is spreading across the kitchen floor and might cause water damage to the cabinets. It seems to be coming from the U-bend trap, and I have temporarily placed a bucket underneath.",
    category: "Plumbing",
    location: "123 Main St, Springfield",
    contactName: "John Doe",
    contactEmail: "john@example.com",
    status: "Open"
  },
  {
    title: "Flickering Lights in Living Room",
    description: "The ceiling lights in the living room keep flickering and sometimes go out completely. I have tried changing the lightbulbs but the issue persists, leading me to believe it might be a wiring issue or a faulty dimmer switch that needs professional inspection.",
    category: "Electrical",
    location: "456 Elm St, Springfield",
    contactName: "Jane Smith",
    contactEmail: "jane@example.com",
    status: "Open"
  },
  {
    title: "Paint Master Bedroom",
    description: "Looking to repaint the master bedroom. Walls are currently white, want them painted light blue. Paint will be provided. The room is approximately 15x20 feet. All furniture will be moved to the center and covered. I also need minor patching done on a few small nail holes before painting.",
    category: "Painting",
    location: "789 Oak Ave, Springfield",
    contactName: "Bob Johnson",
    contactEmail: "bob@example.com",
    status: "In Progress"
  },
  {
    title: "Custom Bookshelf Construction",
    description: "Need a custom wooden bookshelf built for the home office. Approximate dimensions: 6ft high, 4ft wide. I am looking for a modern design with adjustable shelves, made from oak or a similar durable hardwood. The piece should be stained to match an existing desk in the room.",
    category: "Joinery",
    location: "321 Pine Rd, Springfield",
    contactName: "Alice Brown",
    contactEmail: "alice@example.com",
    status: "Open"
  },
  {
    title: "AC Not Cooling",
    description: "The central AC unit is running but blowing warm air. Filter was replaced recently. The thermostat seems to be working fine, but the outdoor unit's fan doesn't appear to be spinning as fast as usual. Need someone to check the refrigerant levels and the compressor as soon as possible before summer peaks.",
    category: "HVAC",
    location: "654 Cedar Ln, Springfield",
    contactName: "Charlie Davis",
    contactEmail: "charlie@example.com",
    status: "Closed"
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    await JobRequest.deleteMany();
    console.log("Existing job requests cleared");

    await JobRequest.insertMany(seedData);
    console.log("5 service requests seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedDB();
