// =========================================================
// water.js : वॉटर टँक, पंप आणि वाल्व्ह सिम्युलेशन
// =========================================================

// १. पंप ऑन/ऑफ करणे आणि लाईट इंडिकेटर चमकावणे
function togglePump(pump, state) {
    states[pump + '_pump'] = state; // states ऑब्जेक्ट app.js मधून येतो
    
    document.getElementById(`light_${pump}_on`).classList.toggle('active', state);
    document.getElementById(`light_${pump}_off`).classList.toggle('active', !state);
    
    updateWaterFlowLogic();
}

// २. वाल्व्ह फिरवणे (SVG Rotation 90 Deg)
function toggleValve(valve) {
    states['valve_' + valve] = !states['valve_' + valve];
    const is_on = states['valve_' + valve];
    
    document.getElementById(`handle_${valve}`).style.transform = is_on ? "rotate(90deg)" : "rotate(0deg)";
    
    const statusTxt = document.getElementById(`status_${valve}`);
    statusTxt.innerText = is_on ? "ON" : "OFF";
    statusTxt.style.color = is_on ? "#2ecc71" : "#e74c3c";
    
    updateWaterFlowLogic();
}

// ३. वॉटर फ्लो आणि ॲनिमेशन मॅनेजमेंट
function updateWaterFlowLogic() {
    
    // टँकरचा चेकबॉक्स तपासणे
    const simTankerBox = document.getElementById("simTanker");
    if(simTankerBox) {
        states.sim_tanker = simTankerBox.checked;
    }
    
    const anyPumpOn = states.ug_pump || states.bw1_pump || states.bw2_pump;
    const anyBorewellOn = states.bw1_pump || states.bw2_pump;
    
    // वरची टाकी १ प्रवाह
    const t1_pouring = states.valve_t1 && anyPumpOn;
    document.getElementById("stream_t1").style.display = t1_pouring ? "block" : "none";
    toggleRipples("wave_t1", t1_pouring);

    // वरची टाकी २ प्रवाह
    const t2_pouring = states.valve_t2 && anyPumpOn;
    document.getElementById("stream_t2").style.display = t2_pouring ? "block" : "none";
    toggleRipples("wave_t2", t2_pouring);

    // भूमिगत टाकी बोअरवेल प्रवाह
    const ug_bw_pouring = states.valve_ug && anyBorewellOn;
    document.getElementById("stream_ug_bw").style.display = ug_bw_pouring ? "block" : "none";
    
    // भूमिगत टाकी टँकर प्रवाह
    document.getElementById("stream_ug_tk").style.display = states.sim_tanker ? "block" : "none";
    
    const ug_any_pouring = ug_bw_pouring || states.sim_tanker;
    toggleRipples("wave_ug", ug_any_pouring);

    // गार्डन स्प्रिंकलर (जेव्हा पंप ऑन असतो पण दोन्ही वाल्व्ह बंद असतात)
    const garden_active = states.ug_pump && !states.valve_t1 && !states.valve_t2;
    document.getElementById("stream_garden").style.display = garden_active ? "block" : "none";
}

// ४. पाण्याच्या लाटांचे ॲनिमेशन नियंत्रित करणे
function toggleRipples(waveId, isPouring) {
    const wave = document.getElementById(waveId);
    if(wave) {
        if (isPouring) {
            wave.className = "wave-animated";
            wave.style.display = "block";
        } else {
            wave.className = "wave-static";
            wave.style.display = "block";
        }
    }
}
