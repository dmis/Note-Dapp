const contractAddress = "0xa88E823885b2eFd2f87eA4B0F56DF93983e465e0";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_note",
                "type": "string"
            }
        ],
        "name": "writeNote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getNote",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
let signer;
let provider = new ethers.providers.Web3Provider(window.ethereum, 80001);
let contract;
provider.send("eth_requestAccounts", []).then(()=>{
    provider.listAccounts().then((accounts)=>{
        signer = provider.getSigner(accounts[0]);
        contract = new ethers.Contract(contractAddress, contractABI, signer)
    })
})
async function getNote(){
    let s = await contract.getNote()
    console.log(s)
    document.getElementById("inputNote").value = s
}

async function writeNote(){
    const note = document.getElementById("inputNote").value;
    console.log(note);
    await contract.writeNote(note);
}