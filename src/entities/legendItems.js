import LegendItem from "./LegendItem";
import data from "../data/output.json"
import countriesData from "../data/countries.json"

var legendItems = [
  new LegendItem(
    "100,000,000 +",
    "#741f1f",
    (cases) => cases >= 100_000_000,
    "white"
  ),

  new LegendItem(
    "50,000,000 - 99,999,999",
    "#9c2929",
    (cases) => cases >= 50_000_000 && cases < 99_999_999,
    "White"
  ),

  new LegendItem(
    "10,000,000 - 49,999,999",
    "#c57f7f",
    (cases) => cases >= 10_000_000 && cases < 50_000_000
  ),

  new LegendItem(
    "5,000,000 - 9,999,999",
    "#d8aaaa",
    (cases) => cases >= 5_000_000 && cases < 10_000_000
  ),

  new LegendItem(
    "0 - 4,999,999",
    "#ebd4d4",
    (cases) => cases > 0 && cases < 5_000_000
  ),

  new LegendItem("No Data", "#ffffff", (cases) => true),
];

export default legendItems;