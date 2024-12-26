import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { config } from '../config';
import { PortalBackground } from './PortalBackground';

const noiseAnimation = keyframes`
  0% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
  100% { transform: translate(5%, 0); }
`;

const Section = styled.section`
  background-color: black;
  position: relative;
  height: calc(100vh - 60px);
  margin: 0;
  padding: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 60px);
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  margin: 20px;
  position: relative;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const TerminalSection = styled.div`
  flex: 2;
  background: #121218;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  min-height: 60vh;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex: none;
    height: 60vh;
    border-right: none;
  }
`;

const StaticSection = styled.div`
  flex: 1;
  background: #121218;
  position: relative;
  overflow: hidden;
  height: 100%;
  border-radius: 12px;

  @media (max-width: 768px) {
    flex: none;
    height: 40vh;
  }
`;

const PortalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const QuantumTerminal = styled.div`
  flex: 1;
  background: transparent;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow: hidden;
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(128, 0, 255, 0.4); }
  50% { box-shadow: 0 0 40px rgba(128, 0, 255, 0.6); }
  100% { box-shadow: 0 0 20px rgba(128, 0, 255, 0.4); }
`;


const TerminalColors = {
  success: '#98c379', // green
  error: '#e06c75',   // red
  warning: '#e5c07b', // yellow
  info: '#61afef',    // blue
  prompt: '#c678dd',  // purple
  path: '#56b6c2',    // cyan
  command: '#abb2bf', // white
  comment: '#5c6370'  // gray
};

const LoadingSequence = styled.div`
  font-family: 'Source Code Pro', monospace;
  font-size: 1rem;
  color: ${TerminalColors.command};
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  overflow-y: auto;
  position: relative;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: ${TerminalColors.comment};
    border-radius: 4px;
  }
`;

const SpinnerAnimation = keyframes`
  0% { content: "⠋"; }
  10% { content: "⠙"; }
  20% { content: "⠹"; }
  30% { content: "⠸"; }
  40% { content: "⠼"; }
  50% { content: "⠴"; }
  60% { content: "⠦"; }
  70% { content: "⠧"; }
  80% { content: "⠇"; }
  90% { content: "⠏"; }
  100% { content: "⠋"; }
`;

const ProgressText = styled.div`
  margin: 0.2rem 0;
  opacity: 0.9;
  position: relative;
  padding-left: 1.5rem;
  line-height: 1.4;
  color: ${TerminalColors.command};

  &::before {
    content: '➜';
    position: absolute;
    left: 0;
    color: ${TerminalColors.prompt};
  }

  .spinner::after {
    content: "⠋";
    display: inline-block;
    animation: ${SpinnerAnimation} 1s steps(10, end) infinite;
  }

  span {
    color: inherit;
  }
`;

const Spinner = styled.div`
  display: inline-block;
  margin-right: 8px;
  width: 1em;
  height: 1em;
  position: relative;
  
  &::after {
    content: '⠋';
    animation: spinnerAnimation 1s steps(10, end) infinite;
  }

  @keyframes spinnerAnimation {
    11% { content: '⠙'; }
    22% { content: '⠹'; }
    33% { content: '⠸'; }
    44% { content: '⠼'; }
    55% { content: '⠴'; }
    66% { content: '⠦'; }
    77% { content: '⠧'; }
    88% { content: '⠇'; }
    99% { content: '⠏'; }
  }
`;

const LoadingBar = styled.div`
  font-family: 'Source Code Pro', monospace;
  color: ${TerminalColors.command};
  margin: 0.2rem 0;
  opacity: 0.9;
  white-space: pre;
`;

const ErrorText = styled.div`
  color: ${TerminalColors.error};
  margin: 0.2rem 0;
  padding-left: 1.5rem;
  opacity: 0.9;
`;

const WarningText = styled.div`
  color: ${TerminalColors.warning};
  margin: 0.2rem 0;
  padding-left: 1.5rem;
  opacity: 0.9;
`;

const RetryText = styled.div`
  color: ${TerminalColors.info};
  margin: 0.2rem 0;
  padding-left: 1.5rem;
  opacity: 0.9;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 15px;
  background: #0f0;
  margin-left: 4px;
  animation: blink 1s step-end infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const ArtifactDisplay = styled.div`
  height: 100%;
  padding: 20px;
  background: #000000;
  font-family: 'Source Code Pro', monospace;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
  text-align: left;
  position: relative;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: ${TerminalColors.comment};
    border-radius: 4px;
  }
`;

const ArtifactImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 2rem auto;
  display: block;
  border-radius: 10px;
  border: 2px solid rgba(128, 0, 255, 0.3);
`;

const ArtifactText = styled.div`
  font-family: 'Source Code Pro', monospace;
  font-size: 1rem;
  color: ${TerminalColors.command};
  margin: 0.5rem 0;
  width: 100%;
  line-height: 1.4;
  
  &.prediction {
    color: ${TerminalColors.info};
  }
  
  &.warning {
    color: ${TerminalColors.warning};
  }
  
  &.safety {
    color: ${TerminalColors.error};
  }
`;

const packageLoadingStates = [
  { name: "quantum-core", size: "256MB" },
  { name: "dimensional-bridge", size: "512MB" },
  { name: "reality-parser", size: "128MB" },
  { name: "multiverse-scanner", size: "1GB" },
  { name: "artifact-compiler", size: "384MB" },
  { name: "neural-interface", size: "768MB" },
  { name: "quantum-stabilizer", size: "192MB" },
  { name: "entropy-reducer", size: "448MB" },
  { name: "timeline-synchronizer", size: "896MB" },
  { name: "void-mapper", size: "320MB" }
];

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const hackingMessages = [
  "Initializing quantum breach protocol...",
  "Accessing dimensional gateway...",
  "Bypassing security matrix...",
  "Injecting polymorphic code sequence...",
  "Scanning parallel universes...",
  "Decrypting interdimensional protocols...",
  "Loading quantum encryption keys...",
  "Establishing neural network uplink...",
  "Accessing forbidden database sectors...",
  "Compiling dimensional coordinates...",
  "Installing quantum drivers...",
  "Running security bypass...",
  "Initializing reality distortion field...",
  "Loading dimensional translation matrix...",
  "Accessing forbidden knowledge banks...",
  "Injecting consciousness transfer protocols...",
  "Scanning dimensional frequencies...",
  "Calibrating quantum stabilizers...",
  "Loading artifact manifestation drivers...",
  "Compiling interdimensional data streams..."
];

const installationMessages = [
  "Installing quantum visualization drivers...",
  "Downloading artifact materialization modules...",
  "Updating neural pattern recognition...",
  "Installing dimensional calibration tools...",
  "Configuring reality anchors...",
  "Setting up quantum entanglement protocols...",
  "Installing parallel universe scanners...",
  "Updating dimensional drift compensators...",
  "Installing artifact containment systems...",
  "Configuring safety protocol databases..."
];

const processingMessages = [
  "Processing quantum fluctuations...",
  "Analyzing dimensional resonance...",
  "Calculating probability matrices...",
  "Stabilizing reality anchors...",
  "Verifying quantum signatures...",
  "Processing temporal data...",
  "Analyzing artifact composition...",
  "Calculating dimensional stability...",
  "Processing quantum entanglement...",
  "Verifying containment parameters..."
];

const generateRandomHex = () => {
  return Math.random().toString(16).substring(2, 8).toUpperCase();
};

const generateRandomPath = () => {
  const paths = [
    '/quantum/matrix/',
    '/dimensional/gateway/',
    '/neural/network/',
    '/reality/core/',
    '/forbidden/knowledge/'
  ];
  return paths[Math.floor(Math.random() * paths.length)] + generateRandomHex();
};

const loadingSteps = [
  "Generating quantum seed",
  "Activating terminal",
  "Hard booting terminal accelerator",
  "Establishing interdimensional connection",
  "Scanning multiverse frequencies",
  "Bypassing quantum firewall",
  "Accessing artifact database",
  "Stabilizing dimensional rift",
  "Verifying artifact integrity",
  "Materializing quantum data"
];

const generateDimensionalCoordinate = () => {
  const dimension = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const number = Math.floor(Math.random() * 1000);
  const subDimension = Math.floor(Math.random() * 100);
  return `${dimension}-${number}.${subDimension}`;
};

interface PackageState {
  name: string;
  size: string;
  progress: number;
  speed: string;
  status: 'downloading' | 'error' | 'retry' | 'warning' | 'success';
  attempts: number;
}

const errorMessages = [
  "ERROR: Quantum entanglement desynchronization detected",
  "CRITICAL: Buffer overflow in dimensional matrix",
  "FATAL: Memory corruption in reality anchor",
  "ERROR: Failed to establish neural handshake",
  "CRITICAL: Quantum state collapse imminent",
  "ERROR: Dimensional breach detected in sector",
  "FATAL: Stack overflow in consciousness stream",
  "ERROR: Failed to validate reality signature",
  "CRITICAL: Unauthorized timeline modification detected",
  "FATAL: Neural network cascade failure"
];

const recoveryMessages = [
  "Attempting quantum state recovery...",
  "Reinitializing dimensional buffers...",
  "Reconstructing reality matrix...",
  "Emergency protocol initiated...",
  "Restoring quantum coherence...",
  "Realigning dimensional vectors...",
  "Rebuilding neural pathways...",
  "Stabilizing quantum field...",
  "Repairing timeline integrity...",
  "Engaging backup systems..."
];

interface UserChoice {
  prompt: string;
  callback: (choice: boolean) => void;
}

interface CipherGame {
  memoryDump: string[];
  solution: string;
  attempts: number;
  maxAttempts: number;
}

// Add new styled components for the password terminal
const PasswordTerminal = styled.div`
  font-family: 'Source Code Pro', monospace;
  color: #00ff00;
  font-size: 0.9rem;
  line-height: 1.2;
  white-space: pre;
  text-align: left;
  width: 100%;
  margin-top: 1rem;
`;

const MemoryDump = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  font-family: 'Source Code Pro', monospace;
  color: ${TerminalColors.command};
`;

const MemoryColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemoryLine = styled.div<{ isHighlighted?: boolean }>`
  font-family: 'Source Code Pro', monospace;
  color: ${props => props.isHighlighted ? '#00ff00' : TerminalColors.command};
  opacity: ${props => props.isHighlighted ? 1 : 0.7};
  margin: 0.1rem 0;
`;

// Add ASCII art and system info constants
const SQUANCH_ASCII = `
<span style="color: ${TerminalColors.success}">  ░██████╗░██████╗░██╗░░░██╗░█████╗░███╗░░██╗░█████╗░██╗░░██╗</span>
<span style="color: ${TerminalColors.info}">  ██╔════╝██╔═══██╗██║░░░██║██╔══██╗████╗░██║██╔══██╗██║░░██║</span>
<span style="color: ${TerminalColors.warning}">  ╚█████╗░██║██╗██║██║░░░██║███████║██╔██╗██║██║░░╚═╝███████║</span>
<span style="color: ${TerminalColors.error}">  ░╚═══██╗╚██████╔╝██║░░░██║██╔══██║██║╚████║██║░░██╗██╔══██║</span>
<span style="color: ${TerminalColors.prompt}">  ██████╔╝░╚═██╔═╝░╚██████╔╝██║░░██║██║░╚███║╚█████╔╝██║░░██║</span>
<span style="color: ${TerminalColors.path}">  ╚═════╝░░░░╚═╝░░░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝</span>

<span style="color: ${TerminalColors.command}">  ▄▄▄▄▄▄▄ ▄▄▄▄▄▄▄ ▄▄   ▄▄ ▄▄▄▄▄▄ ▄▄    ▄ ▄▄▄▄▄▄▄ ▄▄   ▄▄ </span>
<span style="color: ${TerminalColors.info}">  █       █       █  █ █  █      █  █  █ █       █  █ █  █</span>
<span style="color: ${TerminalColors.warning}">  █  ▄▄▄▄▄█   ▄   █  █▄█  █  ▄   █   █▄█ █       █  █▄█  █</span>
<span style="color: ${TerminalColors.error}">  █ █▄▄▄▄▄█  █ █  █       █ █▄█  █       █     ▄▄█       █</span>
<span style="color: ${TerminalColors.success}">  █▄▄▄▄▄  █  █▄█  █   ▄   █      █  ▄    █    █  █   ▄   █</span>
<span style="color: ${TerminalColors.prompt}">   ▄▄▄▄▄█ █       █  █ █  █  ▄   █ █ █   █    █▄▄█  █ █  █</span>
<span style="color: ${TerminalColors.path}">  █▄▄▄▄▄▄▄█▄▄▄▄▄▄▄█▄▄█ █▄▄█▄▄█ █▄▄█▄█  █▄▄█▄▄▄▄▄▄▄█▄▄█ █▄▄█</span>

<span style="color: ${TerminalColors.error}">   @@@@@@   @@@@@@@    @@@  @@@   @@@@@@   @@@  @@@   @@@@@@@  @@@  @@@  </span>
<span style="color: ${TerminalColors.warning}">  @@@@@@@   @@@@@@@@  @@@  @@@  @@@@@@@@  @@@@ @@@  @@@@@@@@  @@@  @@@  </span>
<span style="color: ${TerminalColors.info}">  !@@       @@!  @@@  @@!  @@@  @@!  @@@  @@!@!@@@  !@@       @@!  @@@  </span>
<span style="color: ${TerminalColors.success}">  !@!       !@!  @!@  !@!  @!@  !@!  @!@  !@!!@!@!  !@!       !@!  @!@  </span>
<span style="color: ${TerminalColors.prompt}">  !!@@!!    @!@@!@!   @!@  !@!  @!@!@!@!  @!@ !!@!  !@!       @!@!@!@!  </span>
<span style="color: ${TerminalColors.path}">   !!@!!!   !!@!!!    !@!  !!!  !!!@!!!!  !@!  !!!  !!!       !!!@!!!!  </span>
</span>`;

const SYSTEM_INFO = `
<span style="color: ${TerminalColors.prompt}">quantum@RUBCO-INDUSTRIES</span>
<span style="color: ${TerminalColors.command}">---------------------------</span>
<span style="color: ${TerminalColors.prompt}">OS:</span> <span style="color: ${TerminalColors.command}">RubcoOS 4.2.0-quantum</span>
<span style="color: ${TerminalColors.prompt}">Kernel:</span> <span style="color: ${TerminalColors.command}">C-137.x86_64</span>
<span style="color: ${TerminalColors.prompt}">Uptime:</span> <span style="color: ${TerminalColors.command}">∞ quantum cycles</span>
<span style="color: ${TerminalColors.prompt}">Packages:</span> <span style="color: ${TerminalColors.command}">42 (quantum-pkg)</span>
<span style="color: ${TerminalColors.prompt}">Shell:</span> <span style="color: ${TerminalColors.command}">qsh 3.1.4</span>
<span style="color: ${TerminalColors.prompt}">Resolution:</span> <span style="color: ${TerminalColors.command}">∞x∞ quantum pixels</span>
<span style="color: ${TerminalColors.prompt}">DE:</span> <span style="color: ${TerminalColors.command}">Quantum Plasma</span>
<span style="color: ${TerminalColors.prompt}">WM:</span> <span style="color: ${TerminalColors.command}">Dimension Composer</span>
<span style="color: ${TerminalColors.prompt}">Terminal:</span> <span style="color: ${TerminalColors.command}">quantum-term</span>
<span style="color: ${TerminalColors.prompt}">CPU:</span> <span style="color: ${TerminalColors.command}">Quantum Core i∞</span>
<span style="color: ${TerminalColors.prompt}">GPU:</span> <span style="color: ${TerminalColors.command}">RTX-Q4000 Quantum Edition</span>
<span style="color: ${TerminalColors.prompt}">Memory:</span> <span style="color: ${TerminalColors.command}">∞MiB / ∞MiB</span>

<span style="color: ${TerminalColors.success}">System Status:</span> <span style="color: ${TerminalColors.command}">Quantum Coherence Stable</span>
<span style="color: ${TerminalColors.success}">Security Level:</span> <span style="color: ${TerminalColors.command}">Maximum Encryption Active</span>
<span style="color: ${TerminalColors.success}">Dimensional Anchor:</span> <span style="color: ${TerminalColors.command}">Synchronized</span>
`;

// Add new styled components for terminal formatting
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 180px auto;
  gap: 1rem;
  margin: 0.2rem 0;
  font-family: 'Source Code Pro', monospace;
`;

const TableCell = styled.span<{ align?: string }>`
  text-align: ${props => props.align || 'left'};
  color: inherit;
`;

const IndentedSection = styled.div<{ level: number }>`
  padding-left: ${props => props.level * 2}rem;
  margin: 0.2rem 0;
`;

export const InteractiveFeatures: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState<string[]>([]);
  const [hackingOutput, setHackingOutput] = useState<string[]>([]);
  const [artifactData, setArtifactData] = useState<{
    prediction: string;
    survivalTip: string;
    imageUrl: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [installProgress, setInstallProgress] = useState<{ message: string; progress: number }[]>([]);
  const [packageLoading, setPackageLoading] = useState<{
    name: string;
    progress: number;
    size: string;
    speed: string;
  } | null>(null);
  const [packageStates, setPackageStates] = useState<PackageState[]>([]);
  const [spinnerIndex, setSpinnerIndex] = useState(0);
  const [awaitingUserChoice, setAwaitingUserChoice] = useState<UserChoice | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [cipherGame, setCipherGame] = useState<CipherGame | null>(null);
  const [showCipher, setShowCipher] = useState(false);
  const [sessionActive, setSessionActive] = useState(true);
  const [artifactLoading, setArtifactLoading] = useState(false);
  const [artifactLoadingProgress, setArtifactLoadingProgress] = useState(0);
  const [preGeneratedArtifact, setPreGeneratedArtifact] = useState<{
    prediction: string;
    survivalTip: string;
    imageUrl: string;
  } | null>(null);
  const [initialPrompt, setInitialPrompt] = useState(true);

  // Add auto-scroll functionality
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [loadingProgress, hackingOutput, packageStates, awaitingUserChoice, showCipher]);

  useEffect(() => {
    if (loading && currentStep < loadingSteps.length && sessionActive) {
      // Main loading step
      const timer = setTimeout(() => {
        const coordinate = generateDimensionalCoordinate();
        const stepText = currentStep === 1 
          ? `${loadingSteps[currentStep]} ${coordinate}`
          : loadingSteps[currentStep];
        
        setLoadingProgress(prev => [...prev, `${stepText}...${(currentStep + 1) * 10}%`]);
        setCurrentStep(prev => prev + 1);

        if (currentStep === loadingSteps.length - 1) {
          generateArtifact();
        }
      }, 1000);

      // Random hacking messages with errors
      const hackingTimer = setInterval(() => {
        if (!awaitingUserChoice) {  // Only show hacking messages if not waiting for user input
          const shouldError = Math.random() < 0.3;
          const shouldWarn = Math.random() < 0.2;
          const shouldCriticalError = Math.random() < 0.1;

          if (shouldCriticalError) {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.error}">[FATAL] ${errorMessages[Math.floor(Math.random() * errorMessages.length)]}</span>`,
              `<span style="color: ${TerminalColors.warning}">[SYSTEM] Initiating emergency recovery sequence...</span>`,
              `<span style="color: ${TerminalColors.info}">[RECOVERY] ${recoveryMessages[Math.floor(Math.random() * recoveryMessages.length)]}</span>`
            ]);
          } else if (shouldError) {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.error}">[ERROR] Memory corruption at 0x${generateRandomHex()}</span>`,
              `<span style="color: ${TerminalColors.warning}">[SYSTEM] Attempting memory reallocation...</span>`
            ]);
          } else if (shouldWarn) {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.warning}">[WARNING] Unstable quantum signature detected in sector 0x${generateRandomHex()}</span>`
            ]);
          } else {
            const randomMessage = hackingMessages[Math.floor(Math.random() * hackingMessages.length)];
            const path = generateRandomPath();
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.command}">[${path}] ${randomMessage}</span>`
            ]);
          }
        }
      }, 200);

      return () => {
        clearTimeout(timer);
        clearInterval(hackingTimer);
      };
    }
  }, [loading, currentStep, sessionActive, awaitingUserChoice]);

  // Keep terminal active during generation
  useEffect(() => {
    if (isGenerating) {
      // Installation progress
      const installTimer = setInterval(() => {
        const message = installationMessages[Math.floor(Math.random() * installationMessages.length)];
        const progress = Math.floor(Math.random() * 100);
        setInstallProgress(prev => [...prev.slice(-5), { message, progress }]);
      }, 800);

      // Processing messages
      const processTimer = setInterval(() => {
        const message = processingMessages[Math.floor(Math.random() * processingMessages.length)];
        setHackingOutput(prev => [...prev, `[PROCESS] ${message}`].slice(-20));
      }, 300);

      return () => {
        clearInterval(installTimer);
        clearInterval(processTimer);
      };
    }
  }, [isGenerating]);

  // Add package loading effect
  useEffect(() => {
    if (isGenerating) {
      let currentPackageIndex = 0;

      const simulatePackageInstall = () => {
        const pkg = packageLoadingStates[currentPackageIndex];
        const speed = `${Math.floor(Math.random() * 100) + 50}MB/s`;

        setPackageStates(prev => {
          const newStates = [...prev];
          const existingPkg = newStates.find(p => p.name === pkg.name);
          
          if (existingPkg) {
            existingPkg.status = 'downloading';
            existingPkg.progress += Math.floor(Math.random() * 10) + 5;
            existingPkg.speed = speed;

            if (existingPkg.progress >= 100) {
              existingPkg.status = 'success';
              existingPkg.progress = 100;
              setHackingOutput(prev => [
                ...prev,
                `<span style="color: ${TerminalColors.success}">[SUCCESS] ${pkg.name} successfully integrated into quantum matrix</span>`
              ]);
              currentPackageIndex = (currentPackageIndex + 1) % packageLoadingStates.length;
            }
          } else {
            newStates.push({
              name: pkg.name,
              size: pkg.size,
              progress: 0,
              speed,
              status: 'downloading',
              attempts: 1
            });
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.info}">[INIT] Starting installation of ${pkg.name} (${pkg.size})</span>`
            ]);
          }
          return newStates;
        });
      };

      const packageTimer = setInterval(simulatePackageInstall, 150);
      return () => clearInterval(packageTimer);
    } else {
      setPackageStates([]);
    }
  }, [isGenerating]);

  const makeOpenAIRequest = async (messages: Array<{ role: string; content: string }>, maxTokens: number) => {
    const apiKey = config.openaiApiKey;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('OpenAI API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Request error:', error);
      throw error;
    }
  };

  const generateImage = async (prompt: string) => {
    try {
      if (!config.openaiApiKey) {
        throw new Error('OpenAI API key is not configured');
      }

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.openaiApiKey}`
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `Create a single floating object in the style of Rick and Morty: ${prompt}. The image must be a simple cartoon illustration with clean outlines and minimal shading, showing ONLY the object itself with absolutely NO text, NO numbers, NO symbols, NO writing, NO labels, NO letters, NO characters, NO logos, NO signatures, and NO markings of any kind. The object should be centered on a simple or transparent background. The style should be flat, cartoon-like, and simplified like Rick and Morty's art style, avoiding any photorealism or complex details. IMPORTANT: The image must be completely free of ANY form of text or text-like elements.`,
          n: 1,
          size: "1024x1024",
          quality: "standard",
          style: "vivid",
          response_format: "url"
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('OpenAI API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.data?.[0]?.url) {
        throw new Error('Invalid response format from OpenAI API');
      }

      return data.data[0].url;
    } catch (error) {
      console.error('Error generating image:', error);
      throw error;
    }
  };

  const generateArtifact = async () => {
    console.log('generateArtifact called');
    setIsGenerating(false);
    
    try {
      // Start generating artifact immediately and wait for it
      const data = await generateArtifactData();
      console.log('Artifact data generated:', data);
      setPreGeneratedArtifact(data);
      
      setAwaitingUserChoice({
        prompt: "WARNING: Accessing interdimensional data requires quantum stabilization. Proceed? (Y/N)",
        callback: async (choice) => {
          if (choice) {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.success}">[SYSTEM] Quantum stabilization initiated...</span>`
            ]);
            
            setIsGenerating(true);
            
            setTimeout(() => {
              setIsGenerating(false);
              
              setAwaitingUserChoice({
                prompt: "ALERT: Dimensional breach detected. Override safety protocols? (Y/N)",
                callback: async (choice) => {
                  if (choice) {
                    setHackingOutput(prev => [
                      ...prev,
                      `<span style="color: ${TerminalColors.warning}">[SYSTEM] Safety protocols bypassed. Initiating cipher lock...</span>`
                    ]);
                    
                    setIsGenerating(true);
                    
                    setTimeout(() => {
                      startPasswordChallenge();
                    }, 1500);
                  } else {
                    terminateSession();
                  }
                }
              });
            }, 2000);
          } else {
            terminateSession();
          }
        }
      });
    } catch (error: any) {
      console.error('Error in generateArtifact:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      setHackingOutput(prev => [
        ...prev,
        `<span style="color: ${TerminalColors.error}">[ERROR] Failed to generate artifact: ${errorMessage}</span>`
      ]);
    }
  };

  const generateArtifactData = async () => {
    console.log('Starting generateArtifactData...');
    try {
      // Generate prediction and survival tip
      const predictionPrompt = 'Generate a funny Rick and Morty style interdimensional artifact description. Make it sound like a bizarre but useful invention. Keep it under 100 words.';
      const survivalPrompt = 'Generate a humorous safety tip for handling this interdimensional artifact in the style of Rick and Morty. Keep it under 50 words.';

      const [prediction, survivalTip] = await Promise.all([
        makeOpenAIRequest([{ role: 'user', content: predictionPrompt }], 150),
        makeOpenAIRequest([{ role: 'user', content: survivalPrompt }], 100)
      ]);

      setHackingOutput(prev => [
        ...prev,
        `<span style="color: ${TerminalColors.success}">[SUCCESS] Artifact data retrieved from quantum database</span>`,
        `<span style="color: ${TerminalColors.info}">[PROCESS] Generating visual manifestation...</span>`
      ]);

      // Generate image based on the prediction
      const imageUrl = await generateImage(prediction);

      return {
        prediction,
        survivalTip,
        imageUrl
      };
    } catch (error: any) {
      console.error('Error in generateArtifactData:', error);
      
      let errorMessage = 'Unknown error occurred';
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API key not configured properly';
        setHackingOutput(prev => [
          ...prev,
          `<span style="color: ${TerminalColors.error}">[FATAL] Authentication failed: Invalid quantum key signature</span>`,
          `<span style="color: ${TerminalColors.error}">[SYSTEM] Please verify your quantum authentication credentials</span>`
        ]);
      } else if (error.message.includes('429')) {
        errorMessage = 'Rate limit exceeded';
        setHackingOutput(prev => [
          ...prev,
          `<span style="color: ${TerminalColors.error}">[FATAL] Quantum bandwidth exceeded</span>`,
          `<span style="color: ${TerminalColors.error}">[SYSTEM] Dimensional traffic congestion detected. Please try again later.</span>`
        ]);
      } else {
        setHackingOutput(prev => [
          ...prev,
          `<span style="color: ${TerminalColors.error}">[FATAL] Quantum matrix destabilized: ${error.message}</span>`,
          `<span style="color: ${TerminalColors.error}">[SYSTEM] Emergency shutdown initiated</span>`
        ]);
      }
      
      terminateSession();
      throw new Error(errorMessage);
    }
  };

  const terminateSession = () => {
    setIsGenerating(false);
    setSessionActive(false);
    
    // Show termination sequence
    setHackingOutput(prev => [
      ...prev,
      `<span style="color: ${TerminalColors.error}">[SYSTEM] User abort detected. Initiating emergency shutdown...</span>`,
      `<span style="color: ${TerminalColors.error}">[ALERT] Closing dimensional rifts...</span>`,
      `<span style="color: ${TerminalColors.error}">[ALERT] Purging quantum buffers...</span>`,
      `<span style="color: ${TerminalColors.error}">[SYSTEM] Connection terminated.</span>`,
      `<span style="color: ${TerminalColors.error}">SESSION ENDED - Press Generate to start new session</span>`
    ]);

    // Reset states after delay
    setTimeout(() => {
      setLoading(false);
      setHackingOutput([]);
      setLoadingProgress([]);
      setCurrentStep(0);
      setSessionActive(true);
    }, 3000);
  };

  const revealArtifact = () => {
    console.log('revealArtifact called');
    console.log('preGeneratedArtifact:', preGeneratedArtifact);
    
    if (preGeneratedArtifact) {
      console.log('Setting artifactData...');
      setArtifactData(preGeneratedArtifact);
      
      console.log('Updating terminal output...');
      setHackingOutput(prev => [
        ...prev,
        `<span style="color: ${TerminalColors.success}">[SUCCESS] Password accepted. Access granted.</span>`
      ]);
      
      // Remove portal background
      setLoading(false);
      setIsGenerating(false);
    } else {
      console.error('No preGeneratedArtifact available');
      setHackingOutput(prev => [
        ...prev,
        `<span style="color: ${TerminalColors.error}">[ERROR] Failed to materialize artifact. Quantum signature corrupted.</span>`
      ]);
    }
  };

  const startGeneration = () => {
    setSessionActive(true);
    setLoading(true);
    setCurrentStep(0);
    setLoadingProgress([]);
    setHackingOutput([]);
    setArtifactData(null);
  };

  const renderPackageStatus = (pkg: PackageState) => {
    switch (pkg.status) {
      case 'error':
        return (
          <>
            <ErrorText>✗ Failed to install {pkg.name} (Attempt {pkg.attempts})</ErrorText>
            <RetryText>↺ Retrying installation... [Quantum stability: {Math.floor(Math.random() * 40 + 60)}%]</RetryText>
            <ProgressText style={{ color: TerminalColors.error }}>
              └─ Error at memory address 0x{generateRandomHex()}
            </ProgressText>
          </>
        );
      case 'warning':
        return (
          <>
            <WarningText>⚠ Unstable quantum fluctuations detected in {pkg.name}</WarningText>
            <ProgressText style={{ color: TerminalColors.warning }}>
              └─ Applying quantum stabilizers... [{'.'.repeat(Math.floor(Math.random() * 20))}]
            </ProgressText>
          </>
        );
      case 'success':
        return (
          <>
            <ProgressText style={{ color: TerminalColors.success }}>
              ✓ Successfully installed {pkg.name} [{'.'.repeat(20)}] 100%
            </ProgressText>
            <ProgressText style={{ color: TerminalColors.comment }}>
              └─ Quantum signature verified: 0x{generateRandomHex()}
            </ProgressText>
          </>
        );
      default:
        return (
          <LoadingBar>
            <Spinner />
            Installing {pkg.name} [{'.'.repeat(Math.floor(pkg.progress/5))}] {pkg.progress}%
            <div style={{ paddingLeft: '24px', fontSize: '0.9em', opacity: 0.7, color: TerminalColors.comment }}>
              Size: {pkg.size} | Speed: {pkg.speed} | Memory: 0x{generateRandomHex()}
            </div>
          </LoadingBar>
        );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (awaitingUserChoice) {
      if (e.key.toLowerCase() === 'y') {
        awaitingUserChoice.callback(true);
        setAwaitingUserChoice(null);
      } else if (e.key.toLowerCase() === 'n') {
        awaitingUserChoice.callback(false);
        setAwaitingUserChoice(null);
      }
      return;
    }

    if (cipherGame && showCipher) {
      if (e.key === 'Enter') {
        if (userInput.toLowerCase() === cipherGame.solution.toLowerCase()) {
          setHackingOutput(prev => [
            ...prev,
            `<span style="color: ${TerminalColors.success}">[SUCCESS] Password accepted. Access granted.</span>`
          ]);
          setShowCipher(false);
          setCipherGame(null);
          setUserInput('');
          revealArtifact();
        } else {
          const newAttempts = cipherGame.attempts - 1;
          if (newAttempts <= 0) {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.error}">[FATAL] Maximum attempts exceeded. Terminal locked.</span>`
            ]);
            terminateSession();
          } else {
            setCipherGame({ ...cipherGame, attempts: newAttempts });
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.error}">[ERROR] Invalid password. ${newAttempts} attempts remaining.</span>`
            ]);
          }
        }
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key.length === 1 && /^[0-9a-fA-F]$/.test(e.key)) {
        if (userInput.length < 6) {
          setUserInput(prev => prev + e.key.toUpperCase());
        }
      }
    }
  };

  const startPasswordChallenge = () => {
    console.log('Starting password challenge...');
    const memoryLines = Array.from({ length: 24 }, () => {
      const address = generateRandomHex();
      const data = Array.from({ length: 8 }, () => 
        Math.random().toString(16).substring(2, 4)
      ).join(' ');
      return `0x${address}  ${data}`;
    });

    // Insert the password somewhere in the memory dump
    const passwordPosition = Math.floor(Math.random() * memoryLines.length);
    const password = generateRandomHex().substring(0, 6);
    memoryLines[passwordPosition] = `0x${generateRandomHex()}  ${password.split('').join(' ')}`;

    console.log('Password challenge created with solution:', password);
    setCipherGame({
      memoryDump: memoryLines,
      solution: password,
      attempts: 4,
      maxAttempts: 4
    });
    setShowCipher(true);
    setIsGenerating(false);
  };

  // Add global keyboard listener
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (awaitingUserChoice) {
        if (e.key.toLowerCase() === 'y') {
          awaitingUserChoice.callback(true);
          setAwaitingUserChoice(null);
        } else if (e.key.toLowerCase() === 'n') {
          awaitingUserChoice.callback(false);
          setAwaitingUserChoice(null);
        }
      }
    };

    window.addEventListener('keypress', handleGlobalKeyPress);
    return () => window.removeEventListener('keypress', handleGlobalKeyPress);
  }, [awaitingUserChoice]);

  useEffect(() => {
    if (initialPrompt) {
      setHackingOutput([
        SQUANCH_ASCII,
        SYSTEM_INFO,
        `<span style="color: ${TerminalColors.warning}">RUBCO INDUSTRIES (TM) TERMLINK v2.45</span>`,
        `<span style="color: ${TerminalColors.warning}">QUANTUM ARTIFACT GENERATION SYSTEM</span>`,
        `<span style="color: ${TerminalColors.warning}">================================</span>`,
        `<span style="color: ${TerminalColors.info}">INITIATE QUANTUM ARTIFACT GENERATION SEQUENCE? (Y/N)</span>`
      ]);
      setAwaitingUserChoice({
        prompt: "",
        callback: (choice) => {
          setInitialPrompt(false);
          if (choice) {
            startGeneration();
          } else {
            setHackingOutput(prev => [
              ...prev,
              `<span style="color: ${TerminalColors.error}">[SYSTEM] Sequence aborted. Type Y to begin when ready.</span>`
            ]);
            setInitialPrompt(true);
          }
        }
      });
    }
  }, [initialPrompt]);

  // Add useEffect to track artifactData changes
  useEffect(() => {
    console.log('artifactData changed:', artifactData);
  }, [artifactData]);

  // Add useEffect to track preGeneratedArtifact changes
  useEffect(() => {
    console.log('preGeneratedArtifact changed:', preGeneratedArtifact);
  }, [preGeneratedArtifact]);

  return (
    <Section>
      <FeaturesContainer>
        <TerminalSection>
          <QuantumTerminal>
            <LoadingSequence 
              ref={terminalRef}
              tabIndex={0} 
              onKeyDown={handleKeyPress}
            >
              {!loading && !isGenerating && initialPrompt && awaitingUserChoice && (
                <ProgressText style={{ color: TerminalColors.command }}>
                  {awaitingUserChoice.prompt}
                </ProgressText>
              )}
              {loadingProgress.map((step, index) => (
                <ProgressText key={`progress-${index}`}>{step}</ProgressText>
              ))}
              {isGenerating && (
                <>
                  {packageStates.map((pkg, index) => (
                    <React.Fragment key={`pkg-${index}`}>
                      {renderPackageStatus(pkg)}
                    </React.Fragment>
                  ))}
                </>
              )}
              {hackingOutput.map((output, index) => (
                <ProgressText 
                  key={`hacking-${index}`} 
                  dangerouslySetInnerHTML={{ __html: output }}
                />
              ))}
              {awaitingUserChoice && !initialPrompt && (
                <ProgressText style={{ color: TerminalColors.warning }}>
                  {awaitingUserChoice.prompt}
                </ProgressText>
              )}
              {showCipher && cipherGame && (
                <PasswordTerminal>
                  <div>RUBCO INDUSTRIES (TM) TERMLINK</div>
                  <div>Password Required</div>
                  <div>Attempts Remaining: {Array(cipherGame.attempts).fill('■').join(' ')}</div>
                  <MemoryDump>
                    <MemoryColumn>
                      {cipherGame.memoryDump.slice(0, cipherGame.memoryDump.length / 2).map((line, index) => (
                        <MemoryLine key={index}>{line}</MemoryLine>
                      ))}
                    </MemoryColumn>
                    <MemoryColumn>
                      {cipherGame.memoryDump.slice(cipherGame.memoryDump.length / 2).map((line, index) => (
                        <MemoryLine key={index}>{line}</MemoryLine>
                      ))}
                    </MemoryColumn>
                  </MemoryDump>
                  <div>Enter Password: {userInput}<Cursor /></div>
                </PasswordTerminal>
              )}
            </LoadingSequence>
          </QuantumTerminal>
        </TerminalSection>

        <StaticSection>
          {!artifactData ? (
            <>
              <PortalContainer>
                <PortalBackground />
              </PortalContainer>
              <div style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: TerminalColors.comment,
                fontFamily: 'Source Code Pro, monospace',
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(2px)',
                zIndex: 1
              }}>
                [STATIC] Awaiting quantum artifact materialization...
              </div>
            </>
          ) : (
            <ArtifactDisplay>
              <ArtifactText className="prediction">
                [ANALYSIS] {artifactData.prediction}
              </ArtifactText>
              {artifactData.imageUrl && (
                <ArtifactImage src={artifactData.imageUrl} alt="Quantum Artifact" />
              )}
              <ArtifactText className="warning">
                [WARNING] Interdimensional Safety Protocol Required
              </ArtifactText>
              <ArtifactText className="safety">
                [PROTOCOL] {artifactData.survivalTip}
              </ArtifactText>
            </ArtifactDisplay>
          )}
        </StaticSection>
      </FeaturesContainer>
    </Section>
  );
}; 