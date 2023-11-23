import { ethers } from "ethers";

const customWindow: any = window;

export async function mintNFTViaMetaMask(account, tokenURI) {
  try {
    const accounts = await customWindow.ethereum.request({
      method: "eth_accounts",
    });

    console.log(`사용자 주소: ${accounts}`);

    const contractResp = await fetch("http://localhost:3001/contract");
    const contractJson = await contractResp.json();
    const contractNumber = contractJson.contractNumber;

    const ABI = ["function mintNFT(string memory tokenURI)"];

    const iface = new ethers.Interface(ABI);
    const idata = iface.encodeFunctionData("mintNFT", [tokenURI]);

    const tx = {
      from: account,
      to: contractNumber,
      data: idata,
    };

    // 메시지 서명 요청
    const resultFee = await customWindow.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    console.log("결제 서명 결과:", resultFee);
  } catch (error) {
    console.error("MetaMask 연결 또는 메시지 서명 중 오류 발생:", error);
  }
}
