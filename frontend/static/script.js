document.getElementById("date").innerHTML =
new Date().toLocaleDateString();

let currentImage = null;

async function generateSketch() {

    const btn = document.querySelector("button");

    btn.disabled = true;
    btn.innerText = "Generating...";

    try {

        const description =
            document.getElementById("description").value;

        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                description: description
            })
        });

        const data = await response.json();

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

    }
    catch (error) {

        console.error(error);
        alert("Generation failed.");

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
        "criminal_sketch_" + Date.now() + ".png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveCase() {

    const caseData = {
        description:
            document.getElementById("description").value,
        notes:
            document.querySelector(".notes textarea").value,
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
}