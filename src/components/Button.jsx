import PropTypes from 'prop-types'

const variants = {
  primary: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5',
  secondary: 'bg-white/10 text-slate-900 backdrop-blur-md hover:bg-white/20 dark:text-slate-100',
  danger: 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-600 hover:-translate-y-0.5',
  outline: 'border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800',
}

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'outline']),
  className: PropTypes.string,
}
