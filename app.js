const callData = {
  meta: {
    callType: "HVAC heat-pump/gas replacement consultation",
    duration: "32:17",
    recording: "39472_N_Darner_Dr_2.m4a",
    customer: "Homeowner (N Darner Dr)",
    technician: "Name not stated on recording",
  },
  summary: [
    "Recording starts mid-visit: the tech has already diagnosed the system and jumps straight into equipment options.",
    "Four paths were pitched (like-for-like gas, higher efficiency gas, two heat pumps) with duct sealing, HERS testing, rebates, and warranty notes.",
    "Customer leans toward a quieter heat pump, wants pricing/financing and will review with spouse before deciding.",
  ],
  compliance: [
    {
      stage: "Introduction",
      status: "missing",
      notes:
        "No greeting, name, or company intro is captured; the call opens mid-sales conversation.",
      evidence: [
        "00:00:00 technician immediately explains why he took long and moves to options.",
        "Customer is never addressed by name on the recording.",
      ],
    },
    {
      stage: "Problem Diagnosis",
      status: "partial",
      notes:
        "Findings are referenced (41°F coil reading, 20° delta, mold/duct issues), but no on-call questioning or recap of homeowner concerns.",
      evidence: [
        "00:01:05 mentions below-freezing 41°F, 20° difference, warns efficiency will drop and notes mold issues.",
        "00:07:26 says the home would not pass a HERS test due to ducting/insulation condition.",
        "No explicit discovery questions or symptom recap are recorded.",
      ],
    },
    {
      stage: "Solution Explanation",
      status: "pass",
      notes:
        "Clear description of four equipment options, scope of work, refrigerant change, warranties, brand/tech differences, and install timelines.",
      evidence: [
        "00:02:27 outlines like-for-like replacement (new furnace/coil/condenser, higher SEER, R32 refrigerant).",
        "00:09:38 explains inverter heat pump behavior and efficiency (~60% utility savings).",
        "00:14:02 compares Bryant vs Daikin/Bosch on defrost cycles and reliability.",
      ],
    },
    {
      stage: "Upsell Attempts",
      status: "pass",
      notes:
        "Positions high-efficiency heat pumps, duct sealing promo, attic relocation, rebates, and financing; closes with a deposit ask.",
      evidence: [
        "00:11:06 highlights $1,800 line-set reuse credit plus SVCE/TECH rebates to favor heat pumps.",
        "00:15:33 pitches attic move/noise improvements and add-ons like grille swap.",
        "00:29:35 offers to waive repair if they sign, asks for $1,000 down or financing.",
      ],
    },
    {
      stage: "Maintenance Plan Offer",
      status: "partial",
      notes:
        "Mentions warranty alignment with a maintenance program but never outlines terms, pricing, or visit cadence.",
      evidence: [
        "00:09:10: “If you’re on this maintenance program with us, we match manufacturer warranties.”",
        "No details on what the plan includes or how to enroll.",
      ],
    },
    {
      stage: "Closing & Thank You",
      status: "partial",
      notes:
        "Attempts closing with financing/deposit and a 3-day right to cancel, but no formal thank-you or scheduled follow-up time.",
      evidence: [
        "00:29:35 proposes $1,000 down or financing and references the cancellation notice.",
        "00:29:42 customer asks for emailed estimates to review with spouse; no follow-up appointment is booked.",
        "Lacks a courteous wrap-up or recap of next steps.",
      ],
    },
  ],
  salesInsights: [
    {
      title: "Customer prefers heat pumps & quiet operation",
      detail:
        "Asked to focus on the two heat pump options and liked the idea of upward-venting Bosch units plus quieter operation (00:21:02, 00:29:26). Lead with acoustic data and a top-vent design to close.",
    },
    {
      title: "Financing drives the decision",
      detail:
        "Monthly payment breakdown was requested (00:25:23). Summarize the 60-month 5.99% and 12-month same-as-cash offers with total paid and prepayment details.",
    },
    {
      title: "Ducting/IAQ is an upsell path",
      detail:
        "Mold and leaky ducting are acknowledged; propose duct sealing/cleaning plus upgraded filtration and show a HERS-pass guarantee (00:01:39, 00:07:26).",
    },
    {
      title: "Attic relocation interest",
      detail:
        "Homeowner raised moving equipment to the attic for space/noise (00:15:05). Provide a priced attic package and note airflow changes and serviceability.",
    },
    {
      title: "Tighten early-call structure",
      detail:
        "Missed introduction and agenda. Future calls should open with names, permission, recap of findings, and a brief roadmap before pricing.",
    },
  ],
  actions: [
    "Email only the two heat pump estimates (Bryant vs Bosch) plus duct sealing/HERS/permit line items; remove gas options per the customer’s request.",
    "Attach a one-page financing summary with key monthly payments, same-as-cash path, and deposit policy.",
    "Share noise data (dB ratings) and airflow diagrams for top-vent vs side-vent units; include optional attic relocation pricing.",
    "Send rebate steps: SVCE needs full PG&E bill upload; TECH rebate requires HERS test—outline what the homeowner must do vs. what you handle.",
    "Book a follow-up call with both decision-makers within 24–48 hours to choose a unit and schedule install.",
  ],
  timeline: [
    {
      time: "00:01:05",
      label: "Diagnosis recap",
      detail: "Mentions 41°F reading, 20° delta, and ongoing mold/duct issues with expected efficiency drop.",
    },
    {
      time: "00:02:27",
      label: "Option 1: Like-for-like gas",
      detail: "New furnace/coil/condenser, R32 refrigerant, 15 SEER, standard filtration.",
    },
    {
      time: "00:07:26",
      label: "Ducting & HERS",
      detail: "Says current ducting/insulation would fail HERS; proposes duct sealing promo to qualify.",
    },
    {
      time: "00:11:06",
      label: "Rebates & credits",
      detail: "$1,800 line-set reuse, $2,500 SVCE, $1,500 TECH rebates; needs PG&E bill upload.",
    },
    {
      time: "00:14:10",
      label: "Heat pump brands",
      detail: "Compares Daikin vs Bryant vs Bosch; highlights Bryant defrost behavior and Bosch top-vent option.",
    },
    {
      time: "00:15:05",
      label: "Relocation discussion",
      detail: "Talks about moving system to attic vs garage, noise, airflow changes, and added cost (~$4K+).",
    },
    {
      time: "00:24:23",
      label: "Install duration",
      detail: "Heat pump 2–3 days; gas 1–2 days; duct sealing can add close to a day depending on crew size.",
    },
    {
      time: "00:25:23",
      label: "Financing options",
      detail: "120m at 8.99%, 180m at 9.99%, 12-month same-as-cash; explains 60m at ~5.99%.",
    },
    {
      time: "00:29:35",
      label: "Close attempt",
      detail: "Offers to waive repair, asks for $1,000 down or financing; reiterates 3-day cancellation.",
    },
  ],
  transcriptPath: "data/transcript_with_speakers.txt",
  transcriptJsonPath: "data/transcript_with_speakers.json",
  transcriptRawPath: "data/transcript_with_timestamps.txt",
  transcriptPreview:
    "[Transcript preview] 00:00:00-00:00:18 Technician: The reason that took so long is that I just kind of also built all your equipment options…",
};

const summaryList = document.getElementById("summary-list");
const metaCards = document.getElementById("meta-cards");
const complianceContainer = document.getElementById("compliance-items");
const insightsList = document.getElementById("insights-list");
const actionsList = document.getElementById("actions-list");
const timelineContainer = document.getElementById("timeline-items");
const transcriptBody = document.getElementById("transcript-body");
const transcriptStatus = document.getElementById("transcript-status");
const transcriptLinks = document.getElementById("transcript-links");
const speakerStatsEl = document.getElementById("speaker-stats");
const emotionCards = document.getElementById("emotion-cards");
const emotionPies = document.getElementById("emotion-pies");
const emotionModal = document.getElementById("emotion-modal");
const emotionModalClose = document.getElementById("emotion-modal-close");
const emotionModalBody = document.getElementById("emotion-modal-body");
const radarChartEl = document.getElementById("radar-chart");
let emotionData = null;

const statusLabels = {
  pass: "Pass",
  partial: "Partial",
  missing: "Missing",
};

const statusClass = {
  pass: "status-pass",
  partial: "status-partial",
  missing: "status-missing",
};

function renderSummary() {
  callData.summary.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    summaryList.appendChild(li);
  });
}

function renderMeta() {
  if (!metaCards) return;
  const entries = [
    { label: "Call Type", value: callData.meta.callType },
    { label: "Duration", value: callData.meta.duration },
    { label: "Recording", value: callData.meta.recording },
    { label: "Customer", value: callData.meta.customer },
  ];

  entries.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "meta-card";
    card.innerHTML = `<span class="label">${entry.label}</span><span class="value">${entry.value}</span>`;
    metaCards.appendChild(card);
  });
}

function renderCompliance() {
  callData.compliance.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-top">
        <span class="status-chip ${statusClass[item.status]}">${statusLabels[item.status]}</span>
      </div>
      <h3>${item.stage}</h3>
      <p>${item.notes}</p>
      <ul>${item.evidence.map((e) => `<li>${e}</li>`).join("")}</ul>
    `;
    complianceContainer.appendChild(card);
  });
}

function renderRadar() {
  if (!radarChartEl) return;
  const weight = { pass: 1, partial: 0.6, missing: 0.2 };
  const stages = callData.compliance.map((c) => ({
    label: c.stage,
    value: weight[c.status] || 0,
    status: c.status,
    notes: c.notes,
  }));
  const size = 320;
  const radius = 120;
  const center = size / 2;
  const angleStep = (2 * Math.PI) / stages.length;

  const points = stages.map((s, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const r = s.value * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");
  const axes = stages.map((s, i) => {
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
      label: s.label,
    };
  });

  radarChartEl.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(255,255,255,0.05)"/>
      ${[0.2,0.4,0.6,0.8,1].map((t)=>`<circle cx="${center}" cy="${center}" r="${radius*t}" fill="none" stroke="rgba(255,255,255,0.04)"/>`).join("")}
      ${axes.map(a=>`<line x1="${center}" y1="${center}" x2="${a.x}" y2="${a.y}" stroke="rgba(255,255,255,0.08)" />`).join("")}
      <polygon points="${polygon}" fill="rgba(124,123,255,0.35)" stroke="${"#7c7bff"}" stroke-width="2" />
      ${points.map((p,i)=>`<circle cx="${p.x}" cy="${p.y}" r="4" fill="#4fd1c5" data-idx="${i}" class="radar-point" />`).join("")}
      ${axes.map((a,i)=>`<text x="${a.x}" y="${a.y}" fill="#8ea0c2" font-size="11" text-anchor="middle" dy="${a.y<center?-6:14}">${stages[i].label}</text>`).join("")}
    </svg>
    <div class="radar-legend">
      ${stages.map((s,i)=>`<span class="legend-item" data-idx="${i}"><span class="legend-dot" style="background:${s.status==='pass'?'#22c55e':s.status==='partial'?'#f59e0b':'#f43f5e'}"></span>${s.label} (${s.status})</span>`).join("")}
    </div>
  `;

  radarChartEl.querySelectorAll("[data-idx]").forEach((el)=>{
    el.style.cursor="pointer";
    el.addEventListener("click", ()=>{
      const idx=Number(el.getAttribute("data-idx"));
      const s=stages[idx];
      alert(`${s.label}: ${s.status.toUpperCase()}\n\n${s.notes}`);
    });
  });
}

function renderInsights() {
  callData.salesInsights.forEach((insight) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${insight.title}:</strong> ${insight.detail}`;
    insightsList.appendChild(li);
  });
}

function renderActions() {
  callData.actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = action;
    actionsList.appendChild(li);
  });
}

function renderTimeline() {
  callData.timeline.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="timecode">${item.time}</div>
      <h3>${item.label}</h3>
      <p>${item.detail}</p>
    `;
    timelineContainer.appendChild(card);
  });
}

async function loadTranscript() {
  try {
    const res = await fetch(callData.transcriptPath);
    if (!res.ok) throw new Error("Could not load transcript");
    const text = await res.text();
    transcriptBody.textContent = text;
    transcriptStatus.textContent = `Loaded speaker-labeled transcript from ${callData.transcriptPath}`;
    await loadSpeakerStats();
  } catch (err) {
    transcriptBody.textContent = callData.transcriptPreview;
    transcriptStatus.textContent = `Transcript preview shown (open ${callData.transcriptPath} over http to load full text).`;
  }
}

async function loadSpeakerStats() {
  try {
    const res = await fetch(callData.transcriptJsonPath);
    if (!res.ok) throw new Error("JSON not found");
    const data = await res.json();
    const labels = Array.isArray(data) ? data : data.labels || [];
    const counts = labels.reduce(
      (acc, item) => {
        acc[item.speaker] = (acc[item.speaker] || 0) + 1;
        return acc;
      },
      {}
    );
    const tech = counts.Technician || 0;
    const cust = counts.Customer || 0;
    speakerStatsEl.textContent = `Segments labeled — Technician: ${tech} · Customer: ${cust}`;
  } catch (e) {
    speakerStatsEl.textContent = "";
  }
}

async function loadEmotion() {
  try {
    const res = await fetch("data/emotion_analysis.json");
    if (!res.ok) throw new Error("No emotion data");
    const data = await res.json();
    emotionData = data;
    const summary = data.summary || {};

    // Hide old list cards to keep the pie-focused layout clean
    if (emotionCards) {
      emotionCards.innerHTML = "";
      emotionCards.style.display = "none";
    }

    Object.entries(summary).forEach(([speaker, info]) => {
      const top = info.top_emotions || [];
      if (top.length) {
        renderPie(speaker, info);
      }
    });

    // Click handlers for chips
    emotionModalClose.addEventListener("click", closeEmotionModal);
    emotionModal.addEventListener("click", (e) => {
      if (e.target === emotionModal) closeEmotionModal();
    });
  } catch (e) {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<h3>Emotion data missing</h3><p class="section-note">Run scripts/emotion_analysis.py to generate data/emotion_analysis.json</p>`;
    emotionCards.appendChild(card);
  }
}

function renderPie(speaker, info) {
  const topEmotions = info.top_emotions || [];
  const total = topEmotions.reduce((acc, [, c]) => acc + c, 0);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  const colors = ["#7c7bff", "#4fd1c5", "#22c55e", "#f59e0b", "#f43f5e", "#8b5cf6"];

  const slices = topEmotions.map(([label, count], idx) => {
    const fraction = total ? count / total : 0;
    const length = fraction * circumference;
    const dasharray = `${length} ${circumference - length}`;
    const dashoffset = -offset;
    offset += length;
    return {
      label,
      count,
      color: colors[idx % colors.length],
      dasharray,
      dashoffset,
    };
  });

  const pie = document.createElement("div");
  pie.className = "card pie-card";
  pie.innerHTML = `
    <div class="pie-header">
      <div>
        <p class="eyebrow">Emotion</p>
        <h3>${speaker}</h3>
      </div>
      <div class="pie-center"></div>
    </div>
    <div class="pie-wrapper">
      <div class="donut" data-speaker="${speaker}">
        <svg viewBox="0 0 200 200" width="200" height="200" class="pie-chart">
          ${slices.map((s) => `
            <circle r="${radius}" cx="100" cy="100" fill="transparent"
              stroke="${s.color}" stroke-width="28"
              stroke-dasharray="${s.dasharray}" stroke-dashoffset="${s.dashoffset}"
              data-speaker="${speaker}" data-label="${s.label}" data-count="${s.count}" class="pie-slice" />
          `).join("")}
        </svg>
        <div class="donut-center">
          <div class="value">${total}</div>
          <div class="label">${topEmotions[0] ? topEmotions[0][0] : "Total"}</div>
        </div>
      </div>
      <div class="donut-legend">
        ${topEmotions.map(([label, count], idx) => `
          <span class="legend-item" data-speaker="${speaker}" data-label="${label}" data-count="${count}">
            <span class="legend-dot" style="background:${colors[idx % colors.length]}"></span>
            ${label} (${count})
          </span>
        `).join("")}
      </div>
    </div>
  `;
  emotionPies.appendChild(pie);

  const center = pie.querySelector(".donut-center");

  const setCenter = (label, count) => {
    center.innerHTML = `
      <div class="value">${count ?? total}</div>
      <div class="label">${label ?? "Total"}</div>
    `;
  };

  pie.querySelectorAll(".pie-slice, .legend-item").forEach((el) => {
    el.style.cursor = "pointer";
    el.addEventListener("mouseenter", () => {
      const lb = el.getAttribute("data-label");
      const ct = el.getAttribute("data-count");
      setCenter(lb, ct);
    });
    el.addEventListener("mouseleave", () => setCenter(null, null));
    el.addEventListener("click", () => {
      const sp = el.getAttribute("data-speaker");
      const lb = el.getAttribute("data-label");
      showEmotionModal(sp, lb);
    });
  });
  setCenter(null, null);
}

function showEmotionModal(speaker, label) {
  if (!emotionData || !emotionData.by_speaker) return;
  const safeLabel = label || "All";
  const entries = (emotionData.by_speaker[speaker] || []).filter(
    (e) => !label || e.top_label === label
  );
  const fmt = (s) => {
    const sec = Number(s) || 0;
    const m = Math.floor(sec / 60);
    const r = Math.round(sec % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${r}`;
  };
  const html =
    `<h3>${speaker} — ${safeLabel}</h3>` +
    (entries.length
      ? entries
          .slice(0, 8)
          .map((e) => {
            const start = Number(e.start || 0).toFixed(2);
            const end = Number(e.end || 0).toFixed(2);
            const dur = (Number(end) - Number(start)).toFixed(2);
            const audioSrc = `39472_N_Darner_Dr_2.m4a#t=${start},${end}`;
            return `<div class="modal-sample">
              <p><strong>${fmt(start)} → ${fmt(end)} (${dur}s)</strong></p>
              <p>${e.text}</p>
              <audio controls src="${audioSrc}" data-start="${start}" data-end="${end}"></audio>
            </div>`;
          })
          .join("")
      : "<p>No samples found.</p>");
    emotionModalBody.innerHTML = html;
  emotionModal.classList.add("show");

  // Ensure playback stops at the designated end time
  emotionModalBody.querySelectorAll("audio").forEach((audio) => {
    const start = parseFloat(audio.dataset.start || "0");
    const end = parseFloat(audio.dataset.end || "0");
    const setStartOnce = () => {
      if (!Number.isNaN(start)) {
        audio.currentTime = start;
      }
      audio.removeEventListener("play", setStartOnce);
    };
    audio.addEventListener("play", setStartOnce);
    audio.addEventListener("timeupdate", () => {
      if (!Number.isNaN(end) && audio.currentTime >= end) {
        audio.pause();
        audio.currentTime = start;
      }
    });
  });
}

function closeEmotionModal() {
  emotionModal.classList.remove("show");
  emotionModalBody.innerHTML = "";
}

renderSummary();
renderMeta();
renderCompliance();
renderInsights();
renderActions();
renderTimeline();
loadTranscript();
loadEmotion();
renderRadar();
