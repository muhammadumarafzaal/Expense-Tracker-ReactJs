import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/95 shadow-soft dark:border-slate-800/80 dark:bg-slate-900/95"
      >
        <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-5 dark:border-slate-800/80">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </motion.div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}
