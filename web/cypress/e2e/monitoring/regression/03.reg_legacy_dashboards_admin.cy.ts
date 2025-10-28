import { runAllRegressionLegacyDashboardsTests } from '../../../support/monitoring/03.reg_legacy_dashboards.cy';
import { nav } from '../../../views/nav';
import { guidedTour } from '../../../views/tour';

const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

describe('Regression: Monitoring - Dashboards (Administrator)', () => {

  before(() => {
    cy.beforeBlock(MP);
  });

  beforeEach(() => {
    cy.visit('/');
    guidedTour.close();
    cy.validateLogin();
    nav.sidenav.clickNavLink(['Observe', 'Dashboards']);
  });

  runAllRegressionLegacyDashboardsTests({
    name: 'Administrator',
  });

});