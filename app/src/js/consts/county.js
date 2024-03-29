export default function () {
  const country_list = [
    { code: 0, label: "Other Countries" },
    { code: 10, label: "Andorra" },
    { code: 20, label: "United Arab Emirates" },
    { code: 30, label: "Afghanistan" },
    { code: 40, label: "Antigua and Barbuda" },
    { code: 50, label: "Anguilla" },
    { code: 60, label: "Albania" },
    { code: 70, label: "Armenia" },
    { code: 80, label: "Netherlands Antilles" },
    { code: 90, label: "Angola" },
    { code: 100, label: "Antarctica" },
    { code: 110, label: "Argentina" },
    { code: 120, label: "American Samoa" },
    { code: 130, label: "Austria" },
    { code: 140, label: "Australia" },
    { code: 150, label: "Aruba" },
    { code: 160, label: "Azerbaijan" },
    { code: 170, label: "Bosnia and Herzegovina" },
    { code: 180, label: "Barbados" },
    { code: 190, label: "Bangladesh" },
    { code: 200, label: "Belgium" },
    { code: 210, label: "Burkina Faso" },
    { code: 220, label: "Bulgaria" },
    { code: 230, label: "Bahrain" },
    { code: 240, label: "Burundi" },
    { code: 250, label: "Benin" },
    { code: 260, label: "Bermuda" },
    { code: 270, label: "Brunei" },
    { code: 280, label: "Bolivia" },
    { code: 290, label: "Brazil" },
    { code: 300, label: "Bahamas" },
    { code: 310, label: "Bhutan" },
    { code: 320, label: "Bouvet Island" },
    { code: 330, label: "Botswana" },
    { code: 340, label: "Belarus" },
    { code: 350, label: "Belize" },
    { code: 360, label: "Canada" },
    { code: 370, label: "Cocos {Keeling} Islands" },
    { code: 380, label: "Congo {DRC}" },
    { code: 390, label: "Central African Republic" },
    { code: 400, label: "Congo {Republic}" },
    { code: 410, label: "Switzerland" },
    { code: 420, label: "Cote d'Ivoire" },
    { code: 430, label: "Cook Islands" },
    { code: 440, label: "Chile" },
    { code: 450, label: "Cameroon" },
    { code: 460, label: "China" },
    { code: 470, label: "Colombia" },
    { code: 480, label: "Costa Rica" },
    { code: 490, label: "Cuba" },
    { code: 500, label: "Cape Verde" },
    { code: 510, label: "Christmas Island" },
    { code: 520, label: "Cyprus" },
    { code: 530, label: "Czech Republic" },
    { code: 540, label: "Germany" },
    { code: 550, label: "Djibouti" },
    { code: 560, label: "Denmark" },
    { code: 570, label: "Dominica" },
    { code: 580, label: "Dominican Republic" },
    { code: 590, label: "Algeria" },
    { code: 600, label: "Ecuador" },
    { code: 610, label: "Estonia" },
    { code: 620, label: "Egypt" },
    { code: 630, label: "Western Sahara" },
    { code: 640, label: "Eritrea" },
    { code: 650, label: "Spain" },
    { code: 660, label: "Ethiopia" },
    { code: 670, label: "Finland" },
    { code: 680, label: "Fiji" },
    { code: 690, label: "Falkland Islands {Islas Malvinas}" },
    { code: 700, label: "Micronesia" },
    { code: 710, label: "Faroe Islands" },
    { code: 720, label: "France" },
    { code: 730, label: "Gabon" },
    { code: 740, label: "United Kingdom" },
    { code: 750, label: "Grenada" },
    { code: 760, label: "Georgia" },
    { code: 770, label: "French Guiana" },
    { code: 780, label: "Guernsey" },
    { code: 790, label: "Ghana" },
    { code: 800, label: "Gibraltar" },
    { code: 810, label: "Greenland" },
    { code: 820, label: "Gambia" },
    { code: 830, label: "Guinea" },
    { code: 840, label: "Guadeloupe" },
    { code: 850, label: "Equatorial Guinea" },
    { code: 860, label: "Greece" },
    { code: 870, label: "South Georgia and the South Sandwich Islands" },
    { code: 880, label: "Guatemala" },
    { code: 890, label: "Guam" },
    { code: 900, label: "Guinea-Bissau" },
    { code: 910, label: "Guyana" },
    { code: 920, label: "Gaza Strip" },
    { code: 930, label: "Hong Kong" },
    { code: 940, label: "Heard Island and McDonald Islands" },
    { code: 950, label: "Honduras" },
    { code: 960, label: "Croatia" },
    { code: 970, label: "Haiti" },
    { code: 980, label: "Hungary" },
    { code: 990, label: "Indonesia" },
    { code: 1000, label: "Ireland" },
    { code: 1010, label: "Israel" },
    { code: 1020, label: "Isle of Man" },
    { code: 1030, label: "India" },
    { code: 1040, label: "British Indian Ocean Territory" },
    { code: 1050, label: "Iraq" },
    { code: 1060, label: "Iran" },
    { code: 1070, label: "Iceland" },
    { code: 1080, label: "Italy" },
    { code: 1090, label: "Jersey" },
    { code: 1100, label: "Jamaica" },
    { code: 1110, label: "Jordan" },
    { code: 1120, label: "Japan" },
    { code: 1130, label: "Kenya" },
    { code: 1140, label: "Kyrgyzstan" },
    { code: 1150, label: "Cambodia" },
    { code: 1160, label: "Kiribati" },
    { code: 1170, label: "Comoros" },
    { code: 1180, label: "Saint Kitts and Nevis" },
    { code: 1190, label: "North Korea" },
    { code: 1200, label: "South Korea" },
    { code: 1210, label: "Kuwait" },
    { code: 1220, label: "Cayman Islands" },
    { code: 1230, label: "Kazakhstan" },
    { code: 1240, label: "Laos" },
    { code: 1250, label: "Lebanon" },
    { code: 1260, label: "Saint Lucia" },
    { code: 1270, label: "Liechtenstein" },
    { code: 1280, label: "Sri Lanka" },
    { code: 1290, label: "Liberia" },
    { code: 1300, label: "Lesotho" },
    { code: 1310, label: "Lithuania" },
    { code: 1320, label: "Luxembourg" },
    { code: 1330, label: "Latvia" },
    { code: 1340, label: "Libya" },
    { code: 1350, label: "Morocco" },
    { code: 1360, label: "Monaco" },
    { code: 1370, label: "Moldova" },
    { code: 1380, label: "Montenegro" },
    { code: 1390, label: "Madagascar" },
    { code: 1400, label: "Marshall Islands" },
    { code: 1410, label: "Macedonia {FYROM}" },
    { code: 1420, label: "Mali" },
    { code: 1430, label: "Myanmar {Burma}" },
    { code: 1440, label: "Mongolia" },
    { code: 1450, label: "Macau" },
    { code: 1460, label: "Northern Mariana Islands" },
    { code: 1470, label: "Martinique" },
    { code: 1480, label: "Mauritania" },
    { code: 1490, label: "Montserrat" },
    { code: 1500, label: "Malta" },
    { code: 1510, label: "Mauritius" },
    { code: 1520, label: "Maldives" },
    { code: 1530, label: "Malawi" },
    { code: 1540, label: "Mexico" },
    { code: 1550, label: "Malaysia" },
    { code: 1560, label: "Mozambique" },
    { code: 1570, label: "Namibia" },
    { code: 1580, label: "New Caledonia" },
    { code: 1590, label: "Niger" },
    { code: 1600, label: "Norfolk Island" },
    { code: 1610, label: "Nigeria" },
    { code: 1620, label: "Nicaragua" },
    { code: 1630, label: "Netherlands" },
    { code: 1640, label: "Norway" },
    { code: 1650, label: "Nepal" },
    { code: 1660, label: "Nauru" },
    { code: 1670, label: "Niue" },
    { code: 1680, label: "New Zealand" },
    { code: 1690, label: "Oman" },
    { code: 1700, label: "Panama" },
    { code: 1710, label: "Peru" },
    { code: 1720, label: "French Polynesia" },
    { code: 1730, label: "Papua New Guinea" },
    { code: 1740, label: "Philippines" },
    { code: 1750, label: "Pakistan" },
    { code: 1760, label: "Poland" },
    { code: 1770, label: "Saint Pierre and Miquelon" },
    { code: 1780, label: "Pitcairn Islands" },
    { code: 1790, label: "Puerto Rico" },
    { code: 1800, label: "Palestinian Territories" },
    { code: 1810, label: "Portugal" },
    { code: 1820, label: "Palau" },
    { code: 1830, label: "Paraguay" },
    { code: 1840, label: "Qatar" },
    { code: 1850, label: "Reunion" },
    { code: 1860, label: "Romania" },
    { code: 1870, label: "Serbia" },
    { code: 1880, label: "Russia" },
    { code: 1890, label: "Rwanda" },
    { code: 1900, label: "Saudi Arabia" },
    { code: 1910, label: "Solomon Islands" },
    { code: 1920, label: "Seychelles" },
    { code: 1930, label: "Sudan" },
    { code: 1940, label: "Sweden" },
    { code: 1950, label: "Singapore" },
    { code: 1960, label: "Saint Helena" },
    { code: 1970, label: "Slovenia" },
    { code: 1980, label: "Svalbard and Jan Mayen" },
    { code: 1990, label: "Slovakia" },
    { code: 2000, label: "Sierra Leone" },
    { code: 2010, label: "San Marino" },
    { code: 2020, label: "Senegal" },
    { code: 2030, label: "Somalia" },
    { code: 2040, label: "Suriname" },
    { code: 2050, label: "Sao Tome and Principe" },
    { code: 2060, label: "El Salvador" },
    { code: 2070, label: "Syria" },
    { code: 2080, label: "Swaziland" },
    { code: 2090, label: "Turks and Caicos Islands" },
    { code: 2100, label: "Chad" },
    { code: 2110, label: "French Southern Territories" },
    { code: 2120, label: "Togo" },
    { code: 2130, label: "Thailand" },
    { code: 2140, label: "Tajikistan" },
    { code: 2150, label: "Tokelau" },
    { code: 2160, label: "Timor-Leste" },
    { code: 2170, label: "Turkmenistan" },
    { code: 2180, label: "Tunisia" },
    { code: 2190, label: "Tonga" },
    { code: 2200, label: "Turkey" },
    { code: 2210, label: "Trinidad and Tobago" },
    { code: 2220, label: "Tuvalu" },
    { code: 2230, label: "Taiwan" },
    { code: 2240, label: "Tanzania" },
    { code: 2250, label: "Ukraine" },
    { code: 2260, label: "Uganda" },
    { code: 2270, label: "U.S. Minor Outlying Islands" },
    { code: 2280, label: "United States" },
    { code: 2290, label: "Uruguay" },
    { code: 2300, label: "Uzbekistan" },
    { code: 2310, label: "Vatican City" },
    { code: 2320, label: "Saint Vincent and the Grenadines" },
    { code: 2330, label: "Venezuela" },
    { code: 2340, label: "British Virgin Islands" },
    { code: 2350, label: "U.S. Virgin Islands" },
    { code: 2360, label: "Vietnam" },
    { code: 2370, label: "Vanuatu" },
    { code: 2380, label: "Wallis and Futuna" },
    { code: 2390, label: "Samoa" },
    { code: 2400, label: "Kosovo" },
    { code: 2410, label: "Yemen" },
    { code: 2420, label: "Mayotte" },
    { code: 2430, label: "South Africa" },
    { code: 2440, label: "Zambia" },
    { code: 2450, label: "Zimbabwe" },
  ];

  const country_code_list = [
    { code: 0, label: "" },
    { code: 10, label: "AD" },
    { code: 20, label: "AE" },
    { code: 30, label: "AF" },
    { code: 40, label: "AG" },
    { code: 50, label: "AI" },
    { code: 60, label: "AL" },
    { code: 70, label: "AM" },
    { code: 80, label: "AN" },
    { code: 90, label: "AO" },
    { code: 100, label: "AQ" },
    { code: 110, label: "AR" },
    { code: 120, label: "AS" },
    { code: 130, label: "AT" },
    { code: 140, label: "AU" },
    { code: 150, label: "AW" },
    { code: 160, label: "AZ" },
    { code: 170, label: "BA" },
    { code: 180, label: "BB" },
    { code: 190, label: "BD" },
    { code: 200, label: "BE" },
    { code: 210, label: "BF" },
    { code: 220, label: "BG" },
    { code: 230, label: "BH" },
    { code: 240, label: "BI" },
    { code: 250, label: "BJ" },
    { code: 260, label: "BM" },
    { code: 270, label: "BN" },
    { code: 280, label: "BO" },
    { code: 290, label: "BR" },
    { code: 300, label: "BS" },
    { code: 310, label: "BT" },
    { code: 320, label: "BV" },
    { code: 330, label: "BW" },
    { code: 340, label: "BY" },
    { code: 350, label: "BZ" },
    { code: 360, label: "CA" },
    { code: 370, label: "CC" },
    { code: 380, label: "CD" },
    { code: 390, label: "CF" },
    { code: 400, label: "CG" },
    { code: 410, label: "CH" },
    { code: 420, label: "CI" },
    { code: 430, label: "CK" },
    { code: 440, label: "CL" },
    { code: 450, label: "CM" },
    { code: 460, label: "CN" },
    { code: 470, label: "CO" },
    { code: 480, label: "CR" },
    { code: 490, label: "CU" },
    { code: 500, label: "CV" },
    { code: 510, label: "CX" },
    { code: 520, label: "CY" },
    { code: 530, label: "CZ" },
    { code: 540, label: "DE" },
    { code: 550, label: "DJ" },
    { code: 560, label: "DK" },
    { code: 570, label: "DM" },
    { code: 580, label: "DO" },
    { code: 590, label: "DZ" },
    { code: 600, label: "EC" },
    { code: 610, label: "EE" },
    { code: 620, label: "EG" },
    { code: 630, label: "EH" },
    { code: 640, label: "ER" },
    { code: 650, label: "ES" },
    { code: 660, label: "ET" },
    { code: 670, label: "FI" },
    { code: 680, label: "FJ" },
    { code: 690, label: "FK" },
    { code: 700, label: "FM" },
    { code: 710, label: "FO" },
    { code: 720, label: "FR" },
    { code: 730, label: "GA" },
    { code: 740, label: "GB" },
    { code: 750, label: "GD" },
    { code: 760, label: "GE" },
    { code: 770, label: "GF" },
    { code: 780, label: "GG" },
    { code: 790, label: "GH" },
    { code: 800, label: "GI" },
    { code: 810, label: "GL" },
    { code: 820, label: "GM" },
    { code: 830, label: "GN" },
    { code: 840, label: "GP" },
    { code: 850, label: "GQ" },
    { code: 860, label: "GR" },
    { code: 870, label: "GS" },
    { code: 880, label: "GT" },
    { code: 890, label: "GU" },
    { code: 900, label: "GW" },
    { code: 910, label: "GY" },
    { code: 920, label: "GZ" },
    { code: 930, label: "HK" },
    { code: 940, label: "HM" },
    { code: 950, label: "HN" },
    { code: 960, label: "HR" },
    { code: 970, label: "HT" },
    { code: 980, label: "HU" },
    { code: 990, label: "ID" },
    { code: 1000, label: "IE" },
    { code: 1010, label: "IL" },
    { code: 1020, label: "IM" },
    { code: 1030, label: "IN" },
    { code: 1040, label: "IO" },
    { code: 1050, label: "IQ" },
    { code: 1060, label: "IR" },
    { code: 1070, label: "IS" },
    { code: 1080, label: "IT" },
    { code: 1090, label: "JE" },
    { code: 1100, label: "JM" },
    { code: 1110, label: "JO" },
    { code: 1120, label: "JP" },
    { code: 1130, label: "KE" },
    { code: 1140, label: "KG" },
    { code: 1150, label: "KH" },
    { code: 1160, label: "KI" },
    { code: 1170, label: "KM" },
    { code: 1180, label: "KN" },
    { code: 1190, label: "KP" },
    { code: 1200, label: "KR" },
    { code: 1210, label: "KW" },
    { code: 1220, label: "KY" },
    { code: 1230, label: "KZ" },
    { code: 1240, label: "LA" },
    { code: 1250, label: "LB" },
    { code: 1260, label: "LC" },
    { code: 1270, label: "LI" },
    { code: 1280, label: "LK" },
    { code: 1290, label: "LR" },
    { code: 1300, label: "LS" },
    { code: 1310, label: "LT" },
    { code: 1320, label: "LU" },
    { code: 1330, label: "LV" },
    { code: 1340, label: "LY" },
    { code: 1350, label: "MA" },
    { code: 1360, label: "MC" },
    { code: 1370, label: "MD" },
    { code: 1380, label: "ME" },
    { code: 1390, label: "MG" },
    { code: 1400, label: "MH" },
    { code: 1410, label: "MK" },
    { code: 1420, label: "ML" },
    { code: 1430, label: "MM" },
    { code: 1440, label: "MN" },
    { code: 1450, label: "MO" },
    { code: 1460, label: "MP" },
    { code: 1470, label: "MQ" },
    { code: 1480, label: "MR" },
    { code: 1490, label: "MS" },
    { code: 1500, label: "MT" },
    { code: 1510, label: "MU" },
    { code: 1520, label: "MV" },
    { code: 1530, label: "MW" },
    { code: 1540, label: "MX" },
    { code: 1550, label: "MY" },
    { code: 1560, label: "MZ" },
    { code: 1570, label: "NA" },
    { code: 1580, label: "NC" },
    { code: 1590, label: "NE" },
    { code: 1600, label: "NF" },
    { code: 1610, label: "NG" },
    { code: 1620, label: "NI" },
    { code: 1630, label: "NL" },
    { code: 1640, label: "NO" },
    { code: 1650, label: "NP" },
    { code: 1660, label: "NR" },
    { code: 1670, label: "NU" },
    { code: 1680, label: "NZ" },
    { code: 1690, label: "OM" },
    { code: 1700, label: "PA" },
    { code: 1710, label: "PE" },
    { code: 1720, label: "PF" },
    { code: 1730, label: "PG" },
    { code: 1740, label: "PH" },
    { code: 1750, label: "PK" },
    { code: 1760, label: "PL" },
    { code: 1770, label: "PM" },
    { code: 1780, label: "PN" },
    { code: 1790, label: "PR" },
    { code: 1800, label: "PS" },
    { code: 1810, label: "PT" },
    { code: 1820, label: "PW" },
    { code: 1830, label: "PY" },
    { code: 1840, label: "QA" },
    { code: 1850, label: "RE" },
    { code: 1860, label: "RO" },
    { code: 1870, label: "RS" },
    { code: 1880, label: "RU" },
    { code: 1890, label: "RW" },
    { code: 1900, label: "SA" },
    { code: 1910, label: "SB" },
    { code: 1920, label: "SC" },
    { code: 1930, label: "SD" },
    { code: 1940, label: "SE" },
    { code: 1950, label: "SG" },
    { code: 1960, label: "SH" },
    { code: 1970, label: "SI" },
    { code: 1980, label: "SJ" },
    { code: 1990, label: "SK" },
    { code: 2000, label: "SL" },
    { code: 2010, label: "SM" },
    { code: 2020, label: "SN" },
    { code: 2030, label: "SO" },
    { code: 2040, label: "SR" },
    { code: 2050, label: "ST" },
    { code: 2060, label: "SV" },
    { code: 2070, label: "SY" },
    { code: 2080, label: "SZ" },
    { code: 2090, label: "TC" },
    { code: 2100, label: "TD" },
    { code: 2110, label: "TF" },
    { code: 2120, label: "TG" },
    { code: 2130, label: "TH" },
    { code: 2140, label: "TJ" },
    { code: 2150, label: "TK" },
    { code: 2160, label: "TL" },
    { code: 2170, label: "TM" },
    { code: 2180, label: "TN" },
    { code: 2190, label: "TO" },
    { code: 2200, label: "TR" },
    { code: 2210, label: "TT" },
    { code: 2220, label: "TV" },
    { code: 2230, label: "TW" },
    { code: 2240, label: "TZ" },
    { code: 2250, label: "UA" },
    { code: 2260, label: "UG" },
    { code: 2270, label: "UM" },
    { code: 2280, label: "US" },
    { code: 2290, label: "UY" },
    { code: 2300, label: "UZ" },
    { code: 2310, label: "VA" },
    { code: 2320, label: "VC" },
    { code: 2330, label: "VE" },
    { code: 2340, label: "VG" },
    { code: 2350, label: "VI" },
    { code: 2360, label: "VN" },
    { code: 2370, label: "VU" },
    { code: 2380, label: "WF" },
    { code: 2390, label: "WS" },
    { code: 2400, label: "XK" },
    { code: 2410, label: "YE" },
    { code: 2420, label: "YT" },
    { code: 2430, label: "ZA" },
    { code: 2440, label: "ZM" },
    { code: 2450, label: "ZW" },
  ];

  return {
    country_list,
    country_code_list,
  };
}
