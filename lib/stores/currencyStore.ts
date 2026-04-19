import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ExchangeInfo{
    amount: number;
    from: string;
    to: string;
    rate: number;
    result: number;
  }

type CurrencyState = {
    baseCurrency: string;
    hasHydrated: boolean;
    exchangeInfo: ExchangeInfo | null;
    isLoading: boolean;
    isError: null | string;
    rates: [string,number][];
    setBaseCurrency: (currency: string) => void;
    setHasHydrated: (state: boolean) => void; 
    setExchangeInfo: (info: ExchangeInfo | null) => void;
    setIsLoading: (loading: boolean) => void;
    setIsError: (error: null | string) => void;
    setRates: (rates: [string,number][]) => void;
  };
  
  export const useCurrencyStore = create <CurrencyState>()(persist((set) => ({
    baseCurrency: "",
    hasHydrated: false,
    exchangeInfo: null,
    isLoading: false,
    isError: null,
    rates: [],
    setBaseCurrency: (currency) => set({baseCurrency: currency}),
    setHasHydrated: (state) => set({hasHydrated: state}),
    setExchangeInfo: (info) => set({exchangeInfo: info}),
    setIsLoading: (loading) => set({isLoading: loading}),
    setIsError: (error) => set({isError: error}),
    setRates: (rates) => set({rates: rates})
   }),{
    name: 'currency-storage',
    partialize: (state) => ({ baseCurrency: state.baseCurrency }),
    onRehydrateStorage: () => (state) => {
      state?.setHasHydrated(true);
    }
    },))


  