import React, { FC } from 'react';

import classNames from 'clsx';

import { AnalyticsEventCategory, useAnalytics } from 'lib/analytics';
import { T } from 'lib/i18n';
import { Link } from 'lib/woozie';

import { useNetwork } from '../../../../lib/temple/front';
import { ReactComponent as ExolixIcon } from '../assets/Exolix.svg';
import { BuySelectors } from '../Buy.selectors';
import { useCurrenciesCount } from './Exolix/hooks/useCurrenciesCount.hook';

export const Crypto: FC = () => {
  const { trackEvent } = useAnalytics();
  const network = useNetwork();
  const exolixCurrenciesCount = useCurrenciesCount();

  return (
    <div>
      {network.type === 'main' && (
        <div className={classNames('mx-auto max-w-sm flex flex-col items-center', 'border-2 rounded-md p-4')}>
          <ExolixIcon />
          <div className="text-lg text-center">
            <T id="buyWithExolix" />
          </div>
          <div className="text-center w-64 mx-auto mt-2 text-gray-700">
            <T id="buyWithExolixDescription" substitutions={[exolixCurrenciesCount]} />
          </div>
          <Link
            className={classNames(
              'py-2 px-4 rounded mt-4',
              'border-2',
              'border-blue-500 hover:border-blue-600 focus:border-blue-600',
              'flex items-center justify-center',
              'text-white',
              'shadow-sm hover:shadow focus:shadow',
              'text-base font-medium',
              'transition ease-in-out duration-300',
              'bg-blue-500',
              'w-full'
            )}
            to={'/buy/crypto/exolix'}
            onClick={() => trackEvent(BuySelectors.ExolixButton, AnalyticsEventCategory.ButtonPress)}
          >
            <T id="continue" />
          </Link>
        </div>
      )}
    </div>
  );
};
