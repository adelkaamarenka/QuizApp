import translationDe from "../translations/de.js";
import translationPl from "../translations/pl.js";

function findLanguage() {
  let params = new URL(document.URL).searchParams;
  let lang = params.get("lang");
  return lang;
}

function translateText(content, lang) {
  switch (lang) {
    case "de":
      if (translationDe[content] != null) {
        return translationDe[content];
      } else {
        return content;
      }

    case "pl":
      if (translationPl[content] != null) {
        return translationPl[content];
      } else {
        return content;
      }

    default:
      return content;
  }
}

function appendLanguage(href, lang) {
  switch (lang) {
    case "de":
      return href += "?lang=de";

    case "pl":
      return href += "?lang=pl";

    default:
      return href
  }
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

init()
