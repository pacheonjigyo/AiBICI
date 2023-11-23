// 환율 정보를 가져오는 함수
export async function fetchExchangeRate() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=eth",
    );
    const data = await response.json();
    return data["matic-network"]["eth"];
  } catch (error) {
    console.error("환율 정보를 가져오는 중 오류 발생:", error);
    return null;
  }
}

// 한화 10,000원을 매틱 (MATIC)으로 변환
export async function convertKRWToMATIC(krwAmount) {
  const exchangeRate = 700;

  if (!exchangeRate) {
    return null;
  }

  const krwToEthRate = 1 / exchangeRate; // 한화를 이더로 변환
  const ethAmount = krwAmount * krwToEthRate;

  return BigInt(ethAmount * Math.pow(10, 18));
}
