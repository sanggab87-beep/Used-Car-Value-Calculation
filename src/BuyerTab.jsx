import { useState, useMemo } from "react";
import { AlertTriangle, Info, ShoppingCart } from "lucide-react";
import { CAR_DB, BRANDS, calcAcquisitionTax, calcCarTax } from "./data";

// 할인할증 계수: [경력구간][사고이력]
// 실제 보험사 할인할증 등급 체계를 단순화한 추정 계수
const INSURANCE_FACTORS = {
  lt1:   { none: 2.8, one: 3.8, multi: 4.8 }, // 1년 미만
  y1to3: { none: 1.9, one: 2.7, multi: 3.6 }, // 1~3년
  y3to5: { none: 1.4, one: 2.0, multi: 2.8 }, // 3~5년
  y5to10:{ none: 1.05,one: 1.6, multi: 2.2 }, // 5~10년
  gt10:  { none: 0.72,one: 1.1, multi: 1.65}, // 10년+
};

// 차량 기본요율 (차량가 대비 %)
// 실제 보험사는 차량별 손해율 통계 기반으로 산정
function getBaseRate(car) {
  if (["BMW", "벤츠"].includes(car.brand)) return 0.033; // 수입차: 부품비 높음
  if (car.brand === "테슬라") return 0.030;              // 테슬라: 수리비 높음
  if (car.carType === "경차") return 0.019;              // 경차: 차량가 낮고 수리비 낮음
  if (["제네시스"].includes(car.brand)) return 0.028;    // 고급 국산
  return 0.025;                                          // 일반 국산
}

const EXPERIENCE_OPTIONS = [
  { id: "lt1",    label: "1년 미만", desc: "초보 — 보험료 높음" },
  { id: "y1to3",  label: "1~3년",   desc: "초기 경력" },
  { id: "y3to5",  label: "3~5년",   desc: "중간 경력" },
  { id: "y5to10", label: "5~10년",  desc: "경력 운전자" },
  { id: "gt10",   label: "10년+",   desc: "장기 무사고 할인 가능" },
];

const ACCIDENT_HISTORY = [
  { id: "none",  label: "없음",   desc: "최근 3년 무사고" },
  { id: "one",   label: "1건",    desc: "할증 적용" },
  { id: "multi", label: "2건+",   desc: "고할증 — 보험료 대폭 상승" },
];

function Row({ label, value, sub, highlight }) {
  return (
    <div className={`flex justify-between items-start py-2 border-b border-slate-50 last:border-0 ${highlight ? "text-blue-700" : "text-slate-600"}`}>
      <div>
        <div className={`text-sm ${highlight ? "font-semibold" : ""}`}>{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
      <span className={`font-medium whitespace-nowrap ml-4 ${highlight ? "text-blue-600 text-base" : "text-slate-800 text-sm"}`}>{value}</span>
    </div>
  );
}

export default function BuyerTab() {
  const [brand, setBrand] = useState(BRANDS[0]);
  const carsInBrand = CAR_DB.filter((c) => c.brand === brand);

  const [carId, setCarId] = useState(carsInBrand[0].id);
  const car = CAR_DB.find((c) => c.id === carId) || carsInBrand[0];

  const [buyPrice, setBuyPrice] = useState("");
  const [experience, setExperience] = useState("y5to10");
  const [accidentHistory, setAccidentHistory] = useState("none");

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    const firstCar = CAR_DB.find((c) => c.brand === newBrand);
    setCarId(firstCar.id);
  };

  const result = useMemo(() => {
    const price = parseFloat(buyPrice);
    if (!price || price <= 0) return null;

    const acquisitionTax = calcAcquisitionTax(price, car);
    const carTax = calcCarTax(car);

    const baseRate = getBaseRate(car);
    const factor = INSURANCE_FACTORS[experience][accidentHistory];
    const insEstimate = Math.round(price * baseRate * factor);
    // ±15% 오차 범위
    const insMin = Math.round(insEstimate * 0.85);
    const insMax = Math.round(insEstimate * 1.15);

    const firstYearTotal = price + acquisitionTax + carTax + insEstimate;
    const fiveYearTotal = firstYearTotal + (carTax + insEstimate) * 4;

    return { price, acquisitionTax, carTax, insEstimate, insMin, insMax, firstYearTotal, fiveYearTotal, factor };
  }, [buyPrice, car, experience, accidentHistory]);

  const fmt = (n) => Math.round(n).toLocaleString("ko-KR");

  const taxNote = () => {
    if (car.carType === "경차") return "경차 취득세 4% — 75만원 한도 감면";
    if (car.carType === "전기차") return "전기차 취득세 감면 140만원 공제";
    if (car.carType === "하이브리드") return "하이브리드 취득세 감면 40만원 공제";
    return "비영업용 승용차 취득세 7%";
  };

  const carTaxNote = () => {
    if (car.carType === "전기차") return "전기차 정액 (지방교육세 포함)";
    return `${car.engineCC.toLocaleString()}cc 기준, 지방교육세 30% 포함`;
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        구매 전 취등록세·자동차세·보험료를 합산해 실제 첫해 비용을 확인하세요.
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
        {/* 브랜드 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">브랜드</label>
          <div className="grid grid-cols-3 gap-2">
            {BRANDS.map((b) => (
              <button key={b} onClick={() => handleBrandChange(b)}
                className={`px-2 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  brand === b ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}>{b}</button>
            ))}
          </div>
        </div>

        {/* 차종 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">차종</label>
          <select value={carId} onChange={(e) => handleCarChange(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
            {carsInBrand.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="mt-1 text-xs text-slate-400">
            {car.carType === "경차" && "🟢 경차 혜택 적용"}
            {car.carType === "전기차" && "⚡ 전기차 감면 적용"}
            {car.carType === "하이브리드" && "🌿 하이브리드 감면 적용"}
          </div>
        </div>

        {/* 구매 예정가 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">구매 예정가</label>
          <div className="flex items-center gap-2">
            <input type="number" min="0" placeholder="실제 구매 예정 가격 (예: 2200)"
              value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white" />
            <span className="text-sm text-slate-500 whitespace-nowrap">만원</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">엔카·KB차차차 등에서 확인한 실제 거래 예정가를 입력하세요.</p>
        </div>

        {/* 운전 경력 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">운전 경력</label>
          <div className="grid grid-cols-5 gap-1.5">
            {EXPERIENCE_OPTIONS.map((e) => (
              <button key={e.id} onClick={() => setExperience(e.id)}
                className={`py-2 px-1 rounded-lg border text-xs font-medium transition-colors text-center ${
                  experience === e.id ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}>
                <div>{e.label}</div>
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {EXPERIENCE_OPTIONS.find(e => e.id === experience)?.desc}
          </p>
        </div>

        {/* 최근 3년 사고 이력 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">최근 3년 사고 이력 (보험처리 기준)</label>
          <div className="grid grid-cols-3 gap-2">
            {ACCIDENT_HISTORY.map((a) => (
              <button key={a.id} onClick={() => setAccidentHistory(a.id)}
                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                  accidentHistory === a.id ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}>
                <div>{a.label}</div>
                <div className="text-xs font-normal text-slate-400 mt-0.5">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingCart className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-800">실구매 비용 분석</h2>
        </div>

        {!result ? (
          <p className="text-sm text-slate-400">구매 예정가를 입력해주세요.</p>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">초기 비용</p>
              <Row label="차량 구매가" value={`${fmt(result.price)} 만원`} />
              <Row label="취득세" value={`${fmt(result.acquisitionTax)} 만원`} sub={taxNote()} />
            </div>

            <div className="mb-4">
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">연간 고정비</p>
              <Row label="자동차세 (연간)" value={`${fmt(result.carTax)} 만원`} sub={carTaxNote()} />
              <Row
                label="자동차 보험료 추정 (연간)"
                value={`약 ${fmt(result.insEstimate)} 만원`}
                sub={`범위 ${fmt(result.insMin)}~${fmt(result.insMax)}만원 · 할인할증 계수 ${result.factor.toFixed(2)}× 적용`}
              />
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <Row
                label="첫해 총 실구매비용"
                value={`${fmt(result.firstYearTotal)} 만원`}
                sub="구매가 + 취득세 + 자동차세 + 보험료"
                highlight
              />
              <Row
                label="5년 총 소유비용 (TCO)"
                value={`${fmt(result.fiveYearTotal)} 만원`}
                sub="차량 감가·유류비·정비비 미포함"
                highlight
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          보험료는 실제 보험사 할인할증 등급 체계를 단순화한 <strong>추정치(±15%)</strong>입니다.
          동일 차량·경력이라도 특약 구성, 마일리지 할인, 블랙박스 할인 등으로 실제 보험료는 달라집니다.
          정확한 견적은 <strong>보험다모아</strong> 또는 각 보험사에서 직접 비교하세요.
        </p>
      </div>

      <div className="mb-2 flex items-start gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>자동차세는 배기량 기준 (전기차 연 13만원 정액). 취득세는 2024년 기준. 유류비·정기점검비·소모품 비용은 포함되지 않습니다.</p>
      </div>
    </div>
  );

  function handleCarChange(newCarId) {
    setCarId(newCarId);
  }
}
