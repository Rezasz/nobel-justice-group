import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messageLoaders: Record<string, () => Promise<{ default: any }>> = {
  fa: () => import('../messages/fa.json'),
  en: () => import('../messages/en.json'),
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale
  }
  const messages = (await messageLoaders[locale]()).default
  return {
    locale,
    messages,
  }
})
