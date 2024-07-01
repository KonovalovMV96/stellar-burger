import {
  addIngredient,
  burgerConstructorReducer,
  handleMoveIngredient,
  initialState,
  removeIngredient
} from './burgerConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'testID')
}));

describe('тестирование burgerConstructorSlice', () => {
  const testData = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];

  it('Добавление булки', () => {
    const testState = burgerConstructorReducer(
      initialState,
      addIngredient(testData[2])
    );

    expect(testState.bun).toEqual({
      ...testData[2],
      id: 'testID'
    });
  });

  it('Добавление ингредиента', () => {
    const testState = burgerConstructorReducer(
      initialState,
      addIngredient(testData[0])
    );

    expect(testState.ingredients).toEqual([
      {
        ...testData[0],
        id: 'testID'
      }
    ]);
  });

  it('Удаление ингредиента', () => {
    const testInitialState = {
      ...initialState,
      ingredients: [{ ...testData[0], id: 'testID' }]
    };

    const testState = burgerConstructorReducer(
      testInitialState,
      removeIngredient(testInitialState.ingredients[0])
    );

    expect(testState.ingredients.length).toBe(0);
  });

  it('Перемещение ингредиентов', () => {
    const testInitialState = {
      bun: { ...testData[2], id: '1' },
      ingredients: [
        { ...testData[0], id: '2' },
        { ...testData[1], id: '3' }
      ]
    };
    const testReplaceState = {
      bun: { ...testData[2], id: '1' },
      ingredients: [
        { ...testData[1], id: '3' },
        { ...testData[0], id: '2' }
      ]
    };

    const testState = burgerConstructorReducer(
      testInitialState,
      handleMoveIngredient({ preIndex: 1, newIndex: 0 })
    );

    expect(testState).toEqual(testReplaceState);
  });
});
