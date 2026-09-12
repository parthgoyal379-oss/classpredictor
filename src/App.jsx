import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, limit } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import Navbar from "./components/Navbar";
import Hero, { CREATOR_EMAIL } from "./components/Hero";
import NameModal from "./components/NameModal";
import StepProgress from "./components/StepProgress";
import StreamGoalStep from "./components/StreamGoalStep";
import ChapterRater from "./components/ChapterRater";
import ReportDashboard from "./components/ReportDashboard";
import AdminDashboard from "./components/AdminDashboard";
import FeedbackModal from "./components/FeedbackModal";
import LoadingScanner from "./components/LoadingScanner";
import CosmicCanvas from "./components/CosmicCanvas";
import CommandPalette from "./components/CommandPalette";
import LiveActivityToast from "./components/LiveActivityToast";
import { getSoundEnabled, setSoundEnabled } from "./utils/audio";

import { ADMIN_PASSWORD, STREAM_SUBJECTS, FOUNDATION } from "./data/chapters";
import { runAnalysis } from "./utils/analyzer";

// ─────────────────────────────────────────────────────────────
// FIREBASE + EMAILJS CONFIG
// ─────────────────────────────────────────────────────────────

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const EJS_SERVICE = import.meta.env.VITE_EJS_SERVICE;
const EJS_TEMPLATE = import.meta.env.VITE_EJS_TEMPLATE;
const EJS_PUBLIC = import.meta.env.VITE_EJS_PUBLIC;

export default function App() {
  const [step, setStep] = useState(0); // 0 = Landing, 0.5 = Name, 1 = Stream & Goal, 2 = Ratings, 3 = Results
  const [studentName, setStudentName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [stream, setStream] = useState(null);
  const [goal, setGoal] = useState(null);
  const [ratings, setRatings] = useState({});
  const [subIdx, setSubIdx] = useState(0);
  const [results, setResults] = useState(null);
  const [tab, setTab] = useState("report");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, text: "", submitted: false });
  const [statsData, setStatsData] = useState({ total: 0, responses: [], feedback: [] });
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(() => getSoundEnabled());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setSoundEnabledState(next);
  };

  // ── FIREBASE ACTIONS ──
  const loadStats = async () => {
    try {
      const rSnap = await getDocs(query(collection(db, "responses"), orderBy("date", "desc"), limit(50)));
      const fSnap = await getDocs(query(collection(db, "feedbacks"), orderBy("date", "desc"), limit(50)));
      const responses = rSnap.docs.map(d => d.data());
      const feedbackList = fSnap.docs.map(d => d.data());
      setStatsData({ total: responses.length, responses, feedback: feedbackList });
    } catch (e) {
      console.log("loadStats notice:", e);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const rSnap = await getDocs(query(collection(db, "responses"), orderBy("date", "desc"), limit(50)));
        const fSnap = await getDocs(query(collection(db, "feedbacks"), orderBy("date", "desc"), limit(50)));
        if (active) {
          const responses = rSnap.docs.map(d => d.data());
          const feedbackList = fSnap.docs.map(d => d.data());
          setStatsData({ total: responses.length, responses, feedback: feedbackList });
        }
      } catch (e) {
        console.log("Initial loadStats notice:", e);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const saveResponse = async (name, str, gl, riskStats) => {
    try {
      const entry = {
        name,
        stream: str,
        goal: gl,
        highRisk: riskStats.highCnt,
        medRisk: riskStats.medCnt,
        lowRisk: riskStats.lowCnt,
        date: new Date().toLocaleDateString("en-IN"),
        timestamp: Date.now(),
      };
      await addDoc(collection(db, "responses"), entry);
      setStatsData(s => ({ ...s, total: s.total + 1, responses: [entry, ...s.responses] }));

      if (EJS_SERVICE && EJS_TEMPLATE && EJS_PUBLIC) {
        emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
          student_name: name,
          stream: str,
          goal: gl,
          high_risk: riskStats.highCnt,
          med_risk: riskStats.medCnt,
          rating: "—",
          message: "New analysis completed on ClassPredictor",
          time: new Date().toLocaleString("en-IN"),
        }, EJS_PUBLIC).catch(e => console.log("EmailJS notice:", e));
      }
    } catch (e) {
      console.log("saveResponse notice:", e);
    }
  };

  const saveFeedback = async (name, rating, text) => {
    try {
      const entry = {
        name: name || "Anonymous Student",
        rating,
        text,
        date: new Date().toLocaleDateString("en-IN"),
        timestamp: Date.now(),
      };
      await addDoc(collection(db, "feedbacks"), entry);
      setStatsData(s => ({ ...s, feedback: [entry, ...s.feedback] }));

      if (EJS_SERVICE && EJS_TEMPLATE && EJS_PUBLIC) {
        emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
          student_name: name || "Anonymous",
          stream: stream || "—",
          goal: goal || "—",
          high_risk: "—",
          med_risk: "—",
          rating: `${rating}/5 stars`,
          message: text || "No comment provided",
          time: new Date().toLocaleString("en-IN"),
        }, EJS_PUBLIC).catch(e => console.log("EmailJS notice:", e));
      }
    } catch (e) {
      console.log("saveFeedback notice:", e);
    }
  };

  const subjects = STREAM_SUBJECTS[stream] || [];

  const { ratedCount, totalCount } = (() => {
    let r = 0;
    let t = 0;
    subjects.forEach(s => {
      const chs = FOUNDATION[s] || [];
      t += chs.length;
      chs.forEach(c => {
        if (ratings[c.id] != null) r++;
      });
    });
    return { ratedCount: r, totalCount: t };
  })();

  const rateChapter = (id, val) => setRatings(p => ({ ...p, [id]: val }));
  const pct = totalCount > 0 ? Math.round((ratedCount / totalCount) * 100) : 0;

  const handleStartAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      const r = runAnalysis(ratings, stream, goal);
      setResults(r);
      saveResponse(studentName, stream, goal, r.stats);
      setLoading(false);
      setStep(3);
      setTab("report");
      setTimeout(() => setShowFeedbackPopup(true), 8000);
    }, 1800);
  };

  const submitFeedback = () => {
    if (feedback.rating === 0) return;
    saveFeedback(studentName, feedback.rating, feedback.text);
    setFeedback(f => ({ ...f, submitted: true }));
  };

  const shareReport = () => {
    if (!results) return;
    const { stats } = results;
    const lines = [
      "ClassPredictor Diagnostic Intelligence Report",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Student: ${studentName}`,
      `Stream: ${stream} | Target Exam: ${goal}`,
      `Critical Risk Chapters: ${stats.highCnt}`,
      `Elevated Risk Chapters: ${stats.medCnt}`,
      `Optimal Baseline Chapters: ${stats.lowCnt}`,
      `Estimated Preparation Deficit: ~${stats.totalH} hours`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Engineered by Parth Goyal | ${CREATOR_EMAIL}`,
    ];
    if (navigator.clipboard) {
      navigator.clipboard.writeText(lines.join("\n"));
    }
  };

  const resetAll = () => {
    setStep(0);
    setStream(null);
    setGoal(null);
    setRatings({});
    setResults(null);
    setStudentName("");
    setNameInput("");
    setFeedback({ rating: 0, text: "", submitted: false });
    setShowFeedbackPopup(false);
  };

  // ── LOADING STATE ──
  if (loading) {
    return <LoadingScanner studentName={studentName} goal={goal} />;
  }

  // ── ADMIN VIEW ──
  if (showAdmin) {
    return (
      <div style={{ minHeight: "100vh", background: "#000000" }}>
        <Navbar
          step={step}
          onReset={() => setShowAdmin(false)}
          onOpenAdmin={() => setShowAdmin(true)}
        />
        <AdminDashboard
          statsData={statsData}
          onClose={() => {
            setShowAdmin(false);
            setAdminUnlocked(false);
            setAdminPass("");
          }}
          adminUnlocked={adminUnlocked}
          setAdminUnlocked={setAdminUnlocked}
          adminPass={adminPass}
          setAdminPass={setAdminPass}
          onUnlock={() => {
            if (adminPass === ADMIN_PASSWORD) {
              setAdminUnlocked(true);
              loadStats();
            } else {
              alert("Invalid security passphrase.");
            }
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000000", position: "relative" }}>
      {/* Cosmic Nebula & Shooting Meteor Canvas */}
      <CosmicCanvas />

      {/* Universal Top Navigation */}
      <Navbar
        step={step}
        onReset={resetAll}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenPalette={() => setIsPaletteOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container */}
      <main style={{ padding: "0 1.5rem" }}>
        {/* Step 0: Landing Hero */}
        {step === 0 && (
          <Hero onStart={() => setStep(0.5)} />
        )}

        {/* Step 0.5: Name Modal */}
        {step === 0.5 && (
          <NameModal
            nameInput={nameInput}
            setNameInput={setNameInput}
            onProceed={() => {
              if (nameInput.trim().length >= 2) {
                setStudentName(nameInput.trim());
                setStep(1);
              }
            }}
            onBack={() => setStep(0)}
          />
        )}

        {/* Step 1: Stream & Target Exam */}
        {step === 1 && (
          <div style={{ maxWidth: 840, margin: "2rem auto 0" }}>
            <StepProgress step={1} />
            <StreamGoalStep
              studentName={studentName}
              stream={stream}
              setStream={setStream}
              goal={goal}
              setGoal={setGoal}
              onBack={() => setStep(0.5)}
              onContinue={() => {
                setStep(2);
                setSubIdx(0);
              }}
            />
          </div>
        )}

        {/* Step 2: Rate Chapters */}
        {step === 2 && (
          <div style={{ maxWidth: 840, margin: "2rem auto 0" }}>
            <StepProgress step={2} />
            <ChapterRater
              studentName={studentName}
              subjects={subjects}
              subIdx={subIdx}
              setSubIdx={setSubIdx}
              ratings={ratings}
              onRate={rateChapter}
              onAnalyze={handleStartAnalysis}
              ratedCount={ratedCount}
              totalCount={totalCount}
              pct={pct}
              onBack={() => setStep(1)}
            />
          </div>
        )}

        {/* Step 3: Intelligence Report Results */}
        {step === 3 && results && (
          <div style={{ maxWidth: 940, margin: "2rem auto 0" }}>
            <StepProgress step={3} />
            <ReportDashboard
              studentName={studentName}
              stream={stream}
              goal={goal}
              results={results}
              ratings={ratings}
              tab={tab}
              setTab={setTab}
              onShare={shareReport}
              onReset={resetAll}
              feedback={feedback}
              setFeedback={setFeedback}
              onSubmitFeedback={submitFeedback}
              CREATOR_EMAIL={CREATOR_EMAIL}
            />
          </div>
        )}
      </main>

      {/* Floating feedback modal */}
      <FeedbackModal
        show={showFeedbackPopup}
        onClose={() => setShowFeedbackPopup(false)}
        feedback={feedback}
        setFeedback={setFeedback}
        onSubmit={submitFeedback}
      />

      {/* Cmd+K Global Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onStartAnalysis={() => {
          if (step === 0) setStep(0.5);
          else if (step === 3) setStep(1);
        }}
        onOpenAdmin={() => setShowAdmin(true)}
        onReset={resetAll}
        soundEnabled={soundEnabled}
        setSoundEnabledState={setSoundEnabledState}
      />

      {/* Live Social Proof Activity Ticker */}
      <LiveActivityToast />
    </div>
  );
}
