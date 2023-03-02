/// <reference types="cypress" />

/* eslint-disable */
// @ts-ignore
declare global {
  namespace Cypress {
    interface Chainable {
      withLabelStudio: typeof withLabelStudio
    }
  }
}

const withLabelStudio = (initConfig: { config: string, settings?: any, params?: any, data: any, annotations?: any[], predictions?: any[], additionalInterfaces?: any[], featureFlags?: Record<string, boolean> }) => {
  Cypress.on('window:before:load', win => {
    const { 
      config,
      data,
      annotations = [{ result: [] }],
      predictions = [],
      additionalInterfaces = [],
      params = {},
    } = initConfig;

    const interfaces = [
      'panel',
      'update',
      'submit',
      'controls',
      'side-column',
      'topbar',
      'annotations:history',
      'annotations:current',
      'annotations:tabs',
      'annotations:menu',
      'annotations:add-new',
      'annotations:delete',
      'predictions:tabs',
      'predictions:menu',
      'edit-history',
      ...additionalInterfaces,
    ];
    const task = { data, annotations, predictions };

    win.APP_SETTINGS = win.APP_SETTINGS || {}
    win.APP_SETTINGS.feature_flags = {...(win.APP_SETTINGS.feature_flags || {}), ...(initConfig.featureFlags || {}) }

    // eslint-disable-next-line
    // @ts-ignore
    win.__APP_DATA__ = { interfaces, config, task, ...params };
  });

  cy.visit('http://localhost:3000');
};

const Commands = {
  withLabelStudio
};

export default Commands;
