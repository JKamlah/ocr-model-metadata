const i18n_languages = ["English"];
let default_language = navigator.language || navigator.userLanguage; 
if (default_language.startsWith("en-")) { default_language = "English"; }
else if (default_language.startsWith("fr-")) { default_language = "Français"; }
else if (default_language.startsWith("de-")) { default_language = "Deutsch"; }
else { default_language = "English"; }


const i18n_item = new vanilla_i18n (
  i18n_languages,
  opts = {
    path: "ocr-model-metadata/assets/vanilla-i18n",
    debug: true,
    i18n_attr_name: "vanilla-i18n",
    toggler_id: "vanilla-i18n-toggler",
    default_language: default_language,
  }
);

(function(){ i18n_item.run(); })();
