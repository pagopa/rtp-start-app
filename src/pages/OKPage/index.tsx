import { useTranslation } from 'react-i18next';
import ok from '../../assets/images/ok.svg';
import { ResultLayout } from 'src/components/ResultLayout';

export default function OKPage() {
  const { t } = useTranslation();

  return (
    <ResultLayout
      image={ok}
      title={t('OK.title')}
      body={t('OK.body')}
      buttonText={t('OK.button')}
      deleteButtonText={t('OK.deleteButton')}
    />
  );
}
