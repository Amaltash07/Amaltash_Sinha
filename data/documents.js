/* ============ DOCUMENTS (GDD / LDD) ============
 docId = the long code in your Google Doc link:
   https://docs.google.com/document/d/ THIS_PART /edit
 Set the doc to "Anyone with the link can view". Leave docId "" for "coming soon".
 type: "GDD" | "LDD" | "Other"      status: "Complete" | "In progress"              */
window.DOCUMENTS = [
  { id: "ruins-ldd", type: "LDD", title: "Ruins of the Forgotten — Level Design Document", status: "In progress",
    desc: "Layout, pacing beats, encounter breakdown, and blockout notes.", docId: "" },
  { id: "dragons-gdd", type: "GDD", title: "Wedding of the Dragons — Game Design Document", status: "In progress",
    desc: "Core pillars, world rules, characters, and systems.", docId: "" },
  { id: "rocket-gdd", type: "GDD", title: "Let the Rocket Fly — Game Design Document", status: "Complete",
    desc: "Core loop, controls, feedback, and difficulty curve.", docId: "" }
];
