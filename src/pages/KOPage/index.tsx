import { useTranslation } from 'react-i18next';
import ko from '../../assets/images/ko.svg';
import { ResultLayout } from 'src/components/ResultLayout';
import useMessageStore from 'src/stores/message.store';

export default function KOPage() {
  const { t } = useTranslation();
  const { messageStatus } = useMessageStore() as { messageStatus: "default" | "unauthorized" | undefined };

  return (
    <ResultLayout
      image={ko}
      title={t(`KO.${messageStatus}.title`)}
      body={t(`KO.${messageStatus}.body`)}
      buttonText={t(`KO.${messageStatus}.button`)}
      type={messageStatus}
    />
  );
}
