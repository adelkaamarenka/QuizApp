import translationDe from "../translations/de.js";
import translationPl from "../translations/pl.js";

document.addEventListener("DOMContentLoaded", init);
let langExport = findLanguage();

function findLanguage() {
  let params = new URL(document.URL).searchParams;
  let lang = params.get("lang");
  return lang;
}

function translateText(content, lang) {
  switch (lang) {
    case "de":
      if (translationDe[content]) {
        return translationDe[content];
      }
      return content;


    case "pl":
      if (translationPl[content]) {
        return translationPl[content];
      } return content;

    default:
      return content;
  }
}

function appendLanguage(href, lang) {
  return lang ? `${href}?lang=${lang}` : href;
}

function init() {
  const toTranslate = document.querySelectorAll("[data-translate]");

  const hyperlinks = document.querySelectorAll("[data-hyperlink]");

  const lang = findLanguage();

  toTranslate.forEach((element) => {
    element.textContent = translateText(element.textContent, lang);
  });

  hyperlinks.forEach((element) => {
    element.href = appendLanguage(element.href, lang);


  });
}

export default langExport;
export { translateText };

