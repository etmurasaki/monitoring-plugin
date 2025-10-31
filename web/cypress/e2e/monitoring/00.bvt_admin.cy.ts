import { commonPages } from '../../views/common';
import { nav } from '../../views/nav';
import { overviewPage } from '../../views/overview-page';
import { alerts } from '../../fixtures/monitoring/alert';
import { guidedTour } from '../../views/tour';
import { runBVTMonitoringTests } from '../../support/monitoring/00.bvt_monitoring.cy';
// Set constants for the operators that need to be installed for tests.
const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

describe('BVT: Monitoring', () => {

  before(() => {
    cy.beforeBlock(MP);
  });

  beforeEach(() => {
    cy.visit('/');
    guidedTour.close();
    cy.validateLogin();
    alerts.getWatchdogAlert();
    nav.sidenav.clickNavLink(['Observe', 'Alerting']);
    alerts.getWatchdogAlert();
  });

  it('1. Admin perspective - Observe Menu', () => {
    cy.log('Admin perspective - Observe Menu and verify all submenus');
    nav.sidenav.clickNavLink(['Observe', 'Alerting']);
    commonPages.titleShouldHaveText('Alerting');
    nav.tabs.switchTab('Silences');
    nav.sidenav.clickNavLink(['Observe', 'Metrics']);
    commonPages.titleShouldHaveText('Metrics');
    nav.sidenav.clickNavLink(['Observe', 'Dashboards']);
    commonPages.titleShouldHaveText('Dashboards');
    nav.sidenav.clickNavLink(['Observe', 'Targets']);
    commonPages.titleShouldHaveText('Metrics targets');
  });


  it('2. Admin perspective - Overview Page > Status - View alerts', () => {
    nav.sidenav.clickNavLink(['Home', 'Overview']);
    overviewPage.clickStatusViewAlerts();
    commonPages.titleShouldHaveText('Alerting');
  });

  it('3. Admin perspective - Cluster Utilization - Metrics', () => {
    nav.sidenav.clickNavLink(['Home', 'Overview']);
    overviewPage.clickClusterUtilizationViewCPU();
    commonPages.titleShouldHaveText('Metrics');
  });

   // Run tests in Administrator perspective
   runBVTMonitoringTests({
    name: 'Administrator',
  });

});
