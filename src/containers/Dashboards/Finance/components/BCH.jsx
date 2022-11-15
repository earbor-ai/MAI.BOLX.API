import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import {
  AreaChart, Tooltip, Area, ResponsiveContainer, XAxis,
} from 'recharts';
import TrendingUpIcon from 'mdi-react/TrendingUpIcon';

const graphData = [{ name: 'Mon', bch: 70.23 },
  { name: 'Tue', bch: 80.5 },
  { name: 'Wed', bch: 38.45 },
  { name: 'Thu', bch: 89.2 },
  { name: 'Fri', bch: 105.61 },
  { name: 'Sat', bch: 98.6 },
  { name: 'Sun', bch: 115 }];

const CustomTooltip = ({ active, payload }) => {
  if (active) {
    return (
      <div className="dashboard__total-tooltip">
        <p className="label">{`$${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
};

CustomTooltip.defaultProps = {
  active: false,
  payload: null,
};

const BCH = ({ dir, clickEvent, style, data }) => {
  const [activeIndex] = useState(0);

  return (
    <Col md={12} xl={3} lg={6} xs={12} onClick={clickEvent} style={{ cursor: 'pointer' }}>
      <Card>
        <CardBody className="dashboard__card-widget" style={style}>
          <div className="card__title">
            <h5 className="bold-text">Total Shipments</h5>
            <h5 className="subhead">Shipments</h5>
          </div>
          <div className="dashboard__total dashboard__total--area">
            <TrendingUpIcon className="dashboard__trend-icon" />
            <p className="dashboard__total-stat">
              {data?.length}
            </p>
            <div className="dashboard__chart-container">
              <ResponsiveContainer height={70}>
                <AreaChart data={graphData} margin={{ top: 0, left: 0, bottom: 0 }}>
                  <Tooltip content={<CustomTooltip />} />
                  <XAxis
                    hide
                    reversed={dir === 'rtl'}
                  />
                  <Area
                    name="BCH"
                    type="monotone"
                    dataKey="bch"
                    fill="#6faae1"
                    stroke="#6faae1"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

BCH.propTypes = {
  dir: PropTypes.string.isRequired,
};

export default BCH;
