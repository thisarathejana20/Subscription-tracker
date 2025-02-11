import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 1,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than zero"],
    },
    currency: {
      type: String,
      required: [true, "Subscription currency is required"],
      enum: ["USD", "EUR", "GBP", "JPY", "CAD"],
    },
    frequency: {
      type: String,
      required: [true, "Subscription frequency is required"],
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      required: [true, "Subscription category is required"],
      enum: [
        "sports",
        "news",
        "entertainment",
        "lifestyle",
        "technology",
        "finance",
        "politics",
        "other",
      ],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
    },
    status: {
      type: String,
      required: [true, "Subscription status is required"],
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= Date.now(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate;
        },
        message: "Renewal date must be in the future",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      //index true will help querying data efficiently
      index: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

//Auto calculate renewal date if missing
//schema.pre ===> this will automatically call the attached function prior to calling model.create
subscriptionSchema.pre("save", async function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  //auto update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "inactive";
  }

  // continue with the next middleware or save the document
  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
