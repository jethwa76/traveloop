import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { budgetCategories, expenseTrend } from '../data/mockData';

export default function ChartSection({ categories = budgetCategories, trend = expenseTrend }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-bold">Category breakdown</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categories} dataKey="value" innerRadius={62} outerRadius={96} paddingAngle={4}>
                {categories.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass-card rounded-3xl p-6">
        <h3 className="text-lg font-bold">Daily cost trend</h3>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#06b6d4" radius={[10, 10, 0, 0]} />
              <Bar dataKey="actual" fill="#f43f5e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
