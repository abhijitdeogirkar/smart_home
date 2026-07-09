// पंचांग माहिती दाखवणे (मराठीत)
function initPanchang() {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('mr-IN', options);
    const vaarNames = ["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];
    const vaarStr = vaarNames[today.getDay()];
    
    document.getElementById("panchangLiveText").innerHTML = `<b>तारीख:</b> ${dateStr} &nbsp;|&nbsp; <b>वार:</b> ${vaarStr} &nbsp;|&nbsp; <b>तिथी:</b> शुक्ल एकादशी &nbsp;|&nbsp; <span style='color:#e91e63;'>🎉 सण: एकादशी उत्सव</span>`;
}
