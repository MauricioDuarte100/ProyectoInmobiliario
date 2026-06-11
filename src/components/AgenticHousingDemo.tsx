import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  Brain,
  Home,
  Landmark,
  MapPinned,
  Building2,
  Handshake,
  FileText,
} from "lucide-react";
import { mockAgents, mockIntent, mockTranscript } from "../data/agenticDemoData";

const RECORDING_TO_PROCESSING_MS = 3300;
const PROCESSING_TO_TRANSCRIPT_MS = 5500;
const INTENT_TO_AGENTS_MS = 2100;
const AGENT_STEP_DELAY_MS = 1200;
const AGENT_COMPLETION_OFFSET_MS = 1700;
const RESULTS_OFFSET_MS = 2900;
const REPORT_OFFSET_MS = 4900;

type DemoStep =
  | "idle"
  | "recording"
  | "processing"
  | "transcribed"
  | "detecting-intent"
  | "agents-running"
  | "results"
  | "final-report";

type AgentStatus = "pending" | "running" | "completed";

export default function AgenticHousingDemo() {
  const [demoStep, setDemoStep] = useState<DemoStep>("idle");
  const [transcript, setTranscript] = useState("");
  const [agents, setAgents] = useState(
    mockAgents.map((agent) => ({
      ...agent,
      status: "pending" as AgentStatus,
      progress: 0,
    }))
  );

  const startAudioDemo = () => {
    setDemoStep("recording");
    setTranscript("");
    setAgents(
      mockAgents.map((agent) => ({
        ...agent,
        status: "pending" as AgentStatus,
        progress: 0,
      }))
    );

    setTimeout(() => {
      setDemoStep("processing");
    }, RECORDING_TO_PROCESSING_MS);

    setTimeout(() => {
      setTranscript(mockTranscript);
      setDemoStep("transcribed");
    }, PROCESSING_TO_TRANSCRIPT_MS);
  };

  const activateAgents = () => {
    setDemoStep("detecting-intent");

    setTimeout(() => {
      setDemoStep("agents-running");
      runAgentsSequence();
    }, INTENT_TO_AGENTS_MS);
  };

  const runAgentsSequence = () => {
    mockAgents.forEach((agent, index) => {
      setTimeout(() => {
        setAgents((prev) =>
          prev.map((item) =>
            item.id === agent.id
              ? { ...item, status: "running", progress: 45 }
              : item
          )
        );
      }, index * AGENT_STEP_DELAY_MS);

      setTimeout(() => {
        setAgents((prev) =>
          prev.map((item) =>
            item.id === agent.id
              ? { ...item, status: "completed", progress: 100 }
              : item
          )
        );
      }, index * AGENT_STEP_DELAY_MS + AGENT_COMPLETION_OFFSET_MS);
    });

    setTimeout(() => {
      setDemoStep("results");
    }, mockAgents.length * AGENT_STEP_DELAY_MS + RESULTS_OFFSET_MS);

    setTimeout(() => {
      setDemoStep("final-report");
    }, mockAgents.length * AGENT_STEP_DELAY_MS + REPORT_OFFSET_MS);
  };

  return (
    <section className="w-full rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/60">
      <div className="mb-8">
        <p className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          <Brain className="w-4 h-4" /> Motor Agentico Habitacional
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          CIM-IA interpreta una necesidad y coordina agentes especializados
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          El ciudadano expresa su necesidad por audio. CIM-IA transcribe,
          detecta intención y activa agentes para encontrar oportunidades,
          financiación, lotes, inmobiliarias y convenios.
        </p>
      </div>

      {demoStep === "idle" && (
        <div className="rounded-2xl bg-slate-50 p-6 flex flex-col items-center py-10">
          <p className="mb-6 text-slate-700">Demo MVP: audio y procesamiento simulados para presentación.</p>
          <button
            onClick={startAudioDemo}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            <Mic className="w-5 h-5" />
            Iniciar consulta por audio
          </button>
        </div>
      )}

      {demoStep === "recording" && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-blue-50 p-6"
        >
          <p className="font-semibold text-blue-900 flex items-center gap-2">
            <Mic className="w-5 h-5 animate-pulse text-red-500" /> Escuchando consulta...
          </p>
          <div className="mt-6 flex items-end gap-2 h-24 justify-center">
            {[30, 55, 38, 75, 45, 90, 62, 50, 80, 35, 60, 40].map((height, index) => (
              <motion.span
                key={index}
                animate={{ height: [height * 0.4, height, height * 0.4] }}
                transition={{ 
                  duration: 0.8, 
                  repeat: Infinity, 
                  delay: index * 0.1,
                  ease: "easeInOut"
                }}
                className="block w-3 rounded-full bg-blue-600"
                style={{ height: `${height}px` }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {demoStep === "processing" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-slate-50 p-6"
        >
          <p className="font-semibold text-slate-900 flex items-center gap-2">
            <Brain className="w-5 h-5 animate-pulse text-blue-600" /> Procesando audio...
          </p>
          <div className="mt-4 space-y-3 text-slate-700">
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              ✓ Audio recibido correctamente
            </motion.p>
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              ✓ Transcribiendo solicitud habitacional
            </motion.p>
            <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}>
              ✓ Extrayendo variables clave
            </motion.p>
          </div>
        </motion.div>
      )}

      {demoStep === "transcribed" && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <p className="text-sm font-semibold text-slate-600">
            Transcripción detectada
          </p>
          <p className="mt-3 text-lg text-slate-800 italic">“{transcript}”</p>

          <button
            onClick={activateAgents}
            className="mt-6 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 flex items-center gap-2"
          >
            <Brain className="w-5 h-5" />
            Activar agentes CIM-IA
          </button>
        </motion.div>
      )}

      {(demoStep === "detecting-intent" ||
        demoStep === "agents-running" ||
        demoStep === "results" ||
        demoStep === "final-report") && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <IntentDetectionPanel intent={mockIntent} />
        </motion.div>
      )}

      {(demoStep === "agents-running" ||
        demoStep === "results" ||
        demoStep === "final-report") && (
        <div className="mt-8">
          <AgenticRobotScene />

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 relative">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.12 }}
            >
              <AgentCard agent={agent} />
            </motion.div>
          ))}
          </div>
        </div>
      )}

      {(demoStep === "results" || demoStep === "final-report") && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <OpportunityResultsPanel />
        </motion.div>
      )}

      {demoStep === "final-report" && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FinalReportPanel />
        </motion.div>
      )}
    </section>
  );
}

function AgenticRobotScene() {
  const robots = [
    { id: "capture", x: 80, y: 92, color: "#3b82f6", label: "Captura" },
    { id: "intent", x: 210, y: 52, color: "#06b6d4", label: "Intencion" },
    { id: "core", x: 340, y: 88, color: "#2563eb", label: "CIM-IA" },
    { id: "supply", x: 470, y: 52, color: "#10b981", label: "Oferta" },
    { id: "route", x: 600, y: 92, color: "#8b5cf6", label: "Ruta" },
  ];

  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_36%),linear-gradient(135deg,#081120_0%,#13203e_45%,#0f172a_100%)] p-5 shadow-xl shadow-slate-300/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">
            Orquestacion visual
          </p>
          <h3 className="mt-2 !text-white text-2xl font-bold">
            Los agentes trabajan como una cuadrilla coordinada
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            Cada robot representa una tarea especializada. Cuando CIM-IA lanza la simulacion,
            el flujo va pasando por captura, intencion, oferta, credito y ruta recomendada.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-200">
          <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 backdrop-blur">
            Audio
          </span>
          <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-cyan-100">
            Analisis
          </span>
          <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-emerald-100">
            Match habitacional
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-[24px] border border-white/10 bg-slate-950/35 p-3 backdrop-blur-sm">
        <svg viewBox="0 0 680 170" className="h-auto w-full">
          <defs>
            <linearGradient id="agentBeam" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.2" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M80 92 C 135 40, 155 40, 210 52 S 290 95, 340 88 S 420 30, 470 52 S 555 122, 600 92"
            fill="none"
            stroke="url(#agentBeam)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <motion.circle
            cx="80"
            cy="92"
            r="4"
            fill="#7dd3fc"
            filter="url(#softGlow)"
            animate={{ cx: [80, 210, 340, 470, 600], cy: [92, 52, 88, 52, 92] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          />

          {robots.map((robot, index) => (
            <g key={robot.id} transform={`translate(${robot.x}, ${robot.y})`}>
              <motion.circle
                r="34"
                fill={robot.color}
                opacity="0.12"
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.1, 0.24, 0.1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.2 }}
              />
              <motion.g
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }}
              >
                <rect x="-18" y="-16" width="36" height="28" rx="11" fill="#e2e8f0" />
                <rect x="-11" y="-8" width="8" height="8" rx="3" fill={robot.color} />
                <rect x="3" y="-8" width="8" height="8" rx="3" fill={robot.color} />
                <rect x="-10" y="4" width="20" height="3" rx="2" fill="#1e293b" opacity="0.85" />
                <rect x="-14" y="-25" width="28" height="5" rx="2.5" fill="#94a3b8" />
                <line x1="0" y1="-20" x2="0" y2="-30" stroke="#cbd5e1" strokeWidth="2.5" />
                <circle cx="0" cy="-33" r="4.5" fill={robot.color} />
                <line x1="-22" y1="-2" x2="-32" y2="8" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <line x1="22" y1="-2" x2="32" y2="8" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <line x1="-8" y1="12" x2="-14" y2="24" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                <line x1="8" y1="12" x2="14" y2="24" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
              </motion.g>
              <text
                x="0"
                y="54"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="12"
                fontWeight="700"
                letterSpacing="0.4"
              >
                {robot.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function IntentDetectionPanel({ intent }: { intent: typeof mockIntent }) {
  return (
    <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 relative">
      <p className="flex items-center gap-2 text-sm font-semibold text-indigo-900">
        <Brain className="w-4 h-4" /> Intención detectada
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <InfoItem label="Intención" value={intent.intent} />
        <InfoItem label="Perfil" value={intent.profile} />
        <InfoItem label="Necesidad principal" value={intent.mainNeed} />
        <InfoItem label="Interés" value={intent.secondaryNeed} />
        <InfoItem label="Canal recomendado" value={intent.recommendedChannel} />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-100">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function AgentCard({ agent }: { agent: any }) {
  const isPending = agent.status === "pending";
  const isRunning = agent.status === "running";
  const isCompleted = agent.status === "completed";

  const getAgentIcon = (id: number) => {
    switch (id) {
      case 1: return <Home className="w-5 h-5" />;
      case 2: return <Landmark className="w-5 h-5" />;
      case 3: return <MapPinned className="w-5 h-5" />;
      case 4: return <Building2 className="w-5 h-5" />;
      case 5: return <Handshake className="w-5 h-5" />;
      case 6: return <FileText className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div
      className={`rounded-[26px] border p-5 shadow-sm transition-all duration-500 ${
        isRunning
          ? "border-blue-300 bg-[linear-gradient(180deg,rgba(219,234,254,0.9),rgba(239,246,255,0.95))] scale-[1.02] shadow-lg shadow-blue-200/50"
          : isCompleted
          ? "border-emerald-300 bg-[linear-gradient(180deg,rgba(220,252,231,0.95),rgba(240,253,244,0.98))] shadow-md shadow-emerald-100/50"
          : "border-slate-200 bg-white/90 opacity-70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`relative p-2.5 rounded-xl ${isRunning ? 'bg-blue-100 text-blue-700' : isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
            {isRunning && (
              <motion.span
                className="absolute inset-0 rounded-xl border border-blue-300"
                animate={{ scale: [1, 1.16, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
            )}
            {getAgentIcon(agent.id)}
          </div>
          <h3 className="font-bold text-slate-900">{agent.name}</h3>
        </div>

        <div className="text-xl flex-shrink-0">
          {isPending && <span className="text-slate-300">○</span>}
          {isRunning && (
            <motion.span 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="inline-block text-blue-500"
            >
              ◌
            </motion.span>
          )}
          {isCompleted && <span className="text-emerald-500">✓</span>}
        </div>
      </div>
      
      <p className="mt-4 text-sm text-slate-700 line-clamp-2">{agent.description}</p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <motion.div
          className={`h-full transition-all duration-700 ${
            isCompleted ? "bg-emerald-500" : "bg-blue-500"
          }`}
          style={{ width: `${agent.progress}%` }}
          animate={isRunning ? { opacity: [0.7, 1, 0.7] } : undefined}
          transition={isRunning ? { duration: 1.1, repeat: Infinity } : undefined}
        />
      </div>

      <p className="mt-4 h-5 text-sm font-medium text-slate-800">
        {isPending && "Pendiente de activación"}
        {isRunning && "Analizando información disponible..."}
        {isCompleted && <span className="text-emerald-700">{agent.result}</span>}
      </p>
    </div>
  );
}

function OpportunityResultsPanel() {
  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-600">
        Resultados consolidados
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-4">
        <ResultMetric value="3" label="Oportunidades compatibles" />
        <ResultMetric value="2" label="Inmobiliarias recomendadas" />
        <ResultMetric value="1" label="Convenio aplicable" />
        <ResultMetric value="1" label="Ruta habitacional generada" />
      </div>
    </div>
  );
}

function ResultMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5 text-center border border-slate-100 transition hover:border-blue-200 hover:bg-blue-50/50">
      <p className="text-3xl font-black text-slate-900">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-700">{label}</p>
    </div>
  );
}

function FinalReportPanel() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-[30px] border border-slate-700/70 bg-[linear-gradient(145deg,#081120_0%,#111c35_46%,#15264a_100%)] p-8 text-white shadow-2xl shadow-slate-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.16),transparent_28%)]"></div>
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-64 w-64 translate-y-1/2 -translate-x-1/2 rounded-full bg-indigo-400/10 blur-3xl"></div>
      
      <div className="relative z-10">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-300">
          <FileText className="w-4 h-4" /> Informe Agentico CIM-IA
        </p>

        <h3 className="mt-3 text-3xl font-bold !text-white">
          Ruta habitacional recomendada
        </h3>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          El motor consolidó señales de mercado, financiación y oferta validada para proponer
          una salida concreta y explicable.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[24px] border border-sky-200/10 bg-white/8 p-6 backdrop-blur-md shadow-lg shadow-slate-950/20">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-200">Perfil detectado</p>
            <p className="text-xl font-semibold text-slate-50">
              Comprador inicial con necesidad de financiación.
            </p>
          </div>

          <div className="rounded-[24px] border border-sky-200/10 bg-white/8 p-6 backdrop-blur-md shadow-lg shadow-slate-950/20">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-200">Ruta recomendada</p>
            <p className="text-xl font-semibold text-slate-50">
              Lote financiado o vivienda inicial mediante inmobiliaria adherida.
            </p>
          </div>

          <div className="rounded-[24px] border border-sky-200/10 bg-white/8 p-6 backdrop-blur-md shadow-lg shadow-slate-950/20">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-200">Proxima accion</p>
            <p className="text-xl font-semibold text-slate-50">
              Derivar a operador validado y generar expediente habitacional.
            </p>
          </div>

          <div className="rounded-[24px] border border-sky-200/10 bg-white/8 p-6 backdrop-blur-md shadow-lg shadow-slate-950/20">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.14em] text-sky-200">Impacto institucional</p>
            <p className="text-xl font-semibold text-slate-50">
              La Cámara centraliza demanda, ordena oferta y genera trazabilidad.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/12 pt-8">
          <button className="rounded-xl bg-[linear-gradient(135deg,#3b82f6,#2563eb)] px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:brightness-110">
            Generar expediente
          </button>
          <button className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-50 transition-all hover:bg-white/10">
            Enviar a inmobiliaria adherida
          </button>
          <button className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-slate-50 transition-all hover:bg-white/10">
            Ver oportunidades detectadas
          </button>
        </div>
      </div>
    </div>
  );
}
