import { ResponsiveBar } from "@nivo/bar";

const data = [
  { country: "USA", value: 100 },
  { country: "Germany", value: 80 },
  { country: "France", value: 50 },
];

const MyBarChart = () => (
  <div style={{ height: "400px", width: "600px" }}>
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="country"
      margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={() => "#67cc77"} // Custom green color
      enableGridX={false} // Remove vertical grid lines
      enableGridY={false} // Remove horizontal grid lines
      axisBottom={{
        tickSize: 5, // Ensures axis ticks are visible
        tickPadding: 5,
        tickRotation: -45,
        legend: "Country",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5, // Ensures axis ticks are visible
        tickPadding: 5,
        legend: "Value",
        legendPosition: "middle",
        legendOffset: -50,
      }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#000", // Force X and Y axis lines to be black
              strokeWidth: 2,
            },
          },
        },
      }}
    />
  </div>
);

export default MyBarChart;
