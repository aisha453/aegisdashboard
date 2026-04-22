import { createContext, useContext, useState } from "react";
import { initialIncidents } from "../data/mockData";

const AppContext = createContext();

const MAX_LOG_ENTRIES = 40;

const normalizeIncident = (incident) => ({
  id: incident.id ?? Date.now(),
  type: incident.type || "General",
  location: incident.location || "Unknown",
  priority: incident.priority || "MEDIUM",
  status: incident.status || "ACTIVE",
  confidence:
    typeof incident.confidence === "number" ? incident.confidence : 75,
  timestamp: incident.timestamp || "just now",
  createdAt: incident.createdAt || new Date().toISOString(),
  resolvedAt: incident.resolvedAt || null,
});

const makeLog = (message, level = "info") => ({
  id: Date.now() + Math.random(),
  message,
  level,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
});

const seedIncidents = initialIncidents.map(normalizeIncident);

export const AppProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(seedIncidents);
  const [selectedIncident, setSelectedIncident] = useState(
    seedIncidents[0] || null,
  );
  const [executionLog, setExecutionLog] = useState([
    makeLog("System online. Monitoring incidents."),
  ]);

  const appendLog = (message, level = "info") => {
    const log = makeLog(message, level);
    setExecutionLog((prev) => [log, ...prev].slice(0, MAX_LOG_ENTRIES));
  };

  const addIncident = (incident) => {
    const newIncident = normalizeIncident(incident);
    setIncidents((prev) => [newIncident, ...prev]);
    setSelectedIncident((prev) => prev || newIncident);

    appendLog(
      `Incident reported: ${newIncident.type} at ${newIncident.location} (${newIncident.priority})`,
      newIncident.priority === "HIGH" ? "critical" : "info",
    );
  };

  const setIncidentStatus = (incidentId, status) => {
    let updatedIncident = null;

    setIncidents((prev) =>
      prev.map((incident) => {
        if (incident.id !== incidentId) {
          return incident;
        }

        updatedIncident = {
          ...incident,
          status,
          resolvedAt: status === "RESOLVED" ? new Date().toISOString() : null,
        };

        return updatedIncident;
      }),
    );

    setSelectedIncident((prev) =>
      prev?.id === incidentId
        ? {
            ...prev,
            status,
            resolvedAt: status === "RESOLVED" ? new Date().toISOString() : null,
          }
        : prev,
    );

    if (updatedIncident) {
      const level = status === "RESOLVED" ? "success" : "info";
      appendLog(
        `Incident ${updatedIncident.id} set to ${status} (${updatedIncident.type})`,
        level,
      );
    }
  };

  const resolveIncident = (incidentId) => {
    setIncidentStatus(incidentId, "RESOLVED");
  };

  return (
    <AppContext.Provider
      value={{
        incidents,
        selectedIncident,
        setSelectedIncident,
        executionLog,
        addIncident,
        setIncidentStatus,
        resolveIncident,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
