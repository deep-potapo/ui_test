import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  holdings?: { quantity: number; avgPrice: number } | null;
}

interface OrderPanelProps {
  stock: Stock;
  type: "buy" | "sell";
  onClose: () => void;
}

export function OrderPanel({ stock, type, onClose }: OrderPanelProps) {
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [quantity, setQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState(stock.price);
  const [availableBalance] = useState(10000000); // 모의 잔고

  const totalPrice = orderType === "market" ? stock.price * quantity : limitPrice * quantity;
  const maxQuantity = type === "buy" 
    ? Math.floor(availableBalance / stock.price)
    : stock.holdings?.quantity || 0;

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value) || 0;
    setQuantity(Math.max(0, Math.min(num, maxQuantity)));
  };

  const adjustQuantity = (delta: number) => {
    setQuantity(Math.max(1, Math.min(quantity + delta, maxQuantity)));
  };

  const handleSubmit = () => {
    // 실제로는 API 호출
    alert(
      `${type === "buy" ? "매수" : "매도"} 주문이 접수되었습니다.\n종목: ${stock.name}\n수량: ${quantity}주\n${orderType === "market" ? "시장가" : `지정가 ${limitPrice.toLocaleString()}원`}`
    );
    onClose();
  };

  return (
    <Dialog.Root open onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <Dialog.Title className="text-xl font-bold">
              {type === "buy" ? "매수" : "매도"} 주문
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-6">
            {/* 종목 정보 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-1">{stock.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{stock.symbol}</p>
              <div className="text-2xl font-bold">{stock.price.toLocaleString()}원</div>
            </div>

            {/* 주문 유형 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                주문 유형
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOrderType("market")}
                  className={`p-3 border-2 rounded-lg font-medium transition-all ${
                    orderType === "market"
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  시장가
                </button>
                <button
                  onClick={() => setOrderType("limit")}
                  className={`p-3 border-2 rounded-lg font-medium transition-all ${
                    orderType === "limit"
                      ? "border-blue-600 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  지정가
                </button>
              </div>
            </div>

            {/* 지정가 입력 */}
            {orderType === "limit" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  지정 가격
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right text-lg font-semibold"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                    원
                  </span>
                </div>
                <div className="mt-2 flex gap-2">
                  {[-10000, -5000, -1000, 1000, 5000, 10000].map((delta) => (
                    <button
                      key={delta}
                      onClick={() => setLimitPrice(Math.max(0, limitPrice + delta))}
                      className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {delta > 0 ? "+" : ""}
                      {delta.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 수량 입력 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                주문 수량
              </label>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => adjustQuantity(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-semibold"
                  min="1"
                  max={maxQuantity}
                />
                <button
                  onClick={() => adjustQuantity(1)}
                  disabled={quantity >= maxQuantity}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2">
                {[10, 25, 50, 100].map((percent) => (
                  <button
                    key={percent}
                    onClick={() => setQuantity(Math.floor((maxQuantity * percent) / 100))}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                  >
                    {percent}%
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {type === "buy" ? "최대 매수 가능" : "보유"}: {maxQuantity.toLocaleString()}주
              </p>
            </div>

            {/* 예상 금액 */}
            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">주문 금액</span>
                <span className="font-semibold">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">수수료 (0.015%)</span>
                <span className="font-semibold">
                  {Math.floor(totalPrice * 0.00015).toLocaleString()}원
                </span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between">
                <span className="font-semibold">총 {type === "buy" ? "필요" : "예상 수령"} 금액</span>
                <span className="text-lg font-bold text-blue-600">
                  {(totalPrice + Math.floor(totalPrice * 0.00015)).toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 잔고 정보 */}
            {type === "buy" && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">보유 현금</span>
                  <span className="font-semibold">{availableBalance.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">주문 후 잔액</span>
                  <span
                    className={`font-semibold ${
                      availableBalance - totalPrice < 0 ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {(availableBalance - totalPrice - Math.floor(totalPrice * 0.00015)).toLocaleString()}
                    원
                  </span>
                </div>
              </div>
            )}

            {/* 실행 버튼 */}
            <button
              onClick={handleSubmit}
              disabled={quantity === 0 || (type === "buy" && totalPrice > availableBalance)}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                type === "buy"
                  ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
                  : "bg-red-600 hover:bg-red-700 text-white disabled:bg-gray-300"
              } disabled:cursor-not-allowed`}
            >
              {type === "buy" ? "매수 주문" : "매도 주문"}
            </button>

            {/* 경고 메시지 */}
            {type === "buy" && totalPrice > availableBalance && (
              <p className="text-sm text-red-600 text-center">
                잔고가 부족합니다. 수량을 줄여주세요.
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
