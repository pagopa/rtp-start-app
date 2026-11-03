import { useParams, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ResultLayout } from "src/components/ResultLayout";
import ok from '../assets/images/ok.svg';
import { RtpActions } from "src/components/ResultLayout/RtpActions";

export default function ConfirmedPage() {

  const { t } = useTranslation();
  const { id } = useParams({ from: '/$id/ok' });
  const { version } = useSearch({ from: '/$id/ok' });

  return(
    <ResultLayout
      image={ok}
      title={t(`OK.rtpParams.title`) || ''}
      body={t(`OK.rtpParams.body`)}
      buttonText={t(`OK.rtpParams.button`)}
      rtpCode={id}
      actions={version && <RtpActions rtpId={id} version={version} />}
      type={"rtpParams"}
    />
  );
}
