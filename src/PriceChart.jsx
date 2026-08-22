// 실거래가(선) + 거래량(막대) 을 함께 보여주는 미니 SVG 차트
// 외부 라이브러리 없이 그려서 가볍고 모바일에서도 잘 보입니다.

export default function PriceChart({ transactions }) {
  const W = 320;
  const H = 160;
  const padX = 8;
  const padTop = 16;
  const padBottom = 28;

  const prices = transactions.map((t) => t.avgPrice);
  const counts = transactions.map((t) => t.tradeCount);

  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const maxC = Math.max(...counts, 1);
  const spanP = maxP - minP || 1;

  const n = transactions.length;
  const innerW = W - padX * 2;
  const step = innerW / (n - 1 || 1);

  const x = (i) => padX + i * step;
  const yPrice = (p) =>
    padTop + (1 - (p - minP) / spanP) * (H - padTop - padBottom);

  // 거래량 막대 영역(하단)
  const barMaxH = 42;
  const barW = Math.max(6, step * 0.32);
  const yBarBase = H - padBottom;

  const linePts = transactions
    .map((t, i) => `${x(i)},${yPrice(t.avgPrice)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="실거래가 및 거래량 추이 차트"
    >
      {/* 거래량 막대 */}
      {transactions.map((t, i) => {
        const h = (t.tradeCount / maxC) * barMaxH;
        return (
          <rect
            key={`bar-${i}`}
            x={x(i) - barW / 2}
            y={yBarBase - h}
            width={barW}
            height={h}
            rx={2}
            className="fill-slate-200"
          />
        );
      })}

      {/* 실거래가 선 */}
      <polyline
        points={linePts}
        fill="none"
        className="stroke-blue-500"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 실거래가 점 */}
      {transactions.map((t, i) => (
        <circle
          key={`dot-${i}`}
          cx={x(i)}
          cy={yPrice(t.avgPrice)}
          r={3}
          className="fill-white stroke-blue-500"
          strokeWidth={2}
        />
      ))}

      {/* x축 라벨 (월) */}
      {transactions.map((t, i) => (
        <text
          key={`lbl-${i}`}
          x={x(i)}
          y={H - 8}
          textAnchor="middle"
          className="fill-slate-400"
          style={{ fontSize: 9 }}
        >
          {t.month.slice(5)}월
        </text>
      ))}
    </svg>
  );
}
