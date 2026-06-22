import { useState } from "react";
import { Car } from "lucide-react";
import SellerTab from "./SellerTab";
import BuyerTab from "./BuyerTab";

export default function App() {
  const [activeTab, setActiveTab] = useState("seller");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-2 mb-1">
          <Car className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-slate-800">중고차 속마음</h1>
        </div>
        <p className="text-xs text-slate-400 mb-5">중고차 거래 전 꼭 알아야 할 숫자들</p>

        {/* 탭 */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-5">
          <button
            onClick={() => setActiveTab("seller")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "seller"
                ? "bg-white shadow-sm text-blue-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🚗 판매자 — 최소 방어가격
          </button>
          <button
            onClick={() => setActiveTab("buyer")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === "buyer"
                ? "bg-white shadow-sm text-emerald-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            🛒 구매자 — 실구매 비용
          </button>
        </div>

        {activeTab === "seller" ? <SellerTab /> : <BuyerTab />}
      </div>
    </div>
  );
}
