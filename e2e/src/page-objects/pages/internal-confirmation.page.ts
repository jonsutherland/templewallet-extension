import { InternalConfirmationSelectors } from '../../../../src/app/templates/InternalConfirmation.selectors';
import { Page } from '../../classes/page.class';
import { createPageElement } from '../../utils/search.utils';

export class InternalConfirmationPage extends Page {
  confirmButton = createPageElement(InternalConfirmationSelectors.confirmButton);
  declineButton = createPageElement(InternalConfirmationSelectors.declineButton);
  bytesTab = createPageElement(InternalConfirmationSelectors.bytesTab);
  rawTab = createPageElement(InternalConfirmationSelectors.rawTab);
  previewTab = createPageElement(InternalConfirmationSelectors.previewTab);
  retryButton = createPageElement(InternalConfirmationSelectors.retryButton);

  async isVisible() {
    await this.confirmButton.waitForDisplayed();
    await this.declineButton.waitForDisplayed();
    await this.bytesTab.waitForDisplayed();
    await this.rawTab.waitForDisplayed();
    await this.previewTab.waitForDisplayed();
  }
}
