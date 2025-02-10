import {
  HeaderAccount,
  HeaderProduct,
  JwtUser,
  ProductEntity,
} from "@pagopa/mui-italia";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/hooks/useAuth";

export const Header = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const auth = useAuth();

  const MockUser: JwtUser = {
    id: "userId",
    name: t("Header.loggedUser.name"),
    surname: t("Header.loggedUser.surname"),
    email: t("Header.loggedUser.email"),
  };

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

  const logout = () => {
    auth.logout();
    navigation({ to: "/login" });
  };

  return (
    <>
      <HeaderAccount
        rootLink={rootLink}
        enableAssistanceButton={false}
        onAssistanceClick={() => null}
        loggedUser={auth.isAuthenticated ? MockUser : false}
        onLogout={logout}
      />
      <HeaderProduct productsList={productsList} />
    </>
  );
};
