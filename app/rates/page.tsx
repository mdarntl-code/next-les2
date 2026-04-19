'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';

import css from './RatesPage.module.css';
import { useEffect } from 'react';
import { latestRates } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import RatesList from '@/components/RatesList/RatesList';

export default function RatesPage() {
  const isError = false;
  const baseCurrency = useCurrencyStore(state => state.baseCurrency);
  const setIsLoading = useCurrencyStore(state => state.setIsLoading);
  const setIsError = useCurrencyStore(state => state.setIsError);
  const setRates = useCurrencyStore(state => state.setRates);
  const rates = useCurrencyStore(state => state.rates);
  

  useEffect(()=>{
    if(!baseCurrency) return;
    const fetchRates= async () => {
      try{
      setIsLoading(true);
      const data = await latestRates(baseCurrency);
      setRates(data);
    }catch{
      setIsError("Opps... Try again!");
    }finally{
      setIsLoading(false);
    }
    }
    fetchRates();
    
  },[setIsError,setIsLoading,setRates,baseCurrency])
  const fileredRates = rates
  .filter(([key]) => key !== baseCurrency)
  .map(([key, value]) => ({ key, value: (1 / value).toFixed(2) }));
  


  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}
          {fileredRates.length > 0 && <RatesList rates={fileredRates} />}

        </Container>
      </Section>
    </main>
  );
}
