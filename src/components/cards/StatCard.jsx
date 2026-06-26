function StatCard({ title, value, icon: Icon, trend, trendLabel, accent }) {
  const accentColors = {
    blue:   { bg: "#E6F1FB", icon: "#185FA5", num: "#185FA5" },
    green:  { bg: "#E1F5EE", icon: "#0F6E56", num: "#0F6E56" },
    purple: { bg: "#EEEDFE", icon: "#534AB7", num: "#534AB7" },
    amber:  { bg: "#FAEEDA", icon: "#854F0B", num: "#854F0B" },
  };

  const colors = accentColors[accent] || null;

  return (
    <div
      className="
        bg-white border border-border rounded-[28px] p-6
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">

        {/* LEFT */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            {title}
          </p>
          <h2
            className="mt-3 text-4xl font-bold tracking-tight"
            style={colors ? { color: colors.num } : undefined}
          >
            {value ?? "—"}
          </h2>
        </div>

        {/* ICON */}
        {Icon && (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={colors ? { background: colors.bg } : { background: "#f5f2ee" }}
          >
            <Icon
              size={22}
              style={colors ? { color: colors.icon } : { color: "#5c5449" }}
            />
          </div>
        )}

      </div>

      {/* TREND */}
      {(trend || trendLabel) && (
        <div className="mt-5 pt-4 border-t border-border flex items-center gap-2">
          {trend && (
            <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
              {trend}
            </span>
          )}
          {trendLabel && (
            <p className="text-xs text-muted">{trendLabel}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default StatCard;