/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import trLocaleData from 'react-intl/locale-data/tr';

import { DEFAULT_LOCALE } from '../app/redux/constants';

import trTranslationMessages from './translations/tr.json';

addLocaleData(trLocaleData);

export const appLocales = [
  'tr'
];

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE
    ? formatTranslationMessages(DEFAULT_LOCALE, trTranslationMessages)
    : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== DEFAULT_LOCALE
      ? defaultFormattedMessages[key]
      : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  tr: formatTranslationMessages('tr', trTranslationMessages)
};
