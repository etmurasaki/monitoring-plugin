import { nav } from '../../../views/nav';
import { runAllRegressionLegacyDashboardsTests } from '../../../support/monitoring/03.reg_legacy_dashboards.cy';
import { guidedTour } from '../../../views/tour';
// Set constants for the operators that need to be installed for tests.
const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

describe('Regression: Monitoring - Dashboards (Legacy)', () => {

  before(() => {
    cy.beforeBlock(MP);
  });
  beforeEach(() => {
    cy.visit('/');
    guidedTour.close();
    cy.validateLogin();
    nav.sidenav.clickNavLink(['Observe', 'Dashboards']);
  });

  // Run tests in Administrator perspective
  runAllRegressionLegacyDashboardsTests({
    name: 'Administrator',
  });

});

