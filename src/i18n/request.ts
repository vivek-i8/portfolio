import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './settings';

// The portfolio ships in English only, so the locale is pinned to the default.
export default getRequestConfig(async () => {
    const locale = defaultLocale;

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        timeZone: 'Asia/Kolkata'
    };
});
