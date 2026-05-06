import PropTypes from 'prop-types'

const toneClasses = {
  positive: 'text-emerald-600 dark:text-emerald-400',
  negative: 'text-rose-600 dark:text-rose-400',
  neutral: 'text-slate-500 dark:text-slate-400',
}

export default function SummaryCard({ title, value, change, tone = 'neutral', icon, description }) {
  return (
    <div className="group relative overflow-hidden rounded-4xl border border-slate-200/60 bg-white/70 p-7 shadow-premium backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800/60 dark:bg-slate-900/40">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-slate-100/50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-slate-800/30" />
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/50 dark:bg-slate-800 dark:ring-slate-700/50">
          {icon}
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${toneClasses[tone]} bg-current/10`}>
          {change}
        </span>
      </div>
      {description && <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>}
    </div>
  )
}

SummaryCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  change: PropTypes.string,
  tone: PropTypes.oneOf(['positive', 'negative', 'neutral']),
  icon: PropTypes.node,
  description: PropTypes.string,
}
