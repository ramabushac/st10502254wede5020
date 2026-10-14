/*
 * Hope Connect Foundation: dynamic content, search, filter and sort (WEDE5020 Part 3)
 * Builds cards from window.HCF_DATA and updates them without a page refresh.
 * Content is inserted with textContent (never innerHTML), so user input cannot inject markup.
 */
(function () {
  "use strict";

  function normalise(value) {
    return String(value == null ? "" : value).toLowerCase().trim();
  }

  // Keep items whose title, category or description contains every word typed, in the chosen category.
  function filterItems(items, query, category) {
    var words = normalise(query).split(/\s+/).filter(Boolean);
    return items.filter(function (item) {
      if (category && category !== "all" && item.category !== category) return false;
      var haystack = normalise(item.title + " " + item.category + " " + item.description);
      return words.every(function (w) { return haystack.indexOf(w) !== -1; });
    });
  }

  // Return a sorted copy: "az", "za" or "category" (then by title).
  function sortItems(items, mode) {
    var copy = items.slice();
    copy.sort(function (a, b) {
      if (mode === "category") {
        var c = a.category.localeCompare(b.category);
        return c !== 0 ? c : a.title.localeCompare(b.title);
      }
      var t = a.title.localeCompare(b.title);
      return mode === "za" ? -t : t;
    });
    return copy;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function buildCard(item, type) {
    var card = el("article", "catalog-card");
    var iconWrap = el("div", "catalog-icon");
    var icon = el("i", "fas " + item.icon);
    icon.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(icon);
    card.appendChild(iconWrap);
    card.appendChild(el("h3", "", item.title));
    card.appendChild(el("span", "catalog-tag", item.category));
    card.appendChild(el("p", "", item.description));
    var meta = el("p", "catalog-meta");
    meta.appendChild(el("strong", "", "Cost: "));
    meta.appendChild(document.createTextNode(item.cost));
    meta.appendChild(document.createElement("br"));
    meta.appendChild(el("strong", "", "Availability: "));
    meta.appendChild(document.createTextNode(item.availability));
    card.appendChild(meta);
    var link = el("a", "btn catalog-link", "Enquire about this");
    link.href = "enquiry.html?type=" + encodeURIComponent(type) + "&item=" + encodeURIComponent(item.id);
    card.appendChild(link);
    return card;
  }

  function initCatalog(section) {
    var type = section.getAttribute("data-catalog");
    var data = (window.HCF_DATA && window.HCF_DATA[type]) || [];
    var list = section.querySelector("[data-role='list']");
    var count = section.querySelector("[data-role='count']");
    var search = section.querySelector("[data-role='search']");
    var categorySelect = section.querySelector("[data-role='category']");
    var sortSelect = section.querySelector("[data-role='sort']");
    var reset = section.querySelector("[data-role='reset']");
    if (!list || !data.length) return;

    // Fill the category list from the data so it never goes out of date.
    var categories = data.map(function (d) { return d.category; })
      .filter(function (c, i, all) { return all.indexOf(c) === i; }).sort();
    categories.forEach(function (c) {
      var option = el("option", "", c);
      option.value = c;
      categorySelect.appendChild(option);
    });

    function render() {
      var results = sortItems(filterItems(data, search.value, categorySelect.value), sortSelect.value);
      list.textContent = "";
      list.setAttribute("aria-busy", "false");
      results.forEach(function (item) { list.appendChild(buildCard(item, type)); });
      if (!results.length) {
        list.appendChild(el("p", "catalog-empty", "No " + type + " match your search. Try a different word or choose All categories."));
      }
      count.textContent = "Showing " + results.length + " of " + data.length + " " + type + ".";
    }

    var timer;
    search.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(render, 150);
    });
    categorySelect.addEventListener("change", render);
    sortSelect.addEventListener("change", render);
    if (reset) {
      reset.addEventListener("click", function () {
        search.value = "";
        categorySelect.value = "all";
        sortSelect.value = "az";
        render();
        search.focus();
      });
    }
    render();
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", function () {
      Array.prototype.forEach.call(document.querySelectorAll("[data-catalog]"), initCatalog);
    });
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { filterItems: filterItems, sortItems: sortItems };
  }
})();
