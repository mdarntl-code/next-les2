'use client';

import { Wave } from 'react-animated-text';
import { useEffect } from 'react';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';

import css from './RatesPage.module.css';
import { latestRates } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function RatesPage() {
  const baseCurrency = useCurrencyStore((state) => state.baseCurrency);
  const setIsLoading = useCurrencyStore((state) => state.setIsLoading);
  const setIsError = useCurrencyStore((state) => state.setIsError);
  const setRates = useCurrencyStore((state) => state.setRates);

  const rates = useCurrencyStore((state) => state.rates);
  const isError = useCurrencyStore((state) => state.isError);
  const filter = useCurrencyStore((state) => state.filter);

  useEffect(() => {
    if (!baseCurrency) return;

    const fetchRates = async () => {
      try {
        setIsLoading(true);
        setIsError(null);

        const data = await latestRates(baseCurrency);
        setRates((data));
      } catch {
        setIsError('Opps... Try again!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, setIsError, setIsLoading, setRates]);

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter))
    .map(([key, value]) => ({
      key,
      value: (1 / value).toFixed(2),
    }));

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          <Filter />

          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}

          {filteredRates.length > 0 && <RatesList rates={filteredRates} />}
        </Container>
      </Section>
    </main>
  );
}
