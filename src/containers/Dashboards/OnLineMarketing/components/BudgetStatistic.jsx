import React from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie } from 'recharts';
// import Panel from '@/shared/components/Panel';
// import Panel from '../../../Documentation/04_components/components/Panel';

const data01 = [{ value: 50, fill: '#4ce1b6' },
  { value: 50, fill: '#eeeeee' }];

const BudgetStatistic = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      This is container
    </div>
  );
};

export default BudgetStatistic;
