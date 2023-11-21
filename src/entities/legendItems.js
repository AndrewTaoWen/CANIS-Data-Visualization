import LegendItem from "./LengendItem";
import data from "../data/output.json"
import countries from 

const ANGLOSPHERE = new Set(["Australia", "Canada", "New Zealand", "United Kingdom", "United States of America"]);
const ASEAN = ["Brunei", "Cambodia", "Indonesia", "Laos", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Vietnam"];
const AFRICAN_UNION = new Set(["Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic",
    "Chad", "Comoros", "Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
    "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
    "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
    "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"]);
const CHINA = new Set(["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Heilongjiang",
    "Henan", "Hong Kong", "Hubei", "Hunan", "Inner Mongolia", "Jiangsu", "Jiangxi", "Jilin", "Liaoning", "Macau", "Ningxia", "Qinghai",
    "Shaanxi", "Shandong", "Shanghai", "Shanxi", "Sichuan", "Taiwan", "Tianjin", "Tibet", "Xinjiang", "Yunnan", "Zhejiang"]);
const EastAfricanCommunity = new Set([]);
const MENA = new Set([
    "Algeria",
    "Bahrain",
    "Djibouti",
    "Egypt",
    "Iran",
    "Iraq",
    "Israel",
    "Jordan",
    "Kuwait",
    "Lebanon",
    "Libya",
    "Mauritania",
    "Morocco",
    "Oman",
    "Palestine",
    "Qatar",
    "Saudi Arabia",
    "Somalia",
    "Sudan",
    "Syria",
    "Tunisia",
    "Turkey",
    "United Arab Emirates",
    "Yemen"
]);
const HISPANOPHONE = new Set([
    "Argentina",
    "Bolivia",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Dominican Republic",
    "Ecuador",
    "El Salvador",
    "Equatorial Guinea",
    "Guatemala",
    "Honduras",
    "Mexico",
    "Nicaragua",
    "Panama",
    "Paraguay",
    "Peru",
    "Spain",
    "Uruguay",
    "Venezuela"
]);
const FRANCOPHONE = new Set([
    "Belgium",
    "Benin",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Comoros",
    "Democratic Republic of the Congo",
    "Djibouti",
    "Equatorial Guinea",
    "France",
    "Gabon",
    "Guinea",
    "Haiti",
    "Ivory Coast",
    "Luxembourg",
    "Madagascar",
    "Mali",
    "Monaco",
    "Niger",
    "Republic of the Congo",
    "Rwanda",
    "Senegal",
    "Seychelles",
    "Switzerland",
    "Togo",
    "Vanuatu"
]);
const EU = new Set([
    "Austria",
    "Belgium",
    "Bulgaria",
    "Croatia",
    "Republic of Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden"
]);

const m = {
    "EU": EU,
    "Anglosphere": ANGLOSPHERE,
    "African Union": AFRICAN_UNION,
    "ASEAN": ASEAN,
    "Hispanophone": HISPANOPHONE,
    "Francophonie": FRANCOPHONE,
    "East African Community": EastAfricanCommunity,
    "MENA": MENA
}

const aggregateData = (jsonData) => {
    const aggregatedData = {};

    jsonData.forEach(entry => {
        let inclusive_regions = [];
        const region = entry['Region of Focus'];

        if (region === 'China') {
            inclusive_regions.push("China");
        } else if (region in m) {
            inclusive_regions = [...m[region]];
        }

        inclusive_regions.forEach(r => {
            if (!aggregatedData[r]) {
                aggregatedData[r] = 0;
            }
            aggregatedData[r] += entry['X (Twitter) Follower #'] || 0;
            aggregatedData[r] += entry['Facebook Follower #'] || 0;
            aggregatedData[r] += entry['Instagram Follower #'] || 0;
            aggregatedData[r] += entry['Threads Follower #'] || 0;
            aggregatedData[r] += entry['YouTube Subcriber #'] || 0;
            aggregatedData[r] += entry['TikTok Subcriber #'] || 0;
        });
    });

    return aggregatedData;
}

const findMaxSum = (aggregatedData) => {
    return Math.max(...Object.values(aggregatedData));
};

const normalizeData = (aggregatedData) => {
    const maxSum = findMaxSum(aggregatedData);
    return Object.fromEntries(
        Object.entries(aggregatedData).map(([region, sum]) => [region, sum / maxSum])
    );
};

const determineColor = (value) => {
    const redIntensity = Math.round(value * 255);
    return `rgb(${redIntensity}, 0, 0)`;
};

console.log(aggregateData(data))

var legendItems = [
    new LegendItem(
        "Who/What:",
        (cases) => determineColor(cases),
        (cases) => true,
        "White"
    )
];

export default legendItems;