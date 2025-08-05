import { useState, useEffect, useRef } from "react";
import { analyzeNPA } from "../../helper/analyzeNPA";
import { generateAgentCommentary } from "../../helper/generateAgentCommentary";

const tabs = [
  { id: "npa", label: "NPA" },
  { id: "riskProfile", label: "Risk Profile" },
  { id: "momReporting", label: "M-o-M Reporting" },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState("lib");
  const [notifications, setNotifications] = useState([]);
  const [reviewActions, setReviewActions] = useState([]);

  const [riskLibraryData, setRiskLibraryData] = useState([
    {
      Risk_ID: "R00001",
      Record_Status: "Active",
      Risk_Name: "Delayed project risk mitigation",
      Risk_Description: "Operating model changes without sufficient review",
      Level_1: "Operational Risk",
      Level_2: "Change Management Risk",
      Level_3: "Projects/Initiatives",
      Inherent_Risk_Rating: "Minor",
      Latest_Overall_Control_Effectiveness: "Good",
      Net_Risk_Rating: "Moderate",
      Unit: "GFM",
      Creation_Date: "2025-02-10",
      Last_Updated: "2025-08-05",
      Linked_Control_IDs: ["C00001", "C00003"],
    },
    {
      Risk_ID: "R00002",
      Record_Status: "Active",
      Risk_Name: "Customer record inaccuracy",
      Risk_Description: "Delayed mitigation of key project risks",
      Level_1: "Operational Risk",
      Level_2: "Third Party Risk",
      Level_3: "Outsourcing Arrangement",
      Inherent_Risk_Rating: "Major",
      Latest_Overall_Control_Effectiveness: "Fail",
      Net_Risk_Rating: "Major",
      Unit: "GFM",
      Creation_Date: "2025-04-26",
      Last_Updated: "2025-08-05",
      Linked_Control_IDs: ["C00002", "C00005"],
    },
    {
      Risk_ID: "R00003",
      Record_Status: "Active",
      Risk_Name: "New product control gaps",
      Risk_Description: "Delayed monitoring of trading exposures",
      Level_1: "Operational Risk",
      Level_2: "Third Party Risk",
      Level_3: "Non-Outsourcing Arrangement",
      Inherent_Risk_Rating: "Moderate",
      Latest_Overall_Control_Effectiveness: "Poor",
      Net_Risk_Rating: "Minor",
      Unit: "GFM",
      Creation_Date: "2025-05-30",
      Last_Updated: "2025-08-05",
      Linked_Control_IDs: ["C00002"],
    },
    {
      Risk_ID: "R00004",
      Record_Status: "Active",
      Risk_Name: "New product control gaps",
      Risk_Description:
        "Inaccuracies in customer records due to manual updates",
      Level_1: "Operational Risk",
      Level_2: "Change Management Risk",
      Level_3: "New Products/Services",
      Inherent_Risk_Rating: "Minor",
      Latest_Overall_Control_Effectiveness: "Fail",
      Net_Risk_Rating: "Moderate",
      Unit: "GFM",
      Creation_Date: "2025-04-17",
      Last_Updated: "2025-08-05",
      Linked_Control_IDs: ["C00005"],
    },
    {
      Risk_ID: "R00005",
      Record_Status: "Active",
      Risk_Name: "Model change impact",
      Risk_Description: "Operating model changes without sufficient review",
      Level_1: "Operational Risk",
      Level_2: "Process Risk",
      Level_3: "Customer Account / Record Management",
      Inherent_Risk_Rating: "Moderate",
      Latest_Overall_Control_Effectiveness: "Poor",
      Net_Risk_Rating: "Moderate",
      Unit: "GFM",
      Creation_Date: "2025-02-07",
      Last_Updated: "2025-08-05",
      Linked_Control_IDs: ["C00004"],
    },
  ]);

  const [controlLibraryData, setControlLibraryData] = useState([
    {
      Control_ID: "C00001",
      Record_Status: "Active",
      Control_Name: "Payment Reconciliation Checklist",
      Control_Description:
        "Ensures daily reconciliation of outgoing payments with exception logging",
      Unit: "GFM",
      Latest_Control_Effectiveness: "Good",
      Latest_Assessment_Method: "Testing",
      Last_Assessed_Date: "2025-06-15",
    },
    {
      Control_ID: "C00002",
      Record_Status: "Active",
      Control_Name: "New Product Governance Checklist",
      Control_Description:
        "Review of new product proposals for risk and control impact",
      Unit: "GFM",
      Latest_Control_Effectiveness: "Satisfactory",
      Latest_Assessment_Method: "Judgement",
      Last_Assessed_Date: "2025-05-20",
    },
    {
      Control_ID: "C00003",
      Record_Status: "Active",
      Control_Name: "Exposure Monitoring Reports",
      Control_Description:
        "Daily reporting of trading exposures against limits",
      Unit: "Risk Management",
      Latest_Control_Effectiveness: "Good",
      Latest_Assessment_Method: "Testing",
      Last_Assessed_Date: "2025-06-05",
    },
    {
      Control_ID: "C00004",
      Record_Status: "Active",
      Control_Name: "Vendor Contract Tracker",
      Control_Description:
        "Tracks third-party contract expiry to avoid service disruption",
      Unit: "Finance",
      Latest_Control_Effectiveness: "Poor/Fail",
      Latest_Assessment_Method: "Testing",
      Last_Assessed_Date: "2025-03-30",
    },
    {
      Control_ID: "C00005",
      Record_Status: "Active",
      Control_Name: "Outsourcing Review Log",
      Control_Description: "Quarterly review of KYC outsourcing performance",
      Unit: "Compliance",
      Latest_Control_Effectiveness: "SAN",
      Latest_Assessment_Method: "Judgement",
      Last_Assessed_Date: "2025-04-10",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-4">
      {/* Header Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t ${
              activeTab === tab.id
                ? "bg-white text-blue-600 font-bold shadow-md"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "npa" && (
        <Tab1
          riskLibraryData={riskLibraryData}
          setRiskLibraryData={setRiskLibraryData}
          controlLibraryData={controlLibraryData}
          setControlLibraryData={setControlLibraryData}
          notifications={notifications}
          setNotifications={setNotifications}
        />
      )}
      {activeTab === "riskProfile" && (
        <Tab2
          riskLibraryData={riskLibraryData}
          controlLibraryData={controlLibraryData}
          notifications={notifications}
          setNotifications={setNotifications}
          reviewActions={reviewActions}
          setReviewActions={setReviewActions}
        />
      )}
      {activeTab === "momReporting" && <Tab3 />}
    </div>
  );
}

function Tab1({
  riskLibraryData,
  setRiskLibraryData,
  controlLibraryData,
  setControlLibraryData,
  notifications,
  setNotifications,
}) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const result = await analyzeNPA(input);
    setResponse(result);
    setLoading(false);
  };

  const handleAddControl = () => {
    const newControl = {
      Control_ID: `C${String(controlLibraryData.length + 1).padStart(5, "0")}`,
      Record_Status: "New",
      Control_Name: "Regulatory Compliance Check",
      Control_Description: response.recommendations,
      Unit: "GFM",
      Latest_Control_Effectiveness: "SAN",
      Latest_Assessment_Method: "Judgement",
      Last_Assessed_Date: new Date().toISOString().slice(0, 10),
    };

    const updatedControls = [...controlLibraryData, newControl];
    setControlLibraryData(updatedControls);

    const updatedRisks = riskLibraryData.map((r) => {
      if (r.Risk_ID === "R00001") {
        return {
          ...r,
          Latest_Overall_Control_Effectiveness: "SAN",
          Net_Risk_Rating: "Moderate",
          Linked_Control_IDs: [...r.Linked_Control_IDs, newControl.Control_ID],
        };
      }
      return r;
    });
    setRiskLibraryData(updatedRisks);

    setNotifications((prev) => [
      ...prev,
      {
        type: "Agent",
        riskId: "R00001",
        controlId: newControl.Control_ID,
        message: `New control ${newControl.Control_ID} was added to R00001 due to gaps found in NPA. RC to assess if require to review and challenge`,
        reason: `This downgraded control effectiveness from Good → SAN. Net Risk: Green → Yellow.`,
        timestamp: new Date().toISOString(),
        requiresReview: true,
      },
    ]);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md space-y-6 max-w-6xl w-full">
        <div className="flex flex-col items-center">
          <div className="w-full h-[500px] bg-gray-50 border rounded p-4 text-sm text-gray-700 overflow-y-auto whitespace-pre-wrap">
            {loading && "Analyzing..."}
            {response && (
              <>
                <p>
                  <strong>🧾 Summary:</strong> {response.summary}
                </p>
                <p>
                  <strong>📌 Risks Identified:</strong>
                </p>
                <ul className="list-disc pl-5">
                  {response.risks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <p>
                  <strong>🚫 Control Gaps:</strong> {response.controlGaps}
                </p>
                <p>
                  <strong>✅ Recommendations:</strong>
                </p>
                <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                  {response.recommendations}
                </pre>
                <p>
                  <strong>🧠 Rationale:</strong> {response.rationale}
                </p>

                {response.recommendations.includes("Add new control: Yes") && (
                  <button
                    onClick={() => {
                      setButtonDisabled(true);
                      handleAddControl(); // your function to push to controlLibraryData etc.
                      setConfirmationMessage(
                        "✅ Control C00006 added to R00001 successfully."
                      );
                    }}
                    disabled={buttonDisabled}
                    className={`bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 ${
                      buttonDisabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Confirm & Add Control
                  </button>
                )}
                {confirmationMessage && (
                  <p className="text-sm text-green-600 mt-2">
                    {confirmationMessage}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="border-t pt-4 flex flex-col md:flex-row items-center gap-4">
          <textarea
            placeholder="Paste product term sheet text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:border-blue-400 w-full"
            rows={4}
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Tab2({
  riskLibraryData,
  controlLibraryData,
  notifications,
  setNotifications,
  reviewActions,
  setReviewActions,
}) {
  const [selectedTab, setSelectedTab] = useState("lib");
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (riskId) => {
    setExpandedRow(expandedRow === riskId ? null : riskId);
  };
  const [agentCommentary, setAgentCommentary] = useState(
    "Loading commentary..."
  );
  const [hasRecentRiskChange, setHasRecentRiskChange] = useState(false);

  const previousSnapshot = useRef([]);

  useEffect(() => {
    async function loadAgentSummary() {
      // Step 1: Compare previous and current riskLibraryData
      const previous = previousSnapshot.current;
      const current = riskLibraryData;

      let changeNotice = "";

      if (previous.length > 0) {
        const changedRisks = current.filter((newRisk) => {
          const oldRisk = previous.find((r) => r.Risk_ID === newRisk.Risk_ID);
          return (
            oldRisk &&
            (oldRisk.Net_Risk_Rating !== newRisk.Net_Risk_Rating ||
              oldRisk.Latest_Overall_Control_Effectiveness !==
                newRisk.Latest_Overall_Control_Effectiveness)
          );
        });

        if (changedRisks.length > 0) {
          const ids = changedRisks.map((r) => r.Risk_ID).join(", ");
          changeNotice = `⚠️ Risk profile updated due to recent NPA. Affected Risks: ${ids}\n\n`;
        }
      }

      // Step 2: Store current snapshot for next comparison
      previousSnapshot.current = JSON.parse(JSON.stringify(current)); // Deep copy

      // Step 3: Generate full commentary
      const commentary = await generateAgentCommentary(
        riskLibraryData,
        controlLibraryData
      );
      setAgentCommentary(changeNotice + commentary);
    }

    loadAgentSummary();
  }, [riskLibraryData, controlLibraryData]);

  const cols = ["Minor", "Moderate", "Major"];
  const rows = ["Poor/Fail", "SAN", "Satisfactory", "Good"];

  const xMap = { Minor: 0, Moderate: 1, Major: 2 };
  const yMap = {
    "Poor/Fail": 0,
    Poor: 0,
    Fail: 0,
    SAN: 1,
    Satisfactory: 2,
    Good: 3,
  };

  const normalizeEffectiveness = (value) => {
    const aliases = {
      Fail: "Poor/Fail",
      Poor: "Poor/Fail",
      "Poor/Fail": "Poor/Fail",
      SAN: "SAN",
      Satisfactory: "Satisfactory",
      Good: "Good",
    };
    return aliases[value?.trim()] ?? "";
  };

  const groupedDots = {};
  riskLibraryData.forEach((risk) => {
    const row =
      yMap[normalizeEffectiveness(risk.Latest_Overall_Control_Effectiveness)] ??
      -1;
    const col = xMap[risk.Inherent_Risk_Rating?.trim()] ?? -1;
    if (row >= 0 && col >= 0) {
      const key = `${row}-${col}`;
      if (!groupedDots[key]) groupedDots[key] = [];
      groupedDots[key].push({ id: risk.Risk_ID, name: risk.Risk_Name });
    }
  });

  const getColor = (row, col) => {
    const key = `${rows[row]}_${cols[col]}`;
    const yellow = [
      "Poor/Fail_Minor",
      "SAN_Minor",
      "SAN_Moderate",
      "Satisfactory_Moderate",
      "Good_Major",
    ];
    const green = ["Satisfactory_Minor", "Good_Minor", "Good_Moderate"];
    const red = ["Poor/Fail_Major"];
    if (yellow.includes(key)) return "bg-yellow-400";
    if (green.includes(key)) return "bg-green-500";
    if (red.includes(key)) return "bg-red-600";
    return "bg-orange-400";
  };

  const handleConfirmReview = (notif) => {
    setReviewActions((prev) => [
      ...prev,
      {
        id: notif.riskId,
        message: notif.message,
        reason: notif.reason,
        timestamp: notif.timestamp,
        status: "Pending Review",
      },
    ]);
    setNotifications((prev) => prev.filter((n) => n !== notif));
  };

  const renderReviewAndChallenge = () => (
    <div className="space-y-4">
      {reviewActions.length === 0 ? (
        <p className="text-center text-sm text-gray-600">
          No review actions logged yet.
        </p>
      ) : (
        reviewActions.map((r, idx) => (
          <div key={idx} className="border rounded p-4 bg-blue-50">
            <p className="text-sm font-semibold">📝 {r.message}</p>
            <p className="text-xs text-gray-600">{r.reason}</p>
            <p className="text-xs italic text-gray-500">
              {new Date(r.timestamp).toLocaleString()}
            </p>
            <p className="text-xs text-green-700">Status: {r.status}</p>
          </div>
        ))
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <p className="text-center text-sm text-gray-600">
          No new notifications.
        </p>
      ) : (
        notifications.map((notif, idx) => (
          <div key={idx} className="border rounded p-4 bg-yellow-50">
            <p className="text-sm font-medium">🔔 {notif.message}</p>
            <p className="text-xs text-gray-600">{notif.reason}</p>
            <p className="text-xs italic text-gray-500">
              {new Date(notif.timestamp).toLocaleString()}
            </p>
            {notif.requiresReview && (
              <button
                className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => handleConfirmReview(notif)}
              >
                Confirm & Log in R&C
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md space-y-8 max-w-6xl w-full">
        <h2 className="text-xl font-semibold text-center">
          RISK PROFILE (GFM)
        </h2>

        <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
          <div className="flex gap-4">
            <div className="flex flex-col justify-between text-sm font-medium space-y-5 pr-1">
              {rows.map((row) => (
                <div
                  key={row}
                  className="h-20 flex items-center justify-end"
                  style={{ minHeight: "3.5rem" }}
                >
                  {row}
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="grid grid-cols-3 gap-2">
                {rows.map((_, rowIdx) =>
                  cols.map((_, colIdx) => {
                    const key = `${rowIdx}-${colIdx}`;
                    const dotsInCell = groupedDots[key] || [];
                    return (
                      <div
                        key={key}
                        className={`w-20 h-20 rounded relative flex items-center justify-center ${getColor(
                          rowIdx,
                          colIdx
                        )}`}
                      >
                        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-1">
                          {dotsInCell.map((dot) => (
                            <div
                              key={dot.id}
                              onClick={() => {
                                const el = document.getElementById(
                                  `row-${dot.id}`
                                );
                                if (el)
                                  el.scrollIntoView({
                                    behavior: "smooth",
                                    block: "center",
                                  });
                              }}
                              className="w-2.5 h-2.5 rounded-full bg-black cursor-pointer relative group"
                            >
                              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50">
                                {dot.id} – {dot.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-medium mt-2 w-full text-center">
                {cols.map((col) => (
                  <div key={col}>{col}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 bg-gray-50 p-4 rounded shadow-sm">
            <h3 className="text-sm font-semibold mb-2">RiskGen Commentary</h3>
            <div className="h-72 md:w-96 bg-white border rounded p-3 text-sm text-gray-600 overflow-y-auto whitespace-pre-wrap">
              {agentCommentary}
            </div>
            <div className="mt-4 md:w-96">
              <textarea
                placeholder="Type your query to the RiskGen Agent..."
                className="w-full border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 resize-none bg-white"
                rows={2}
                disabled
              />
              <button
                className="mt-2 bg-blue-500 text-white text-sm px-3 py-1 rounded cursor-not-allowed opacity-50"
                disabled
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Tabs below heatmap */}
        <div className="border-b pt-2 flex space-x-6 text-sm font-medium justify-center">
          {[
            { id: "lib", label: "Risk and Control Library" },
            { id: "npa", label: "NPA" },
            { id: "rc", label: "R&C" },
            { id: "noti", label: `Notifications (${notifications.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`pb-2 ${
                selectedTab === tab.id
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 pt-2">
          {selectedTab === "lib" && (
            <div className="overflow-x-auto">
              <table className="min-w-full border text-xs text-left">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {[
                      "Record_Status",
                      "Risk_ID",
                      "Risk_Name",
                      "Risk_Description",
                      "Level_1",
                      "Level_2",
                      "Level_3",
                      "Inherent_Risk_Rating",
                      "Latest_Overall_Control_Effectiveness",
                      "Net_Risk_Rating",
                      "Unit",
                      "Creation_Date",
                      "Last_Updated",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-3 py-2 border font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {riskLibraryData.map((risk) => (
                    <>
                      <tr
                        key={risk.Risk_ID}
                        id={`row-${risk.Risk_ID}`}
                        onClick={() => toggleRow(risk.Risk_ID)}
                        className="border-b hover:bg-yellow-100 cursor-pointer"
                      >
                        <td className="px-3 py-2 border">
                          {risk.Record_Status}
                        </td>
                        <td className="px-3 py-2 border">{risk.Risk_ID}</td>
                        <td className="px-3 py-2 border">{risk.Risk_Name}</td>
                        <td className="px-3 py-2 border">
                          {risk.Risk_Description}
                        </td>
                        <td className="px-3 py-2 border">{risk.Level_1}</td>
                        <td className="px-3 py-2 border">{risk.Level_2}</td>
                        <td className="px-3 py-2 border">{risk.Level_3}</td>
                        <td className="px-3 py-2 border">
                          {risk.Inherent_Risk_Rating}
                        </td>
                        <td className="px-3 py-2 border">
                          {risk.Latest_Overall_Control_Effectiveness}
                        </td>
                        <td className="px-3 py-2 border">
                          {risk.Net_Risk_Rating}
                        </td>
                        <td className="px-3 py-2 border">{risk.Unit}</td>
                        <td className="px-3 py-2 border">
                          {risk.Creation_Date}
                        </td>
                        <td className="px-3 py-2 border">
                          {risk.Last_Updated}
                        </td>
                      </tr>
                      {expandedRow === risk.Risk_ID && (
                        <tr className="bg-gray-50">
                          <td colSpan="13" className="px-3 py-2 border">
                            <div className="overflow-x-auto mt-2">
                              <table className="min-w-full border text-xs text-left">
                                <thead className="bg-gray-200 text-gray-700">
                                  <tr>
                                    {[
                                      "Record Status",
                                      "Control ID",
                                      "Control Name",
                                      "Description",
                                      "Unit",
                                      "Effectiveness",
                                      "Assessment",
                                      "Last Assessed",
                                    ].map((header) => (
                                      <th
                                        key={header}
                                        className="px-2 py-1 border"
                                      >
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {controlLibraryData
                                    .filter((ctrl) =>
                                      risk.Linked_Control_IDs?.includes(
                                        ctrl.Control_ID
                                      )
                                    )
                                    .map((ctrl) => (
                                      <tr key={ctrl.Control_ID}>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Record_Status}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Control_ID}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Control_Name}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Control_Description}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Unit}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Latest_Control_Effectiveness}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Latest_Assessment_Method}
                                        </td>
                                        <td className="px-2 py-1 border">
                                          {ctrl.Last_Assessed_Date}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === "npa" && (
            <p className="text-center">See NPA impact to risk profile...</p>
          )}
          {selectedTab === "rc" && renderReviewAndChallenge()}
          {selectedTab === "noti" && renderNotifications()}
        </div>
      </div>
    </div>
  );
}

function Tab3() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Matrix M1 */}
      <div className="col-span-4 bg-white rounded-xl shadow-md p-4">
        <h3 className="text-sm font-semibold mb-2">M1</h3>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded flex items-center justify-center text-sm"
            >
              M1-{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Matrix M2 */}
      <div className="col-span-4 bg-white rounded-xl shadow-md p-4">
        <h3 className="text-sm font-semibold mb-2">M2</h3>
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded flex items-center justify-center text-sm"
            >
              M2-{i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="col-span-4 bg-white rounded-xl shadow-md p-4 h-[500px]">
        <p className="text-gray-500">Chat Area</p>
      </div>
    </div>
  );
}
