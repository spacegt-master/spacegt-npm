/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// Translations provided by Spacegt
import en from "@/locales/en";
import zhHans from "@/locales/zhHans";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    // defaultTheme: "dark",
  },
  locale: {
    locale: "en",
    messages: { en, zhHans },
  },
});
