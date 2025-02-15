import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';
import { envVars } from '../utils/env.utils';

Given(/I compare my Watch-only Public hash with imported account/, async () => {
  const getPublicHash = await Pages.Home.PublicAddressButton.getText();

  expect(getPublicHash).eql(envVars.WATCH_ONLY_PUBLIC_KEY_HASH_SHORT_FORM);
});
