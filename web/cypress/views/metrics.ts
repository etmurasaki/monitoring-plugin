import { commonPages } from "./common";
import { DataTestIDs, Classes, LegacyTestIDs, IDs } from "../../src/components/data-test";
import { MetricsPageUnits, MonitoringRefreshInterval, MetricsPageQueryInput, MetricsPageActions, MetricGraphEmptyState, MetricsPagePredefinedQueries, MetricsPageQueryKebabDropdown, GraphTimespan } from "../fixtures/monitoring/constants";

export const metricsPage = {

  shouldBeLoaded: () => {
    cy.log('metricsPage.shouldBeLoaded');
    commonPages.titleShouldHaveText('Metrics');
    cy.bySemanticElement('button', 'Refresh off').should('be.visible');
    cy.bySemanticElement('button', 'Actions').should('be.visible');
    cy.bySemanticElement('button', 'Hide graph').should('be.visible');
    cy.get('h2').contains('No query entered').should('be.visible');
    cy.byClass('pf-v6-c-empty-state__body').contains('Enter a query in the box below to explore metrics for this cluster.').should('be.visible');
    cy.bySemanticElement('button', 'Insert example query').should('be.visible');
    cy.get('[id="query-select-typeahead-input"]').should('be.visible');
    cy.bySemanticElement('button', 'Add query').should('be.visible');
    cy.bySemanticElement('button', 'Run queries').should('be.visible');
    // metricsPage.expandCollapseRowAssertion(true, 0, false, false);
    cy.get('[id="toggle-metrics-query-0"]').should('be.visible');
  },

  redirectedToMetricsPageWithDatapoints: () => {
    cy.log('metricsPage.redirectedToMetricsPage');
    commonPages.titleShouldHaveText('Metrics');
    cy.bySemanticElement('button', 'Refresh off').should('be.visible');
    cy.bySemanticElement('button', 'Actions').should('be.visible');
    cy.bySemanticElement('button', 'Hide graph').should('be.visible');
    cy.bySemanticElement('button', 'Reset zoom').should('be.visible');
    cy.get('[id="query-select-typeahead-input"]').should('be.visible');
    cy.byTestID(DataTestIDs.MetricsPageAddQueryButton).should('be.visible');
    cy.bySemanticElement('button', 'Add query').should('be.visible');
    cy.bySemanticElement('button', 'Run queries').should('be.visible');
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('be.visible');
    cy.byClass('cm-content.cm-lineWrapping').eq(0).should('not.have.text', MetricsPageQueryInput.EXPRESSION_PRESS_SHIFT_ENTER_FOR_NEWLINES);

    cy.byAriaLabel('Disable query').eq(0).should('have.attr', 'checked');
    cy.byLegacyTestID("kebab-button").eq(0).should('be.visible');
    cy.get('[id="query-expand-metrics-query-0"]').should('be.visible');
    cy.bySemanticElement('button', 'Unselect all').eq(0).should('be.visible');
    cy.byAriaLabel('Hide series').eq(0).should('be.visible');
  },

  redirectedToMetricsPageWithoutDatapoints: () => {
    cy.log('metricsPage.redirectedToMetricsPageWithoutDatapoints');
    commonPages.titleShouldHaveText('Metrics');
    cy.bySemanticElement('button', 'Refresh off').should('be.visible');
    cy.bySemanticElement('button', 'Actions').should('be.visible');
    cy.bySemanticElement('button', 'Hide graph').should('be.visible');
    cy.bySemanticElement('button', 'Reset zoom').should('be.visible');

    cy.get('h3').contains('No datapoints found').should('be.visible');
    cy.get('[id="query-select-typeahead-input"]').should('be.visible');
    cy.bySemanticElement('button', 'Add query').should('be.visible');
    cy.bySemanticElement('button', 'Run queries').should('be.visible');
    cy.get('[id^="toggle-metrics-query"]').eq(0).should('be.visible');
    cy.byClass('cm-content.cm-lineWrapping').eq(0).should('not.have.text', MetricsPageQueryInput.EXPRESSION_PRESS_SHIFT_ENTER_FOR_NEWLINES);
    cy.byAriaLabel('Disable query').eq(0).should('have.attr', 'checked');
    cy.byLegacyTestID("kebab-button").eq(0).should('be.visible');
    cy.byClass('pf-v6-svg dps-icons__yellow-exclamation-icon').contains('No datapoints found').should('be.visible');
  },

  clickInsertExampleQuery: () => {
    cy.log('metricsPage.insertExampleQuery');
    cy.bySemanticElement('button', 'Insert example query').click();
  },

  shouldBeLoadedWithGraph: () => {
    cy.log('metricsPage.shouldBeLoadedWithGraph');
    
    cy.bySemanticElement('button', 'Reset zoom').should('be.visible');
    cy.bySemanticElement('button', 'Hide graph').should('be.visible');
    cy.get('[id="stacked"]').should('be.visible');
    cy.get('[id="disconnected"]').should('be.visible');
    metricsPage.expandCollapseRowAssertion(true, 0, true, false);
  },

  clickUnitsDropdown: (units: MetricsPageUnits) => {
    cy.log('metricsPage.clickUnitsDropdown');
    cy.byTestID(DataTestIDs.MetricGraphUnitsDropDown).should('be.visible').click();
    cy.get(Classes.MenuItem).contains(units).should('be.visible').click();
  },

  unitsDropdownAssertion: () => {
    cy.log('metricsPage.unitsDropdownAssertion');
    cy.byTestID(DataTestIDs.MetricGraphUnitsDropDown).should('be.visible').click();

    const units = Object.values(MetricsPageUnits);
    units.forEach((unit) => {
      cy.log('Unit: ' + unit);
      cy.get(Classes.MenuItem).contains(unit).should('be.visible');
    });

    cy.byTestID(DataTestIDs.MetricGraphUnitsDropDown).should('be.visible').click();
  },

  unitsAxisYAssertion: (unit: MetricsPageUnits) => {
    cy.log('metricsPage.unitsAxisYAssertion');
    cy.get('[id^="' + IDs.ChartAxis1ChartLabel + '"]').should('be.visible');
    cy.get('[id^="' + IDs.ChartAxis1ChartLabel + '"]').should('not.contain', 'undefined');
  },

  clickRefreshIntervalDropdown: (interval: MonitoringRefreshInterval) => {
    cy.log('metricsPage.clickRefreshIntervalDropdown');
    cy.bySemanticElement('button', 'Refresh off').should('be.visible').click();
    cy.byClass('pf-v6-c-menu__item-text').contains(interval).should('be.visible').click();
  },

  refreshIntervalDropdownAssertion: () => {
    cy.log('metricsPage.refreshIntervalDropdownAssertion');
    cy.bySemanticElement('button', 'Refresh off').should('be.visible').click();

    const intervals = Object.values(MonitoringRefreshInterval);
    intervals.forEach((interval) => {
      cy.log('Refresh interval: ' + interval);
      cy.byClass('pf-v6-c-menu__item-text').contains(interval).should('be.visible');
    });

    cy.bySemanticElement('button', 'Refresh off').should('be.visible').click();
  },

  clickAddQueryButton: () => {
    cy.log('metricsPage.clickAddQuery');
    cy.bySemanticElement('button', 'Add query').click();
    metricsPage.addQueryAssertion();
  },

  clickActions: () => {
    cy.log('metricsPage.clickActions');
    cy.bySemanticElement('button', 'Actions').scrollIntoView().should('be.visible').click();
  },

  actionsDropdownAssertion: () => {
    cy.log('metricsPage.actionsDropdownAssertion');
    cy.bySemanticElement('button', 'Actions').scrollIntoView().should('be.visible').click();
    cy.bySemanticElement('button', 'Add query').should('be.visible');
    cy.bySemanticElement('button', 'Delete all queries').should('be.visible');
    cy.bySemanticElement('button', 'Collapse all query tables').should('be.visible');
    cy.bySemanticElement('button', 'Actions').scrollIntoView().should('be.visible').click();
  },

  clickActionsAddQuery: () => {
    cy.log('metricsPage.clickActionsAddQuery');
    metricsPage.clickActions();
    cy.bySemanticElement('button', 'Add query').click();
    metricsPage.addQueryAssertion();
  },

  addQueryAssertion: () => {
    cy.log('metricsPage.addQueryAssertion');
    metricsPage.expandCollapseRowAssertion(true, 0, false, false);
  },

  /**
   * 
   * @param toExpand true: expand all query tables, false: collapse all query tables
   */
  clickActionsExpandCollapseAllQuery: (toExpand: boolean) => {
    cy.log('metricsPage.clickActionsExpandCollapseAllQuery');
    metricsPage.clickActions();
    if (toExpand) {
      cy.bySemanticElement('button', 'Expand all query tables').click();
    } else {
      cy.bySemanticElement('button', 'Collapse all query tables').click();
    }
  },

  /**
   * 
   * @param expand true: to assert it is expanded, false: to assert it is collapsed
   * @param withQuery if there is any row with query,true: to assert the query table is visible, false: to assert the query table is not visible
   */
  expandCollapseAllQueryAssertion: (expanded: boolean) => {
    cy.log('metricsPage.expandCollapseAllQueryAssertion');
    cy.get('[id^="toggle-metrics-query"]').then(($rowIcons) => {
      const rowIconsCount = Cypress.$($rowIcons).length;
      for (let i = 0; i < rowIconsCount; i++) {
        if (expanded) {
          cy.get(Classes.MetricsPageRows).find('li').eq(i).should('be.visible');
          cy.byAriaLabel('Disable query').eq(i).should('have.attr', 'checked'); 
        } else { //collapsed
          cy.get(Classes.MetricsPageRows).find('li').eq(i).should('be.visible');
          cy.byAriaLabel('Disable query').eq(i).should('have.attr', 'checked'); //collapsed does not change switch state when from actions
        }
      }
    })
  },

  /**
   * 
   * @param expand true: to expand the row, false: to collapse the row
   * @param index index of the row to expand or collapse, starting from 0
   */
  expandCollapseRow: (index: number) => {
    cy.log('metricsPage.expandCollapseRow');
    cy.get(Classes.MetricsPageRows).find('li').eq(index).should('be.visible').click()
  },

  /**
   * assertion for expand/collapse All rows from Actions dropdown, not manually
   * @param expanded 
   * @param index 
   * @param withQuery 
   */
  expandCollapseRowAssertion: (expanded: boolean, index: number, withQuery: boolean, withSwitch: boolean) => {
    cy.log('metricsPage.expandCollapseRowAssertion');

    if (withQuery) {
      cy.get(Classes.MetricsPageQueryInput).eq(index).should('not.contain', MetricsPageQueryInput.EXPRESSION_PRESS_SHIFT_ENTER_FOR_NEWLINES);
    } else {
      cy.get(Classes.MetricsPageQueryInput).eq(index).should('contain', MetricsPageQueryInput.EXPRESSION_PRESS_SHIFT_ENTER_FOR_NEWLINES);
    }

    if (expanded) {
      if (withQuery) {
        cy.get(Classes.MetricsPageRows).find('li').eq(index).scrollIntoView().should('be.visible');
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[role="switch"]').should('have.attr', 'checked');
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[aria-label="Expandable content details"]').should('be.visible');
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('button').contains('Unselect all').should('be.visible');
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[aria-label="Hide series"]').should('have.length.gt', 0);
      } else {
        cy.get(Classes.MetricsPageRows).find('li').eq(index).should('be.visible');
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[role="switch"]').should('have.attr', 'checked');
      }
    } else {
      if (withSwitch){
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[role="switch"]').should('not.have.attr', 'checked');
      }
      else {
        cy.get(Classes.MetricsPageRows).find('li').eq(index).find('[role="switch"]').should('have.attr', 'checked');  
      }
      cy.get(Classes.MetricsPageRows).find('li').eq(index).should('be.visible');
    }
  },

  clickActionsDeleteAllQueries: () => {
    cy.log('metricsPage.clickActionsDeleteAllQueries');
    metricsPage.clickActions();
    cy.bySemanticElement('button', 'Delete all queries').click();
  },

  deleteAllQueriesAssertion: () => {
    cy.log('metricsPage.deleteAllQueriesAssertion');
    metricsPage.shouldBeLoaded();
  },

  clickGraphTimespanDropdown: (timespan: GraphTimespan) => {
    cy.log('metricsPage.clickGraphTimespanDropdown');
    cy.get('[class="pf-v6-c-menu-toggle"][aria-label="graph timespan"]').should('be.visible').click();
    cy.get(Classes.MenuItem).contains(timespan).should('be.visible').click();
    cy.byPFRole('progressbar').should('be.visible');
    cy.byPFRole('progressbar').should('not.exist');
    cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('be.visible');
  },

  enterGraphTimespan: (timespan: GraphTimespan) => {
    cy.log('metricsPage.enterGraphTimespan');
    cy.get('input[aria-label="graph timespan"]').type('{selectall}{backspace}', {delay: 1000});
    cy.get('input[aria-label="graph timespan"]').type(timespan);
    cy.get('input[aria-label="graph timespan"]').should('have.attr', 'value', timespan);
    cy.byPFRole('progressbar').should('be.visible');
    cy.byPFRole('progressbar').should('not.exist');
    cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('be.visible');
  },

  graphTimespanDropdownAssertion: () => {
    cy.log('metricsPage.graphTimespanDropdownAssertion');
    cy.get('[class="pf-v6-c-menu-toggle"][aria-label="graph timespan"]').should('be.visible').click();
    const timespans = Object.values(GraphTimespan);
    timespans.forEach((timespan) => {
      cy.log('Graph Timespan: ' + timespan);
      cy.get(Classes.MenuItem).contains(timespan).should('be.visible');
    });
    cy.get('[class="pf-v6-c-menu-toggle pf-m-expanded"][aria-label="graph timespan"]').should('be.visible').click();
  },

  clickResetZoomButton: () => {
    cy.log('metricsPage.clickResetZoomButton');
    cy.bySemanticElement('button', 'Reset zoom').scrollIntoView().should('be.visible').click();
  },

  clickHideGraphButton: () => {
    cy.log('metricsPage.clickHideGraphButton');
    cy.bySemanticElement('button', 'Hide graph').scrollIntoView().should('be.visible').click();
  },

  clickShowGraphButton: () => {
    cy.log('metricsPage.clickShowGraphButton');
    cy.bySemanticElement('button', 'Show graph').scrollIntoView().should('be.visible').click();
  },

  clickDisconnectedCheckbox: () => {
    cy.log('metricsPage.clickDisconnectedCheckbox');
    cy.get('input[id="disconnected"]').should('be.visible').click();
  },

  clickStackedCheckbox: () => {
    cy.log('metricsPage.clickStackedCheckbox');
    cy.get('input[id="stacked"]').should('be.visible').click();
  },

  clickStackedCheckboxAndAssert: () => {
    cy.log('metricsPage.clickStackedCheckboxAndAssert');
    cy.get('[id^="' + IDs.ChartAxis1ChartLabel + '"]').invoke('text').as('yAxisLabel');
    cy.get('input[id="stacked"]').should('be.visible').click();
    cy.get('[id^="' + IDs.ChartAxis1ChartLabel + '"]').then(() => {
      cy.get('@yAxisLabel').then((value) => {
        cy.get('[id^="' + IDs.ChartAxis1ChartLabel + '"]').should('not.contain', value);
      });
    });
    cy.get('input[id="stacked"]').should('have.attr', 'data-checked-state', 'true');
  },

  graphCardInlineInfoAssertion: (visible: boolean) => {
    cy.log('metricsPage.graphCardInlineInfoAssertion');
    if (visible) {
      cy.get(Classes.GraphCardInlineInfo).should('be.visible');
    } else {
      cy.get(Classes.GraphCardInlineInfo).should('not.exist');
    }
  },

  predefinedQueriesAssertion: () => {
    cy.log('metricsPage.predefinedQueriesAssertion');
    cy.byAriaLabel('Type to filter').should('be.visible').click();

    const queries = Object.values(MetricsPagePredefinedQueries);
    queries.forEach((query) => {
      cy.log('Predefined Query: ' + query);
      cy.byClass('pf-v6-c-menu__item-text').contains(query).should('be.visible');
    });
  },

  clickPredefinedQuery: (query: MetricsPagePredefinedQueries) => {
    cy.log('metricsPage.clickPredefinedQuery');
    cy.byAriaLabel('Type to filter').should('be.visible').click();
    cy.byClass('pf-v6-c-menu__item-text').contains(query).should('be.visible').click();
  },

  clickKebabDropdown: (index: number) => {
    cy.log('metricsPage.clickKebabDropdown');
    cy.byLegacyTestID("kebab-button").eq(index).click();
  },

  kebabDropdownAssertionWithoutQuery: () => {
    cy.log('metricsPage.kebabDropdownAssertionWithoutQuery');
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Disable query').should('be.visible');
    cy.bySemanticElement('button', 'Hide all series').should('be.visible');
    cy.bySemanticElement('button', 'Delete query').should('be.visible');
    cy.bySemanticElement('button', 'Duplicate query').should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').should('not.exist');

    cy.byLegacyTestID("kebab-button").eq(0).should('have.attr', 'aria-expanded', 'true').click();
  },

  kebabDropdownAssertionWithQuery: () => {
    cy.log('metricsPage.kebabDropdownAssertionWithQuery');
    metricsPage.clickKebabDropdown(0);
    cy.bySemanticElement('button', 'Disable query').should('be.visible');
    cy.bySemanticElement('button', 'Hide all series').should('be.visible');
    cy.bySemanticElement('button', 'Delete query').should('be.visible');
    cy.bySemanticElement('button', 'Duplicate query').should('be.visible');
    cy.bySemanticElement('button', 'Export as CSV').should('be.visible');
    cy.byLegacyTestID("kebab-button").eq(0).should('have.attr', 'aria-expanded', 'true').click();
  },

  clickKebabDropdownItem: (option: MetricsPageQueryKebabDropdown, index: number) => {
    cy.log('metricsPage.clickKebabDropdownItem');
    metricsPage.clickKebabDropdown(index);
    cy.bySemanticElement('button', option).should('be.visible').click();
  },

  assertKebabDropdownItem: (option: MetricsPageQueryKebabDropdown, index: number) => {
    cy.log('metricsPage.assertKebabDropdownItem');
    metricsPage.clickKebabDropdown(index);
    cy.bySemanticElement('button', option).should('be.visible');
  },

  /** viewport width: 1920px
 * viewport height: 1080px
 * configurations from cypress.config.ts:
 * 5m - 20 labels
 * 15m - 15 labels
 * 30m - 30 labels - 15 labels
 * 1h - 12 labels
 * 2h - 24 labels
 * 6h - 12 labels
 * 12h - 12 labels
 * 1d - 24 labels
 * 2h - 16 labels
 * 1w - 14 labels
 * 2w - 14 labels
 */
  graphAxisXAssertion: (graphTimespan: GraphTimespan) => {
    cy.log('metricsPage.graphAxisAssertion');

    switch (graphTimespan) {
      case GraphTimespan.FIVE_MINUTES:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 20);
        break;
      case GraphTimespan.FIFTEEN_MINUTES:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 15);
        break;
      case GraphTimespan.THIRTY_MINUTES:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length.lte', 30);
        break;
      case GraphTimespan.ONE_HOUR:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 12);
        break;
      case GraphTimespan.TWO_HOURS:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 24);
        break;
      case GraphTimespan.SIX_HOURS:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 12);
        break;
      case GraphTimespan.TWELVE_HOURS:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 12);
        break;
      case GraphTimespan.ONE_DAY:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 24);
        break;
      case GraphTimespan.TWO_DAYS:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 16);
        break;
      case GraphTimespan.ONE_WEEK:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 14);
        break;
      case GraphTimespan.TWO_WEEKS:
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 14);
        break;
      default: //30m is default
        cy.get('[id^="' + IDs.ChartAxis0ChartLabel + '"]').should('have.length', 15);
        break;
    }

  },

  enterQueryInput: (index: number, query: string) => {
    cy.log('metricsPage.enterQueryInput');
    cy.get(Classes.MetricsPageQueryInput).eq(index).should('be.visible').clear();
    cy.wait(3000);
    cy.get(Classes.MetricsPageQueryInput).eq(index).invoke('text', query);
  },

  clickRunQueriesButton: () => {
    cy.log('metricsPage.clickRunQueriesButton');
    cy.bySemanticElement('button', 'Run queries').should('be.visible').click();
  },

  clickDisableEnableQuerySwitch: (index: number) => {
    cy.log('metricsPage.clickDisableEnableQuerySwitch');
    cy.byClass('pf-v6-c-switch').eq(index).should('be.visible').click();
  },

  disableEnableQuerySwitchAssertion: (index: number, enabled: boolean) => {
    cy.log('metricsPage.disableEnableQuerySwitchAssertion');
    if (enabled) {
      cy.byPFRole('switch').eq(index).should('have.attr', 'checked');
    } else {
      cy.byPFRole('switch').eq(index).should('not.have.attr', 'checked');
    }
  },

  clickSeriesButton: (rowIndex: number, seriesIndex: number, toEnable: boolean) => {
    cy.log('metricsPage.clickSeriesButton');
    if (toEnable) {
      cy.get(Classes.MetricsPageExpandedRowIcon).eq(rowIndex).find('[aria-label="Show series"]').eq(seriesIndex).click();
    } else {
      cy.get(Classes.MetricsPageExpandedRowIcon).eq(rowIndex).find('[aria-label="Hide series"]').eq(seriesIndex).click();
    }
  },

  seriesButtonAssertion: (rowIndex: number, seriesIndex: number, enabled: boolean) => { 
    cy.log('metricsPage.seriesButtonAssertion');
    if (enabled) {
      cy.get(Classes.MetricsPageExpandedRowIcon).eq(rowIndex).find('[aria-label="Hide series"]').eq(seriesIndex).should('have.attr', 'aria-label', 'Hide series');
    } else {
      cy.get(Classes.MetricsPageExpandedRowIcon).eq(rowIndex).find('[aria-label="Show series"]').eq(seriesIndex).should('have.attr', 'aria-label', 'Show series');
    }
  },

  selectAllUnselectAllButtonAssertion: (rowIndex: number, unselectAll: boolean) => {
    cy.log('metricsPage.selectAllUnselectAllButtonAssertion');
    if (unselectAll) {
      cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').eq(rowIndex).should('be.visible');
      cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').eq(rowIndex).should('have.text', 'Unselect all');
    } else {
      cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').eq(rowIndex).should('be.visible');
      cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').eq(rowIndex).should('have.text', 'Select all');
    }
  },

  clickSelectAllUnselectAllButton: (rowIndex: number) => {
    cy.log('metricsPage.clickSelectAllUnselectAllButton');
    cy.byClass('pf-v6-c-button pf-m-link pf-m-inline').eq(rowIndex).should('be.visible').click();
  },
  
  exportAsCSV: (clearFolder: boolean, fileNameExp: string) => {
    cy.log('metricsPage.exportAsCSV');
    let downloadedFileName: string | null = null;
    const downloadsFolder = Cypress.config('downloadsFolder');
    const expectedFileNamePattern = fileNameExp;
    if (clearFolder) {
      cy.task('clearDownloads');
    }
    cy.byPFRole('menuitem').contains('Export as CSV').should('be.visible').click();

    cy.waitUntil(() => {
      return cy.task('getFilesInFolder', downloadsFolder).then((currentFiles: string[]) => {
        const matchingFile = currentFiles.find(file => file.includes(expectedFileNamePattern));
        if (matchingFile) {
          downloadedFileName = matchingFile;
          return true;
        }
        return false;
      });
    }, {
      timeout: 20000,
      interval: 1000,
      errorMsg: `CSV file matching "${expectedFileNamePattern}" was not downloaded within timeout.`
    });

    cy.then(() => {
      expect(downloadedFileName).to.not.be.null;
      cy.task('doesFileExist', { fileName: downloadedFileName }).should('be.true');
    });

  },

  noDatapointsFound: () => {
    cy.log('metricsPage.noDatapointsFound');
    cy.byClass('pf-v6-c-empty-state__body').contains(MetricGraphEmptyState.NO_DATAPOINTS_FOUND).should('be.visible');
    cy.byClass('pf-v6-svg dps-icons__yellow-exclamation-icon').contains(MetricGraphEmptyState.NO_DATAPOINTS_FOUND).should('be.visible');
    cy.bySemanticElement('button', 'Insert example query').should('not.exist');
    cy.get('[id="query-expand-metrics-query"]').should('not.exist');
    cy.bySemanticElement('button', 'Unselect all').should('not.exist');
    cy.byAriaLabel('Hide series').should('not.exist');
  },

};
