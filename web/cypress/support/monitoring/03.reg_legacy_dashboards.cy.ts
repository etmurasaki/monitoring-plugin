import { legacyDashboardsPage } from '../../views/legacy-dashboards';
import { API_PERFORMANCE_DASHBOARD_PANELS, LegacyDashboardsDashboardDropdown, MetricsPageQueryInput, WatchdogAlert } from '../../fixtures/monitoring/constants';
import { Classes } from '../../../src/components/data-test';
import { metricsPage } from '../../views/metrics';
import { alertingRuleDetailsPage } from '../../views/alerting-rule-details-page';
import { alerts } from '../../fixtures/monitoring/alert';
import { listPage } from '../../views/list-page';
import { commonPages } from '../../views/common';
import { nav } from '../../views/nav';

export interface PerspectiveConfig {
  name: string;
  beforeEach?: () => void;
}

export function runAllRegressionLegacyDashboardsTests(perspective: PerspectiveConfig) {
  testLegacyDashboardsRegression(perspective);
}

export function testLegacyDashboardsRegression(perspective: PerspectiveConfig) {

  it(`1. ${perspective.name} perspective - Dashboards (legacy)`, () => {
    cy.log('1.1 Dashboards page loaded');
    legacyDashboardsPage.shouldBeLoaded();

    cy.log('1.2 Time range dropdown');
    legacyDashboardsPage.timeRangeDropdownAssertion();

    cy.log('1.3 Refresh interval dropdown');
    legacyDashboardsPage.refreshIntervalDropdownAssertion();

    cy.log('1.4 Dashboard dropdown');
    legacyDashboardsPage.dashboardDropdownAssertion(LegacyDashboardsDashboardDropdown);

    cy.log('1.5 Dashboard API Performance panels');
    for (const panel of Object.values(API_PERFORMANCE_DASHBOARD_PANELS)) {
      legacyDashboardsPage.dashboardAPIPerformancePanelAssertion(panel);
    }

    cy.log('1.6 Inspect - API Request Duration by Verb - 99th Percentile');
    cy.byAriaLabel('Inspect').eq(0).scrollIntoView().should('be.visible').click();
    metricsPage.shouldBeLoadedWithGraph();
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.API_REQUEST_DURATION_BY_VERB_99TH_PERCENTILE_QUERY);

  });

  it(`2. ${perspective.name} perspective - Dashboards (legacy) - Inspect and Export as CSV`, () => {
    cy.log('2.1 Kebab dropdown - Export as CSV');
    legacyDashboardsPage.clickKebabDropdown(0);
    cy.byClass('pf-v6-c-menu__item-text').contains('Export as CSV').should('be.visible');
    cy.byPFRole('menuitem').should('not.have.attr', 'disabled');
    legacyDashboardsPage.exportAsCSV(true, 'graphData.csv');

    cy.log('2.2 Empty state');
    legacyDashboardsPage.clickDashboardDropdown('K8S_COMPUTE_RESOURCES_POD');
    cy.byClass('pf-v6-c-empty-state__title-text').contains('No datapoints found').eq(0).scrollIntoView().should('be.visible');
    legacyDashboardsPage.clickKebabDropdown(0);
    cy.byClass('pf-v6-c-menu__item-text').contains('Export as CSV').should('be.visible');
    cy.byPFRole('menuitem').should('have.attr', 'disabled');
    
  });

  it(`3. ${perspective.name} perspective - Dashboards (legacy) - No kebab dropdown`, () => {
    cy.log('3.1 Single Stat - No kebab dropdown');
    legacyDashboardsPage.clickDashboardDropdown('K8S_COMPUTE_RESOURCES_NAMESPACE_PODS');
    cy.byLegacyTestID('chart-1').find('[data-test-id="kebab-button"]').should('not.exist');

    cy.log('3.2 Table - No kebab dropdown');
    legacyDashboardsPage.clickDashboardDropdown('PROMETHEUS_OVERVIEW');
    cy.byLegacyTestID('chart-1').find('[data-test-id="kebab-button"]').should('not.exist');

  });

  it(`4. ${perspective.name} perspective - OU-897 - Hide Graph / Show Graph on Metrics, Alert Details and Dashboards`, () => {
    cy.log('4.1 Observe > Metrics > Hide Graph');
    nav.sidenav.clickNavLink(['Observe', 'Metrics']);
    metricsPage.shouldBeLoaded();
    metricsPage.clickHideGraphButton();
    
    cy.log('4.2 Observe > Dashboards - Verify graph is visible');
    nav.sidenav.clickNavLink(['Observe', 'Dashboards']);
    
    cy.log('4.3 Observe > Alerting rule details - Verify graph is visible');
    alerts.getWatchdogAlert();
    nav.sidenav.clickNavLink(['Observe', 'Alerting']);
    alerts.getWatchdogAlert();
    listPage.filter.byName(`${WatchdogAlert.ALERTNAME}`);
    listPage.ARRows.countShouldBe(1);
    listPage.ARRows.clickAlertingRule();
    commonPages.titleShouldHaveText(`${WatchdogAlert.ALERTNAME}`);
    alertingRuleDetailsPage.clickHideGraphButton();
    cy.wait(2000);
    alertingRuleDetailsPage.clickShowGraphButton();
    cy.wait(2000);
    cy.wait(2000);
    alertingRuleDetailsPage.clickHideGraphButton();
    cy.wait(2000);
    cy.wait(2000);

    cy.log('4.4 Observe > Alert details - Verify graph is visible');
    cy.byTestID("active-alerts").first().click();
    cy.bySemanticElement('button', 'Hide graph').should('be.visible');
    cy.bySemanticElement('button', 'Hide graph').should('be.visible').click();
    cy.bySemanticElement('button', 'Show graph').should('be.visible').click();
    cy.bySemanticElement('button', 'Hide graph').should('be.visible').click();
   
    cy.log('4.5 Observe > Metrics > Hide Graph');
    nav.sidenav.clickNavLink(['Observe', 'Metrics']);
    metricsPage.shouldBeLoaded();
    
    cy.log('4.6 Observe > Dashboards - Verify graph is visible');
    nav.sidenav.clickNavLink(['Observe', 'Dashboards']);

  });

}

