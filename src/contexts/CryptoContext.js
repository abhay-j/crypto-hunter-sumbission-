import React, { useContext, createContext, useState, useEffect } from "react";

const crypto = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
  const value = {
    currency,
    setCurrency,
    symbol,
  };
  return <crypto.Provider value={value}>{children}</crypto.Provider>;
};

export default CryptoContext;
export const CryptoState = () => {
  return useContext(crypto);
};
