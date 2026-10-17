/* ============ PROJECTS — copy one block to add a project ============
 layout: "gallery" (screenshot-led) | "story" (big image + text sections) | "docs" (documentation-led)
 Try each on the sample projects and keep the one you like.
 images: put files in assets/images/ and list them: ["assets/images/ruins-1.jpg"]
 kind: "Professional" | "Team" | "Game Jam" | "Personal"                                  */
window.PROJECTS = [
  {
    id: "ruins-of-the-forgotten",
    title: "Ruins of the Forgotten",
    year: "2026", kind: "Personal",
    roles: ["Game Designer", "Level Designer"],
    engine: "Unreal Engine", team: "Solo", duration: "8 weeks",
    layout: "gallery",
    cover: "",                         // e.g. "assets/images/ruins-cover.jpg"
    summary: "A carved-stone environment built around discovery, spatial readability, and a clear player journey.",
    problem: "Add: the design problem you set out to solve.",
    solution: "Add: how your layout, pacing, and encounters solved it.",
    learned: "Add: what you learned or would change.",
    images: [],                        // add screenshots / GIFs
    video: "",                         // YouTube embed link, e.g. "https://www.youtube.com/embed/XXXX"
    docs: ["ruins-ldd"],               // document ids from data/documents.js
    links: [{ label: "Play / Download", url: "" }]
  },
  {
    id: "wedding-of-the-dragons",
    title: "Wedding of the Dragons",
    year: "2025", kind: "Team",
    roles: ["Game Designer", "Level Designer"],
    engine: "Unity", team: "Add team size", duration: "Add duration",
    layout: "story", cover: "",
    summary: "A Nordic fantasy adventure shaped by character, conflict, and environmental storytelling.",
    problem: "Add the problem.", solution: "Add the solution.", learned: "Add the lesson.",
    images: [], video: "", docs: ["dragons-gdd"], links: []
  },
  {
    id: "let-the-rocket-fly",
    title: "Let the Rocket Fly",
    year: "2024", kind: "Game Jam",
    roles: ["Game Designer", "Level Designer"],
    engine: "Unity", team: "Add team size", duration: "48 hours",
    layout: "docs", cover: "",
    summary: "A focused hypercasual concept exploring simple controls, quick feedback, and replayable challenge.",
    problem: "Add the problem.", solution: "Add the solution.", learned: "Add the lesson.",
    images: [], video: "", docs: ["rocket-gdd"], links: [{ label: "itch.io page", url: "https://droanzer.itch.io/" }]
  }
];
