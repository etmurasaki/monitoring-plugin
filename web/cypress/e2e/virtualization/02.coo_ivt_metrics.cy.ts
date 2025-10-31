import { alerts } from '../../fixtures/monitoring/alert';
import { runAllRegressionMetricsTests } from '../../support/monitoring/02.reg_metrics.cy';
import { nav } from '../../views/nav';
import { guidedTour } from '../../views/tour';

// Set constants for the operators that need to be installed for tests.
const MP = {
  namespace: 'openshift-monitoring',
  operatorName: 'Cluster Monitoring Operator',
};

const KBV = {
  namespace: 'openshift-cnv',
  packageName: 'kubevirt-hyperconverged',
  config: {
    kind: 'HyperConverged',
    name: 'kubevirt-hyperconverged',
  },
  crd: {
    kubevirt: 'kubevirts.kubevirt.io',
    hyperconverged: 'hyperconvergeds.hco.kubevirt.io',
  }
};

describe('Setting up Monitoring Plugin', () => {

  before(() => {
    cy.beforeBlock(MP);
  });

  it('1. Setting up Monitoring Plugin', () => {
    cy.log('Setting up Monitoring Plugin');
  });
});

describe('Installation: Virtualization', () => {

  before(() => {
    cy.beforeBlockVirtualization(KBV);
  });

  it('1. Virtualization perspective - Observe Menu', () => {
    cy.log('Virtualization perspective - Observe Menu and verify all submenus');
    cy.switchPerspective('Virtualization');
    cy.byAriaLabel('Welcome modal').should('be.visible');
    guidedTour.closeKubevirtTour();
  });
});

describe('Regression: Monitoring - Metrics (Virtualization)', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.validateLogin();
    cy.switchPerspective('Virtualization');
    guidedTour.closeKubevirtTour();
    alerts.getWatchdogAlert();
    nav.sidenav.clickNavLink(['Observe', 'Metrics']);
  });

  runAllRegressionMetricsTests({
    name: 'Virtualization',
  });

});
