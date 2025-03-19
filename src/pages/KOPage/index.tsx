import { useTranslation } from 'react-i18next';
import ko from '../../assets/images/ko.svg';
import { ResultLayout } from 'src/components/ResultLayout';
import useMessageStore, { CodeError, MessageStatus } from 'src/stores/message.store';

export default function KOPage() {
  const { t } = useTranslation();
  const { messageStatus, codeError } = useMessageStore() as { messageStatus: MessageStatus | undefined, codeError: CodeError };

  return (
    <ResultLayout
      image={ko}
      title={t(`KO.${messageStatus}.title`)}
      body={
        t(
          messageStatus === 'unauthorized'
            ? `KO.${messageStatus}.body` 
            : `KO.${messageStatus}.body.${codeError}`,
          "Errore generico"
        )
      }      
      buttonText={t(`KO.${messageStatus}.button`)}
      type={messageStatus}
    />
  );
}
