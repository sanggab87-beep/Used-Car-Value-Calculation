// ────────────────────────────────────────────────────────────────
// 부동산 실거래 신호등 — 데이터 & 신호 계산 로직
//
// ⚠️ 지금은 데모용 샘플 데이터입니다.
// 나중에 국토교통부 실거래가 공개시스템(공공데이터포털) API 키를 발급받으면
// 아래 SAMPLE_COMPLEXES 대신 API 응답을 같은 형태로 매핑해서 넣으면 됩니다.
//
// 가격 단위: 만원 (중고차 앱과 동일)
// ────────────────────────────────────────────────────────────────

// 단지 하나의 형태:
// {
//   id, name, region, households(총 세대수), area(전용면적 평),
//   currentAsk(현재 대표 호가, 만원),
//   transactions: [{ month:"2025-03", avgPrice, tradeCount }, ...]  // 오래된 → 최신 순
// }

export const SAMPLE_COMPLEXES = [
  {
    id: "helio",
    name: "헬리오시티",
    region: "서울 송파구 가락동",
    households: 9510,
    area: 25,
    currentAsk: 195000,
    transactions: [
      { month: "2025-03", avgPrice: 182000, tradeCount: 41 },
      { month: "2025-04", avgPrice: 184500, tradeCount: 38 },
      { month: "2025-05", avgPrice: 187000, tradeCount: 44 },
      { month: "2025-06", avgPrice: 188500, tradeCount: 52 },
      { month: "2025-07", avgPrice: 190000, tradeCount: 47 },
      { month: "2025-08", avgPrice: 191500, tradeCount: 40 },
    ],
  },
  {
    id: "raemian",
    name: "래미안대치팰리스",
    region: "서울 강남구 대치동",
    households: 1608,
    area: 33,
    currentAsk: 385000,
    transactions: [
      { month: "2025-03", avgPrice: 360000, tradeCount: 5 },
      { month: "2025-04", avgPrice: 358000, tradeCount: 4 },
      { month: "2025-05", avgPrice: 365000, tradeCount: 6 },
      { month: "2025-06", avgPrice: 371000, tradeCount: 7 },
      { month: "2025-07", avgPrice: 374000, tradeCount: 5 },
      { month: "2025-08", avgPrice: 378000, tradeCount: 6 },
    ],
  },
  {
    id: "gwanak",
    name: "관악산휴먼시아",
    region: "서울 관악구 신림동",
    households: 738,
    area: 24,
    currentAsk: 98000,
    transactions: [
      { month: "2025-03", avgPrice: 89000, tradeCount: 1 },
      { month: "2025-04", avgPrice: 90000, tradeCount: 0 },
      { month: "2025-05", avgPrice: 91000, tradeCount: 1 },
      { month: "2025-06", avgPrice: 90500, tradeCount: 0 },
      { month: "2025-07", avgPrice: 92000, tradeCount: 1 },
      { month: "2025-08", avgPrice: 93000, tradeCount: 0 },
    ],
  },
  {
    id: "acro",
    name: "아크로리버파크",
    region: "서울 서초구 반포동",
    households: 1612,
    area: 34,
    currentAsk: 520000,
    transactions: [
      { month: "2025-03", avgPrice: 470000, tradeCount: 3 },
      { month: "2025-04", avgPrice: 468000, tradeCount: 2 },
      { month: "2025-05", avgPrice: 475000, tradeCount: 2 },
      { month: "2025-06", avgPrice: 478000, tradeCount: 1 },
      { month: "2025-07", avgPrice: 482000, tradeCount: 2 },
      { month: "2025-08", avgPrice: 480000, tradeCount: 1 },
    ],
  },
  {
    id: "misa",
    name: "미사강변센트럴자이",
    region: "경기 하남시 망월동",
    households: 1222,
    area: 25,
    currentAsk: 96000,
    transactions: [
      { month: "2025-03", avgPrice: 93000, tradeCount: 9 },
      { month: "2025-04", avgPrice: 93500, tradeCount: 12 },
      { month: "2025-05", avgPrice: 94000, tradeCount: 10 },
      { month: "2025-06", avgPrice: 94200, tradeCount: 11 },
      { month: "2025-07", avgPrice: 94500, tradeCount: 8 },
      { month: "2025-08", avgPrice: 95000, tradeCount: 9 },
    ],
  },
  {
    id: "dongtan",
    name: "동탄역롯데캐슬",
    region: "경기 화성시 오산동",
    households: 940,
    area: 32,
    currentAsk: 148000,
    transactions: [
      { month: "2025-03", avgPrice: 132000, tradeCount: 6 },
      { month: "2025-04", avgPrice: 133500, tradeCount: 5 },
      { month: "2025-05", avgPrice: 136000, tradeCount: 4 },
      { month: "2025-06", avgPrice: 138000, tradeCount: 3 },
      { month: "2025-07", avgPrice: 139500, tradeCount: 2 },
      { month: "2025-08", avgPrice: 141000, tradeCount: 2 },
    ],
  },
];

// ────────────────────────────────────────────────────────────────
// 신호 계산 로직
// ────────────────────────────────────────────────────────────────

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

// 만원 → "OO억 O,OOO만원" 사람이 읽기 좋은 표기
export function formatKRW(manwon) {
  if (manwon == null) return "-";
  const eok = Math.floor(manwon / 10000);
  const rest = Math.round(manwon % 10000);
  if (eok > 0 && rest > 0) return `${eok}억 ${rest.toLocaleString()}만`;
  if (eok > 0) return `${eok}억`;
  return `${rest.toLocaleString()}만`;
}

export function analyzeComplex(complex) {
  const t = complex.transactions;
  const recent3 = t.slice(-3);

  const recentVolume = sum(recent3.map((m) => m.tradeCount)); // 최근 3개월 거래량
  const totalVolume = sum(t.map((m) => m.tradeCount));

  const firstPrice = t[0].avgPrice;
  const lastPrice = t[t.length - 1].avgPrice;
  const priceChangePct = ((lastPrice - firstPrice) / firstPrice) * 100; // 6개월 가격 변동률

  // 거래 회전율: 최근 3개월간 전체 세대수 대비 거래 비율(%)
  const turnoverPct = (recentVolume / complex.households) * 100;

  // 호가 괴리: 현재 호가가 최신 실거래가보다 얼마나 위에 있는지(%)
  const askPremiumPct = ((complex.currentAsk - lastPrice) / lastPrice) * 100;

  // ── 판정 ──
  // 핵심 인사이트: "호가만 오르고 실제 거래가 없는가?"
  let level; // "green" | "yellow" | "red"
  let title;
  let reason;

  if (recentVolume === 0) {
    level = "red";
    title = "거래 실종";
    reason = "최근 3개월간 실거래가 0건입니다. 지금 보이는 가격은 실제 성사된 값이 아니라 호가일 가능성이 큽니다.";
  } else if (turnoverPct < 0.15 && askPremiumPct >= 5) {
    level = "red";
    title = "호가만 상승";
    reason = `거래는 거의 없는데(3개월 ${recentVolume}건) 호가는 실거래가보다 ${askPremiumPct.toFixed(1)}% 높습니다. 기대감만 형성된 구간일 수 있어요.`;
  } else if (turnoverPct >= 0.4 && askPremiumPct <= 4) {
    level = "green";
    title = "실거래 활발";
    reason = `거래가 꾸준하고(3개월 ${recentVolume}건) 호가-실거래 괴리도 ${askPremiumPct.toFixed(1)}%로 작습니다. 지금 가격이 실제 시세에 가깝습니다.`;
  } else if (askPremiumPct >= 7) {
    level = "yellow";
    title = "괴리 주의";
    reason = `거래는 있으나(3개월 ${recentVolume}건) 호가가 실거래가보다 ${askPremiumPct.toFixed(1)}% 높습니다. 호가를 그대로 시세로 믿긴 이릅니다.`;
  } else {
    level = "yellow";
    title = "관망 구간";
    reason = `거래량(3개월 ${recentVolume}건)과 호가 괴리(${askPremiumPct.toFixed(1)}%)가 애매한 구간입니다. 추세 확인이 필요해요.`;
  }

  return {
    recentVolume,
    totalVolume,
    priceChangePct,
    turnoverPct,
    askPremiumPct,
    lastPrice,
    level,
    title,
    reason,
  };
}

export const SIGNAL_META = {
  green: { emoji: "🟢", label: "활발", color: "emerald", dot: "bg-emerald-500" },
  yellow: { emoji: "🟡", label: "관망", color: "amber", dot: "bg-amber-500" },
  red: { emoji: "🔴", label: "주의", color: "rose", dot: "bg-rose-500" },
};
