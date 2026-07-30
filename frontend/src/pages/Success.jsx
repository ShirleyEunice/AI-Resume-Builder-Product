import React, { useEffect, useRef, useState } from "react";
  import { Link, useSearchParams } from "react-router-dom";
  import { CheckCircle2, Loader2, XCircle } from "lucide-react";
  import { verifySession } from "../services/paymentService";
  import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/authSlice";

  const Success = () => {
    const [params] = useSearchParams();
    const sessionId = params.get("session_id");
    const dispatch = useDispatch();

    const [status, setStatus] = useState("verifying"); // verifying | success | error
    const [result, setResult] = useState(null); // { creditsAdded, credits }
    const ranOnce = useRef(false); // guard against StrictMode double-run

    useEffect(() => {
      if (ranOnce.current) return;
      ranOnce.current = true;

      if (!sessionId) {
        setStatus("error");
        return;
      }

      verifySession(sessionId)
        .then((data) => {
          setResult(data);
          setStatus("success");
          dispatch(updateUser({ credits: data.credits, isPremium: data.isPremium }));
        })
        .catch(() => setStatus("error"));
    }, [sessionId]);

    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-cloud px-4">
        <div className="w-full max-w-md rounded-3xl border bg-white p-8 text-center shadow-soft">
          {status === "verifying" && (
            <>
              <Loader2 className="mx-auto size-10 animate-spin text-brand-primary" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
                Confirming your payment…
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Hang tight, this only takes a second.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="mx-auto size-12 text-brand-primary" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
                Payment successful
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {result?.creditsAdded > 0
                  ? `${result.creditsAdded.toLocaleString()} credits added.`
                  : "Your credits are already on your account."}
              </p>
              <p className="mt-1 text-sm font-medium text-brand-primary">
                New balance: {result?.credits?.toLocaleString()} credits
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 w-full bg-brand-primary text-white shadow-brand hover:bg-teal-600"
              >
                <Link to="/dashboard">Back to dashboard</Link>
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="mx-auto size-12 text-destructive" />
              <h1 className="mt-4 font-display text-2xl font-semibold text-brand-ink">
                We couldn't confirm your payment
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                If you were charged, your credits will still arrive automatically.
                Contact support if they don't show up shortly.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-6 w-full"
              >
                <Link to="/dashboard">Back to dashboard</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  export default Success;