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
          Cimia interpreta una necesidad y coordina agentes especializados
        </h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          El ciudadano expresa su necesidad por audio. Cimia transcribe,
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
            Activar agentes Cimia
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
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 relative">
          {/* Opcional: Líneas decorativas en el fondo */}
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
      className={`rounded-2xl border p-5 shadow-sm transition-all duration-500 ${
        isRunning
          ? "border-blue-300 bg-blue-50 scale-[1.02]"
          : isCompleted
          ? "border-green-300 bg-green-50"
          : "border-slate-200 bg-white opacity-60"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isRunning ? 'bg-blue-100 text-blue-700' : isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
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
          {isCompleted && <span className="text-green-500">✓</span>}
        </div>
      </div>
      
      <p className="mt-4 text-sm text-slate-700 line-clamp-2">{agent.description}</p>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full transition-all duration-700 ${
            isCompleted ? "bg-green-500" : "bg-blue-500"
          }`}
          style={{ width: `${agent.progress}%` }}
        />
      </div>

      <p className="mt-4 h-5 text-sm font-medium text-slate-800">
        {isPending && "Pendiente de activación"}
        {isRunning && "Analizando información disponible..."}
        {isCompleted && <span className="text-green-700">{agent.result}</span>}
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
    <div className="mt-8 rounded-3xl bg-slate-900 p-8 text-white shadow-2xl overflow-hidden relative">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="relative z-10">
        <p className="text-sm font-bold tracking-widest text-blue-400 uppercase flex items-center gap-2">
          <FileText className="w-4 h-4" /> Informe Agentico Cimia
        </p>

        <h3 className="mt-3 text-3xl font-bold">
          Ruta habitacional recomendada
        </h3>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-2">Perfil detectado</p>
            <p className="text-lg font-semibold text-white">
              Comprador inicial con necesidad de financiación.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-2">Ruta recomendada</p>
            <p className="text-lg font-semibold text-white">
              Lote financiado o vivienda inicial mediante inmobiliaria adherida.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-2">Próxima acción</p>
            <p className="text-lg font-semibold text-white">
              Derivar a operador validado y generar expediente habitacional.
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-2">Impacto institucional</p>
            <p className="text-lg font-semibold text-white">
              La Cámara centraliza demanda, ordena oferta y genera trazabilidad.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-blue-500 hover:bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all">
            Generar expediente
          </button>
          <button className="rounded-xl border border-white/20 hover:bg-white/10 px-6 py-3 font-semibold text-white transition-all">
            Enviar a inmobiliaria adherida
          </button>
          <button className="rounded-xl border border-white/20 hover:bg-white/10 px-6 py-3 font-semibold text-white transition-all">
            Ver oportunidades detectadas
          </button>
        </div>
      </div>
    </div>
  );
}
