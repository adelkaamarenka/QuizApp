import translationDe from "./translations/de.js";
import translationPl from "./translations/pl.js";

const toTranslate = document.querySelectorAll(".translate");

const lang = findLanguage();

toTranslate.forEach((element) => {
  element.textContent = translateText(element.textContent, lang);
});

function findLanguage() {
  let params = new URL(document.URL).searchParams;
  let lang = params.get("lang");
  return lang;
}

function translateText(content, lang) {
  switch (lang) {
    case "de":
      return translationDe[content];

    case "pl":
      return translationPl[content];

    case "en":
      return content;
  }
}
