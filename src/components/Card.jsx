import PropTypes from 'prop-types'

export default function Card({ title, description, children, className = '' }) {
  return (
    <section className={`rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-soft backdrop-blur-xl transition-colors dark:border-slate-800/80 dark:bg-slate-900/95 ${className}`}>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
        </div>
      )}
      {children}
    </section>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
}
