import { I18n } from 'i18n';
import { join } from 'path';

const i18n = new I18n();

i18n.configure({
    defaultLocale: 'en',
    locales: ['en', 'pt', 'ab'],
    cookie: '_lang',
    directory: join(__dirname, '../../locales'),
    autoReload: true,
    updateFiles: false,
});

export default i18n;
