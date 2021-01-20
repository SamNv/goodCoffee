import Vue from "vue";
import VueI18n from "vue-i18n";
import enMessage from "../locales/en.json";
import jaMessage from "../locales/ja.json";

Vue.use(VueI18n);

const messages = {
  en: enMessage,
  ja: jaMessage
};

const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  ja: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    }
  }
};

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD"
    }
  },
  ja: {
    currency: {
      style: "currency",
      currency: "JPY",
      currencyDisplay: "symbol"
    }
  }
};

const i18n = new VueI18n({
  locale: "ja",
  messages,
  dateTimeFormats,
  numberFormats,
  fallbackLocale: "en"
});

export default new VueI18n(i18n);
