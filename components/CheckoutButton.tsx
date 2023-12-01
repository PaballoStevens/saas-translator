"use client"

import { db } from "@/firebase";
import { addDoc,collection,onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react"
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton"
import { Button } from "./ui/button";

function CheckoutButton() {
    const {data: session} = useSession();
    const [loading, setLoading] = useState(false);
    const subscription = useSubscriptionStore((state) => state.subscription);

    const isLoadingSubscription = subscription === undefined;
    const isSubscribed =
    subscription?.status === "active" && subscription?.role === "pro";

    const createCheckoutSession = async () => {
      if (!session?.user.id) return;

      setLoading(true)

      const docRef = await addDoc(
        collection(db, 'customers', session.user.id, 'checkout_sessions' ), {
         price: "price_1O6savDEECnDvGw4IeVHxovF",
         success_url: window.location.origin,
         cancel_url: window.location.origin,
      }
      );

      return onSnapshot(docRef , (snap) => {
        const data = snap.data();
        const url = data?.url;
        const error = data?.error;

        if (error) {
          alert(`An error occured: ${error.message}`);
          setLoading(false);
        }

        if (url) {
          window.location.assign(url);
          setLoading(false);
        }
      });
    };

  return( 
    <div className="flex flex-col space-y-2">
  <div onClick={() => createCheckoutSession()}  className="mt-8 block rounded-md bg-indigo-600 px-3.5 py-2 text-center text-zm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:ourline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer disabled:opacity-80">
    {isSubscribed ? (
      <ManageAccountButton />
    ) : isLoadingSubscription || loading ? (<LoadingSpinner /> )  : (
      <Button onClick={() => createCheckoutSession()}>Sign Up</Button>
    )}
  </div>
  </div>
  )
}

export default CheckoutButton