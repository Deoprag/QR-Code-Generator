const wrapper = document.querySelector(".wrapper"),
input = document.querySelector(".form input"),
qrImage = document.querySelector(".qr-code img"),
downloadBtn = document.querySelector(".download-btn"),
generateBtn = document.querySelector(".form button");

generateBtn.addEventListener("click", () =>{
        let qrValue = input.value;
        if (!qrValue) return;
        generateBtn.innerText = "Loading QR Code..."
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrValue}`
        qrImage.addEventListener("load", () =>{
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code"
    });
})

input.addEventListener("keyup", () =>{
    if(!input.value){
        wrapper.classList.remove("active");
    }
});

downloadBtn.addEventListener("click", () =>{
    fetch(qrImage.src).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = tempUrl;
        link.download = `QRCode - ${Date.now()}.png`
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
