// src/store/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import videoReducer from "./videoSlice";
import subscribeReducer from "./subscribeSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["videos", "subscriptions"],
};

const rootReducer = combineReducers({
  videos: videoReducer,
  subscriptions: subscribeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
