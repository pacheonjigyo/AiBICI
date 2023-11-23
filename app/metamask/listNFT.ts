import { ethers } from "ethers";

const customWindow: any = window;

export async function listNFTViaMetaMask(account, tokenId, price) {
  try {
    const accounts = await customWindow.ethereum.request({
      method: "eth_accounts",
    });

    console.log(`사용자 주소: ${accounts}`);

    const contractResp = await fetch("http://localhost:3001/contract");
    const contractJson = await contractResp.json();

    // Ethereum 네트워크에 연결 (Metamask와 연동됨)
    const provider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(
      contractJson.providerUrl,
    );

    const contractNumber = contractJson.contractNumber;
    const contractABI = contractJson.contract.abi;
    const contract = new ethers.Contract(contractNumber, contractABI, provider);

    const NFTOwner = await contract.ownerOf(tokenId);

    console.log("owner", NFTOwner);

    const isNFTOwnedByUser = NFTOwner.toLowerCase() === account.toLowerCase();

    if (!isNFTOwnedByUser) {
      console.error("사용자가 해당 NFT를 소유하고 있지 않습니다.");

      return;
    }

    const ABI = ["function listNFT(uint256 tokenId, uint256 price)"];

    const iface = new ethers.Interface(ABI);
    const idata = iface.encodeFunctionData("listNFT", [tokenId, price]);

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
