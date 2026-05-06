import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import PropTypes from 'prop-types'

export default function ChartBar({ data }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#CBD5E1" vertical={false} opacity={0.35} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} />
          <Tooltip formatter={(value) => [`₹${value}`, 'Expense']} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
          <Bar dataKey="expense" fill="url(#expenseGradient)" radius={[16, 16, 0, 0]}>
            <defs>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.9} />
              </linearGradient>
            </defs>
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

ChartBar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
