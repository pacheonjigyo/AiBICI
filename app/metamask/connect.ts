const customWindow: any = window;

export async function connectViaMetaMask() {
  if (!customWindow.ethereum) {
    alert("메타마스크를 설치해주세요.");

    return;
  }

  try {
    const result = await customWindow.ethereum.request({
      method: "eth_requestAccounts",
    });

    for (let i = 0; i < result.length; i++) {
      //
    }
  } catch (e: any) {
    alert(e.message);
  }
}
