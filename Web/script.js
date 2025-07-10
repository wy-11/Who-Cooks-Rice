window.addEventListener("pywebviewready", async () => {
    console.log("✅ pywebview is ready.");
    document.getElementById("bg-music").play().catch(err => {
        console.log("🔇 Autoplay blocked.")
    })
    const hasCookers = await window.pywebview.api.has_cookers();
    console.log("Have saved cookers?", hasCookers);
    if (hasCookers) {
        document.getElementById("reset-section").style.display = "block";
        document.getElementById("setup-section").style.display = "none";
        document.getElementById("name-section").style.display = "none";
        document.getElementById("start-section").style.display = "block";
        document.getElementById("result-section").style.display = "none";
    }
    else {
        document.getElementById("reset-section").style.display = "none";
        document.getElementById("setup-section").style.display = "block";
        document.getElementById("name-section").style.display = "none";
        document.getElementById("start-section").style.display = "none";
        document.getElementById("result-section").style.display = "none";
    }
});

function confirmCount() {
    const count = parseInt(document.getElementById("cookers-count").value);
    const nameSection = document.getElementById("name-section");
    nameSection.innerHTML = "";
    document.getElementById("reset-section").style.display = "block";
    document.getElementById("setup-section").style.display = "none";
    document.getElementById("name-section").style.display = "block";
    document.getElementById("start-section").style.display = "none";
    document.getElementById("result-section").style.display = "none";
    for (let i = 0; i < count; i++) {
        const div = document.createElement("div");
        div.className = "cooker-names";
        div.innerHTML = `
            <label for="cooker-name-${i}">Cooker ${i + 1}: </label>
            <input id="cooker-name-${i}" name="cooker-name-${i}" type="text" required>
        `;
        nameSection.appendChild(div);
    }
    const addNameButton = document.createElement("button");
    addNameButton.innerText = "✅ OK";
    addNameButton.onclick = confirmName;
    nameSection.appendChild(addNameButton);
}

async function confirmName() {
    const nameInputs = document.querySelectorAll('[id^="cooker-name-"]');
    let hasEmpty = false;
    for (const i of nameInputs) {
        const name = i.value.trim();
        if (name) {
            i.classList.remove("input-error");
        }
        else {
            i.classList.add("input-error");
            hasEmpty = true;
        }
    }
    if (hasEmpty) {
        return;
    }
    for (const i of nameInputs) {
        const name = i.value.trim();
        await window.pywebview.api.add_cooker(name);
    }
    document.getElementById("name-section").style.display = "none";
    document.getElementById("reset-section").style.display = "block";
    document.getElementById("start-section").style.display = "block";
}

async function decideCooker() {
    const result = await window.pywebview.api.decide_next_cooker();
    document.getElementById("reset-section").style.display = "block";
    document.getElementById("start-section").style.display = "none";
    document.getElementById("result-section").style.display = "block";
    const resultBox = document.getElementById("result-section");
    resultBox.innerHTML = `
        <h2>👨‍🍳 <span style="color: #f5c518">${result}</span> cooks the rice today! 🎉</h2>
    `;
}

function resetAll() {
    document.getElementById("reset-popup").style.display = "flex";
    document.body.style.overflow = "hidden";
}

async function confirmReset() {
    await window.pywebview.api.reset_data();
    document.body.style.overflow = "auto";
    document.getElementById("cookers-count").value = 2;
    document.getElementById("reset-section").style.display = "none";
    document.getElementById("setup-section").style.display = "block";
    document.getElementById("name-section").style.display = "none";
    document.getElementById("start-section").style.display = "none";
    document.getElementById("result-section").style.display = "none";
    document.getElementById("reset-popup").style.display = "none";
}

function cancelReset() {
    document.getElementById("reset-popup").style.display = "none";
    document.body.style.overflow = "auto";
}