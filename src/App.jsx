import { useState, useMemo } from "react";
import { AlertTriangle, Car, TrendingDown, Info } from "lucide-react";

const CAR_DB = [
  // ===== 현대 =====
  {
    id: "tucson", brand: "현대", name: "투싼",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "modern", label: "모던", price: 2805 },
      { id: "premium", label: "프리미엄", price: 3069 },
      { id: "hpick", label: "H-Pick", price: 3156 },
      { id: "inspiration", label: "인스퍼레이션", price: 3407 },
    ],
  },
  {
    id: "santafe", brand: "현대", name: "싼타페",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "exclusive", label: "익스클루시브", price: 3606 },
      { id: "prestige", label: "프레스티지", price: 3889 },
      { id: "hpick", label: "H-Pick", price: 4150 },
      { id: "calligraphy", label: "캘리그래피", price: 4484 },
    ],
  },
  {
    id: "grandeur", brand: "현대", name: "그랜저",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "premium", label: "프리미엄", price: 3798 },
      { id: "exclusive", label: "익스클루시브", price: 4287 },
      { id: "honors", label: "아너스", price: 4513 },
      { id: "calligraphy", label: "캘리그래피", price: 4710 },
    ],
  },
  {
    id: "avante", brand: "현대", name: "아반떼",
    availableOptions: ["sunroof"],
    trims: [
      { id: "smart", label: "스마트", price: 2034 },
      { id: "modern", label: "모던", price: 2355 },
      { id: "inspiration", label: "인스퍼레이션", price: 2717 },
      { id: "nline", label: "N라인", price: 2806 },
    ],
  },
  {
    id: "sonata", brand: "현대", name: "쏘나타",
    availableOptions: ["sunroof"],
    trims: [
      { id: "premium", label: "프리미엄", price: 2826 },
      { id: "s", label: "S", price: 2956 },
      { id: "exclusive", label: "익스클루시브", price: 3260 },
      { id: "inspiration", label: "인스퍼레이션", price: 3549 },
    ],
  },
  {
    id: "kona", brand: "현대", name: "코나",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "modern", label: "모던", price: 2478 },
      { id: "hpick", label: "H-Pick", price: 2559 },
      { id: "premium", label: "프리미엄", price: 2821 },
      { id: "inspiration", label: "인스퍼레이션", price: 3102 },
    ],
  },
  {
    id: "palisade", brand: "현대", name: "팰리세이드",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "exclusive", label: "익스클루시브", price: 4383 },
      { id: "prestige", label: "프레스티지", price: 4936 },
      { id: "calligraphy", label: "캘리그래피", price: 5586 },
    ],
  },
  {
    id: "casper", brand: "현대", name: "캐스퍼",
    availableOptions: [],
    trims: [
      { id: "smart", label: "스마트", price: 1493 },
      { id: "essential", label: "디 에센셜", price: 1771 },
      { id: "inspiration", label: "인스퍼레이션", price: 2017 },
    ],
  },
  {
    id: "ioniq5", brand: "현대", name: "아이오닉5 (전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "evalue", label: "E-Value+", price: 4735 },
      { id: "exclusive", label: "익스클루시브 (추정)", price: 5290 },
      { id: "prestige", label: "프레스티지 (추정)", price: 5750 },
    ],
  },
  {
    id: "ioniq6", brand: "현대", name: "아이오닉6 (전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "evalue", label: "E-Value+", price: 4856 },
      { id: "exclusive", label: "익스클루시브", price: 5095 },
      { id: "prestige", label: "프레스티지", price: 5553 },
    ],
  },
  {
    id: "staria", brand: "현대", name: "스타리아 (하이브리드)",
    availableOptions: ["awd", "sunroof"],
    trims: [{ id: "base", label: "기본형 (추정)", price: 3625 }],
  },
  {
    id: "nexo", brand: "현대", name: "넥쏘 (수소전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "exclusive", label: "익스클루시브", price: 7644 },
      { id: "exclusivespecial", label: "익스클루시브 스페셜", price: 7928 },
      { id: "prestige", label: "프레스티지", price: 8345 },
    ],
  },
  // ===== 기아 =====
  {
    id: "sportage", brand: "기아", name: "스포티지",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "prestige", label: "프레스티지", price: 2863 },
      { id: "noblesse", label: "노블레스", price: 3197 },
      { id: "signature", label: "시그니처", price: 3458 },
      { id: "xline", label: "X-Line", price: 3522 },
    ],
  },
  {
    id: "sorento", brand: "기아", name: "쏘렌토",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "prestige", label: "프레스티지", price: 3580 },
      { id: "noblesse", label: "노블레스", price: 3891 },
      { id: "signature", label: "시그니처", price: 4168 },
      { id: "xline", label: "X-Line", price: 4260 },
    ],
  },
  {
    id: "carnival", brand: "기아", name: "카니발 (9인승)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "prestige", label: "프레스티지", price: 3636 },
      { id: "noblesse", label: "노블레스", price: 4071 },
      { id: "signature", label: "시그니처", price: 4426 },
      { id: "xline", label: "X-Line", price: 4502 },
    ],
  },
  {
    id: "ray", brand: "기아", name: "레이",
    availableOptions: [],
    trims: [
      { id: "trendy", label: "트렌디", price: 1490 },
      { id: "prestige", label: "프레스티지", price: 1760 },
      { id: "signature", label: "시그니처", price: 1903 },
      { id: "xline", label: "X-Line", price: 2003 },
    ],
  },
  {
    id: "k5", brand: "기아", name: "K5",
    availableOptions: ["sunroof"],
    trims: [
      { id: "smartselect", label: "스마트 셀렉션", price: 2724 },
      { id: "prestige", label: "프레스티지", price: 2808 },
      { id: "bestselect", label: "베스트 셀렉션", price: 2928 },
      { id: "noblesse", label: "노블레스", price: 3154 },
      { id: "signature", label: "시그니처", price: 3469 },
    ],
  },
  {
    id: "k8", brand: "기아", name: "K8",
    availableOptions: ["sunroof"],
    trims: [
      { id: "noblesselight", label: "노블레스 라이트", price: 3679 },
      { id: "bestselect", label: "베스트 셀렉션", price: 3813 },
      { id: "noblesse", label: "노블레스", price: 4026 },
      { id: "signature", label: "시그니처", price: 4390 },
      { id: "signatureblack", label: "시그니처 블랙", price: 4546 },
    ],
  },
  {
    id: "ev3", brand: "기아", name: "EV3 (전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "air_std", label: "에어 스탠다드", price: 4208 },
      { id: "air_long", label: "에어 롱레인지", price: 4650 },
      { id: "earth_std", label: "어스 스탠다드", price: 4571 },
      { id: "earth_long", label: "어스 롱레인지", price: 5013 },
    ],
  },
  {
    id: "seltos", brand: "기아", name: "셀토스",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "trendy", label: "트렌디", price: 2477 },
      { id: "prestige", label: "프레스티지", price: 2840 },
      { id: "signature", label: "시그니처", price: 3101 },
      { id: "xline", label: "X-Line", price: 3217 },
    ],
  },
  { id: "k3", brand: "기아", name: "K3 (2024년 단종)", availableOptions: ["sunroof"], trims: [{ id: "default", label: "기본 (추정치)", price: 2100 }] },
  {
    id: "morning", brand: "기아", name: "모닝",
    availableOptions: [],
    trims: [
      { id: "basic", label: "기본형", price: 1421 },
      { id: "top", label: "상위형", price: 1911 },
    ],
  },
  {
    id: "niro", brand: "기아", name: "니로 (하이브리드)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "trendy", label: "트렌디", price: 2885 },
      { id: "prestige", label: "프레스티지", price: 3195 },
      { id: "signature", label: "시그니처", price: 3464 },
    ],
  },
  {
    id: "ev6", brand: "기아", name: "EV6 (전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "light", label: "라이트", price: 4660 },
      { id: "air", label: "에어", price: 5140 },
      { id: "earth", label: "어스", price: 5540 },
      { id: "gtline", label: "GT-Line", price: 6000 },
    ],
  },
  {
    id: "ev9", brand: "기아", name: "EV9 (전기차)",
    availableOptions: ["sunroof"],
    trims: [
      { id: "light", label: "라이트", price: 6197 },
      { id: "air", label: "에어", price: 6412 },
      { id: "earth", label: "어스", price: 6891 },
      { id: "gtline", label: "GT-Line", price: 7917 },
      { id: "gt", label: "GT (고성능)", price: 8463 },
    ],
  },
  {
    id: "mohave", brand: "기아", name: "모하비 (2024년 단종)",
    availableOptions: ["awd", "sunroof"],
    trims: [
      { id: "platinum", label: "플래티넘", price: 5054 },
      { id: "masters_gravity", label: "마스터즈 그래비티 (추정)", price: 5598 },
    ],
  },
  // ===== 제네시스 (AWD·선루프 기본 포함 또는 트림 내 포함) =====
  { id: "genesis_g70", brand: "제네시스", name: "G70", availableOptions: ["awd"], trims: [{ id: "default", label: "기본 (추정치)", price: 4500 }] },
  {
    id: "genesis_g80", brand: "제네시스", name: "G80",
    availableOptions: ["awd"],
    trims: [
      { id: "base", label: "기본 (2.5터보, 추정)", price: 5900 },
      { id: "sport", label: "스포츠 패키지", price: 6470 },
      { id: "black", label: "G80 블랙 (추정)", price: 8000 },
    ],
  },
  { id: "genesis_g90", brand: "제네시스", name: "G90", availableOptions: [], trims: [{ id: "default", label: "기본 (추정치)", price: 9500 }] },
  { id: "genesis_gv60", brand: "제네시스", name: "GV60", availableOptions: [], trims: [{ id: "default", label: "기본 (추정치)", price: 6200 }] },
  { id: "genesis_gv70", brand: "제네시스", name: "GV70", availableOptions: ["awd"], trims: [{ id: "default", label: "기본 (추정치)", price: 6500 }] },
  { id: "genesis_gv80", brand: "제네시스", name: "GV80", availableOptions: ["awd"], trims: [{ id: "default", label: "기본 (추정치)", price: 7500 }] },
  // ===== 테슬라 (AWD=트림 구분, 선루프=글라스루프 기본) =====
  {
    id: "tesla_modely", brand: "테슬라", name: "모델Y",
    availableOptions: [],
    trims: [
      { id: "premium_rwd", label: "프리미엄 RWD", price: 4999 },
      { id: "premium_awd", label: "프리미엄 롱레인지 AWD", price: 5999 },
    ],
  },
  {
    id: "tesla_model3", brand: "테슬라", name: "모델3",
    availableOptions: [],
    trims: [
      { id: "standard_rwd", label: "스탠다드 RWD", price: 4199 },
      { id: "premium_lr_rwd", label: "프리미엄 롱레인지 RWD", price: 5299 },
      { id: "premium_performance", label: "프리미엄 퍼포먼스", price: 5999 },
    ],
  },
  // ===== BMW (xDrive·선루프 트림가에 포함) =====
  {
    id: "bmw_5series", brand: "BMW", name: "5시리즈",
    availableOptions: [],
    trims: [
      { id: "520i", label: "520i", price: 6880 },
      { id: "523d", label: "523d", price: 7580 },
      { id: "523d_xdrive", label: "523d xDrive", price: 7880 },
      { id: "530i_xdrive_msport", label: "530i xDrive (M Sport)", price: 8420 },
    ],
  },
  {
    id: "bmw_x3", brand: "BMW", name: "X3",
    availableOptions: [],
    trims: [
      { id: "xdrive20i", label: "xDrive20i xLine", price: 6440 },
      { id: "xdrive20d", label: "xDrive20d xLine", price: 6930 },
      { id: "m40i", label: "M40i (추정)", price: 8900 },
    ],
  },
  {
    id: "bmw_x5", brand: "BMW", name: "X5",
    availableOptions: [],
    trims: [
      { id: "xdrive30d", label: "xDrive30d (추정)", price: 11800 },
      { id: "xdrive40i", label: "xDrive40i (추정)", price: 13000 },
      { id: "m60i", label: "M60i (추정)", price: 15800 },
    ],
  },
  // ===== 벤츠 (4MATIC·선루프 트림가에 포함) =====
  {
    id: "benz_eclass", brand: "벤츠", name: "E클래스",
    availableOptions: [],
    trims: [
      { id: "e200", label: "E200 아방가르드", price: 7650 },
      { id: "e300", label: "E300 (추정)", price: 8800 },
      { id: "e450", label: "E450 4MATIC (추정)", price: 10500 },
    ],
  },
  {
    id: "benz_glc", brand: "벤츠", name: "GLC",
    availableOptions: [],
    trims: [
      { id: "220d", label: "220d 4MATIC", price: 8120 },
      { id: "300_avantgarde", label: "300 4MATIC Avantgarde", price: 8140 },
      { id: "300_amgline", label: "300 4MATIC AMG Line", price: 9140 },
    ],
  },
  {
    id: "benz_gle", brand: "벤츠", name: "GLE",
    availableOptions: [],
    trims: [
      { id: "350", label: "350 4MATIC", price: 11660 },
      { id: "300d", label: "300d 4MATIC", price: 11780 },
      { id: "450", label: "450 4MATIC", price: 12760 },
    ],
  },
];

const BRANDS = [...new Set(CAR_DB.map((c) => c.brand))];

const ACCIDENT_OPTIONS = [
  { id: "none", label: "무사고", deduct: 0, desc: "사고 이력 없음" },
  { id: "simple", label: "단순 교환 (외판)", deduct: 0.05, desc: "범퍼/도어 등 단순 교환, 골격 손상 없음" },
  { id: "moderate", label: "단순 사고 + 판금/도색", deduct: 0.1, desc: "판금 또는 도색 이력 포함" },
  { id: "frame", label: "골격 손상", deduct: 0.2, desc: "프레임/주요 골격 부위 손상 이력" },
];

const OPTION_RETENTION = 0.5;
const EXTRA_OPTIONS = [
  { id: "awd", label: "AWD / 4WD", newPrice: 223 },
  { id: "sunroof", label: "파노라마 선루프", newPrice: 119 },
];

const STANDARD_KM_PER_YEAR = 20000;

const NOW = new Date();
const THIS_YEAR = NOW.getFullYear();
const THIS_MONTH = NOW.getMonth() + 1;

function calcAgeInYears(mfgYear, mfgMonth) {
  const months = (THIS_YEAR - mfgYear) * 12 + (THIS_MONTH - mfgMonth);
  return Math.max(months, 0) / 12;
}

function calcAgeDepreciation(years) {
  if (years <= 0) return 1;
  let value = 1;
  for (let i = 1; i <= years; i++) {
    if (i === 1) value *= 0.75;
    else value *= 0.91;
  }
  return Math.max(value, 0.22);
}

function calcMileageAdjustment(years, mileage) {
  const standardMileage = Math.max(years, 1) * STANDARD_KM_PER_YEAR;
  const diff = mileage - standardMileage;
  const units = Math.abs(diff) / 10000;
  let adj = diff >= 0 ? -units * 0.012 : units * 0.008;
  adj = Math.max(Math.min(adj, 0.25), -0.25);
  return adj;
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-slate-600">
      <span>{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function App() {
  const [brand, setBrand] = useState(BRANDS[0]);
  const carsInBrand = CAR_DB.filter((c) => c.brand === brand);

  const [carId, setCarId] = useState(carsInBrand[0].id);
  const car = CAR_DB.find((c) => c.id === carId) || carsInBrand[0];
  const [trimId, setTrimId] = useState(car.trims[0].id);
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [customPriceInput, setCustomPriceInput] = useState("");
  const [mfgYear, setMfgYear] = useState(THIS_YEAR - 3);
  const [mfgMonth, setMfgMonth] = useState(THIS_MONTH);
  const [mileage, setMileage] = useState(60000);
  const [accidentId, setAccidentId] = useState("none");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const trim = car.trims.find((t) => t.id === trimId) || car.trims[0];
  const accident = ACCIDENT_OPTIONS.find((a) => a.id === accidentId);
  const ageYears = calcAgeInYears(mfgYear, mfgMonth);
  const basePrice = useCustomPrice ? (parseFloat(customPriceInput) || 0) : trim.price;

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    const firstCar = CAR_DB.find((c) => c.brand === newBrand);
    setCarId(firstCar.id);
    setTrimId(firstCar.trims[0].id);
    setUseCustomPrice(false);
    setSelectedOptions([]);
  };

  const handleCarChange = (newCarId) => {
    setCarId(newCarId);
    const newCar = CAR_DB.find((c) => c.id === newCarId);
    setTrimId(newCar.trims[0].id);
    setUseCustomPrice(false);
    setSelectedOptions([]);
  };

  const availableOptions = EXTRA_OPTIONS.filter((o) => car.availableOptions.includes(o.id));

  const toggleOption = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const result = useMemo(() => {
    if (basePrice <= 0) return null;
    const ageRate = calcAgeDepreciation(ageYears);
    const afterAge = basePrice * ageRate;
    const mileageAdj = calcMileageAdjustment(ageYears, mileage);
    const afterMileage = afterAge * (1 + mileageAdj);
    const afterAccident = afterMileage * (1 - accident.deduct);
    const optionResidual = EXTRA_OPTIONS.filter((o) => selectedOptions.includes(o.id)).reduce(
      (sum, o) => sum + o.newPrice * OPTION_RETENTION,
      0
    );
    const afterOptions = afterAccident + optionResidual;
    const minPrice = afterOptions * 0.95;
    return { basePrice, ageRate, afterAge, mileageAdj, afterMileage, accidentDeduct: accident.deduct, afterAccident, optionResidual, afterOptions, minPrice };
  }, [basePrice, ageYears, mileage, accident, selectedOptions]);

  const fmt = (n) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <Car className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-800">중고차 최소 방어가격 계산기</h1>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          딜러 입찰/직영 매입가가 이 기준선보다 낮으면 협상 또는 다른 채널을 고려하세요.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
          {/* 브랜드 */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">브랜드</label>
            <div className="grid grid-cols-3 gap-2">
              {BRANDS.map((b) => (
                <button
                  key={b}
                  onClick={() => handleBrandChange(b)}
                  className={`px-2 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    brand === b
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* 차종 */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">차종</label>
            <select
              value={carId}
              onChange={(e) => handleCarChange(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
            >
              {carsInBrand.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 트림 / 신차가 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">
                {useCustomPrice ? "신차가 직접 입력" : "트림 (신차가 기준)"}
              </label>
              <button
                onClick={() => setUseCustomPrice((v) => !v)}
                className="text-xs text-blue-500 hover:text-blue-700 underline underline-offset-2"
              >
                {useCustomPrice ? "← DB에서 선택" : "트림 없음 / 직접 입력 →"}
              </button>
            </div>

            {useCustomPrice ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="신차 출고가 입력 (예: 3200)"
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
                />
                <span className="text-sm text-slate-500 whitespace-nowrap">만원</span>
              </div>
            ) : (
              car.trims.length > 1 && (
                <div className="grid grid-cols-2 gap-2">
                  {car.trims.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTrimId(t.id)}
                      className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                        trimId === t.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-medium">{t.label}</div>
                      <div className="text-xs text-slate-400">{t.price.toLocaleString()}만원</div>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>

          {/* 추가 옵션 */}
          {availableOptions.length > 0 && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                추가 옵션 (신차가에 +, 중고가에는 50% 잔존 가정)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableOptions.map((o) => {
                  const checked = selectedOptions.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      onClick={() => toggleOption(o.id)}
                      className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                        checked
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <div className="font-medium">{o.label}</div>
                      <div className="text-xs text-slate-400">
                        신차가 +{o.newPrice}만원 → 잔존 +{Math.round(o.newPrice * OPTION_RETENTION)}만원
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 제조년월 */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              제조년월{" "}
              <span className="text-blue-600 font-semibold">
                ({ageYears < 0.1 ? "신차" : `${Math.floor(ageYears)}년 ${Math.round((ageYears % 1) * 12)}개월`})
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={mfgYear}
                onChange={(e) => setMfgYear(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                {Array.from({ length: THIS_YEAR - 2005 + 1 }, (_, i) => THIS_YEAR - i).map((y) => (
                  <option key={y} value={y}>{y}년</option>
                ))}
              </select>
              <select
                value={mfgMonth}
                onChange={(e) => setMfgMonth(Number(e.target.value))}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>{m}월</option>
                ))}
              </select>
            </div>
          </div>

          {/* 주행거리 */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              총 주행거리: <span className="text-blue-600 font-semibold">{mileage.toLocaleString()} km</span>
            </label>
            <input
              type="range" min="0" max="250000" step="5000" value={mileage}
              onChange={(e) => setMileage(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0km</span>
              <span>표준: {(Math.max(ageYears, 1) * STANDARD_KM_PER_YEAR).toLocaleString()}km</span>
              <span>250,000km</span>
            </div>
          </div>

          {/* 사고 이력 */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">사고 이력</label>
            <div className="grid grid-cols-2 gap-2">
              {ACCIDENT_OPTIONS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccidentId(a.id)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    accidentId === a.id
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="font-medium">{a.label}</div>
                  <div className="text-xs text-slate-400">{a.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 결과 */}
        <div className="mt-5 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-slate-500" />
            <h2 className="font-semibold text-slate-800">감가 단계별 내역</h2>
          </div>
          {!result ? (
            <p className="text-sm text-slate-400">신차가를 입력해주세요.</p>
          ) : (
            <>
              <div className="space-y-2 text-sm">
                <Row
                  label={`신차가 기준 (${useCustomPrice ? "직접 입력" : `${car.name} ${trim.label}`})`}
                  value={`${fmt(result.basePrice)} 만원`}
                />
                <Row
                  label={`연식 감가 (${Math.floor(ageYears)}년 ${Math.round((ageYears % 1) * 12)}개월, 잔존율 ${(result.ageRate * 100).toFixed(0)}%)`}
                  value={`${fmt(result.afterAge)} 만원`}
                />
                <Row
                  label={`주행거리 보정 (${result.mileageAdj >= 0 ? "+" : ""}${(result.mileageAdj * 100).toFixed(1)}%)`}
                  value={`${fmt(result.afterMileage)} 만원`}
                />
                <Row label={`사고 이력 감가 (-${(result.accidentDeduct * 100).toFixed(0)}%)`} value={`${fmt(result.afterAccident)} 만원`} />
                <Row label="추가 옵션 잔존가치 (+)" value={`${fmt(result.optionResidual)} 만원`} />
                <Row label="안전마진 차감 (-5%, 협상 버퍼)" value={`${fmt(result.afterOptions - result.minPrice)} 만원`} />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-400 mb-1">최소 방어 가격 (이 가격 이하로는 판매 비권장)</div>
                <div className="text-3xl font-bold text-blue-600">{fmt(result.minPrice)} 만원</div>
              </div>
            </>
          )}
        </div>

        <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            트림 신차가와 옵션 추가금(AWD 223만원, 선루프 119만원)은 공식 가격표 기준 정확한 값입니다. 다만{" "}
            <strong>옵션의 중고 잔존율(50%)과 연식 감가 곡선(연 9%, 바닥 22%)은 한정된 실거래 데이터로 추정한 값</strong>이라 실제와 차이가 있을 수 있습니다.{" "}
            <strong>수입차(테슬라·BMW·벤츠 등)는 딜러 할인이 일반적이라, 표시된 신차가는 공식 권장소비자가(출고가)일 뿐 실제 구매가보다 높을 수 있습니다.</strong>{" "}
            거래 전 동일 조건 매물을 꼭 비교하세요.
          </p>
        </div>

        <div className="mt-3 mb-6 flex items-start gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>현대/기아 23개 차종, 제네시스 G80, 테슬라 모델Y·모델3, BMW 5시리즈·X3·X5, 벤츠 E클래스·GLC·GLE는 트림별 신차가가 반영됐습니다. "(추정치)" 표시 차종은 평균가/시작가 기준이며, 수입차는 딜러 할인 전 출고가 기준입니다. 계속 확장 중이에요.</p>
        </div>
      </div>
    </div>
  );
}
