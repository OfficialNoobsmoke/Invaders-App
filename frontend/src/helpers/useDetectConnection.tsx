import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useDetectConnection = () => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (isSlow) {
      toast("Low connection to internet", { position: "top-center" });
    }
  }, [isSlow]);

  useEffect(() => {
    // @ts-ignore
    const isChromium = window?.chrome;
    if (isChromium) {
      // @ts-ignore
      navigator?.connection?.addEventListener("change", (c) => {
        setIsSlow(c?.target?.downlink > 0 && c?.target?.downlink < 2);
      });
    }

    window.addEventListener("offline", () => {
      toast("No connection to internet");
    });

    window.addEventListener("online", () => {
      toast("Connection established");
    });
  }, []);
};
