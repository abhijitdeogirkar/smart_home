// सोलर डेटा आणणे आणि अपडेट करणे (Streamlit कॅल्क्युलेशन्ससह)
async function fetchSolarData(userPin) {
    const solarStatus = document.getElementById('solarStatus');
    const liveSolarGen = document.getElementById('liveSolarGen');
    const todaySolarGen = document.getElementById('todaySolarGen');
    const solarBadge = document.getElementById('solarBadge');
    const line1 = document.getElementById('solar_line1');
    const line2 = document.getElementById('solar_line2');
    const cardBox = document.getElementById('solarCardBox');

    try {
        solarStatus.innerText = "सोलर डेटा आणत आहे...";
        solarStatus.style.color = "#f57c00";

        let response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: "read_solar", pin: userPin })
        });
        
        let result = await response.json();
        
        if (result.status === "success") {
            let rawPower = result.data.generationPower; 
            let totalEnergy = result.data.generationTotal;

            // १. मुख्य निर्मिती आकडेवारी
            liveSolarGen.innerText = (rawPower !== null && rawPower > 0) ? (rawPower / 1000).toFixed(2) + " kW" : "0.00 kW";
            todaySolarGen.innerText = (totalEnergy !== null) ? (totalEnergy / 1000).toFixed(1) + " kWh" : "0.0 kWh";

            // २. ॲनिमेशन आणि लाईव्ह स्टेटस लॉजिक
            if (rawPower > 0) {
                cardBox.style.animation = "sunGlow 3s infinite";
                line1.classList.add("flow-animated");
                line2.classList.add("flow-animated");
                
                solarStatus.innerText = "🟢 सौर ऊर्जेची निर्मिती सुरू आहे (Live)";
                solarStatus.style.color = "#2e7d32";
                
                solarBadge.innerText = "🟢 LIVE DATA";
                solarBadge.style.backgroundColor = "#4CAF50";
            } else {
                cardBox.style.animation = "none";
                cardBox.style.border = "1px solid #ccc";
                line1.classList.remove("flow-animated");
                line2.classList.remove("flow-animated");
                line1.style.backgroundColor = "#bdc3c7";
                line2.style.backgroundColor = "#bdc3c7";
                
                solarStatus.innerText = "🔴 सौर निर्मिती सध्या 0 W आहे / स्लीप मोड";
                solarStatus.style.color = "#c62828";
                
                solarBadge.innerText = "🌙 OFFLINE / 0W";
                solarBadge.style.backgroundColor = "#7f8c8d";
            }

            // ३. स्टॅटिस्टिक्स लॉजिक (Running Days, Profit, Trees)
            let startDate = new Date(1721561718 * 1000); // 21 जुलै 2024
            let runningDays = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24));
            
            document.getElementById('statDays').innerText = runningDays;
            if(totalEnergy !== null) {
                document.getElementById('statProfit').innerText = Math.floor(totalEnergy * 7.5).toLocaleString('en-IN');
                document.getElementById('statMwh').innerText = (totalEnergy / 1000).toFixed(2);
                document.getElementById('statCo2').innerText = (totalEnergy * 0.000793).toFixed(2);
                document.getElementById('statTrees').innerText = Math.floor((totalEnergy * 0.997) / 18.3);
            }

        } else {
            console.error("API Error:", result.message);
            solarStatus.innerText = "🔴 API एरर";
            solarStatus.style.color = "#d32f2f";
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        solarStatus.innerText = "🔴 सर्व्हरशी संपर्क तुटला";
        solarStatus.style.color = "#d32f2f";
    }
}
