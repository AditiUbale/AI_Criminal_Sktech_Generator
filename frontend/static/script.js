document.getElementById("date").innerHTML =
    new Date().toLocaleDateString();

let currentImage = null;

const API_URL =
    "https://smoking-unworldly-net.ngrok-free.dev/generate";

async function generateSketch() {

    const btn = document.querySelector("button");

    btn.disabled = true;
    btn.innerText = "Generating Sketch...";

    try {

        const description =
            document.getElementById("description").value.trim();

        if (!description) {
            alert("Please enter witness description.");
            return;
        }

        console.log("Sending request to backend...");

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description
            })
        });

        console.log("Response Status:", response.status);

        if (!response.ok) {

            const errorText = await response.text();

            console.error("Backend Error:", errorText);

            throw new Error(
                "Server Error: " + response.status
            );
        }

        const data = await response.json();

        console.log("Response Data:", data);

        if (data.error) {
            alert(data.error);
            return;
        }

        currentImage =
            "data:image/png;base64," + data.image;

        const img =
            document.getElementById("generatedImage");

        img.src = currentImage;
        img.style.display = "block";

        document.getElementById("placeholder")
            .style.display = "none";

        alert("Sketch generated successfully!");

    }
    catch (error) {

        console.error(error);

        alert(
            "Generation failed.\n\nCheck Browser Console (F12) for details."
        );

    }
    finally {

        btn.disabled = false;
        btn.innerText = "Generate Sketch";

    }
}

function downloadSketch() {

    if (!currentImage) {

        alert("Generate a sketch first!");

        return;
    }

    const link = document.createElement("a");

    link.href = currentImage;

    link.download =
        "forensic_sketch_" + Date.now() + ".png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
}

function saveCase() {

    const notesBox =
        document.querySelector(".notes textarea");

    const caseData = {

        description:
            document.getElementById("description").value,

        notes:
            notesBox ? notesBox.value : "",

        date:
            new Date().toLocaleString()
    };

    localStorage.setItem(
        "criminal_case_" + Date.now(),
        JSON.stringify(caseData)
    );

    alert("Case saved successfully!");
}

function clearForm() {

    document.getElementById("description").value = "";

    const notes =
        document.querySelector(".notes textarea");

    if (notes) {
        notes.value = "";
    }

    const img =
        document.getElementById("generatedImage");

    img.src = "";

    img.style.display = "none";

    document.getElementById("placeholder")
        .style.display = "block";

    currentImage = null;

    alert("Form cleared.");
}
