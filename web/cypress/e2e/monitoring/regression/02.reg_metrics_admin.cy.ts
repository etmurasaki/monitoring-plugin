import { runAllRegressionMetricsTests } from '../../../support/monitoring/02.reg_metrics.cy';
import { commonPages } from '../../../views/common';
import { nav } from '../../../views/nav';
import { guidedTour } from '../../../views/tour';
// Set constants for the operators that need to be installed for tests.
const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

describe('Regression: Monitoring - Metrics (Administrator)', () => {

  before(() => {
    cy.beforeBlock(MP);
  });

  beforeEach(() => {
    cy.visit('/');
    guidedTour.close();
    cy.validateLogin();
    nav.sidenav.clickNavLink(['Observe', 'Metrics']);
    commonPages.titleShouldHaveText('Metrics');
  });

   // Run tests in Administrator perspective
   runAllRegressionMetricsTests({
    name: 'Administrator',
  });

}); 