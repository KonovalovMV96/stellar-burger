const localhost = 'http://localhost:4000/';
const addButton = 'Добавить';
const details = 'Детали ингредиента';
const ingredient = 'Ингредиент 1';

describe('Тесты конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit(localhost);
  });

  it('тест добавление булки', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addButton).click();
    cy.get('[data-cy=constructor-bun-1]').contains(ingredient).should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains(ingredient).should('exist');
  });

  it('тест добавление ингредиентов', () => {
    cy.get('[data-cy=mains-ingredients').contains(addButton).click();
    cy.get('[data-cy=sauces-ingredients').contains(addButton).click();
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
    cy.get('@constructorIngredients').contains('Ингредиент 2').should('exist');
    cy.get('@constructorIngredients').contains('Ингредиент 4').should('exist');
  });
});

describe('Тесты модального окна', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.viewport(1300, 800);
    cy.visit(localhost);
  });

  it('тест открытие модалки', () => {
    cy.contains(details).should('not.exist');
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=modal]').contains(ingredient).should('exist');
  });

  it('тест закрытие модалки по клику на крестик', () => {
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=modal_close_button]').click();
    cy.contains(details).should('not.exist');
  });

  it('тест закрытие модалки по клику на оверлей', () => {
    cy.contains(ingredient).click();
    cy.contains(details).should('exist');
    cy.get('[data-cy=overlay]').click('left', { force: true });
    cy.contains(details).should('not.exist');
  });
});

describe('Тесты оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'accessToken');
    window.localStorage.setItem('refreshToken', 'refreshToken');
    cy.viewport(1300, 800);
    cy.visit(localhost);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  it('тест оформление заказа', () => {
    cy.get('[data-cy=bun-ingredients]').contains(addButton).click();
    cy.get('[data-cy=mains-ingredients').contains(addButton).click();
    cy.get('[data-cy=sauces-ingredients').contains(addButton).click();
    cy.get('[data-cy=order-button').click();

    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('123').should('exist');
    cy.get('[data-cy=modal_close_button]').as('modalCloseButton');
    cy.get('@modalCloseButton').click();
    cy.get('@orderNumber').should('not.exist');
    cy.get('[data-cy=burger-constructor]').as('constructor');
    cy.get('@constructor').contains(ingredient).should('not.exist');
    cy.get('@constructor').contains('Ингредиент 2').should('not.exist');
    cy.get('@constructor').contains('Ингредиент 4').should('not.exist');
  });
});
