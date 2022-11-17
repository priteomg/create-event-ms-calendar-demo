module.exports = {
  presets: [require.resolve("next/babel")],
  plugins: [["import", { libraryName: "antd", style: true }]],
};
