import { nav } from '../../../views/nav';
import { alerts } from '../../../fixtures/monitoring/alert';
import { guidedTour } from '../../../views/tour';
import { runAllRegressionAlertsTests } from '../../../support/monitoring/01.reg_alerts.cy';
import { commonPages } from '../../../views/common';

const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

// Test suite for Administrator perspective
describe('Regression: Monitoring - Alerts (Administrator)', () => {

  before(() => {
    cy.beforeBlock(MP);
  });

  beforeEach(() => {
    cy.visit('/');
    guidedTour.close();
    cy.validateLogin();
    alerts.getWatchdogAlert();
    nav.sidenav.clickNavLink(['Observe', 'Alerting']);
    commonPages.titleShouldHaveText('Alerting');
    alerts.getWatchdogAlert();
  });

  // Run tests in Administrator perspective
  runAllRegressionAlertsTests({
    name: 'Administrator',
  });

});
