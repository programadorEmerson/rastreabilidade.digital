import { addDays } from 'date-fns';

import { TypesPlan } from '@@types/register';

export const numberFormatter = (
  value: number,
  style: 'decimal' | 'currency',
): string => {
  return new Intl.NumberFormat('pt-BR', { style, currency: 'BRL' }).format(
    value,
  );
};

export const returnDueDate = (plan: TypesPlan): string => {
  switch (plan) {
    case 'FREE':
      return addDays(new Date(), 9999).toISOString();
    case 'OURO':
      return addDays(new Date(), 180).toISOString();
    case 'PRATA':
      return addDays(new Date(), 90).toISOString();
    case 'BRONZE':
      return addDays(new Date(), 30).toISOString();
    default:
      return addDays(new Date(), 365).toISOString();
  }
};
