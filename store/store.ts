import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported = 
   | "en"
   | "es"
   | "de"
   | "fr"
   | "af"
   | "zu"
   | "xh"
   | "ts"
   | "sn"
   | "st"
   | "sno"
   | "sw";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
    en : "English",
    es : "Spanish",
    de : "German",
    fr : "French",
    af : "Afrikaans",
    zu : "Zulu",
    xh :  "Xhosa",
    ts : "Tsonga",
    sn : "Shona",
    st : "Sesotho",
    sno : "Sepedi",
    sw : "Swahili",
};

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
   language: "en",
   setLanguage: (language: LanguagesSupported) => set({ language }),
   getLanguages: (isPro: boolean) => {

    if (isPro)
       return Object.keys(LanguagesSupportedMap) as LanguagesSupported[];
      
       return Object.keys(LanguagesSupportedMap).slice(
      0,
      2
      ) as LanguagesSupported[];
   },

   getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguagesSupportedMap).slice(2) as LanguagesSupported[];
   },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (Subscription: Subscription | null) => void;   
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));