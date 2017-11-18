/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  licenseMessage: {
    id: 'survey.components.Footer.license.message',
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  authorMessage: {
    id: 'survey.components.Footer.author.message',
    defaultMessage: `
      Made with love by {author}.
    `,
  },
});
