import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from 'redux-persist/lib/storage';
import MetaMaskReducer from '../features/MetaMaskSlice';
import OrganisationSettingsReducer from "@/features/OrganisationSettingsSlice";


const reducers = combineReducers({
  metaMask: MetaMaskReducer,
  organisationSettings:OrganisationSettingsReducer
})
const persistReducers = persistReducer(
  {
    key: 'account',
    storage,
    keyPrefix: 'newwww-'
  },
  reducers,
)
const store = configureStore({
  reducer: persistReducers,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persister = persistStore(store);

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


