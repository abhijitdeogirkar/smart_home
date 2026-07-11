// =========================================================
// security.js : सुरक्षित PIN लॉगिन आणि घरगुती सुरक्षा (Intruder Alert)
// =========================================================

// ---------------------------------------------------------
// १. PIN पडताळणी प्रणाली (डॅशबोर्ड अनलॉक करणे)
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    const unlockBtn = document.getElementById("unlockBtn");
    if (unlockBtn) {
        unlockBtn.addEventListener("click", verifyPinAndLoad);
    }
});

async function verifyPinAndLoad() {
    const pin = document.getElementById('userPinInput').value;
    const errorMsg = document.getElementById('pinError');
    const btn = document.getElementById('unlockBtn');
    
    if(pin.trim() === "") {
        errorMsg.innerText = "कृपया PIN टाका.";
        errorMsg.style.display = "block";
        return;
    }

    btn.innerText = "तपासत आहे...";
    errorMsg.style.display = "none";

    try {
        let response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: "read_tank", pin: pin })
        });
        
        let result = await response.json();
        
        if (result.status === "success") {
            document.getElementById('pinLoginScreen').style.display = "none";
            
            if (typeof fetchSolarData === "function") {
                fetchSolarData(pin);
            }
        } else {
            errorMsg.innerText = "चुकीचा PIN. प्रवेश नाकारला.";
            errorMsg.style.display = "block";
            btn.innerText = "अनलॉक करा";
        }
    } catch (error) {
        console.error("Error:", error);
        errorMsg.innerText = "सर्व्हरशी संपर्क होऊ शकला नाही.";
        errorMsg.style.display = "block";
        btn.innerText = "अनलॉक करा";
    }
}

// ---------------------------------------------------------
// २. घरगुती सुरक्षा आणि सेन्सर लॉजिक (भविष्यातील IoT आणि MacroDroid साठी)
// ---------------------------------------------------------

// हे फंक्शन भविष्यात ESP32 किंवा सेन्सरकडून सिग्नल आल्यावर कॉल होईल
function triggerSecurityAlarm() {
    // भविष्यात हे HTML चेकमार्क्स काढून आपण थेट सेन्सरचा डेटा (True/False) वापरू
    states.alarm_armed = document.getElementById("alarmToggle") ? document.getElementById("alarmToggle").checked : false;
    states.motion_detected = document.getElementById("simMotion") ? document.getElementById("simMotion").checked : false;
    
    const banner = document.getElementById("mainBanner");
    const bannerTitle = document.getElementById("bannerTitle");
    const bannerSub = document.getElementById("bannerSub");
    
    if (states.alarm_armed && states.motion_detected) {
        
        // १. फ्रंट-एंड UI बदल (गुगलला आक्षेप येणार नाही असा मवाळ पण स्पष्ट अलर्ट)
        banner.style.background = "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)";
        bannerTitle.innerHTML = "⚠️ सुरक्षा इशारा";
        bannerSub.innerHTML = "घरामध्ये हालचाल जाणवली आहे!";
        bannerSub.style.color = "#fca5a5";

        // २. मोबाईलवर सायलेंट नोटिफिकेशन पाठवणे (MacroDroid Webhook)
        sendMacrodroidAlert("Motion Detected in Main Room");

    } else {
        // परिस्थिती सामान्य झाल्यावर UI पूर्ववत करणे
        banner.style.background = "linear-gradient(135deg, #0f172a 0%, #334155 100%)";
        banner.className = "normal-banner";
        bannerTitle.innerHTML = "अभिप्राजामेयार्णव";
        bannerSub.innerHTML = "पाणी, ऊर्जा व सुरक्षा व्यवस्थापन प्रणाली";
        bannerSub.style.color = "#81d4fa";
    }
}

// MacroDroid ला HTTP GET/POST रिक्वेस्ट पाठवणारे फंक्शन
function sendMacrodroidAlert(message) {
    // इथे तुमची भविष्यातील MacroDroid ची युनिक वेबहूक URL येईल
    // उदाहरण: https://trigger.macrodroid.com/YOUR_DEVICE_ID/motion_alert
    const webhookUrl = "https://trigger.macrodroid.com/YOUR_ID/motion_alert?msg=" + encodeURIComponent(message);
    
    // जेव्हा तुम्ही खरोखर सेन्सर लावाल, तेव्हा हा ब्लॉक अन-कमेंट करा
    /*
    fetch(webhookUrl)
        .then(response => console.log("MacroDroid Alert Sent: " + response.status))
        .catch(error => console.error("MacroDroid Error:", error));
    */
    
    console.log("🔔 [System Log]: MacroDroid ला नोटिफिकेशन पाठवण्याची तयारी केली -", message);
}
