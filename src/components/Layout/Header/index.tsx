import {
  HeaderAccount,
  HeaderProduct,
  PartyEntity,
  ProductEntity,
} from "@pagopa/mui-italia";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();

  const rootLink = {
    href: "https://www.pagopa.it",
    label: t("Header.rootLink.label"),
    ariaLabel: t("Header.rootLink.ariaLabel"),
    title: t("Header.rootLink.title"),
  };

  const productsList: ProductEntity[] = [
    {
      id: "test",
      title: t("Header.productsList.requestToPay.title"),
      productUrl: "/",
      linkType: "external",
    },
  ];

  const partyList: PartyEntity[] = [
    {
      id: "test-client",
      logoUrl: "",
      name: t("Header.partyList.intesaSanpaolo.name"),
      productRole: t("Header.partyList.intesaSanpaolo.productRole"),
    },
  ];

  const isUserLoggedIn = () => {
    return localStorage.getItem("accessToken")
      ? {
        id: "userId",
        name: t("Header.loggedUser.name"),
        surname: t("Header.loggedUser.surname"),
        email: t("Header.loggedUser.email"),
      }
      : false;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigation({ to: "/login" });
  };

  return (
    <>
      <HeaderAccount
        rootLink={rootLink}
        enableAssistanceButton={false}
        onAssistanceClick={() => null}
        loggedUser={isUserLoggedIn()}
        onLogout={logout}
      />
      <HeaderProduct productsList={productsList} partyList={partyList} />
    </>
  );
};
