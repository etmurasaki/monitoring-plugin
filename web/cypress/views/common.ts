import { detailsPage } from "./details-page";
import { nav } from "./nav";
import { DataTestIDs, Classes } from "../../src/components/data-test";

export const commonPages = {
  projectDropdownShouldNotExist: () => cy.byLegacyTestID('namespace-bar-dropdown').should('not.exist'),
  projectDropdownShouldExist: () => cy.byLegacyTestID('namespace-bar-dropdown').should('exist'),
  titleShouldHaveText: (title: string) => {
    cy.log('commonPages.titleShouldHaveText - ' + `${title}`);
    cy.bySemanticElement('h1', title).should('be.visible');
  },

  linkShouldExist: (linkName: string) => {
    cy.log('commonPages.linkShouldExist - ' + `${linkName}`);
    cy.bySemanticElement('button', linkName).should('be.visible');

  },
  clickBellIcon: () => {
    cy.log('commonPages.clickBellIcon');
    cy.byAriaLabel('Notification drawer').should('be.visible').click();

  },

  bellIconClickAlert: (alert: string) => {
    cy.log('commonPages.bellIconClickAlert');
    cy
      .get('pf-v6-c-notification-drawer__list-item-header, .pf-v5-c-notification-drawer__list-item-header')
      .contains(alert)
      .click();
  },

  confirmExpireAlert: (yes: boolean) => {
    cy.log('commonPages.confirmExpireAlert');
    cy.byPFRole('dialog').should('be.visible');

    if (yes) {
      cy.bySemanticElement('button', 'Expire silence').should('be.visible').click({force: true});
    } else {
      cy.bySemanticElement('button', 'Cancel').should('be.visible').click({force: true});
    };
    cy.bySemanticElement('button', 'Expire silence').should('not.exist');
  },

  detailsPage: {
    alert: (alert: string) => {
      cy.log('commonPages.detailsPage.alert');
      cy.byClass('co-m-resource-icon co-m-resource-alert').contains('A').should('be.visible');
      cy.bySemanticElement('button', 'Silence alert').should('be.visible');
      detailsPage.sectionHeaderShouldExist('Alert details');
      cy.byTestID('alert-rules-detail-resource-link').scrollIntoView();
      cy.byClass('co-m-resource-icon co-m-resource-alertrule').contains('AR').should('be.visible');
      cy.byTestID('alert-rules-detail-resource-link').contains(alert).should('be.visible');
    },
    alertRule: () => {
      cy.log('commonPages.detailsPage.alertRule');
      cy.byClass('co-m-resource-icon co-m-resource-alertrule').contains('AR').should('be.visible');
      cy.byClass('pf-v6-c-code-block__content').should('be.visible');
      cy.byTestID('alert-resource-link').should('have.length.at.least', 1);
    },
    common: (alert: string, severity: string) => {
      cy.log('commonPages.detailsPage.common');
      commonPages.titleShouldHaveText(alert);
      cy.bySemanticElement('button', 'Hide graph').should('be.visible');
      cy.bySemanticElement('button', 'Reset zoom').should('be.visible');
      cy.byAriaLabel('Inspect').should('be.visible'); //pf-5 cy.byAriaLabel('View in Metrics').should('be.visible').click(); 
    },
    administration_clusterSettings: () => {
      cy.log('commonPages.detailsPage.administration_clusterSettings');
      cy.byLegacyTestID('horizontal-link-Configuration').should('be.visible').click();
      cy.byLegacyTestID('item-filter', { timeout: 500000 }).should('be.visible').type('Alertmanager')
      cy.bySemanticElement('a').contains('Alertmanager').should('be.visible').click();
      cy.bySemanticElement('button').contains('Create Receiver').should('be.visible');
    },
  }

}