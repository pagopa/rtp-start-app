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
      cancelModtButtonTextV3={t(`OK.rtpParams.cancelModtButtonV3`)}
      cancelModtButtonTextV4={t(`OK.rtpParams.cancelModtButtonV4`)}
      cancelPaidButtonTextV3={t(`OK.rtpParams.cancelPaidButtonV3`)}
      cancelPaidButtonTextV4={t(`OK.rtpParams.cancelPaidButtonV4`)}
      rtpCode={id}
      type={"rtpParams"}
    />
  );
}
