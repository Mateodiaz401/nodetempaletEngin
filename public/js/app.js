document.addEventListener("click", (e) => {
    if (e.target.dataset.short) {
        const url = `http://localhost:3000/${e.target.dataset.short}`;
        console.log(url);
        navigator.clipboard
            .writeText(url)
            .then(() => {
                console.log("Text copied to clipboard...");
            })
            .catch((err) => {
                console.log("Something went wrong", err);
            });
    }
});