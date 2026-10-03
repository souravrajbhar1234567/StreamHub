import { Check, X } from "lucide-react";

export default function PlanComparison() {
  const comparisonRows = [
    {
      feature: "Streaming Quality",
      free: "720p HD",
      bronze: "1080p HD",
      silver: "1080p High Bitrate",
      gold: "4K Ultra HD",
    },
    {
      feature: "Daily Video Downloads",
      free: "1 video / day",
      bronze: "5 videos / day",
      silver: "15 videos / day",
      gold: "50 videos / day (Unlimited)",
    },
    {
      feature: "Simultaneous Devices",
      free: "1",
      bronze: "2",
      silver: "3",
      gold: "5",
    },
    {
      feature: "Watch History & Resume",
      free: true,
      bronze: true,
      silver: true,
      gold: true,
    },
    {
      feature: "Ad-free Experience",
      free: false,
      bronze: false,
      silver: true,
      gold: true,
    },
    {
      feature: "Host Live Video Meetings",
      free: false,
      bronze: "Up to 25 people",
      silver: "Up to 50 people",
      gold: "Up to 100 people",
    },
    {
      feature: "In-Call Screen & File Sharing",
      free: false,
      bronze: true,
      silver: true,
      gold: true,
    },
    {
      feature: "Call Recording & Transcripts",
      free: false,
      bronze: false,
      silver: false,
      gold: true,
    },
    {
      feature: "VIP 24/7 Dedicated Support",
      free: false,
      bronze: false,
      silver: true,
      gold: true,
    },
  ];

  return (
    <div className="plan-comparison-table-wrap">
      <div className="mb-4 text-center">
        <h3>Full Plan Comparison Matrix</h3>
        <p className="text-sm text-muted">
          Compare limits and features across Free, Bronze, Silver, and Gold.
        </p>
      </div>

      <div className="admin-table-container">
        <table className="admin-table text-center">
          <thead>
            <tr>
              <th className="text-left">Feature</th>
              <th>Free (₹0)</th>
              <th>Bronze (₹199)</th>
              <th>Silver (₹499)</th>
              <th>Gold (₹999)</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={i}>
                <td className="text-left font-semibold">{row.feature}</td>
                <td>
                  {typeof row.free === "boolean" ? (
                    row.free ? (
                      <Check size={16} className="text-green-400 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    row.free
                  )}
                </td>
                <td>
                  {typeof row.bronze === "boolean" ? (
                    row.bronze ? (
                      <Check size={16} className="text-green-400 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    row.bronze
                  )}
                </td>
                <td>
                  {typeof row.silver === "boolean" ? (
                    row.silver ? (
                      <Check size={16} className="text-green-400 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    row.silver
                  )}
                </td>
                <td>
                  {typeof row.gold === "boolean" ? (
                    row.gold ? (
                      <Check size={16} className="text-green-400 mx-auto" />
                    ) : (
                      <X size={16} className="text-gray-500 mx-auto" />
                    )
                  ) : (
                    row.gold
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
