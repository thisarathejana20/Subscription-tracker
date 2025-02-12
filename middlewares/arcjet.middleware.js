import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: "Rate limit reached" });
      if (decision.reason.isBot())
        return res.status(429).json({ error: "Bot not allowed" });
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  } catch (error) {
    console.log(`Arcjet middleware error: ${error.message}`);
    next(error);
  }
};

export default arcjetMiddleware;
