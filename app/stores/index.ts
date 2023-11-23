import * as React from "react";

import { adminDataStore } from "./admin/dataStore.js";
import { adminUserStore } from "./admin/userStore.js";
import { commonStore } from "./commonStore.js";
import { engineChatStore } from "./engine/chatStore.js";
import { engineDataStore } from "./engine/dataStore.js";
import { engineStore } from "./engine/engineStore.js";
import { logoStore } from "./engine/logoStore.js";
import { IdentityDataStore } from "./identity/dataStore.js";
import { LibraryDataStore } from "./library/dataStore.js";
import { testStore } from "./test/testStore.js";
import { boardStore } from "./user/boardStore.js";
import { canvasStore } from "./user/canvasStore.js";
import { feedStore } from "./user/feedStore.js";
import { welcomeStore } from "./user/welcomeStore.js";
import { WorkDataStore } from "./work/dataStore.js";

export function createStores() {
  return {
    commonStore: new commonStore(),

    adminDataStore: new adminDataStore(),
    adminUserStore: new adminUserStore(),

    identityDataStore: new IdentityDataStore(),
    libraryDataStore: new LibraryDataStore(),
    workDataStore: new WorkDataStore(),

    engineChatStore: new engineChatStore(),
    engineDataStore: new engineDataStore(),
    engineStore: new engineStore(),

    boardStore: new boardStore(),
    canvasStore: new canvasStore(),
    welcomeStore: new welcomeStore(),
    feedStore: new feedStore(),

    testStore: new testStore(),

    logoStore: new logoStore(),
  };
}

export const stores = createStores();
export const AppContext = React.createContext(stores);
