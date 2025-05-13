import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import videoReducer from "./videoSlice";

const persistConfig = {
  key: "videos", // Changed from "root" to "videos"
  storage,
  whitelist: ["likedVideos", "savedVideos"], // Specify which parts of state to persist
};

const persistedReducer = persistReducer(persistConfig, videoReducer);

export const store = configureStore({
  reducer: {
    videos: persistedReducer, // Directly use the persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
