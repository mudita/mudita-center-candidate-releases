import { ChainablePromiseElement } from "webdriverio"
import Page from "./page"

class NavigationTabs extends Page {
  public get muditaNewsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuNews"]')
  }

  public get overviewTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuOverview"]')
  }

  public get messagesTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="overview-menu-link"]')
  }

  public get contactsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="contacts-menu-link"]')
  }

  public get settingsTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="icon-MenuSettings"]')
  }

  public get helpTab(): ChainablePromiseElement<
    Promise<WebdriverIO.Element>
  > {
    return $('[data-testid="help-menu-button"]')
  }  

}

export default new NavigationTabs()