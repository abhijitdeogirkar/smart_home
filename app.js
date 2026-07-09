// सिस्टीमचे मुख्य ग्लोबल स्टेट्स (Global Session States)
let states = {
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
    initPanchang();
    updateWaterFlowLogic();
};
