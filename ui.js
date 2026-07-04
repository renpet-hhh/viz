// ui.js — navegação por abas e alternância de versão do mapa de calor.
// Não depende do runtime do Observable, então pode rodar antes dele.

(function () {
  "use strict";

  /* ---------- Abas ---------- */

  const tabButtons = Array.from(document.querySelectorAll(".tabs__btn"));
  const panels = {
    highlights: document.getElementById("tab-panel-highlights"),
    explore: document.getElementById("tab-panel-explore"),
  };

  function activateTab(tabName, { updateHash = true } = {}) {
    if (!panels[tabName]) return;

    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
      btn.tabIndex = isActive ? 0 : -1;
    });

    Object.entries(panels).forEach(([name, panel]) => {
      const isActive = name === tabName;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (updateHash) {
      history.replaceState(null, "", `#${tabName}`);
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });

  // Permite abrir direto em uma aba via #explore ou #highlights
  const initialTab = window.location.hash.replace("#", "");
  if (panels[initialTab]) {
    activateTab(initialTab, { updateHash: false });
  }

  const goToExploreBtn = document.getElementById("go-to-explore");
  if (goToExploreBtn) {
    goToExploreBtn.addEventListener("click", () => activateTab("explore"));
  }

  /* ---------- Alternância de versão do mapa de calor ---------- */

  const heatmapButtons = Array.from(document.querySelectorAll("[data-heatmap-version]"));
  const heatmapPanels = Array.from(document.querySelectorAll("[data-heatmap-panel]"));

  function activateHeatmapVersion(version) {
    heatmapButtons.forEach((btn) => {
      const isActive = btn.dataset.heatmapVersion === version;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-checked", String(isActive));
    });
    heatmapPanels.forEach((panel) => {
      panel.hidden = panel.dataset.heatmapPanel !== version;
    });
  }

  heatmapButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateHeatmapVersion(btn.dataset.heatmapVersion));
  });
})();