import {
  HeaderAccount,
  HeaderProduct,
  PartyEntity,
  ProductEntity,
} from '@pagopa/mui-italia';

export const Header = () => {
  const rootLink = {
    href: 'https://www.pagopa.it',
    label: 'PagoPA S.p.A.',
    ariaLabel: 'Sito PagoPa',
    title: 'LinkPagoPa',
  };

  const productsList: ProductEntity[] = [
    {
      id: 'test',
      title: 'Request to Pay',
      productUrl: '/',
      linkType: 'external',
    },
  ];

  const partyList: PartyEntity[] = [
    {
      id: 'test-client',
      logoUrl: '',
      name: 'Intesa Sanpaolo S.P.A.',
      productRole: 'Responsabile Tecnico',
    },
  ];

  const isUserLoggedIn = () => {
    return localStorage.getItem('accessToken')
      ? {
        id: 'userId',
        name: 'marco',
        surname: 'polo',
        email: 'gM0gW@example.com',
      }
      : false;
  };

  return (
    <>
      <HeaderAccount
        rootLink={rootLink}
        enableAssistanceButton={false}
        onAssistanceClick={() => null}
        loggedUser={isUserLoggedIn()}
      />
      <HeaderProduct productsList={productsList} partyList={partyList} />
    </>
  );
};
