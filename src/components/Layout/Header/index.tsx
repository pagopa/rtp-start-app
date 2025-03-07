import {
  HeaderAccount,
  HeaderProduct,
  JwtUser,
  ProductEntity,
} from "@pagopa/mui-italia";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "src/hooks/useAuth";

export const Header = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const auth = useAuth();

  const MockUser: JwtUser = {
    id: "userId",
    name: localStorage.getItem('user') || '',
    surname: ' ',
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
        enableDropdown={true}
        rootLink={rootLink}
        enableAssistanceButton={false}
        onAssistanceClick={() => null}
        loggedUser={auth.isAuthenticated ? MockUser : false}

        userActions={[{
          id: "logout",
          label: "Esci",
          onClick: () => {
            logout();
          },
          icon: <LogoutRoundedIcon fontSize="small" color="inherit" />
        }]}

      />
      <HeaderProduct productsList={productsList} />
    </>
  );
};
