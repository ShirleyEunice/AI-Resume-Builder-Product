// ── Credit packs (one-time purchases) ──────────────────────────────
// Single source of truth for the pricing catalog. The server ALWAYS
// derives price + credits from here using the planId sent by the client
// — never trust an amount coming from the browser.
//
// `amount` is the smallest currency unit (paise for INR): ₹99 = 9900.

export const creditPlans = {
  starter: {
    id: "starter",
    name: "Starter",
    description: "Enough credits to polish a resume and run a few ATS scans.",
    credits: 500,
    amount: 9900, // ₹99.00
    currency: "inr",
    badge: null,
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Best value — cover letters, interviews and heavy AI usage.",
    credits: 2000,
    amount: 29900, // ₹299.00
    currency: "inr",
    badge: "Best value",
  },
  power: {
    id: "power",
    name: "Power",
    description: "A large stockpile for power users and job-hunt sprints.",
    credits: 6000,
    amount: 79900, // ₹799.00
    currency: "inr",
    badge: null,
  },
};

// Returns the plan for a given id, or null if it isn't a real plan.
export const getPlan = (planId) => creditPlans[planId] || null;

// Convenience list for API responses / UI rendering.
export const listPlans = () => Object.values(creditPlans);
