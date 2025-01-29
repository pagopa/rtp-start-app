import { Footer as MUIFooter } from '@pagopa/mui-italia';
import { useLanguage } from 'src/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <MUIFooter
      loggedUser={true}
      companyLink={{ ariaLabel: t('Footer.companyLinkAriaLabel') }}
      legalInfo={
        <>
          <b>PagoPA S.p.A.</b> - Società per azioni con socio unico - Capitale
          sociale di euro 1,000,000 interamente versato - Sede legale in Roma,
          Piazza Colonna 370, <br />
          CAP 00187 - N. di iscrizione a Registro Imprese di Roma, CF e P.IVA
          15376371009
        </>
      }
      postLoginLinks={[
        {
          label: t('Footer.postLoginLinks.privacyPolicy.label'),
          ariaLabel: t('Footer.postLoginLinks.privacyPolicy.ariaLabel'),
          href: '',
          linkType: 'external',
        },
        {
          label: t('Footer.postLoginLinks.dataProtection.label'),
          ariaLabel: t('Footer.postLoginLinks.dataProtection.ariaLabel'),
          linkType: 'external',
        },
        {
          label: t('Footer.postLoginLinks.termsAndConditions.label'),
          ariaLabel: t('Footer.postLoginLinks.termsAndConditions.ariaLabel'),
          href: '',
          linkType: 'external',
        },
        {
          label: t('Footer.postLoginLinks.accessibility.label'),
          ariaLabel: t('Footer.postLoginLinks.accessibility.ariaLabel'),
          href: '',
          linkType: 'external',
        },
      ]}
      preLoginLinks={{
        aboutUs: { links: [] },
        resources: { links: [] },
        followUs: { title: '', socialLinks: [], links: [] },
      }}
      currentLangCode={language}
      languages={{
        it: { it: t('Footer.languages.it') },
      }}
      onLanguageChanged={changeLanguage}
    />
  );
};
