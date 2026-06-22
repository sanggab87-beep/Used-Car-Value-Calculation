import { useState, useMemo } from "react";
import { AlertTriangle, Info, ShoppingCart } from "lucide-react";
import { CAR_DB, BRANDS, calcAcquisitionTax, calcCarTax } from "./data";

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
  const [driverAge, setDriverAge] = useState("30s");

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    const firstCar = CAR_DB.find((c) => c.brand === newBrand);
    setCarId(firstCar.id);
  };

  const handleCarChange = (newCarId) => {
    setCarId(newCarId);
  };

  const result = useMemo(() => {
    const price = parseFloat(buyPrice);
    if (!price || price <= 0) return null;

    const acquisitionTax = calcAcquisitionTax(price, car);
    const carTax = calcCarTax(car);

    // 보험료 추정 (연령별 범위, 만원)
    const insuranceRates = {
      "20s": [0.055, 0.09],
      "30s": [0.035, 0.055],
      "40s": [0.025, 0.04],
      "50s": [0.02, 0.035],
    };
    const [rateMin, rateMax] = insuranceRates[driverAge];
    const insMin = Math.round(price * rateMin);
    const insMax = Math.round(price * rateMax);
    const insMid = Math.round((insMin + insMax) / 2);

    const firstYearTotal = price + acquisitionTax + carTax + insMid;
    const fiveYearTotal = firstYearTotal + (carTax + insMid) * 4;

    return { price, acquisitionTax, carTax, insMin, insMax, insMid, firstYearTotal, fiveYearTotal };
  }, [buyPrice, car, driverAge]);

  const fmt = (n) => Math.round(n).toLocaleString("ko-KR");

  const taxNote = () => {
    if (car.carType === "경차") return "경차 취득세 4%, 75만원 한도 감면";
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

        {/* 운전자 연령 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">운전자 연령대 (보험료 추정용)</label>
          <div className="grid grid-cols-4 gap-2">
            {[["20s", "20대"], ["30s", "30대"], ["40s", "40대"], ["50s", "50대+"]].map(([val, label]) => (
              <button key={val} onClick={() => setDriverAge(val)}
                className={`py-2 rounded-lg border text-sm font-medium transition-colors ${
                  driverAge === val ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}>{label}</button>
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
                value={`${fmt(result.insMin)}~${fmt(result.insMax)} 만원`}
                sub={`개인별 차이 큼 — 실제 비교는 보험다모아 이용 권장`}
              />
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <Row
                label="첫해 총 실구매비용"
                value={`${fmt(result.firstYearTotal)} 만원`}
                sub="구매가 + 취득세 + 자동차세 + 보험료 중앙값"
                highlight
              />
              <Row
                label="5년 총 소유비용 (TCO)"
                value={`${fmt(result.fiveYearTotal)} 만원`}
                sub="차량 감가 미포함 — 유류비·정비비 별도"
                highlight
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          <strong>보험료는 참고 추정치</strong>입니다. 운전 경력·사고 이력·특약 구성에 따라 실제 보험료는 크게 달라집니다.
          정확한 보험료는 <strong>보험다모아(보험개발원)</strong> 또는 각 보험사 홈페이지에서 직접 비교하세요.
          취득세는 2024년 기준이며, 정책 변경 시 달라질 수 있습니다.
        </p>
      </div>

      <div className="mb-2 flex items-start gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>자동차세는 배기량 기준으로 계산됩니다. 전기차는 연 13만원(지방교육세 포함) 정액. 유류비·정기점검비·소모품 비용은 포함되지 않습니다.</p>
      </div>
    </div>
  );
}
