import { commonPages } from "./common";
import { detailsPage } from "./details-page";
import { DataTestIDs } from "../../src/components/data-test";

export const silenceDetailsPage = {

  assertSilenceDetailsPage: (title: string, section: string, labelname: string) => {
    cy.log('silenceDetailsPage.assertSilenceDetailsPage');
    commonPages.titleShouldHaveText(title);
    detailsPage.sectionHeaderShouldExist(section);
    detailsPage.labelShouldExist(labelname);
  },

  clickOnFiringAlerts: (alertname: string) => {
    cy.log('silenceDetailsPage.clickOnFiringAlerts');
    cy.byTestID('firing-alerts')
      .first()
      .should('have.text', alertname)
      .click();
  },

  clickActions: (toOpen: boolean) => {
    cy.log('silenceDetailsPage.clickActions');
    if (toOpen) {
      cy.byAriaLabel('kebab dropdown toggle').should('be.visible').click();
    }
  },

  assertActionsExpiredAlert: () => {
    cy.log('silenceDetailsPage.assertActionsExpiredAlert');
    silenceDetailsPage.clickActions(true);
    cy.bySemanticElement('button', 'Recreate silence').should('be.visible');
  },

  assertActionsSilencedAlert: () => {
    cy.log('silenceDetailsPage.assertActionsExpiredAlert');
    silenceDetailsPage.clickActions(true);
    cy.bySemanticElement('button', 'Edit silence').should('be.visible');
    cy.bySemanticElement('button', 'Expire silence').should('be.visible');
  },

  editSilence: (toOpen: boolean) => {
    cy.log('silenceDetailsPage.editSilence');
    silenceDetailsPage.clickActions(toOpen);
    cy.bySemanticElement('button', 'Edit silence').should('be.visible').click();
  },

  /**
   * 
   * @param toOpen true: to open Actions dropdown, false: assuming it is already opened
   * @param yes true: confirm, false: cancel
   */
  expireSilence: (toOpen: boolean, yes: boolean) => {
    cy.log('silenceDetailsPage.expireSilence');
    silenceDetailsPage.clickActions(toOpen);
    cy.bySemanticElement('button', 'Expire silence').should('be.visible').click();
    commonPages.confirmExpireAlert(yes);
  },

  recreateSilence: (toOpen: boolean) => {
    cy.log('silenceDetailsPage.recreateSilence');
    silenceDetailsPage.clickActions(toOpen);
    cy.bySemanticElement('button', 'Recreate silence').should('be.visible').click();
  },

  clickSilencesBreadcrumb:() => {
    cy.log('silenceDetailsPage.clickSilencesBreadcrumb');
     try {
       cy.byTestID(DataTestIDs.Breadcrumb).contains('Silences').should('be.visible').click();
      } catch (error) {
        cy.log(`${error.message}`);
        throw error; 
      }
  }
};
