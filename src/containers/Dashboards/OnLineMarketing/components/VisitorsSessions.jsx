import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  PieChart, Pie, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
// import Panel from '@/shared/components/Panel';
// import Panel from '../../../Documentation/04_components/components/Panel';
// import getTooltipStyles from '@/shared/helpers';
import getTooltipStyles from '../../../../shared/helpers';

const data01 = [{
  id: 0, name: 'Chrome', value: 12934, fill: '#4ce1b6',
}, {
  id: 1, name: 'Safari', value: 9934, fill: '#70bbfd',
}, {
  id: 2, name: 'Mozilla', value: 20432, fill: '#f6da6e',
}, {
  id: 3, name: 'IE', value: 15432, fill: '#ff4861',
}];

const style = {
  left: 0,
  width: 150,
  lineHeight: '24px',
  position: 'relative',
};

const renderLegend = ({ payload }) => (
  <ul className="dashboard__chart-legend">
    {payload.map(entry => (
      <li key={entry.payload.id}><span style={{ backgroundColor: entry.color }} />{entry.value}</li>
    ))}
  </ul>
);

renderLegend.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

const VisitorsSessions = ({ dir, themeName }) => {
  const { t } = useTranslation('common');
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    if (e.tooltipPosition) {
      setCoordinates({ x: dir === 'ltr' ? e.tooltipPosition.x : e.tooltipPosition.x / 10, y: e.tooltipPosition.y });
    }
  };

  return (
    <div>
     This is a CONTAINER
    </div>
  );
};

VisitorsSessions.propTypes = {
  dir: PropTypes.string.isRequired,
  themeName: PropTypes.string.isRequired,
};

export default connect(state => ({ themeName: state.theme.className }))(VisitorsSessions);
