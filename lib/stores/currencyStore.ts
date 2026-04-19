import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyState = {
    baseCurrency: string;
    hasHydrated: boolean;
    setBaseCurrency: (currency: string) => void;
    setHasHydrated: (state: boolean) => void; 
  };
  
  export const useCurrencyStore = create <CurrencyState>()(persist((set) => ({
    baseCurrency: "",
    hasHydrated: false,
    setBaseCurrency: (currency) => set({baseCurrency: currency}),
    setHasHydrated: (state) => set({hasHydrated: state})
  }),{
    name: 'currency-storage',
    partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    }
    },))


  