const TEXT = {
    giftHint: "Click to open po baby^^",
    monthsTitle: "Memories of every month for us!!!!!",
    monthsSub: "This has been a very memorable year for us baby, and I cherish every single second that I got to spend alongside you, so I decided to compile our memories for each month we spent together^^",
    notePlaceholder: "[Your note image goes here]",
    photoPlaceholder: "[Photo]",

    noteTitle: "[Note heading]",
    noteParagraphs: [
        "[First paragraph of your note.]",
        "[Second paragraph. Add or remove lines as you like.]"
    ],

    noteSign: "[Your Name]"
}; 

const MONTH_NAMES = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"
];

const MONTHS = MONTH_NAMES.map((name) => ({
    title: name, 

    photos: Array.from({length: 10}, (_, p) => ({
        src: "", //photos path here 
        caption: `[Caption ${p+1} heading]`,
        details: [
            "[First paragraph of details. Replace with your own text.]",
            "[Second paragraph of details. Add or remove paragraphs as you like.]"
        ]
    }))
}));


const $ = (id) => document.getElementById(id); 

const RATIOS = [
    "4/5", "1/1", "5/4", "3/4", "1/1",
    "4/5", "5/4", "3/4", "1/1", "4/5"
];


function show(screenId) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
    });

    $(screenId).classList.add("active"); 
    window.scrollTo(0,0);
}

function picHTML(src, ratio, label) {
    if (src) {
        return `<img class="pic" src="${src}" alt="" style="aspect-ratio:${ratio}">`;
    }

    return `<div class="pic ph" style="aspect-ratio:${ratio}">${label}</div>`;
}

$("giftHint").textContent = TEXT.giftHint; 

$("noteTitle").textContent = TEXT.noteTitle;
$("noteText").innerHTML = TEXT.noteParagraphs.map((text) => `
    <p>${text}</p>
`).join("");

$("noteSign").textContent = TEXT.noteSign;

$("boxBtn").addEventListener("click", (e) => {
    const box = e.currentTarget; 

    if (box.classList.contains("open")) return; 

    box.classList.add("open");

    setTimeout(() => {
        $("noteOverlay").classList.add("show");
    }, 1300);
});

$("noteClose").addEventListener("click", () => {
    $("noteOverlay").classList.remove("show");
    show("months");
});

$("monthsTitle").textContent = TEXT.monthsTitle; 
$("monthsSub").textContent = TEXT.monthsSub; 

$("monthList").innerHTML = MONTHS.map((month, i) => `
    <button class="month" data-i="${i}">
        <b>${i+1}</b> 
        <span>${month.title}</span> 
    </button>
`).join("");

$("monthList").addEventListener("click", (e) => {
    const button = e.target.closest(".month");
    if (button) {
        openMonth(Number(button.dataset.i));
    }
});

let current = 0;

function openMonth(index) {
    current = index; 
    const month = MONTHS[index]; 

    $("monthHeading").textContent = month.title;  

    $("wall").innerHTML = month.photos.map((photo, k) => `
        <button class="photo" data-k="${k}"> 
            ${picHTML(photo.src, RATIOS[k % RATIOS.length], TEXT.photoPlaceholder)}

            <div class="cap">${photo.caption}</div>
        </button>
    `).join("");

    show("photos");
}

$("backBtn").addEventListener("click", () => {
    show("months"); 
}); 

$("wall").addEventListener("click", (e) => {
    const button = e.target.closest(".photo"); 

    if (button) {
        openPhoto(Number(button.dataset.k));
    }
});

function openPhoto(index) {
    const photo = MONTHS[current].photos[index]; 

    $("lbBody").innerHTML = `
        ${picHTML(photo.src, "4/5", TEXT.photoPlaceholder)}
        <h2>${photo.title}</h2>
        ${photo.details.map((text) => `<p>${text}</p>`).join("")}
    `;

    $("lightbox").scrollTop = 0; 
    $("lightbox").classList.add("show"); 
    document.body.style.overflow = "hidden";
}

function closePhoto() {
    $("lightbox").classList.remove("show"); 
    document.body.style.overflow = "";
}

$("lbClose").addEventListener("click", closePhoto); 

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePhoto();
    }
});