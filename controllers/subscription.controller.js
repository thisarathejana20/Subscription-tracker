import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.id) {
      const error = new Error("You are not the owner of this subscription");
      error.status = 403;
      throw error;
    }
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
