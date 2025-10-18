import { Bar, Line, Pie, Radar } from 'react-chartjs-2'

export const Charts = ({ data }) => {
  console.log('charts data', data)

  switch (data.type) {
    case 'bar':
      return <Bar data={data.ChartData.data} options={data.ChartData.options} />
    case 'line':
      return <Line data={data.ChartData.data} options={data.ChartData.options} />
    case 'pie':
      return <Pie data={data.ChartData.data} options={data.ChartData.options} />
    case 'radar':
      return <Radar data={data.ChartData.data} options={data.ChartData.options} />
    default:
      return <div>Chart type not supported</div>
  }
}
