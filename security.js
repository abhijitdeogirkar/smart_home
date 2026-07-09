// सुरक्षा यंत्रणा: फ्लॅशिंग सायरन आणि ऑडिओ नियंत्रण
function triggerSecurityAlarm() {
    states.alarm_armed = document.getElementById("alarmToggle").checked;
    states.motion_detected = document.getElementById("simMotion").checked;
    
    const banner = document.getElementById("mainBanner");
    const audio = document.getElementById("sirenAudio");
    
    if (states.alarm_armed && states.motion_detected) {
        banner.className = "flashing-alert";
        document.getElementById("bannerTitle").innerHTML = "🚨 सावधान! घरात घुसखोर आढळला! 🚨";
        document.getElementById("bannerSub").innerHTML = "देवगीरकर निवास सुरक्षा प्रणाली सक्रिय झाली आहे!";
        document.getElementById("bannerSub").style.color = "white";
        audio.play().catch(e => console.log("ऑडिओ प्ले एरर"));
    } else {
        banner.className = "normal-banner";
        document.getElementById("bannerTitle").innerHTML = "अभिप्राजामेयार्णव";
        document.getElementById("bannerSub").innerHTML = "पाणी, ऊर्जा व सुरक्षा व्यवस्थापन प्रणाली";
        document.getElementById("bannerSub").style.color = "#81d4fa";
        audio.pause();
        audio.currentTime = 0;
    }
}
