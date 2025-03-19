import { useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ResultLayout } from "src/components/ResultLayout";
import ok from '../assets/images/ok.svg';

export default function ConfirmedPage() {

  const { t } = useTranslation();
  const { id } = useParams({ from: '/$id/ok' });

  return(
    <ResultLayout
      image={ok}
      title={t(`OK.rtpParams.title`) || ''}
      body={t(`OK.rtpParams.body`)}
      buttonText={t(`OK.rtpParams.button`)}
      deleteButtonText={t(`OK.rtpParams.deleteButton`)}
      rtpCode={id}
      type={"rtpParams"}
    />
  );
}