// =========================================================
// app.js : Global Initialization & Master Control
// =========================================================

const GAS_URL = "https://script.google.com/macros/s/AKfycbzhRahy5y9o_ln7rkfkDsNy5HUao0wb1uajESoK5sh8Fo5wzCF9LRRqSk1rmENlXTihPA/exec"; 

// सिस्टीमचे मुख्य ग्लोबल स्टेट्स
var states = {
    ug_pump: false, 
    bw1_pump: false, 
    bw2_pump: false,
    valve_t1: false, 
    valve_t2: false, 
    valve_ug: false,
    sim_tanker: false
};

// १. डॅशबोर्ड पूर्ण लोड झाल्यावर प्राथमिक यंत्रणा सुरू करणे
window.onload = function() {
    
    // पंचांग सुरू करणे
    if (typeof initPanchang === "function") {
        initPanchang();
    }
    
    // वॉटर फ्लो सुरू करणे
    if (typeof updateWaterFlowLogic === "function") {
        updateWaterFlowLogic();
    }

    // स्प्लॅश स्क्रीन लपवणे (३ सेकंदांनंतर)
    setTimeout(() => {
        const splash = document.getElementById('customSplashScreen');
        if(splash) {
            splash.style.opacity = '0'; 
            setTimeout(() => { splash.style.display = 'none'; }, 500);
        }
    }, 3000);
};

// २. PWA (Service Worker) आणि इन्स्टॉल लॉजिक
let deferredPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker Registered Successfully!'))
            .catch(err => console.error('Service Worker Registration Failed:', err));
    });
}

// कस्टम इन्स्टॉल पॉप-अप दाखवणे
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); 
    deferredPrompt = e; 
    document.getElementById('installOverlay').style.display = 'flex'; 
});

// इव्हेंट लिसनर्स (बटन्ससाठी)
document.addEventListener("DOMContentLoaded", function() {
    
    // इन्स्टॉल बटण
    document.getElementById('installBtn').addEventListener('click', async () => {
        document.getElementById('installOverlay').style.display = 'none';
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            deferredPrompt = null;
        }
    });

    // नंतर करेन बटण
    document.getElementById('closeInstallBtn').addEventListener('click', () => {
        document.getElementById('installOverlay').style.display = 'none';
    });

    // ब्राउझर बंद करा बटण
    document.getElementById('closeBrowserBtn').addEventListener('click', () => {
        window.close();
    });
});

// इन्स्टॉल झाल्यानंतरची कृती
window.addEventListener('appinstalled', () => {
    document.getElementById('installOverlay').style.display = 'none';
    document.getElementById('postInstallScreen').style.display = 'flex';
    setTimeout(() => { window.close(); }, 2000);
});
