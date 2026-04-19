'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';

import css from './page.module.css';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import { useCurrencyStore } from '@/lib/stores/currencyStore';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const isError = useCurrencyStore(state => state.isError);
  const isLoading  = useCurrencyStore(state => state.isLoading);
  const exchangeInfo = useCurrencyStore(state => state.exchangeInfo);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading info title="What currencies do you want to exchange?🙂" />
          <ExchangeForm />
          { exchangeInfo && <ExchangeInfo {...exchangeInfo}/>}
          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
          {isLoading && <Loader />}
        </Container>
      </Section>
    </main>
  );
}
