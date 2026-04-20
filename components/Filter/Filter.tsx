'use client';

import styles from './Filter.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

export default function Filter() {
  const filter = useCurrencyStore((state) => state.filter);
  const setFilter = useCurrencyStore((state) => state.setFilter);

  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
      value={filter}
      onChange={(e) => setFilter(e.target.value.toLowerCase())}
    />
  );
}
