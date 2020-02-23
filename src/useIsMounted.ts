import { useState, useEffect } from "react";

export default function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsMounted(true), 50);
  }, []);
  return isMounted;
}
