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
      title={t(`OK.default.title`) || ''}
      body={t(`OK.default.body`)}
      buttonText={t(`OK.default.button`)}
      deleteButtonText={t(`OK.default.deleteButton`)}
      rtpCode={id}
    />
  );
}