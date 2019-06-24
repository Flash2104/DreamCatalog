import { Action } from '@ngrx/store';
import { IProductStateModel, initialState } from './product.model';
import {
  ProductActionTypes,
  ProductAddChangeAction,
  ProductCreateCompleteAction,
  ProductLoadCompleteAction,
  ProductUpdateCompleteAction,
  ProductErrorAction
} from './product.actions';

export function productReducer(state: IProductStateModel = initialState, action: Action) {
  const model = { ...state };
  switch (action.type) {
    case (ProductActionTypes.AddChange): {
      const addChange = action as ProductAddChangeAction;
      model.isChanged = true;
      model.changed = { ...addChange.payload };
      return model;
    }
    case (ProductActionTypes.CancelChanges): {
      model.changed = { ...model.product };
      model.isChanged = false;
      return model;
    }
    case (ProductActionTypes.Init): {
      return initialState;
    }
    case (ProductActionTypes.Create): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.CreateComplete): {
      const createCompleteAction = action as ProductCreateCompleteAction;
      model.product = { ...createCompleteAction.payload };
      model.changed = { ...createCompleteAction.payload };
      model.notifications.push(`Продукт ${model.product.title}(${model.product.id}) создан!`);
      model.isChanged = false;
      model.isLoading = false;
      return model;
    }
    case (ProductActionTypes.Update): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.UpdateComplete): {
      const updateCompleteAction = action as ProductUpdateCompleteAction;
      model.product = { ...updateCompleteAction.payload };
      model.changed = { ...updateCompleteAction.payload };
      model.notifications.push(`Продукт ${model.product.title}(${model.product.id}) обновлен!`);
      model.isLoading = false;
      model.isChanged = false;
      return model;
    }
    case (ProductActionTypes.Load): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.LoadComplete): {
      const loadCompleteAction = action as ProductLoadCompleteAction;
      model.product = { ...loadCompleteAction.payload };
      model.changed = { ...loadCompleteAction.payload };
      model.isLoading = false;
      model.isChanged = false;
      return model;
    }
    case (ProductActionTypes.Error): {
      const payload = (<ProductErrorAction>action).payload;
      model.isLoading = false;
      for (let i = 0; i < payload.length; i++) {
        model.errors.messages.push(payload[i]);
      }
      return model;
    }
    default:
      return model;
  }
}
