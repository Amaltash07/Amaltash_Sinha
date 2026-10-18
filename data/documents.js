/* ============ DOCUMENTS (GDD / LDD) ============
 docId = the long code in your Google Doc link:
   https://docs.google.com/document/d/ THIS_PART /edit
 Set the doc to "Anyone with the link can view". Leave docId "" for "coming soon".
 url = a direct PDF link (use this OR docId).  type: "GDD" | "LDD" | "Breakdown"      status: "Complete" | "In progress"              */
window.DOCUMENTS = [
  { id: "tag-gdd", type: "GDD", title: "T.A.G Game Design Document", status: "Complete", desc: "Core loop, chase and evade mechanics, and difficulty scaling.", url: "https://991a5f19-9184-46d4-889e-d1ac6784f200.filesusr.com/ugd/e393a4_14f4fca26a43444ea7fb35e3ec807133.pdf", docId: "" },
  { id: "wedding-gdd", type: "GDD", title: "Wedding of the Dragons Game Design Document", status: "Complete", desc: "Systems, narrative, and quest design.", url: "https://991a5f19-9184-46d4-889e-d1ac6784f200.filesusr.com/ugd/e393a4_b3541bce21f647c9804f40c47a86f3a0.pdf", docId: "" },
  { id: "halo-breakdown", type: "Breakdown", title: "HALO Breakdown", status: "Complete", desc: "A design analysis of Halo.", url: "https://991a5f19-9184-46d4-889e-d1ac6784f200.filesusr.com/ugd/e393a4_711b637b488f4dc69b95e473721a3b3c.pdf", docId: "" },
  { id: "outer-wilds-breakdown", type: "Breakdown", title: "Outer Wilds Breakdown", status: "Complete", desc: "A design analysis of Outer Wilds.", url: "https://991a5f19-9184-46d4-889e-d1ac6784f200.filesusr.com/ugd/e393a4_c534d24f36e441cc9a968140a16d1b67.pdf", docId: "" },
  { id: "fortress-merger-breakdown", type: "Breakdown", title: "Fortress Merger Breakdown", status: "Complete", desc: "A design analysis of Fortress Merger.", url: "https://991a5f19-9184-46d4-889e-d1ac6784f200.filesusr.com/ugd/e393a4_8528970a2e0d4894b7fb9cfa3cba66a1.pdf", docId: "" },
  // type "GDD" = Game Design Document, "LDD" = Level Design Document, "Breakdown" = analysis of a game.
  // Level design documents (LDD): add yours here, e.g. { id:"x", type:"LDD", title:"...", status:"In progress", desc:"...", docId:"GOOGLE_DOC_ID" }
];
