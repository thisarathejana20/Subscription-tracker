import { createRequire } from "module";
//since we ecplicitly stated in package.json type:module require wont work
//so need to make require module work
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

export const sendReminders = serve();
