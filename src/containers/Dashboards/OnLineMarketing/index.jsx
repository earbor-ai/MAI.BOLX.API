import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Col, Container, Row } from 'reactstrap';
import { RTLProps } from '../../../shared/prop-types/ReducerProps';
import ABTestingAnalytics from './components/ABTestingAnalytics';


const OnLineMarketingDashboard = ({ rtl }) => {
  const { t } = useTranslation('common');

  return (
    <Container className="dashboard">
      <Row>
        <Col md={12}>
          <h4 className="page-title">{t('Add SKU')}</h4>
        </Col>
      </Row>
      <Row>  
        <ABTestingAnalytics dir={rtl.direction} />
      </Row>
    </Container>
  );
};

OnLineMarketingDashboard.propTypes = {
  rtl: RTLProps.isRequired,
};

export default compose(connect(state => ({
  rtl: state.rtl,
})))(OnLineMarketingDashboard);
