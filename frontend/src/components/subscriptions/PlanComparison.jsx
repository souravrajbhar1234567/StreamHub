import { Check, X } from "lucide-react";

export default function PlanComparison() {
  const comparisonRows = [
    { feature: "Streaming Quality", free: "720p HD", pro: "1080p Full HD", premium: "4K Ultra HD" },
    { feature: "Offline Video Downloads", free: "None", pro: "25 videos/mo", premium: "100 videos/mo" },
    { feature: "Simultaneous Devices", free: "1", pro: "3", premium: "5" },
    { feature: "Ad-free Experience", free: false, pro: true, premium: true },
    { feature: "Watch History & Resume", free: true, pro: true, premium: true },
    { feature: "Live Video Meetings", free: false, pro: "Up to 50 users", premium: "Up to 100 users" },
    { feature: "Priority Support", free: false, pro: true, premium: true },
  ];

  return (
    <div className="plan-comparison-table-wrap">
      <h3>Feature Comparison Matrix</h3>
      <table className="plan-comparison-table">
        <thead>
          <tr>
            <th>Features</th>
            <th>Free</th>
            <th>Pro (₹299)</th>
            <th>Premium (₹599)</th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row, i) => (
            <tr key={i}>
              <td className="font-medium">{row.feature}</td>
              <td>
                {typeof row.free === "boolean" ? (
                  row.free ? <Check size={16} className="text-green-400 mx-auto" /> : <X size={16} className="text-gray-500 mx-auto" />
                ) : (
                  row.free
                )}
              </td>
              <td>
                {typeof row.pro === "boolean" ? (
                  row.pro ? <Check size={16} className="text-green-400 mx-auto" /> : <X size={16} className="text-gray-500 mx-auto" />
                ) : (
                  row.pro
                )}
              </td>
              <td>
                {typeof row.premium === "boolean" ? (
                  row.premium ? <Check size={16} className="text-green-400 mx-auto" /> : <X size={16} className="text-gray-500 mx-auto" />
                ) : (
                  row.premium
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
