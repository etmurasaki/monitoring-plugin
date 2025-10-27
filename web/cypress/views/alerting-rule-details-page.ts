import { commonPages } from "./common";
import { detailsPage } from "./details-page";
import { DataTestIDs, Classes } from '../../src/components/data-test'; 

export const alertingRuleDetailsPage = {
  assertAlertingRuleDetailsPage: (title: string) => {
      cy.log('alertingRuleDetailsPage.assertAlertingRuleDetailsPage');
      commonPages.titleShouldHaveText(title);
      cy.byClass('co-m-resource-icon co-m-resource-alertrule').contains('AR').should('be.visible');
      detailsPage.sectionHeaderShouldExist('Alerting rule details');
      detailsPage.sectionHeaderShouldExist('Active alerts');
      cy.byClass('pf-v6-c-code-block__content').should('be.visible');
      cy.bySemanticElement('button', 'Hide graph').should('be.visible');
      cy.get('[id="disconnected"]').should('be.visible');
      cy.bySemanticElement('button', 'Reset zoom').should('be.visible');
    },
  
    clickOnActiveAlerts: (desc: string) => {
      cy.log('alertingRuleDetailsPage.clickOnActiveAlerts');
      cy.byTestID('active-alerts')
        .first()
        .should('have.text', desc)
        .click();
    },
  
    clickAlertingRulesBreadcrumb:() => {
      cy.log('alertingRuleDetailsPage.clickAlertingRulesBreadcrumb');
       try {
        cy.byAriaLabel('Breadcrumb').contains('Alerting rules').click();
        } catch (error) {
          cy.log(`${error.message}`);
          throw error; 
        }
    },

    assertNoKebab: () => {
      cy.log('alertingRuleDetailsPage.assertNoKebab');
      try {
        cy.byTestID('active-alerts').scrollIntoView();
        cy.byTestID(DataTestIDs.KebabDropdownButton).should('not.exist');
      }catch (error) {
        cy.log(`${error.message}`);
        throw error; 
      }
    },

    clickOnKebabSilenceAlert:()=>{
      cy.log('alertingRuleDetailsPage.clickOnKebabSilenceAlert');
      cy.byLegacyTestID('kebab-button').scrollIntoView().should('be.visible').click();
      cy.bySemanticElement('button', 'Silence alert').should('be.visible').click();
    },

    clickHideGraphButton:()=>{
      cy.log('alertingRuleDetailsPage.clickHideGraphButton');
      cy.bySemanticElement('button', 'Hide graph').scrollIntoView().should('be.visible').click();
    },

    clickShowGraphButton:()=>{
      cy.log('alertingRuleDetailsPage.clickShowGraphButton');
      cy.bySemanticElement('button', 'Show graph').scrollIntoView().should('be.visible').click();
    },
};
