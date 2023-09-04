(function() { // Document ready

    const form = document.getElementById("generate"),
        output = document.getElementById("output"),
        link = document.getElementById("output-link"),
        outputContainer = document.getElementById("output-container"),
        authorOriginal = document.querySelector(".original-author"),
        authorContainer = authorOriginal.parent,
        imgTag = document.querySelector("#imageContainer");


    const LICENSES = {
      "PublicDomainMark 1.0": 'https://creativecommons.org/publicdomain/mark/1.0/',
      "CC0 1.0": 'https://creativecommons.org/licenses/zero/1.0/',
      "CC-BY 4.0": 'https://creativecommons.org/licenses/by/4.0/',
      "CC-BY-SA 4.0": 'https://creativecommons.org/licenses/by-sa/4.0/',
      "Etalab OL 2.0": 'https://spdx.org/licenses/etalab-2.0.html',
      "ODbL 1.0": 'https://opendatacommons.org/licenses/odbl/1-0/'
    };


    let idForAuthors = 0;

    const addAuthor = function(event) {
      event.preventDefault();
      // Retrieve element and their copy
      let new_elem = authorOriginal.cloneNode(true),
          add_button = new_elem.querySelector(".add-author"),
          remove_button = new_elem.querySelector(".remove-author"),
          checkboxes = new_elem.querySelectorAll(".form-check"),
          text_inputs = new_elem.querySelectorAll("input[type='text']");


      // Clean text inputs
      for (var i = text_inputs.length - 1; i >= 0; i--) {
        text_inputs[i].value = "";
      }

      // Make sure the labels and input have new IDs, as IDs are unique !
      for (var i = checkboxes.length - 1; i >= 0; i--) {
        let inp = checkboxes[i].querySelector("input"),
            cat = inp.value;
        inp.setAttribute("id", `cb-${cat}-${idForAuthors.toString()}`);
        checkboxes[i].querySelector("label").setAttribute("for", inp.id);
        inp.checked = null;
      }

      idForAuthors++;
      // Insert element in the DOM
      authorOriginal.after(new_elem);
      // Un-hide the element for removal
      remove_button.classList.remove("invisible");

      // Register events
      add_button.addEventListener("click", addAuthor);
      remove_button.addEventListener("click", function(ev) { new_elem.remove(); });
    };
    
    document.querySelector(".add-author").addEventListener("click", addAuthor);

    const segSourcesOriginal = document.querySelector(".segmentation-sources-form");

    const addSegmentationSource = function(event) {
      event.preventDefault();
      // Retrieve element and their copy
      let new_elem = segSourcesOriginal.cloneNode(true),
          add_button = new_elem.querySelector(".add-segmentation-source"),
          remove_button = new_elem.querySelector(".remove-segmentation-source"),
          text_inputs = new_elem.querySelectorAll("input[type='text']");


      // Clean text inputs
      for (var i = text_inputs.length - 1; i >= 0; i--) {
        text_inputs[i].value = "";
      }
      // Insert element in the DOM
      segSourcesOriginal.after(new_elem);
      // Un-hide the element for removal
      remove_button.classList.remove("d-none");

      // Register events
      add_button.addEventListener("click", addSegmentationSource);
      remove_button.addEventListener("click", function(ev) { new_elem.remove(); });
    };

    document.querySelector(".add-segmentation-source").addEventListener("click", addSegmentationSource);

    const sourcesOriginal = document.querySelector(".sources-form");

    const addSources = function(event) {
      event.preventDefault();
      // Retrieve element and their copy
      let new_elem = sourcesOriginal.cloneNode(true),
          add_button = new_elem.querySelector(".add-sources"),
          remove_button = new_elem.querySelector(".remove-sources"),
          text_inputs = new_elem.querySelectorAll("input");
          text_textareas = new_elem.querySelectorAll("textarea");


      // Clean text inputs
      for (var i = text_inputs.length - 1; i >= 0; i--) {
        text_inputs[i].value = "";
      }
      for (var i = text_textareas.length - 1; i >= 0; i--) {
        text_textareas[i].value = "";
      }

      // Insert element in the DOM
      sourcesOriginal.after(new_elem);
      // Un-hide the element for removal
      remove_button.classList.remove("d-none");

      // Register events
      add_button.addEventListener("click", addSources);
      remove_button.addEventListener("click", function(ev) { new_elem.remove(); });
    };

    document.querySelector(".add-sources").addEventListener("click", addSources);

    const tagsOriginal = document.querySelector(".tags-form");

    const addTags = function(event) {
      event.preventDefault();
      // Retrieve element and their copy
      let new_elem = tagsOriginal.cloneNode(true),
          add_button = new_elem.querySelector(".add-tags"),
          remove_button = new_elem.querySelector(".remove-tags"),
          text_inputs = new_elem.querySelectorAll("input");
          text_textareas = new_elem.querySelectorAll("textarea");


      // Clean text inputs
      for (var i = text_inputs.length - 1; i >= 0; i--) {
        text_inputs[i].value = "";
      }
      for (var i = text_textareas.length - 1; i >= 0; i--) {
        text_textareas[i].value = "";
      }
      idForAuthors++;
      // Insert element in the DOM
      tagsOriginal.after(new_elem);
      // Un-hide the element for removal
      remove_button.classList.remove("d-none");

      // Register events
      add_button.addEventListener("click", addTags);
      remove_button.addEventListener("click", function(ev) { new_elem.remove(); });
    };

    document.querySelector(".add-tags").addEventListener("click", addTags);

    const normalize = function(a_string) {
      return str?.replace("'", "’") ?? "";
    };


    const slugify = function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');

        // Make the string lowercase
        str = str.toLowerCase();

        // Remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        // Remove invalid chars
        str = str.replace(/[^a-z0-9 -]/g, '') 
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-') 
        // Collapse dashes
        .replace(/-+/g, '-'); 

        return str;
    };

    const getAuthors = function () {
      let out = {"authors": []},
          authors = document.querySelectorAll(".author");

      if (authors.length == 0) {
        return {};
      }
      for (var i = 0; i < authors.length; i++) {
        let surname = authors[i].querySelector("input[name='authoritySurname']").value,
            name = authors[i].querySelector("input[name='authorityName']").value,
            orcid = authors[i].querySelector("input[name='authorityORCID']").value,
            status = authors[i].querySelector("input[name='authorityType']:checked");

        if (name.trim() === "") { continue; }

        let a = {
          "name": name,
          "surname": surname
        }
          if (orcid.trim() !== "") {
            a["orcid"] = orcid;
          }
        let roles = authors[i].querySelectorAll("input[type='checkbox']:checked");
        if (roles.length > 0) {
          a.roles = [...roles].map((o) => o.value);
        }
        out.authors.push(a);
        
      }
      if (out.authors.length === 0) { return {}; }

      return out;
    };

    const getModel = function () {
      let out = {"model": {}};
      const ids = {'modelName': 'name',
      'repoLink': 'repo',
      'defaultModelLink': 'defaultmodel',
      'modelDesc': 'description',
      'topology': 'topology',
      'modelfileformat': 'fileformat',
      'modeltype': 'type',
      'defaultmodel-creation': 'creation-date'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.model);

      out.model['license'] = {}
      out.model.license['name'] = document.getElementById('license').value;
      out.model.license['url'] =  LICENSES[document.getElementById('license').value];

      if (Object.keys(out.model).length === 0) { return {}; }

      return out;
    };

   const getUses = function () {
      let out = {"uses": {}};
      const ids = {'uses': 'general',
      'usesDirect': 'direct',
      'usesDownstream': 'downstream',
      'usesOOS': 'outofscope'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.uses);

      if (Object.keys(out.uses).length === 0) { return {}; }

      return out;
   };

   const getRisks = function () {
      let out = {"risks": {}};
      const ids = {'riskGeneral': 'general',
      'riskRecommendations': 'recommendations'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.risks);
      if (Object.keys(out.risks).length === 0) { return {}; }
      return out;
   };

   const getProject = function () {
      let out = {"project": {}};
      const ids = {'projectName': 'name',
      'projectWebsite': 'homepage'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.project);
      if (Object.keys(out.project).length === 0) { return {}; }
      return out;
   };

   const getCitation = function () {
      let out = {"citation": {}};
      const ids = {'citationCFF': 'CFF',
      'citationAPA': 'APA',
      'citationBibTeX': 'BIBTex'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.citation);

      if (Object.keys(out.citation).length === 0) { return {}; }
      return out;
   };

   const getAdditionalInfo = function () {
      let out = {"additional": {}};

      const ids = {'glossary': 'glossary',
      'howTo': 'how-to'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.additional);
      if (Object.keys(out.additional).length === 0) { return {}; }
      return out;
   };


    const getTraining = function () {
      let out = {"training": {"info": {}, "data": {}}};

      out.training.info['trainingstype'] = document.getElementById('trainingstype').value;

      const ids = {'basemodel_link': 'general', 'epochs': 'direct'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.training.info);
      out.training.info['environmentalImpact'] = {};

      const envids = {'envHardware': 'hardware',
      'envHours': 'hours',
      'envProvider':'provider',
      'envRegion':'region',
      'envCarbon':'carbon'};

      updateOrIgnoreDictWithIdKeyDict(envids, out.training.info.environmentalImpact);

      if (Object.keys(out.training.info.environmentalImpact).length === 0) { delete out.training.info['environmentalImpact'] }
      if (Object.keys(out.training.info).length === 0) { delete out.training['info'] }

      var segmentation_data = document.getElementById('segmentation_data');
      if (segmentation_data.style.display == 'flex'){
        out.training.data["type"] = "segmentation"
        let feature_ids = document.getElementById("features").querySelectorAll("input[type='checkbox']:checked");
        if (feature_ids.length > 0) {
          out.training.data["features"] = []
          out.training.data.features = [...feature_ids].map((o) => o.value);
        }
        out.training.data["elementType"] = elementTypeSelect.value();
        out.training.data["elementTags"] = getTags();
        out.training.data["datasets"] = getDatasets("segmentation");
        out.training.data["level"] = document.getElementById('segmentation-level').value;
        out.training.data["dataModifications"] = document.getElementById('segmentationDataModifications').value;
      } else {
        out.training.data["type"] = "transcription"
        let scriptType = document.getElementById("scriptType")
        if (scriptType.value !== "info") {
            out.training.data["scriptType"] = scriptType.value;
        }
        out.training.data = updateOrIgnoreDict(document.getElementById("date-begin").value, "notBefore", out.training.data);
        out.training.data = updateOrIgnoreDict(document.getElementById("date-end").value, "notAfter", out.training.data);
        out.training.data["languages"] = languageSelect.value();
        out.training.data["script"] = scriptSelect.value();
        out.training.data["datasets"] = getDatasets("transcription");
        out.training.data["level"] = document.getElementById('transcription-level').value;
        out.training.data["data-modifications"] = document.getElementById('transcriptionDataModifications').value;
      };

      cleanEmptyKeys(out.training.data);

      if (Object.keys(out.training.data.datasets).length === 0)  { delete out.training.data['datasets'] }
      if (Object.keys(out.training.data).length === 0)  { delete out.training['data'] }
      if (Object.keys(out.training).length === 0)  { return {}; }
      return out;
    };

    const getEvaluation = function () {
      let out = {"evaluation": {}};
      const ids = {'evalInput': 'input',
      'evalData': 'data',
      'evalFactors':'factors',
      'evalMetrics':'metrics',
      'evalResults':'results'};

      updateOrIgnoreDictWithIdKeyDict(ids, out.evaluation);

      if (Object.keys(out.evaluation).length === 0)  { return {}; }

    return out;
    };

    const getTags = function () {
        let out = {"tags": []},
        tags = document.querySelectorAll(".tags-form");

        if (tags.length == 0) { return {}; }
        for (var i = 0; i < tags.length; i++) {
            let type = tags[i].querySelector("select[name='segmentationTag']").value,
                tag = tags[i].querySelector("textarea[name='segmentationTagDescription']").value;

        if (tag.trim() === "") { continue; }

        // DO NOT REINDENT
        out.tags.push({
          "elementType": type,
          "tag": tag,
        });
      }
      if (out.tags.length === 0) { return {}; }

      return out;
    };

    const getSoftware = function () {
      let out = {"software": {}};
      const ids = {'software_name': 'name', 'software_other': 'other', 'software_version': 'version'};
      updateOrIgnoreDictWithIdKeyDict(ids, out.software);
      if (Object.keys(out.software).length === 0)  { return {}; }
      return out;
    };

    const getDatasets = function (type) {
        let out = {"datasets": []},
        datasets = document.querySelectorAll("."+type+"-sources-form");
        if (datasets.length == 0) { return {}; }
        for (var i = 0; i < datasets.length; i++) {
            let link = datasets[i].querySelector("input[name='"+type+"DatasetLink']").value,
                description = datasets[i].querySelector("textarea[name='"+type+"DatasetDescription']").value;

        if (link.trim() === "") { continue; }

        // DO NOT REINDENT
        out.datasets.push({
          "link": link,
          "description": description,
        });
      }
      if (out.datasets.length === 0) { return {}; }

      return out;
    };


    const getMetrics = function () {
      let text = {"volume": []},
          metrics = document.querySelectorAll(".metric-form");

      if (metrics.length == 0) { return {}; }
      for (var i = 0; i < metrics.length; i++) {
        let metric_count = metrics[i].querySelector("input[name='metric-count']").value,
            metric_metric = metrics[i].querySelector("select[name='metric-metric']").value;

        if (metric_count.trim() === "") { continue; }

        // DO NOT REINDENT
        text.volume.push({
          "metric": metric_metric,
          "count": parseInt(metric_count)
        }); 
      }
      if (text.volume.length === 0) { return {}; }

      return text;
    };

    const getSources = function () {
      let text = {"sources": []},
          sources = document.querySelectorAll(".sources-form");

      if (sources.length == 0) {
        return {};
      }
      for (var i = 0; i < sources.length; i++) {
        let sources_ref = sources[i].querySelector("input[name='sources-ref']").value,
            sources_link = sources[i].querySelector("input[name='sources-link']").value;

        if (sources_ref.trim() === "" && sources_link.trim() === "") { continue; }

        // DO NOT REINDENT
        text.sources.push({
          "reference": sources_ref,
          "link": sources_link
        });
      }
      if (text.sources.length == 0) { return {}; }

      return text;
    };

    const elementTypeSelect = new SelectPure(".element-type", {
        options: element_types,
        multiple: true,
        autocomplete: true, // default: false
        value: ["Region", "TextLine"],

        icon: "fa fa-times", // uses Font Awesome
        inlineIcon: false // custom cross icon for multiple select.
    });

    const languageSelect = new SelectPure(".language", {
        options: languages,
        multiple: true,
        autocomplete: true, // default: false
        value: ["eng", "fra", "deu"], 

        icon: "fa fa-times", // uses Font Awesome
        inlineIcon: false // custom cross icon for multiple select.
    });
    const scriptSelect = new SelectPure(".scripts", {
        options: scripts,
        multiple: true,
        autocomplete: true, // default: false
        value: ["Latn", "Goth"],
            
        icon: "fa fa-times", // uses Font Awesome
        inlineIcon: false // custom cross icon for multiple select.
    });
    
    let downloadBind = false;

    const escape_yaml = function(str) {
      return str.replace("'", "\\u0027")
    };

    const updateOrIgnore = function(field, key) {
      let out = [];
      if (field !== undefined && field.trim() != ""){
        out[key] = field;
      }
      return out;
    };

    const updateOrIgnoreDict = function(field, key, dict) {
      if (field !== undefined && field.trim() != ""){
        dict[key] = field;
      }
      return dict;
    };

    const cleanEmptyKeys = function (dict) {
     Object.entries(dict).forEach(([key, val]) =>  {
         if (val === "") {
            delete dict[key];
         }
      });
     return dict;
    }

    const updateOrIgnoreDictWithIdKeyDict = function(idkeys, dict) {
      Object.entries(idkeys).forEach(([id, key]) =>  {
         var ele = document.getElementById(id);
         if (ele.value !== "" && ele.style.display !== "none") {
            dict[key] = ele.value;
         }
      });
      return dict;
    };

    const get_or_none_charriot = function(field, yaml) {
      if (field !== undefined && field.trim() != ""){
        return `${yaml}: >\n    ${field.split('\n').join('\n    ')}'`
      }
      return "";
    };

     document.getElementById("modelfileformat").addEventListener('change', function(el) {
        event.preventDefault();
        val = el.target.value;
        software = document.getElementById("software_name");
        switch(val) {
            case ".traineddata":
                software.value = "Tesseract";
                break;
            case ".h5":
                software.value = "Calamari";
                break;
            case ".pt":
                software.value = "PyTorch";
                break;
            case ".pb":
                software.value = "Eynollah";
                break;
            case ".mlmodel":
                software.value = "Kraken";
                break;
            case ".ckpt":
                software.value = "Calamari";
                break;
            default:
                software.value = "Other";
                document.getElementById("software-key-other").click();
        }
      });

    document.querySelectorAll(".evaluation-metric-key").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("evalMetrics").value = el.innerText;
      })
    });

    document.querySelectorAll(".software-key").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#software_name").value = el.innerText;
        var otherSoftware = document.getElementById('other_software');
        if (el.id !== "software-key-other") {
            otherSoftware.style.display = 'None';
        } else {
            otherSoftware.style.display = 'flex';
        }
      })
    });

   document.querySelectorAll(".modeltype-key").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#modeltype").value = el.innerText;
        var segementation_data = document.getElementById('segmentation_data');
        var transcription_data = document.getElementById('transcription_data');
        if (el.id === "modeltype-key-segmentation") {
            segementation_data.style.display = 'flex';
            transcription_data.style.display = 'None';
        } else {
            segementation_data.style.display = 'None';
            transcription_data.style.display = 'flex';
        }
      })
   });

   document.querySelectorAll(".doctype-key").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#doctype").value = el.innerText;
      })
    });

   document.querySelectorAll(".trainingstype-key").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        document.querySelector("#trainingstype").value = el.innerText;
        var baseModelContainer = document.getElementById('basemodel_container');
        if (el.id === "trainingstype-key-from-scratch") {
            baseModelContainer.style.display = 'None';
        } else {
            baseModelContainer.style.display = 'flex';
        }
      })
    });


    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let data = Object.fromEntries(new FormData(form));
      let languages = languageSelect.value().join("\n  - ");
      let element_types = elementTypeSelect.value().join("\n  - ");
      let scripts = scriptSelect.value().join("\n  - ");

      let obj = {
        "schema": "https://github.com/JKamlah/ocr-model-metadata/tree/master/schema/2022-03-15/schema.json",

        // Model
        ...getModel(),

        // Software
        ...getSoftware(),

        // Training
        ...getTraining(),

       // Evaluation
       ...getEvaluation(),

       // Citation
       ...getCitation(),

       // Uses
       ...getUses(),

       // Risks
       ...getRisks(),

       // Project
       ...getProject(),

       // Persons
       ...getAuthors(),

       // Additional information
       ...getAdditionalInfo(),
      };

      output.innerText = jsyaml.dump(obj, {"noRef": true});
      outputContainer.classList.remove("d-none");
      link.href = `${(data.repoLink)}/new/main?filename=METADATA.yml`;
      


      if (downloadBind === false) {
        document.querySelector("#download").addEventListener("click", function (e) {
          e.preventDefault();
          let element = document.createElement('a');
          element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(document.querySelector("#output").innerText));
          element.setAttribute('download', "METADATA.yml");

          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
        });
        downloadBind = true;
      }
    });
})();
