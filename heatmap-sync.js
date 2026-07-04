// heatmap-sync.js
//
// Sincroniza o estado interativo entre os dois gráficos independentes
// (exportHeatMap / exportHeatMap2). Resiliente a recriações de células do Observable.

(function () {
  "use strict";

  const SIGNALS_TO_SYNC = ["yearSelection"];
  const SELECTIONS_TO_SYNC = ["selectCell", "selectExporter", "selectImporter"];

  let viewA = null;
  let viewB = null;
  let nodeA = null;
  let nodeB = null;
  let activeHandlers = [];

  function getChartNode(containerId) {
    const container = document.getElementById(containerId);
    return container ? container.firstElementChild : null;
  }

  function getViewFromContainer(containerId) {
    const node = getChartNode(containerId);
    return node && node.value ? node.value : null;
  }

  // Notifica o runtime do Observable de que o valor da view mudou.
  // Usamos setTimeout para adiar o disparo para o final da fila de execução,
  // evitando que eventos disparados na carga inicial quebrem o ciclo do Vega.
  function notify(node) {
    if (node) {
      setTimeout(() => {
        node.dispatchEvent(new Event("input", { bubbles: true }));
      }, 0);
    }
  }

  function safeStringify(value) {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  // Remove os ouvintes registrados anteriormente
  function clearActiveHandlers() {
    activeHandlers.forEach(({ view, type, name, handler }) => {
      try {
        if (type === "signal") {
          view.removeSignalListener(name, handler);
        } else if (type === "data") {
          view.removeDataListener(name, handler);
        }
      } catch (e) {
        // Ignora caso a view já tenha sido descartada
      }
    });
    activeHandlers = [];
  }

  function syncSignal(vA, vB, nA, nB, name) {
    let applying = false;

    function mirror(fromView, toView, toNode) {
      return (_signalName, value) => {
        if (applying) return;
        const current = toView.signal(name);
        if (safeStringify(current) === safeStringify(value)) return;
        applying = true;
        try {
          toView.signal(name, value).run();
          notify(toNode);
        } finally {
          applying = false;
        }
      };
    }

    const handlerA = mirror(vA, vB, nB);
    const handlerB = mirror(vB, vA, nA);

    vA.addSignalListener(name, handlerA);
    vB.addSignalListener(name, handlerB);

    activeHandlers.push({ view: vA, type: "signal", name, handler: handlerA });
    activeHandlers.push({ view: vB, type: "signal", name, handler: handlerB });

    // Alinha o estado inicial de forma silenciosa (sem notificar no load inicial)
    const initial = vA.signal(name);
    if (safeStringify(vB.signal(name)) !== safeStringify(initial)) {
      vB.signal(name, initial).run();
    }
  }

  function syncSelection(vA, vB, nA, nB, name) {
    const storeName = `${name}_store`;
    let applying = false;

    function apply(fromView, toView, toNode) {
      if (applying) return;
      applying = true;
      try {
        const sigVal = fromView.signal(name);
        const dataVal = fromView.data(storeName);

        toView.signal(name, sigVal);
        toView.data(storeName, dataVal);
        toView.run();

        notify(toNode);
      } finally {
        applying = false;
      }
    }

    const handlerA = () => apply(vA, vB, nB);
    const handlerB = () => apply(vB, vA, nA);

    vA.addSignalListener(name, handlerA);
    vB.addSignalListener(name, handlerB);
    activeHandlers.push({ view: vA, type: "signal", name, handler: handlerA });
    activeHandlers.push({ view: vB, type: "signal", name, handler: handlerB });

    try {
      vA.addDataListener(storeName, handlerA);
      activeHandlers.push({ view: vA, type: "data", name: storeName, handler: handlerA });
    } catch (err) {
      console.warn(`heatmap-sync: falha ao registrar data listener para ${storeName} na viewA.`, err);
    }

    try {
      vB.addDataListener(storeName, handlerB);
      activeHandlers.push({ view: vB, type: "data", name: storeName, handler: handlerB });
    } catch (err) {
      console.warn(`heatmap-sync: falha ao registrar data listener para ${storeName} na viewB.`, err);
    }
  }

  function setupSync(vA, vB, nA, nB) {
    clearActiveHandlers();
    SIGNALS_TO_SYNC.forEach((name) => syncSignal(vA, vB, nA, nB, name));
    SELECTIONS_TO_SYNC.forEach((name) => syncSelection(vA, vB, nA, nB, name));
  }

  function checkAndRebind() {
    const newViewA = getViewFromContainer("observablehq-viewof-exportHeatMap");
    const newViewB = getViewFromContainer("observablehq-viewof-exportHeatMap2");
    const newNodeA = getChartNode("observablehq-viewof-exportHeatMap");
    const newNodeB = getChartNode("observablehq-viewof-exportHeatMap2");

    let changed = false;

    if (newViewA && newViewA !== viewA) {
      viewA = newViewA;
      nodeA = newNodeA;
      changed = true;
    }

    if (newViewB && newViewB !== viewB) {
      viewB = newViewB;
      nodeB = newNodeB;
      changed = true;
    }

    if (changed && viewA && viewB) {
      setupSync(viewA, viewB, nodeA, nodeB);
    }
  }

  function startMonitoring() {
    checkAndRebind();
    setInterval(checkAndRebind, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startMonitoring);
  } else {
    startMonitoring();
  }
})();