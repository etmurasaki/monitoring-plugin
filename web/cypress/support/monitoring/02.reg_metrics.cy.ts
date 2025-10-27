import { metricsPage } from '../../views/metrics';
import { Classes, DataTestIDs } from '../../../src/components/data-test';
import { GraphTimespan, MetricGraphEmptyState, MetricsPagePredefinedQueries, MetricsPageQueryInput, MetricsPageQueryKebabDropdown } from '../../fixtures/monitoring/constants';

export interface PerspectiveConfig {
  name: string;
  beforeEach?: () => void;
}

export function runAllRegressionMetricsTests(perspective: PerspectiveConfig) {
  testMetricsRegression(perspective);
}

export function testMetricsRegression(perspective: PerspectiveConfig) {

  it(`1. ${perspective.name} perspective - Metrics`, () => {
    cy.log('1.1 Metrics page loaded');
    metricsPage.shouldBeLoaded();

    cy.log('1.3 Refresh interval dropdown');
    metricsPage.refreshIntervalDropdownAssertion();

    cy.log('1.4 Actions dropdown');
    metricsPage.actionsDropdownAssertion();

    cy.log('1.5 Predefined queries');
    metricsPage.predefinedQueriesAssertion();

    cy.log('1.6 Kebab dropdown');
    metricsPage.kebabDropdownAssertionWithoutQuery();

  });

  it(`2. ${perspective.name} perspective - Metrics > Actions - No query added`, () => {
    cy.log('2.1 Only one query loaded');
    cy.byAriaLabel('Details').should('have.length', 1);

    cy.log('2.2 Actions >Add query');
    metricsPage.clickActionsAddQuery();

    cy.log('2.3 Only one query added, resulting in 2 rows');
    cy.byAriaLabel('Details').should('have.length', 2);

    cy.log('2.3.1 Assert 2 rows - Empty state');
    metricsPage.addQueryAssertion();
    metricsPage.expandCollapseAllQueryAssertion(true);
    metricsPage.expandCollapseRowAssertion(true, 1, false, false);

    cy.log('2.4 Actions > Collapse all query tables');
    metricsPage.clickActionsExpandCollapseAllQuery(false);

    cy.log('2.5 All queries collapsed');
    metricsPage.expandCollapseAllQueryAssertion(false);
    metricsPage.expandCollapseRowAssertion(false, 0, false, false);
    metricsPage.expandCollapseRowAssertion(false, 1, false, false);

    cy.log('2.6 Actions > Expand all query tables');
    metricsPage.clickActionsExpandCollapseAllQuery(true);

    cy.log('2.7 All queries expanded');
    metricsPage.expandCollapseAllQueryAssertion(true);
    metricsPage.shouldBeLoaded();

    cy.log('2.8 Actions > Delete all queries');
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('2.9 Only one query deleted, resulting in 1 row');
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 1);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');

  });

  it(`3. ${perspective.name} perspective - Metrics > Actions - One query added`, () => {
    cy.log('3.1 Only one query loaded');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.FILESYSTEM_USAGE);
    metricsPage.shouldBeLoadedWithGraph();

    cy.log('3.2 Kebab dropdown');
    metricsPage.kebabDropdownAssertionWithQuery();

    cy.log('3.3 Actions >Add query');
    metricsPage.clickActionsAddQuery();

    cy.log('3.4 Only one query added, resulting in 2 rows');
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 2);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    cy.get('[id^="toggle-metrics-query"]').eq(1).should('have.attr', 'aria-expanded', 'true');

    cy.log('3.4.1 Assert 2 rows');
    metricsPage.expandCollapseAllQueryAssertion(true);
    metricsPage.expandCollapseRowAssertion(true, 0, false, false);
    metricsPage.expandCollapseRowAssertion(true, 1, true, false);

    cy.log('3.5 Actions > Collapse all query tables');
    metricsPage.clickActionsExpandCollapseAllQuery(false);

    cy.log('3.6 All queries collapsed');
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'false');
    cy.get('[id^="toggle-metrics-query"]').eq(1).should('have.attr', 'aria-expanded', 'false');

    cy.log('3.6.1 Assert 2 rows - Empty state');
    metricsPage.expandCollapseAllQueryAssertion(false);
    metricsPage.expandCollapseRowAssertion(false, 0, false, false);
    metricsPage.expandCollapseRowAssertion(false, 1, true, false);

    cy.log('3.7 Actions > Expand all query tables');
    metricsPage.clickActionsExpandCollapseAllQuery(true);

    cy.log('3.8 All queries expanded');
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    cy.get('[id^="toggle-metrics-query"]').eq(1).should('have.attr', 'aria-expanded', 'true');

    cy.log('3.8.1 Assert 2 rows');
    metricsPage.expandCollapseAllQueryAssertion(true);
    metricsPage.expandCollapseRowAssertion(true, 0, false, false);
    metricsPage.expandCollapseRowAssertion(true, 1, true, false);

    cy.log('3.9 Actions > Delete all queries');
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('3.10 Only one query deleted, resulting in 1 row');
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 1);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    metricsPage.shouldBeLoaded();

  });

  it(`4. ${perspective.name} perspective - Metrics > Insert Example Query`, () => {
    cy.log('4.1 Insert Example Query');
    metricsPage.clickInsertExampleQuery();
    metricsPage.shouldBeLoadedWithGraph();
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    metricsPage.graphAxisXAssertion(GraphTimespan.THIRTY_MINUTES);

    cy.log('4.2 Graph Timespan Dropdown');
    metricsPage.clickActionsDeleteAllQueries();
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.CPU_USAGE);
    metricsPage.graphTimespanDropdownAssertion();

    cy.log('4.3 Select and Assert each timespan');
    Object.values(GraphTimespan).forEach((timespan) => {
      metricsPage.clickGraphTimespanDropdown(timespan);
      metricsPage.graphAxisXAssertion(timespan);
    });

    cy.log('4.4 Enter Graph Timespan');
    metricsPage.clickActionsDeleteAllQueries();
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.CPU_USAGE);
    Object.values(GraphTimespan).forEach((timespan) => {
      metricsPage.enterGraphTimespan(timespan);
      metricsPage.graphAxisXAssertion(timespan);
    });

    cy.log('4.5 Prepare to test Reset Zoom Button');
    metricsPage.clickActionsDeleteAllQueries();
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.CPU_USAGE);
    metricsPage.graphCardInlineInfoAssertion(true);
    metricsPage.clickGraphTimespanDropdown(GraphTimespan.ONE_WEEK);
    metricsPage.graphCardInlineInfoAssertion(false);

    cy.log('4.6 Reset Zoom Button');
    metricsPage.clickResetZoomButton();
    metricsPage.graphCardInlineInfoAssertion(true);

    cy.log('4.7 Hide Graph Button');
    metricsPage.clickHideGraphButton();

    cy.log('4.8 Show Graph Button');
    metricsPage.clickShowGraphButton();

    cy.log('4.9 Stacked Checkbox');
    cy.get('input[id="stacked"]').should('not.exist');

    cy.log('4.10 Disconnected Checkbox');
    cy.get('input[id="disconnected"]').should('be.visible');

    cy.log('4.11 Prepare to test Stacked Checkbox');
    metricsPage.clickActionsDeleteAllQueries();
    metricsPage.clickInsertExampleQuery();

    cy.log('4.12 Stacked Checkbox');
    metricsPage.clickStackedCheckboxAndAssert();

  });

  /**
   * TODO: uncomment when this bug gets fixed   
   * https://issues.redhat.com/browse/OU-974 - [Metrics] - Units - undefined showing in Y axis and tooltip
  it(`5. ${perspective.name} perspective - Metrics > Units`, () => {
    cy.log('5.1 Preparation to test Units dropdown');
    cy.visit('/monitoring/query-browser');
    metricsPage.clickInsertExampleQuery();
    metricsPage.unitsDropdownAssertion();

    cy.log('5.2 Units dropdown');
    Object.values(MetricsPageUnits).forEach((unit) => {
      metricsPage.clickUnitsDropdown(unit);
      metricsPage.unitsAxisYAssertion(unit);
    });
  });
  */

  it(`6. ${perspective.name} perspective - Metrics > Add Query - Run Queries - Kebab icon`, () => {
    cy.log('6.1 Preparation to test Add Query button');
    metricsPage.shouldBeLoaded();
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 1);
    metricsPage.clickInsertExampleQuery();
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);

    cy.log('6.2 Only one query added, resulting in 2 rows');
    metricsPage.clickActionsAddQuery();
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 2);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    cy.get('[id^="toggle-metrics-query"]').eq(1).should('have.attr', 'aria-expanded', 'true');
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.EXPRESSION_PRESS_SHIFT_ENTER_FOR_NEWLINES);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
 
    cy.log('6.3 Preparation to test Run Queries button');
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('be.visible').clear();
    cy.get(Classes.MetricsPageQueryInput).eq(0).invoke('text', MetricsPageQueryInput.VECTOR_QUERY);
    cy.bySemanticElement('button', 'Unselect all').should('have.length', 1);

    cy.log('6.4 Run Queries button');
    metricsPage.clickRunQueriesButton();
    cy.wait(2000);
    cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').should('have.length', 2);
    
    cy.log('6.5 Preparation to test Kebab icon - Disable query');
    metricsPage.disableEnableQuerySwitchAssertion(0, true);
    metricsPage.disableEnableQuerySwitchAssertion(1, true);
    metricsPage.expandCollapseRowAssertion(true, 0, true, true);
    metricsPage.expandCollapseRowAssertion(true, 1, true, true);
    
    cy.log('6.6 Kebab icon - Disable query');
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Disable query').contains(MetricsPageQueryKebabDropdown.DISABLE_QUERY).should('be.visible').click();
    metricsPage.disableEnableQuerySwitchAssertion(0, false);
    metricsPage.disableEnableQuerySwitchAssertion(1, true);
    metricsPage.expandCollapseRowAssertion(false, 0, true, true);
    metricsPage.expandCollapseRowAssertion(true, 1, true, true);
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.VECTOR_QUERY);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    metricsPage.clickKebabDropdown(0);
    cy.get(Classes.MenuItemDisabled).contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').should('not.exist');

    cy.log('6.7 Kebab icon - Enable query');
    cy.bySemanticElement('button', 'Enable query').contains(MetricsPageQueryKebabDropdown.ENABLE_QUERY).should('be.visible').click();
    metricsPage.disableEnableQuerySwitchAssertion(0, true);
    metricsPage.disableEnableQuerySwitchAssertion(1, true);
    metricsPage.expandCollapseRowAssertion(true, 0, true, true);
    metricsPage.expandCollapseRowAssertion(true, 1, true, true);
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.VECTOR_QUERY);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').contains(MetricsPageQueryKebabDropdown.EXPORT_AS_CSV).should('be.visible');
    metricsPage.clickKebabDropdown(0);

    cy.log('6.8 Switch - Disable query for both queries');
    metricsPage.clickDisableEnableQuerySwitch(0);
    metricsPage.clickDisableEnableQuerySwitch(1);
    metricsPage.disableEnableQuerySwitchAssertion(0, false);
    metricsPage.disableEnableQuerySwitchAssertion(1, false);
    metricsPage.expandCollapseRowAssertion(false, 0, true, true);
    metricsPage.expandCollapseRowAssertion(false, 1, true, true);
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Enable query').contains(MetricsPageQueryKebabDropdown.ENABLE_QUERY).should('be.visible');
    cy.get(Classes.MenuItemDisabled).contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('have.attr', 'aria-disabled', 'true');
    cy.bySemanticElement('button', 'Export as CSV').should('not.exist');
    metricsPage.clickKebabDropdown(0);

    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Enable query').contains(MetricsPageQueryKebabDropdown.ENABLE_QUERY).should('be.visible');
    cy.get(Classes.MenuItemDisabled).contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('have.attr', 'aria-disabled', 'true');
    cy.bySemanticElement('button', 'Export as CSV').should('not.exist');
    metricsPage.clickKebabDropdown(1);
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.VECTOR_QUERY);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    cy.get('h2').contains('No query entered').should('be.visible');
    cy.byClass('pf-v6-c-empty-state__body').contains('Enter a query in the box below to explore metrics for this cluster.').should('be.visible');
    cy.bySemanticElement('button', 'Insert example query').should('be.visible');
    
    cy.log('6.9 Switch - Enable query for both queries');
    metricsPage.clickDisableEnableQuerySwitch(0);
    metricsPage.clickDisableEnableQuerySwitch(1);
    metricsPage.disableEnableQuerySwitchAssertion(0, true);
    metricsPage.disableEnableQuerySwitchAssertion(1, true);
    metricsPage.expandCollapseRowAssertion(true, 0, true, true);
    metricsPage.expandCollapseRowAssertion(true, 1, true, true);
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Disable query').contains(MetricsPageQueryKebabDropdown.DISABLE_QUERY).should('be.visible');
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').contains(MetricsPageQueryKebabDropdown.EXPORT_AS_CSV).should('be.visible');
    metricsPage.clickKebabDropdown(0);

    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Disable query').contains(MetricsPageQueryKebabDropdown.DISABLE_QUERY).should('be.visible');
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').contains(MetricsPageQueryKebabDropdown.EXPORT_AS_CSV).should('be.visible');
    metricsPage.clickKebabDropdown(1);
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.VECTOR_QUERY);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);

    cy.log('6.10 Kebab icon - Hide all series');
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible').click();
    cy.get(Classes.MetricsPageExpandedRowIcon).eq(1).find('[aria-label="Show series"]').then(($seriesButtons) => {
      const seriesButtonsCount: number = Cypress.$($seriesButtons).length;
      for (let i = 0; i < seriesButtonsCount; i++) {
        metricsPage.seriesButtonAssertion(1, i, false);
      }
    });
    metricsPage.selectAllUnselectAllButtonAssertion(1, false);

    cy.log('6.11 Kebab icon - Show all series');
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Show all series').contains(MetricsPageQueryKebabDropdown.SHOW_ALL_SERIES).should('be.visible').click();
    cy.get(Classes.MetricsPageExpandedRowIcon).eq(1).find('[aria-label="Hide series"]').then(($seriesButtons) => {
      const seriesButtonsCount: number = Cypress.$($seriesButtons).length;
      for (let i = 0; i < seriesButtonsCount; i++) {
        metricsPage.seriesButtonAssertion(1, i, true);
      }
    });
    metricsPage.clickKebabDropdown(1);
    metricsPage.selectAllUnselectAllButtonAssertion(1, true);

    cy.log('6.12 Hide serie - index 1 - manually');
    metricsPage.clickSeriesButton(1, 0, false);
    metricsPage.seriesButtonAssertion(1, 0, false);
    metricsPage.selectAllUnselectAllButtonAssertion(1, false);
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Show all series').contains(MetricsPageQueryKebabDropdown.SHOW_ALL_SERIES).should('be.visible');
    metricsPage.clickKebabDropdown(1);

    cy.log('6.13 Select serie - index 1 - manually');
    metricsPage.clickSeriesButton(1, 0, true);
    metricsPage.seriesButtonAssertion(1, 0, true);
    metricsPage.selectAllUnselectAllButtonAssertion(1, true);
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    metricsPage.clickKebabDropdown(1);

    cy.log('6.14 Unselect all - index 1 - manually');
    metricsPage.clickSelectAllUnselectAllButton(1);
    metricsPage.selectAllUnselectAllButtonAssertion(1, false);
    cy.get(Classes.MetricsPageExpandedRowIcon).eq(1).find('[aria-label="Show series"]').then(($seriesButtons) => {
      const seriesButtonsCount: number = Cypress.$($seriesButtons).length;
      for (let i = 0; i < seriesButtonsCount; i++) {
        metricsPage.seriesButtonAssertion(1, i, false);
      }
    });
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Show all series').contains(MetricsPageQueryKebabDropdown.SHOW_ALL_SERIES).should('be.visible');
    metricsPage.clickKebabDropdown(1);

    cy.log('6.15 Select all - index 1 - manually');
    metricsPage.clickSelectAllUnselectAllButton(1);
    metricsPage.selectAllUnselectAllButtonAssertion(1, true);
    cy.get(Classes.MetricsPageExpandedRowIcon).eq(1).find('[aria-label="Hide series"]').then(($seriesButtons) => {
      const seriesButtonsCount: number = Cypress.$($seriesButtons).length;
      for (let i = 0; i < seriesButtonsCount; i++) {
        metricsPage.seriesButtonAssertion(1, i, true);
      }
    });
    metricsPage.clickKebabDropdown(1);
    cy.bySemanticElement('button', 'Hide all series').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).should('be.visible');
    metricsPage.clickKebabDropdown(1);

    cy.log('6.16 Kebab icon - Delete query');
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Delete query').contains(MetricsPageQueryKebabDropdown.DELETE_QUERY).should('be.visible').click();
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 1);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    cy.bySemanticElement('button', 'Unselect all').should('have.length', 1);

    cy.log('6.17 Kebab icon - Duplicate query');
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Duplicate query').contains(MetricsPageQueryKebabDropdown.DUPLICATE_QUERY).should('be.visible').click();
    cy.get(Classes.MetricsPageQueryInput).eq(0).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    cy.get(Classes.MetricsPageQueryInput).eq(1).should('contain', MetricsPageQueryInput.INSERT_EXAMPLE_QUERY);
    cy.get('[id^="toggle-metrics-query"]').should('have.length', 2);
    metricsPage.expandCollapseRowAssertion(true, 1, true, true);
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('have.attr', 'aria-expanded', 'true');
    cy.byClass('pf-v6-c-switch__input').eq(0).should('not.have.attr', 'checked');
    cy.bySemanticElement('button', 'Unselect all').should('have.length', 1);
    metricsPage.clickKebabDropdown(0);
    cy.get('span.pf-v6-c-menu__item-text').contains(MetricsPageQueryKebabDropdown.HIDE_ALL_SERIES).parents('button').should('have.attr', 'aria-disabled', 'true');
    cy.bySemanticElement('button', 'Export as CSV').should('not.exist');

  });

  it(`7. ${perspective.name} perspective - Metrics > Predefined Queries > Export as CSV`, () => {
    //OCPBUGS-54316 - [4.16] Metrics "Export as CSV" is not working for all queries 
    cy.log('7.1 Predefined Queries');
    metricsPage.shouldBeLoaded();
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.CPU_USAGE);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.CPU_USAGE);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.2 Predefined Queries'); 
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.MEMORY_USAGE);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.MEMORY_USAGE);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.3 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.FILESYSTEM_USAGE);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.FILESYSTEM_USAGE);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.4 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RECEIVE_BANDWIDTH);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.RECEIVE_BANDWIDTH);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.5 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.TRANSMIT_BANDWIDTH);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.TRANSMIT_BANDWIDTH);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.6 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RATE_OF_RECEIVED_PACKETS);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.RATE_OF_RECEIVED_PACKETS);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.7 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RATE_OF_TRANSMITTED_PACKETS);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.RATE_OF_TRANSMITTED_PACKETS);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.8 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RATE_OF_RECEIVED_PACKETS_DROPPED);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.RATE_OF_RECEIVED_PACKETS_DROPPED);
    metricsPage.clickActionsDeleteAllQueries();

    cy.log('7.9 Predefined Queries');
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RATE_OF_TRANSMITTED_PACKETS_DROPPED);
    metricsPage.clickKebabDropdown(0);
    metricsPage.exportAsCSV(true, MetricsPageQueryInput.RATE_OF_TRANSMITTED_PACKETS_DROPPED);
    metricsPage.clickActionsDeleteAllQueries();

  });

  it(`8. ${perspective.name} perspective - Metrics > Ungraphable results`, () => {
    cy.log('8.1 Ungraphable results');
    metricsPage.shouldBeLoaded();
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.CPU_USAGE);
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.MEMORY_USAGE);
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.FILESYSTEM_USAGE);
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RECEIVE_BANDWIDTH);
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.TRANSMIT_BANDWIDTH);
    metricsPage.clickPredefinedQuery(MetricsPagePredefinedQueries.RATE_OF_RECEIVED_PACKETS);
    cy.bySemanticElement('h1', "Metrics").scrollIntoView().should('be.visible');
    
    cy.get(Classes.MetricsPageUngraphableResults).contains(MetricGraphEmptyState.UNGRAPHABLE_RESULTS).should('be.visible');
    cy.get(Classes.MetricsPageUngraphableResultsDescription).contains(MetricGraphEmptyState.UNGRAPHABLE_RESULTS_DESCRIPTION).should('be.visible');
    
  });

  it(`9. ${perspective.name} perspective - Metrics > No Datapoints`, () => {
    cy.log('9.1 No Datapoints');
    metricsPage.shouldBeLoaded();
    metricsPage.enterQueryInput(0, 'aaaaaaaaaa');
    metricsPage.clickRunQueriesButton();
    cy.byClass('pf-v6-c-empty-state__title-text').contains(MetricGraphEmptyState.NO_DATAPOINTS_FOUND).should('be.visible');
    cy.byAriaLabel('Expandable content details').contains(MetricGraphEmptyState.NO_DATAPOINTS_FOUND).should('be.visible');
  });

  it(`10. ${perspective.name} perspective - Metrics > No Datapoints with alert`, () => {
    cy.log('10.1 No Datapoints with alert');
    metricsPage.shouldBeLoaded();
    metricsPage.enterQueryInput(0, MetricsPageQueryInput.QUERY_WITH_ALERT);
    metricsPage.clickRunQueriesButton();
    cy.byOUIAID(DataTestIDs.MetricsGraphAlertDanger).should('be.visible');
  });
   
}

