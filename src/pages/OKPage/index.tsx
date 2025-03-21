import { useTranslation } from 'react-i18next';
import ok from '../../assets/images/ok.svg';
import { ResultLayout } from 'src/components/ResultLayout';
import useMessageStore from 'src/stores/message.store';

export default function OKPage() {
  const { t } = useTranslation();
  const { messageStatus } = useMessageStore();
  
  return (
    <ResultLayout
      image={ok}
      title={t(`OK.${messageStatus}.title`) || ''}
      body={t(`OK.${messageStatus}.body`)}
      buttonText={t(`OK.${messageStatus}.button`)}
      type={messageStatus}
    />
  );
}
