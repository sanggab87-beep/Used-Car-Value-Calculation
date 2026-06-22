export const CAR_DB = [
  // ===== 현대 =====
  { id: "tucson", brand: "현대", name: "투싼", engineCC: 2000, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "modern", label: "모던", price: 2805 }, { id: "premium", label: "프리미엄", price: 3069 }, { id: "hpick", label: "H-Pick", price: 3156 }, { id: "inspiration", label: "인스퍼레이션", price: 3407 }] },
  { id: "santafe", brand: "현대", name: "싼타페", engineCC: 2500, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "exclusive", label: "익스클루시브", price: 3606 }, { id: "prestige", label: "프레스티지", price: 3889 }, { id: "hpick", label: "H-Pick", price: 4150 }, { id: "calligraphy", label: "캘리그래피", price: 4484 }] },
  { id: "grandeur", brand: "현대", name: "그랜저", engineCC: 2500, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "premium", label: "프리미엄", price: 3798 }, { id: "exclusive", label: "익스클루시브", price: 4287 }, { id: "honors", label: "아너스", price: 4513 }, { id: "calligraphy", label: "캘리그래피", price: 4710 }] },
  { id: "avante", brand: "현대", name: "아반떼", engineCC: 1600, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "smart", label: "스마트", price: 2034 }, { id: "modern", label: "모던", price: 2355 }, { id: "inspiration", label: "인스퍼레이션", price: 2717 }, { id: "nline", label: "N라인", price: 2806 }] },
  { id: "sonata", brand: "현대", name: "쏘나타", engineCC: 2000, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "premium", label: "프리미엄", price: 2826 }, { id: "s", label: "S", price: 2956 }, { id: "exclusive", label: "익스클루시브", price: 3260 }, { id: "inspiration", label: "인스퍼레이션", price: 3549 }] },
  { id: "kona", brand: "현대", name: "코나", engineCC: 1600, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "modern", label: "모던", price: 2478 }, { id: "hpick", label: "H-Pick", price: 2559 }, { id: "premium", label: "프리미엄", price: 2821 }, { id: "inspiration", label: "인스퍼레이션", price: 3102 }] },
  { id: "palisade", brand: "현대", name: "팰리세이드", engineCC: 2200, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "exclusive", label: "익스클루시브", price: 4383 }, { id: "prestige", label: "프레스티지", price: 4936 }, { id: "calligraphy", label: "캘리그래피", price: 5586 }] },
  { id: "casper", brand: "현대", name: "캐스퍼", engineCC: 1000, carType: "경차", availableOptions: [],
    trims: [{ id: "smart", label: "스마트", price: 1493 }, { id: "essential", label: "디 에센셜", price: 1771 }, { id: "inspiration", label: "인스퍼레이션", price: 2017 }] },
  { id: "ioniq5", brand: "현대", name: "아이오닉5 (전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "evalue", label: "E-Value+", price: 4735 }, { id: "exclusive", label: "익스클루시브 (추정)", price: 5290 }, { id: "prestige", label: "프레스티지 (추정)", price: 5750 }] },
  { id: "ioniq6", brand: "현대", name: "아이오닉6 (전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "evalue", label: "E-Value+", price: 4856 }, { id: "exclusive", label: "익스클루시브", price: 5095 }, { id: "prestige", label: "프레스티지", price: 5553 }] },
  { id: "staria", brand: "현대", name: "스타리아 (하이브리드)", engineCC: 2200, carType: "하이브리드", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "base", label: "기본형 (추정)", price: 3625 }] },
  { id: "nexo", brand: "현대", name: "넥쏘 (수소전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "exclusive", label: "익스클루시브", price: 7644 }, { id: "exclusivespecial", label: "익스클루시브 스페셜", price: 7928 }, { id: "prestige", label: "프레스티지", price: 8345 }] },

  // ===== 기아 =====
  { id: "sportage", brand: "기아", name: "스포티지", engineCC: 1600, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "prestige", label: "프레스티지", price: 2863 }, { id: "noblesse", label: "노블레스", price: 3197 }, { id: "signature", label: "시그니처", price: 3458 }, { id: "xline", label: "X-Line", price: 3522 }] },
  { id: "sorento", brand: "기아", name: "쏘렌토", engineCC: 2200, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "prestige", label: "프레스티지", price: 3580 }, { id: "noblesse", label: "노블레스", price: 3891 }, { id: "signature", label: "시그니처", price: 4168 }, { id: "xline", label: "X-Line", price: 4260 }] },
  { id: "carnival", brand: "기아", name: "카니발 (9인승)", engineCC: 2200, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "prestige", label: "프레스티지", price: 3636 }, { id: "noblesse", label: "노블레스", price: 4071 }, { id: "signature", label: "시그니처", price: 4426 }, { id: "xline", label: "X-Line", price: 4502 }] },
  { id: "ray", brand: "기아", name: "레이", engineCC: 1000, carType: "경차", availableOptions: [],
    trims: [{ id: "trendy", label: "트렌디", price: 1490 }, { id: "prestige", label: "프레스티지", price: 1760 }, { id: "signature", label: "시그니처", price: 1903 }, { id: "xline", label: "X-Line", price: 2003 }] },
  { id: "k5", brand: "기아", name: "K5", engineCC: 2000, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "smartselect", label: "스마트 셀렉션", price: 2724 }, { id: "prestige", label: "프레스티지", price: 2808 }, { id: "bestselect", label: "베스트 셀렉션", price: 2928 }, { id: "noblesse", label: "노블레스", price: 3154 }, { id: "signature", label: "시그니처", price: 3469 }] },
  { id: "k8", brand: "기아", name: "K8", engineCC: 2500, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "noblesselight", label: "노블레스 라이트", price: 3679 }, { id: "bestselect", label: "베스트 셀렉션", price: 3813 }, { id: "noblesse", label: "노블레스", price: 4026 }, { id: "signature", label: "시그니처", price: 4390 }, { id: "signatureblack", label: "시그니처 블랙", price: 4546 }] },
  { id: "ev3", brand: "기아", name: "EV3 (전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "air_std", label: "에어 스탠다드", price: 4208 }, { id: "air_long", label: "에어 롱레인지", price: 4650 }, { id: "earth_std", label: "어스 스탠다드", price: 4571 }, { id: "earth_long", label: "어스 롱레인지", price: 5013 }] },
  { id: "seltos", brand: "기아", name: "셀토스", engineCC: 1600, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "trendy", label: "트렌디", price: 2477 }, { id: "prestige", label: "프레스티지", price: 2840 }, { id: "signature", label: "시그니처", price: 3101 }, { id: "xline", label: "X-Line", price: 3217 }] },
  { id: "k3", brand: "기아", name: "K3 (2024년 단종)", engineCC: 1600, carType: "일반", availableOptions: ["sunroof"],
    trims: [{ id: "default", label: "기본 (추정치)", price: 2100 }] },
  { id: "morning", brand: "기아", name: "모닝", engineCC: 1000, carType: "경차", availableOptions: [],
    trims: [{ id: "basic", label: "기본형", price: 1421 }, { id: "top", label: "상위형", price: 1911 }] },
  { id: "niro", brand: "기아", name: "니로 (하이브리드)", engineCC: 1580, carType: "하이브리드", availableOptions: ["sunroof"],
    trims: [{ id: "trendy", label: "트렌디", price: 2885 }, { id: "prestige", label: "프레스티지", price: 3195 }, { id: "signature", label: "시그니처", price: 3464 }] },
  { id: "ev6", brand: "기아", name: "EV6 (전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "light", label: "라이트", price: 4660 }, { id: "air", label: "에어", price: 5140 }, { id: "earth", label: "어스", price: 5540 }, { id: "gtline", label: "GT-Line", price: 6000 }] },
  { id: "ev9", brand: "기아", name: "EV9 (전기차)", engineCC: 0, carType: "전기차", availableOptions: ["sunroof"],
    trims: [{ id: "light", label: "라이트", price: 6197 }, { id: "air", label: "에어", price: 6412 }, { id: "earth", label: "어스", price: 6891 }, { id: "gtline", label: "GT-Line", price: 7917 }, { id: "gt", label: "GT (고성능)", price: 8463 }] },
  { id: "mohave", brand: "기아", name: "모하비 (2024년 단종)", engineCC: 3000, carType: "일반", availableOptions: ["awd", "sunroof"],
    trims: [{ id: "platinum", label: "플래티넘", price: 5054 }, { id: "masters_gravity", label: "마스터즈 그래비티 (추정)", price: 5598 }] },

  // ===== 제네시스 =====
  { id: "genesis_g70", brand: "제네시스", name: "G70", engineCC: 2000, carType: "일반", availableOptions: ["awd"],
    trims: [{ id: "default", label: "기본 (추정치)", price: 4500 }] },
  { id: "genesis_g80", brand: "제네시스", name: "G80", engineCC: 2500, carType: "일반", availableOptions: ["awd"],
    trims: [{ id: "base", label: "기본 (2.5터보, 추정)", price: 5900 }, { id: "sport", label: "스포츠 패키지", price: 6470 }, { id: "black", label: "G80 블랙 (추정)", price: 8000 }] },
  { id: "genesis_g90", brand: "제네시스", name: "G90", engineCC: 3500, carType: "일반", availableOptions: [],
    trims: [{ id: "default", label: "기본 (추정치)", price: 9500 }] },
  { id: "genesis_gv60", brand: "제네시스", name: "GV60", engineCC: 0, carType: "전기차", availableOptions: [],
    trims: [{ id: "default", label: "기본 (추정치)", price: 6200 }] },
  { id: "genesis_gv70", brand: "제네시스", name: "GV70", engineCC: 2000, carType: "일반", availableOptions: ["awd"],
    trims: [{ id: "default", label: "기본 (추정치)", price: 6500 }] },
  { id: "genesis_gv80", brand: "제네시스", name: "GV80", engineCC: 2500, carType: "일반", availableOptions: ["awd"],
    trims: [{ id: "default", label: "기본 (추정치)", price: 7500 }] },

  // ===== 테슬라 =====
  { id: "tesla_modely", brand: "테슬라", name: "모델Y", engineCC: 0, carType: "전기차", availableOptions: [],
    trims: [{ id: "premium_rwd", label: "프리미엄 RWD", price: 4999 }, { id: "premium_awd", label: "프리미엄 롱레인지 AWD", price: 5999 }] },
  { id: "tesla_model3", brand: "테슬라", name: "모델3", engineCC: 0, carType: "전기차", availableOptions: [],
    trims: [{ id: "standard_rwd", label: "스탠다드 RWD", price: 4199 }, { id: "premium_lr_rwd", label: "프리미엄 롱레인지 RWD", price: 5299 }, { id: "premium_performance", label: "프리미엄 퍼포먼스", price: 5999 }] },

  // ===== BMW =====
  { id: "bmw_5series", brand: "BMW", name: "5시리즈", engineCC: 2000, carType: "일반", availableOptions: [],
    trims: [{ id: "520i", label: "520i", price: 6880 }, { id: "523d", label: "523d", price: 7580 }, { id: "523d_xdrive", label: "523d xDrive", price: 7880 }, { id: "530i_xdrive_msport", label: "530i xDrive (M Sport)", price: 8420 }] },
  { id: "bmw_x3", brand: "BMW", name: "X3", engineCC: 2000, carType: "일반", availableOptions: [],
    trims: [{ id: "xdrive20i", label: "xDrive20i xLine", price: 6440 }, { id: "xdrive20d", label: "xDrive20d xLine", price: 6930 }, { id: "m40i", label: "M40i (추정)", price: 8900 }] },
  { id: "bmw_x5", brand: "BMW", name: "X5", engineCC: 3000, carType: "일반", availableOptions: [],
    trims: [{ id: "xdrive30d", label: "xDrive30d (추정)", price: 11800 }, { id: "xdrive40i", label: "xDrive40i (추정)", price: 13000 }, { id: "m60i", label: "M60i (추정)", price: 15800 }] },

  // ===== 벤츠 =====
  { id: "benz_eclass", brand: "벤츠", name: "E클래스", engineCC: 2000, carType: "일반", availableOptions: [],
    trims: [{ id: "e200", label: "E200 아방가르드", price: 7650 }, { id: "e300", label: "E300 (추정)", price: 8800 }, { id: "e450", label: "E450 4MATIC (추정)", price: 10500 }] },
  { id: "benz_glc", brand: "벤츠", name: "GLC", engineCC: 2000, carType: "일반", availableOptions: [],
    trims: [{ id: "220d", label: "220d 4MATIC", price: 8120 }, { id: "300_avantgarde", label: "300 4MATIC Avantgarde", price: 8140 }, { id: "300_amgline", label: "300 4MATIC AMG Line", price: 9140 }] },
  { id: "benz_gle", brand: "벤츠", name: "GLE", engineCC: 3000, carType: "일반", availableOptions: [],
    trims: [{ id: "350", label: "350 4MATIC", price: 11660 }, { id: "300d", label: "300d 4MATIC", price: 11780 }, { id: "450", label: "450 4MATIC", price: 12760 }] },
];

export const BRANDS = [...new Set(CAR_DB.map((c) => c.brand))];

export const ACCIDENT_OPTIONS = [
  { id: "none", label: "무사고", deduct: 0, desc: "사고 이력 없음" },
  { id: "simple", label: "단순 교환 (외판)", deduct: 0.05, desc: "범퍼/도어 등 단순 교환, 골격 손상 없음" },
  { id: "moderate", label: "단순 사고 + 판금/도색", deduct: 0.1, desc: "판금 또는 도색 이력 포함" },
  { id: "frame", label: "골격 손상", deduct: 0.2, desc: "프레임/주요 골격 부위 손상 이력" },
];

export const EXTRA_OPTIONS = [
  { id: "awd", label: "AWD / 4WD", newPrice: 223 },
  { id: "sunroof", label: "파노라마 선루프", newPrice: 119 },
];

export const OPTION_RETENTION = 0.5;
export const STANDARD_KM_PER_YEAR = 20000;

export const NOW = new Date();
export const THIS_YEAR = NOW.getFullYear();
export const THIS_MONTH = NOW.getMonth() + 1;

export function calcAgeInYears(mfgYear, mfgMonth) {
  const months = (THIS_YEAR - mfgYear) * 12 + (THIS_MONTH - mfgMonth);
  return Math.max(months, 0) / 12;
}

export function calcAgeDepreciation(years) {
  if (years <= 0) return 1;
  let value = 1;
  for (let i = 1; i <= years; i++) {
    if (i === 1) value *= 0.75;
    else value *= 0.91;
  }
  return Math.max(value, 0.22);
}

export function calcMileageAdjustment(years, mileage) {
  const standardMileage = Math.max(years, 1) * STANDARD_KM_PER_YEAR;
  const diff = mileage - standardMileage;
  const units = Math.abs(diff) / 10000;
  let adj = diff >= 0 ? -units * 0.012 : units * 0.008;
  adj = Math.max(Math.min(adj, 0.25), -0.25);
  return adj;
}

// 취득세 계산 (만원)
export function calcAcquisitionTax(price, car) {
  if (car.carType === "경차") {
    // 경차: 4%, 75만원 한도 감면
    return Math.max(0, Math.round(price * 0.04 - 75));
  }
  if (car.carType === "전기차") {
    // 전기차: 7%, 140만원 한도 감면
    return Math.max(0, Math.round(price * 0.07 - 140));
  }
  if (car.carType === "하이브리드") {
    // 하이브리드: 7%, 40만원 감면
    return Math.max(0, Math.round(price * 0.07 - 40));
  }
  // 일반: 7%
  return Math.round(price * 0.07);
}

// 연간 자동차세 (지방교육세 30% 포함, 만원)
export function calcCarTax(car) {
  if (car.carType === "전기차") return 13; // 연 13만원 (지방교육세 포함)
  const cc = car.engineCC;
  let rate;
  if (cc <= 1000) rate = 80;
  else if (cc <= 1600) rate = 140;
  else rate = 200;
  const base = (cc * rate) / 10000;
  return Math.round(base * 1.3); // 지방교육세 30%
}
