import { commonPages } from "./common";
import { detailsPage } from "./details-page";
import { DataTestIDs, Classes } from '../../src/components/data-test'; 

export const alertingRuleDetailsPage = {
  assertAlertingRuleDetailsPage: (title: string) => {
      cy.log('alertingRuleDetailsPage.assertAlertingRuleDetailsPage');
      commonPages.titleShouldHaveText(title);
      cy.byTestID(DataTestIDs.AlertResourceIcon).contains('AR').should('be.visible');
      detailsPage.sectionHeaderShouldExist('Alerting rule details');
      detailsPage.sectionHeaderShouldExist('Active alerts');
      cy.byTestID(DataTestIDs.Expression).should('be.visible');
      cy.byTestID(DataTestIDs.MetricHideShowGraphButton).contains('Hide graph').should('be.visible');
      cy.get(Classes.GraphCard).should('be.visible');
    },
  
    clickOnActiveAlerts: (desc: string) => {
      cy.log('alertingRuleDetailsPage.clickOnActiveAlerts');
      cy.byTestID(DataTestIDs.AlertResourceLink)
        .first()
        .should('have.text', desc)
        .click();
    },
  
    clickAlertingRulesBreadcrumb:() => {
      cy.log('alertingRuleDetailsPage.clickAlertingRulesBreadcrumb');
       try {
        cy.byTestID(DataTestIDs.Breadcrumb).contains('Alerting rules').click();
        } catch (error) {
          cy.log(`${error.message}`);
          throw error; 
        }
    },

    assertNoKebab: () => {
      cy.log('alertingRuleDetailsPage.assertNoKebab');
      try {
        cy.byTestID(DataTestIDs.AlertResourceLink).scrollIntoView();
        cy.byTestID(DataTestIDs.KebabDropdownButton).should('not.exist');
      }catch (error) {
        cy.log(`${error.message}`);
        throw error; 
      }
    },

    clickOnKebabSilenceAlert:()=>{
      cy.log('alertingRuleDetailsPage.clickOnKebabSilenceAlert');
      cy.byTestID(DataTestIDs.KebabDropdownButton).scrollIntoView().should('be.visible').click();
      cy.byPFRole('menuitem').contains('Silence alert').should('be.visible').click();
    },
};
