type StatsCardProps = {
  label: string;
  count: number;
};

function StatsCard({ label, count }: StatsCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", textAlign: "center", background: "white", flex: 1 }}>
      <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "4px" }}>{label}</p>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{count}</p>
    </div>
  );
}

export default StatsCard;