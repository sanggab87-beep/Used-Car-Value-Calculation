import { useState, useMemo } from "react";
import { AlertTriangle, TrendingDown, Info } from "lucide-react";
import {
  CAR_DB, BRANDS, ACCIDENT_OPTIONS, EXTRA_OPTIONS, OPTION_RETENTION,
  STANDARD_KM_PER_YEAR, THIS_YEAR, THIS_MONTH,
  calcAgeInYears, calcAgeDepreciation, calcMileageAdjustment,
} from "./data";

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-center text-slate-600">
      <span>{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

export default function SellerTab() {
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
      (sum, o) => sum + o.newPrice * OPTION_RETENTION, 0
    );
    const afterOptions = afterAccident + optionResidual;
    const minPrice = afterOptions * 0.95;
    return { basePrice, ageRate, afterAge, mileageAdj, afterMileage, accidentDeduct: accident.deduct, afterAccident, optionResidual, afterOptions, minPrice };
  }, [basePrice, ageYears, mileage, accident, selectedOptions]);

  const fmt = (n) => Math.round(n).toLocaleString("ko-KR");

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        딜러 입찰/직영 매입가가 이 기준선보다 낮으면 협상 또는 다른 채널을 고려하세요.
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-5">
        {/* 브랜드 */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1.5 block">브랜드</label>
          <div className="grid grid-cols-3 gap-2">
            {BRANDS.map((b) => (
              <button key={b} onClick={() => handleBrandChange(b)}
                className={`px-2 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  brand === b ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
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
        </div>

        {/* 트림 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-slate-700">
              {useCustomPrice ? "신차가 직접 입력" : "트림 (신차가 기준)"}
            </label>
            <button onClick={() => setUseCustomPrice((v) => !v)}
              className="text-xs text-blue-500 hover:text-blue-700 underline underline-offset-2">
              {useCustomPrice ? "← DB에서 선택" : "트림 없음 / 직접 입력 →"}
            </button>
          </div>
          {useCustomPrice ? (
            <div className="flex items-center gap-2">
              <input type="number" min="0" placeholder="신차 출고가 입력 (예: 3200)"
                value={customPriceInput} onChange={(e) => setCustomPriceInput(e.target.value)}
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white" />
              <span className="text-sm text-slate-500 whitespace-nowrap">만원</span>
            </div>
          ) : (
            car.trims.length > 1 && (
              <div className="grid grid-cols-2 gap-2">
                {car.trims.map((t) => (
                  <button key={t.id} onClick={() => setTrimId(t.id)}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                      trimId === t.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}>
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
                  <button key={o.id} onClick={() => toggleOption(o.id)}
                    className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                      checked ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}>
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
            <select value={mfgYear} onChange={(e) => setMfgYear(Number(e.target.value))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
              {Array.from({ length: THIS_YEAR - 2005 + 1 }, (_, i) => THIS_YEAR - i).map((y) => (
                <option key={y} value={y}>{y}년</option>
              ))}
            </select>
            <select value={mfgMonth} onChange={(e) => setMfgMonth(Number(e.target.value))}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white">
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
          <input type="range" min="0" max="250000" step="5000" value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            className="w-full accent-blue-600" />
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
              <button key={a.id} onClick={() => setAccidentId(a.id)}
                className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                  accidentId === a.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                }`}>
                <div className="font-medium">{a.label}</div>
                <div className="text-xs text-slate-400">{a.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 결과 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-5 h-5 text-slate-500" />
          <h2 className="font-semibold text-slate-800">감가 단계별 내역</h2>
        </div>
        {!result ? (
          <p className="text-sm text-slate-400">신차가를 입력해주세요.</p>
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <Row label={`신차가 기준 (${useCustomPrice ? "직접 입력" : `${car.name} ${trim.label}`})`} value={`${fmt(result.basePrice)} 만원`} />
              <Row label={`연식 감가 (${Math.floor(ageYears)}년 ${Math.round((ageYears % 1) * 12)}개월, 잔존율 ${(result.ageRate * 100).toFixed(0)}%)`} value={`${fmt(result.afterAge)} 만원`} />
              <Row label={`주행거리 보정 (${result.mileageAdj >= 0 ? "+" : ""}${(result.mileageAdj * 100).toFixed(1)}%)`} value={`${fmt(result.afterMileage)} 만원`} />
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

      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800">
        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>
          트림 신차가와 옵션 추가금(AWD 223만원, 선루프 119만원)은 공식 가격표 기준 정확한 값입니다. 다만{" "}
          <strong>옵션의 중고 잔존율(50%)과 연식 감가 곡선(연 9%, 바닥 22%)은 한정된 실거래 데이터로 추정한 값</strong>이라 실제와 차이가 있을 수 있습니다.{" "}
          <strong>수입차(테슬라·BMW·벤츠 등)는 딜러 할인이 일반적이라, 표시된 신차가는 공식 권장소비자가(출고가)일 뿐 실제 구매가보다 높을 수 있습니다.</strong>{" "}
          거래 전 동일 조건 매물을 꼭 비교하세요.
        </p>
      </div>

      <div className="mb-2 flex items-start gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p>현대/기아 23개 차종, 제네시스 G80, 테슬라 모델Y·모델3, BMW 5시리즈·X3·X5, 벤츠 E클래스·GLC·GLE는 트림별 신차가가 반영됐습니다. "(추정치)" 표시 차종은 평균가/시작가 기준이며, 수입차는 딜러 할인 전 출고가 기준입니다. 계속 확장 중이에요.</p>
      </div>
    </div>
  );
}
