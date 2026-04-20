'use client';

import Select, { SingleValue } from 'react-select';
import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';
import { useCurrencyStore } from '@/lib/stores/currencyStore';

type OptionType = {
  label: string;
  value: string;
};

export default function SelectRates({ baseCurrency }: { baseCurrency: string }) {
  const setBaseCurrency = useCurrencyStore((state) => state.setBaseCurrency);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>

      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        options={symbols}
        isSearchable
        onChange={handleChange}
      />
    </div>
  );
}
