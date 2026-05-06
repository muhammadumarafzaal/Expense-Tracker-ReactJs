import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import PropTypes from 'prop-types'

const colors = ['#14B8A6', '#0EA5E9', '#8B5CF6', '#f97316', '#ef4444', '#22c55e']

export default function ChartPie({ data }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius="48%"
            paddingAngle={3}
            stroke="transparent"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`₹${value}`, 'Expense']} cursor={{ fill: 'rgba(15,23,42,0.05)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

ChartPie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
}
