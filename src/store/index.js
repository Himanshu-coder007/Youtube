import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import videoReducer from "./videoSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["videos"], // only videos reducer will be persisted
};

const persistedReducer = persistReducer(persistConfig, videoReducer);

export const store = configureStore({
  reducer: {
    videos: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
