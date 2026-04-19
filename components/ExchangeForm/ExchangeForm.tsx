'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { exchangeCurrency } from '@/lib/service/exchangeAPI';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function ExchangeForm() {
  const setChangeInfo = useCurrencyStore(state => state.setExchangeInfo);
  const setIsLoading = useCurrencyStore(state => state.setIsLoading);
  const setIsError = useCurrencyStore(state => state.setIsError);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currency = formData.get("currency") as string;
    const [amount,from, ,to] = currency.split(" ");
    try{
      setIsLoading(true);
      setIsError(null);
      setChangeInfo(null);
      const data = await exchangeCurrency({amount: Number(amount),from,to});
      setChangeInfo(data);
    }catch{
      setChangeInfo(null);
      setIsError("Opss.. Try again!");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
      />
    </form>
  );
}
