import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';
import { OperationStatusSelectors } from 'src/app/templates/OperationStatus.selectors';

import { BrowserContext } from '../classes/browser-context.class';
import { Pages } from '../page-objects';
import { iComparePrivateKeys, iSelectTokenSlugs } from '../utils/input-data.utils';
import { LONG_TIMEOUT } from '../utils/timing.utils';

Given(/I reveal a private key and compare with (.*)/, async (key: keyof typeof iComparePrivateKeys) => {
  await Pages.Home.isVisible();
  await Pages.Header.accountIconButton.click();
  await Pages.AccountsDropdown.isVisible();
  await Pages.AccountsDropdown.settingsButton.click();
  await Pages.Settings.isVisible();
  await Pages.Settings.revealPrivateKeyButton.click();
  await Pages.RevealSecrets.isVisible();
  await Pages.RevealSecrets.revealPasswordField.type(BrowserContext.password);
  await Pages.RevealSecrets.revealButton.click();
  await Pages.RevealSecrets.revealSecretsValue.getText();
  const revealedSecretsValue = await Pages.RevealSecrets.revealSecretsValue.getText();
  const privateKeyType = iComparePrivateKeys[key];

  expect(revealedSecretsValue).eql(privateKeyType);
});

Given(/I'm waiting for 'success ✓' operation status/, { timeout: LONG_TIMEOUT }, async () => {
  await BrowserContext.page.waitForSelector(`[data-testid="${OperationStatusSelectors.successDoneOperation}"]`, {
    timeout: LONG_TIMEOUT
  });
});

Given(
  /I select (.*) token in the token drop-down list on the Send page/,
  async (key: keyof typeof iSelectTokenSlugs) => {
    const slug = iSelectTokenSlugs[key];

    await Pages.Send.selectToken(slug);
  }
);
