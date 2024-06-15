import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    resetBurgerConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    handleMoveIngredient: (state, action) => {
      const { preIndex, newIndex } = action.payload;
      [state.ingredients[preIndex], state.ingredients[newIndex]] = [
        state.ingredients[newIndex],
        state.ingredients[preIndex]
      ];
    }
  },
  selectors: {
    getBurgerConstructor: (state) => state
  }
});
export const {
  addIngredient,
  removeIngredient,
  resetBurgerConstructor,
  handleMoveIngredient
} = burgerConstructorSlice.actions;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const { getBurgerConstructor } = burgerConstructorSlice.selectors;
