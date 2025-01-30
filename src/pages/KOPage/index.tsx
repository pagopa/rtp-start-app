import { useTranslation } from 'react-i18next';
import ko from '../../assets/images/ko.svg';
import { ResultLayout } from 'src/components/ResultLayout';

export default function KOPage() {
  const { t } = useTranslation();

  return (
    <ResultLayout
      image={ko}
      title={t('KO.title')}
      body={t('KO.body')}
      buttonText={t('KO.button')}
    />
  );
}
