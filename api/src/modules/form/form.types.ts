export enum SettingsNames {
    localeDefault = 'locale-default',
    currencyDefault = 'currency-default',
    useNDS = 'use-nds',
    sendPulseUserId = 'sendpulse-user-id',
    sendPulseSecret = 'sendpulse-secret',
    sendPulseFromEmail = 'sendpulse-from-email',
    useCash = 'use-payment-cash',
    useInvoice = 'use-payment-invoice',
    homePage = 'home-page'
}

export const SecuredSettings: string[] = [
    SettingsNames.sendPulseUserId,
    SettingsNames.sendPulseSecret,
    SettingsNames.useInvoice,
    SettingsNames.useCash,
]