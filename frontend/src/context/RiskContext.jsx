import React, { createContext, useContext, useState } from 'react';

const RiskContext = createContext();

export function RiskProvider({ children }) {
  const [risks, setRisks] = useState([]);

  const addRisk = (newRisk) => {
    setRisks((prevRisks) => [...prevRisks, newRisk]);
  };

  return (
    <RiskContext.Provider value={{ risks, addRisk }}>
      {children}
    </RiskContext.Provider>
  );
}

// Make sure this export ma
// tches what you import in your components
export function useRisks() {
  return useContext(RiskContext);
}