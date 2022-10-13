/// <reference types="cypress" />

context('Verificação da Página Films e FilmsDetails', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/', { timeout: 30000 });
  })

  it('Redireciona para rota /films', () => {
    cy.url().should('contain', '/films')
  })

  it('Verifica a interação com o menu', () => {
    // o ícone do menu fechado está visível, mas os links não está visível
    cy.get('[data-cy="menu-icon"]').should('exist');
    cy.get('[data-cy="menu-down"]').should('exist');
    cy.get('[data-cy="menu-links"]').should('not.visible');

    // o ícone do menu aberto está visível, mas os links não está visível
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="menu-up"]').should('exist');
    cy.get('[data-cy="menu-down"]').should('not.exist');
    cy.get('[data-cy="menu-links"]').should('exist');

    // o ícone do menu fechado está visível, mas os links não está visível
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="menu-up"]').should('not.exist');
    cy.get('[data-cy="menu-down"]').should('exist');
    cy.get('[data-cy="menu-links"]').should('not.visible');
  })

  it('Verifica a interação das rotas com o menu', () => {
    // redireciona para a página /people
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="link-people"]').click();
    cy.url().should('contain', '/people');

    // redireciona para a página /locations
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="link-locations"]').click();
    cy.url().should('contain', '/locations');

    // redireciona para a página /species
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="link-species"]').click();
    cy.url().should('contain', '/species');

    // redireciona para a página /vehicles
    cy.get('[data-cy="menu-icon"]').click();
    cy.get('[data-cy="link-vehicles"]').click();
    cy.url().should('contain', '/vehicles');
  })

  it('Verifica os elementos do header da página', () => {
    cy.get('[data-cy="header-title"]').should('exist');
    cy.get('[data-cy="header-input-filter"]').should('exist');
    cy.get('[data-cy="header-button-filters"]').should('exist');
  })

  it('Exibição dos filmes a partir do input', () => {
    // card de filme aleatório antes de fazer a filtragem
    cy.contains('h3', "My Neighbor").should('exist');

    // filtragem de filme diferente do card anterior
    cy.get('[data-cy="header-input-filter"]').type('CASTLE');

    // validação que exibe apenas os filmes compatíveis ao texto do input
    cy.contains('h3', "Howl's Moving Castle").should('exist');
    cy.contains('h3', "My Neighbor").should('not.exist');
  })
    
  it('Exibição dos filmes a partir do filtro múltiplo por nome e produtor', () => {
    cy.contains('h3', "Howl's Moving Castle").should('exist');

    // verifica que exibe um componente com mais filtros quando clica em '+ FILTERS'
    cy.get('[data-cy="filters"]').should('not.exist');
    cy.get('[data-cy="header-button-filters"]').click();
    cy.get('[data-cy="filters"]').should('exist');

    // inserção de filtros
    cy.get('[data-cy="input-name-filters"]')
    .type('CASTLE');
    cy.get('#producer').select('Isao Takahata');
    cy.get('[data-cy="submit-filters"]').click();

    // verificação que aparece apenas cards compatíveis ao filtro
    cy.contains('h3', 'Castle in the Sky').should('exist');
    cy.contains('h3', "Howl's Moving Castle").should('not.exist');
  })

  it('Exibição dos filmes a partir do filtro múltiplo por localização', () => {
    cy.contains('h3', "Howl's Moving Castle").should('exist');

    // verifica que exibe um componente com mais filtros quando clica em '+ FILTERS'
    cy.get('[data-cy="filters"]').should('not.exist');
    cy.get('[data-cy="header-button-filters"]').click();
    cy.get('[data-cy="filters"]').should('exist');

    // inserção de filtros
    cy.get('#location').select('Irontown');
    cy.get('[data-cy="submit-filters"]').click();

    // verificação que aparece apenas cards compatíveis ao filtro
    cy.contains('h3', 'Princess Mononoke').should('exist');
    cy.contains('h3', "Howl's Moving Castle").should('not.exist');
  })

  it('Exibição dos filmes a partir do filtro múltiplo por score, duração e lançamento', () => {
    cy.contains('h3', "Howl's Moving Castle").should('exist');

    // verifica que exibe um componente com mais filtros quando clica em '+ FILTERS'
    cy.get('[data-cy="filters"]').should('not.exist');
    cy.get('[data-cy="header-button-filters"]').click();
    cy.get('[data-cy="filters"]').should('exist');

    // inserção de filtros
    cy.get('[name="min-score"]').type('80');
    cy.get('[name="max-score"]').type('95');
    cy.get('[name="min-duration"]').type('80');
    cy.get('[name="max-duration"]').type('110');
    cy.get('[name="min-year"]').type('1990');
    cy.get('[name="max-year"]').type('2000');
    cy.get('[data-cy="submit-filters"]').click();

    // verificação que aparece apenas cards compatíveis ao filtro
    cy.contains('h3', 'Porco Rosso').should('exist');
    cy.contains('h3', "Howl's Moving Castle").should('not.exist');
  })

  it('Redireciona para a página de detalhes de cada filme', () => {
    // seleciona um filme
    cy.get('[data-cy="button-film-ebbb6b7c-945c-41ee-a792-de0e43191bd8"]').click();
    cy.url().should('contain', '/films/ebbb6b7c-945c-41ee-a792-de0e43191bd8');
  
    // verifica os dados extras relacionados ao filme
    cy.contains('h2', 'Porco Rosso').should('exist');
    cy.get('[data-cy="card-person-6523068d-f5a9-4150-bf5b-76abe6fb42c3"]').should('exist');
    cy.get('[data-cy="card-location-34df8f25-8f80-4823-8f01-bf9852039987"]').should('exist');
    cy.get('[data-cy="card-vehicle-d8f893b5-1dd9-41a1-9918-0099c1aa2de8"]').should('exist');
  })
})