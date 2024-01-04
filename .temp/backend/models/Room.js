"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var roomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter room name"],
        trim: true,
        maxLength: [200, "Room name cant exceed 200 characters"]
    },
    description: {
        type: String,
        required: [true, "Please enter room description"]
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please enter room price per night"],
        default: 0.0
    },
    address: {
        type: String,
        required: [true, "Please enter room address"]
    },
    location: {
        type: {
            type: String,
            enum: "Point"
        },
        coordinates: {
            type: [Number],
            index: "2dsphere"
        },
        formattedAddress: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please enter room guest capacity"],
    },
    numOfBeds: {
        type: Number,
        required: [true, "Please enter number of beds in room"],
    },
    isInternet: {
        type: Boolean,
        default: false
    },
    isBreakfast: {
        type: Boolean,
        default: false
    },
    isAirconditioned: {
        type: Boolean,
        default: false
    },
    isPetsAllowed: {
        type: Boolean,
        default: false
    },
    isRoomCleaning: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter room category"],
        enum: {
            values: ["King", "Single", "Twin"],
            message: ["Please select correct categry for room"]
        },
    },
    reviews: [
        {
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
        }
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.models.Room || mongoose_1.default.model("Room", roomSchema);
