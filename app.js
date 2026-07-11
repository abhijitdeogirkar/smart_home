// ग्लोबल URL (सर्व मॉड्यूल्ससाठी)
const GAS_URL = "https://script.google.com/macros/s/AKfycbzhRahy5y9o_ln7rkfkDsNy5HUao0wb1uajESoK5sh8Fo5wzCF9LRRqSk1rmENlXTihPA/exec"; 

// ... तुमचे बाकीचे जुने app.js मधील लॉजिक (PWA Service Worker, Splash Screen) इथे राहू द्या ...

// सिस्टीमचे मुख्य ग्लोबल स्टेट्स (Global Session States)
var states = {
    ug_pump: false, 
    bw1_pump: false, 
    bw2_pump: false,
    valve_t1: false, 
    valve_t2: false, 
    valve_ug: false,
    sim_tanker: false, 
    motion_detected: false, 
    alarm_armed: false
};

// डॅशबोर्ड पूर्ण लोड झाल्यावर सर्व यंत्रणा सुरू करणे
window.onload = function() {
    // पंचांग फाईलमधील फंक्शन
    if (typeof initPanchang === "function") {
        initPanchang();
    }
    // वॉटर फाईलमधील फंक्शन
    if (typeof updateWaterFlowLogic === "function") {
        updateWaterFlowLogic();
    }
};
