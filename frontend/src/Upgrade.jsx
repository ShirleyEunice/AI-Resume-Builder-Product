 import React, { useEffect, useState } from "react";
  import toast from "react-hot-toast";
  import { Button } from "./components/ui/button";
  import { getPlans, createCheckoutSession } from "./services/paymentService";

  const Upgrade = () => {
    const [plans, setPlans] = useState([]);
    const [loadingId, setLoadingId] = useState(null); // which pack is mid-checkout

    // Fetch the catalog once when the page mounts.
    useEffect(() => {
      getPlans()
        .then((data) => setPlans(data.plans))
        .catch(() => toast.error("Couldn't load plans. Try again."));
    }, []);

    const handleBuy = async (planId) => {
      try {
        setLoadingId(planId);
        const { url } = await createCheckoutSession(planId);
        window.location.href = url; // hand off to Stripe Checkout
      } catch (err) {
        toast.error("Couldn't start checkout. Try again.");
        setLoadingId(null);
      }
    };

    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="font-display text-3xl font-semibold text-brand-ink">
          Top up your credits
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Buy a pack whenever you run low — no subscription, credits never expire.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {plans.map((plan) => {
            const isBest = plan.badge === "Best value";
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-3xl border bg-white p-6 shadow-soft ${
                  isBest ? "border-brand-primary ring-1 ring-brand-primary" : ""
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-6 rounded-full bg-brand-primary px-3 py-1
  text-xs font-medium text-white shadow-brand">
                    {plan.badge}
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold text-brand-ink">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-brand-ink">
                    ₹{plan.amount / 100}
                  </span>
                  <span className="text-sm text-muted-foreground">one-time</span>
                </div>
                <p className="mt-1 text-sm font-medium text-brand-primary">
                  {plan.credits.toLocaleString()} credits
                </p>

                <Button
                  size="lg"
                  onClick={() => handleBuy(plan.id)}
                  disabled={loadingId !== null}
                  className="mt-6 w-full bg-brand-primary text-white shadow-brand hover:bg-teal-600"
                >
                  {loadingId === plan.id ? "Redirecting…" : "Buy credits"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default Upgrade;