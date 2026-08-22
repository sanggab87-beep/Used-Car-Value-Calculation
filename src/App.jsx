import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  Building2,
  Info,
} from "lucide-react";
import {
  SAMPLE_COMPLEXES,
  analyzeComplex,
  formatKRW,
  SIGNAL_META,
} from "./reData";
import PriceChart from "./PriceChart";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const analyzed = useMemo(
    () =>
      SAMPLE_COMPLEXES.map((c) => ({ ...c, analysis: analyzeComplex(c) })),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return analyzed;
    return analyzed.filter(
      (c) => c.name.includes(q) || c.region.includes(q)
    );
  }, [analyzed, query]);

  const selected = analyzed.find((c) => c.id === selectedId) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-5">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🚦</span>
          <h1 className="text-xl font-bold text-slate-800">실거래 신호등</h1>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          호가만 오르는지, 진짜 거래가 받쳐주는지 한눈에
        </p>

        {selected ? (
          <ComplexDetail complex={selected} onBack={() => setSelectedId(null)} />
        ) : (
          <>
            {/* 검색 */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="단지명 또는 지역 검색"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* 목록 */}
            <div className="space-y-3">
              {filtered.map((c) => (
                <ComplexCard
                  key={c.id}
                  complex={c}
                  onClick={() => setSelectedId(c.id)}
                />
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-sm text-slate-400 py-10">
                  검색 결과가 없어요.
                </p>
              )}
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-6 leading-relaxed">
              데모용 샘플 데이터입니다. 국토교통부 실거래가 API 연동 시<br />
              실제 데이터로 자동 갱신됩니다.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function SignalPill({ level, size = "sm" }) {
  const m = SIGNAL_META[level];
  const pad = size === "lg" ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs";
  const tone = {
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
  }[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ${pad} ${tone}`}
    >
      <span className={`w-2 h-2 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function ComplexCard({ complex, onClick }) {
  const a = complex.analysis;
  const up = a.priceChangePct >= 0;
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{complex.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{complex.region}</span>
          </div>
        </div>
        <SignalPill level={a.level} />
      </div>

      <div className="flex items-end justify-between mt-3">
        <div>
          <p className="text-[11px] text-slate-400">최근 실거래가 (전용 {complex.area}평)</p>
          <p className="text-lg font-bold text-slate-800">
            {formatKRW(a.lastPrice)}원
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-slate-400">3개월 거래</p>
          <p className="text-sm font-semibold text-slate-700">
            {a.recentVolume}건
          </p>
        </div>
        <div
          className={`flex items-center gap-0.5 text-sm font-semibold ${
            up ? "text-rose-500" : "text-blue-500"
          }`}
        >
          {up ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {up ? "+" : ""}
          {a.priceChangePct.toFixed(1)}%
        </div>
      </div>
    </button>
  );
}

function ComplexDetail({ complex, onBack }) {
  const a = complex.analysis;
  const m = SIGNAL_META[a.level];
  const banner = {
    green: "from-emerald-50 to-emerald-100/50 border-emerald-200",
    yellow: "from-amber-50 to-amber-100/50 border-amber-200",
    red: "from-rose-50 to-rose-100/50 border-rose-200",
  }[a.level];

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-3"
      >
        <ChevronLeft className="w-4 h-4" />
        목록으로
      </button>

      {/* 단지 정보 */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-800">{complex.name}</h2>
        <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
          <MapPin className="w-3 h-3" />
          {complex.region} · {complex.households.toLocaleString()}세대 · 전용 {complex.area}평
        </div>
      </div>

      {/* 신호 배너 */}
      <div className={`rounded-2xl border bg-gradient-to-br ${banner} p-4 mb-4`}>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-2xl">{m.emoji}</span>
          <div>
            <SignalPill level={a.level} size="lg" />
          </div>
          <span className="ml-auto text-sm font-bold text-slate-700">
            {a.title}
          </span>
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed">{a.reason}</p>
      </div>

      {/* 차트 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700">
            실거래가 · 거래량 (최근 6개월)
          </p>
        </div>
        <PriceChart transactions={complex.transactions} />
        <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-3 h-0.5 bg-blue-500 rounded" /> 실거래가
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-slate-200 rounded-sm" /> 거래량
          </span>
        </div>
      </div>

      {/* 핵심 지표 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Metric
          label="최근 실거래가"
          value={`${formatKRW(a.lastPrice)}원`}
        />
        <Metric label="현재 호가" value={`${formatKRW(complex.currentAsk)}원`} />
        <Metric
          label="호가 - 실거래 괴리"
          value={`${a.askPremiumPct >= 0 ? "+" : ""}${a.askPremiumPct.toFixed(1)}%`}
          tone={a.askPremiumPct >= 7 ? "warn" : "normal"}
          hint="호가가 실거래가보다 얼마나 높은지"
        />
        <Metric
          label="3개월 거래 회전율"
          value={`${a.turnoverPct.toFixed(2)}%`}
          hint="세대수 대비 거래 비율"
        />
      </div>

      <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          거래 회전율이 낮은데 호가 괴리가 크면, 실제 시세보다 기대감이 앞선
          상태일 수 있습니다. 신호는 참고용이며 투자 판단의 책임은 본인에게
          있습니다.
        </span>
      </div>
    </div>
  );
}

function Metric({ label, value, hint, tone = "normal" }) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p
        className={`text-base font-bold mt-0.5 ${
          tone === "warn" ? "text-rose-500" : "text-slate-800"
        }`}
      >
        {value}
      </p>
      {hint && <p className="text-[10px] text-slate-300 mt-0.5">{hint}</p>}
    </div>
  );
}
