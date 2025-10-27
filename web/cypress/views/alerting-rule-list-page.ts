import { DataTestIDs, Classes } from "../../src/components/data-test";
import { listPage } from "./list-page";

export const alertingRuleListPage = {
  shouldBeLoaded: () => {
    cy.log('alertingRuleListPage.shouldBeLoaded');
    listPage.filter.removeMainTag('Source');
    cy.byClass('co-m-resource-icon co-m-resource-alertrule').contains('AR').should('be.visible');
    cy.get(Classes.TableHeaderColumn).contains('Name').should('be.visible');
    cy.get(Classes.TableHeaderColumn).contains('Severity').should('be.visible');
    cy.get(Classes.TableHeaderColumn).contains('Alert state').should('be.visible');
    cy.get(Classes.TableHeaderColumn).contains('Source').should('be.visible');
  },

  filter: {
    /**
    * 
    * @param tab alerts-tab, silences, alerting-rules 
    */
    assertNoClearAllFilters: () => {
      cy.log('alertingRuleListPage.filter.assertNoclearAllFilters');
      try {
        cy.bySemanticElement('button').contains('Clear all filters').should('not.exist');
      } catch (error) {
        cy.log(`${error.message}`);
        throw error;
      }
    },

  },

  clickAlertingRule: (alertRule: string) => {
    cy.log('alertingRuleListPage.clickAlertingRule');
    try {
      cy.get('a').contains(alertRule).should('be.visible').click();
    } catch (error) {
      cy.log(`${error.message}`);
      throw error;
    }
  },

  countShouldBe: (count: number) => {
    cy.log('alertingRuleListPage.countShouldBe');
    cy.byClass('co-m-resource-icon co-m-resource-alertrule').should('have.length', count);
  },

  ARShouldBe: (alert: string, severity: string, total: number, state: string) => {
    cy.log('alertingRuleListPage.ARShouldBe');
    cy.byOUIAID('OUIA-Generated-Button-plain').should('exist');
    cy.byClass('co-m-resource-icon co-m-resource-alertrule').contains('AR').should('be.visible');
    cy.get('a').contains(alert).should('be.visible');
    cy.byClass('pf-v6-c-label__content').contains(severity).should('exist');
  },
  emptyState: () => {
    cy.log('alertingRuleListPage.emptyState');
    cy.byTestID(DataTestIDs.EmptyBoxBody).contains('No Alerting rules found').should('be.visible');
    cy.bySemanticElement('button', 'Clear all filters').should('not.exist');
    cy.byOUIAID(DataTestIDs.Table).should('not.exist');
  },

};
