import { TaquitoTezosDomainsClient } from '@tezos-domains/taquito-client';

import { t } from 'lib/i18n';
import { isDomainNameValid } from 'lib/temple/front';
import { isAddressValid } from 'lib/temple/helpers';

export const validateDelegate = async (
  value: string | null | undefined,
  domainsClient: TaquitoTezosDomainsClient,
  validateAddress: (value: string) => boolean | string
) => {
  if (!value) return false;

  if (!domainsClient.isSupported) return validateAddress(value);

  if (isDomainNameValid(value, domainsClient)) {
    const resolved = await domainsClient.resolver.resolveNameToAddress(value);
    if (!resolved) {
      return validateAddress(value) || t('domainDoesntResolveToAddress', value);
    }

    value = resolved;
  }

  return isAddressValid(value) ? true : t('invalidAddressOrDomain');
};
