import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS, STAGES } from './gameData';
import { Heart } from 'lucide-react';
import clsx from 'clsx';
import Trivia from './components/Trivia';
import WordScramble from './components/WordScramble';
import MemoryMatch from './components/MemoryMatch';
import CodeCracker from './components/CodeCracker';
import MatchPairs from './components/MatchPairs';
import { initAudio, playClick, playHover, updateTensionBackground, stopAudio, playWin, playLose } from './audio';

type GameState = 'START' | 'PLAYING' | 'FINAL_LETTER' | 'ENDING';
type EndingType = 1 | 2 | 3 | null;

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [unlockedAssets, setUnlockedAssets] = useState<string[]>([]);
  const [dialogue, setDialogue] = useState<string | null>(null);
  const [ending, setEnding] = useState<EndingType>(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > (0.95 - (currentStageIndex * 0.05))) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 200 + (currentStageIndex * 50));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentStageIndex]);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      updateTensionBackground(currentStageIndex);
    } else {
      stopAudio();
    }
  }, [currentStageIndex, gameState]);

  const handleStart = () => {
    initAudio();
    playClick(0);
    setGameState('PLAYING');
    setDialogue("A journey of 10 stages begins... Let's see how much you love your favorites.");
  };

  const handleStageWin = () => {
    playWin(currentStageIndex);
    const assetToUnlock = ASSETS[currentStageIndex % ASSETS.length];
    setUnlockedAssets(prev => [...new Set([...prev, assetToUnlock])]);
    
    if (currentStageIndex < STAGES.length - 1) {
      setDialogue(`Stage ${currentStageIndex + 1} Cleared! Memory unlocked...`);
      setTimeout(() => {
        setDialogue(null);
        setCurrentStageIndex(prev => prev + 1);
      }, 3000);
    } else {
      setUnlockedAssets(ASSETS);
      setDialogue("You've conquered all 10 stages! Unlocking the final vault...");
      setTimeout(() => {
        setDialogue(null);
        setGameState('FINAL_LETTER');
        stopAudio();
      }, 4000);
    }
  };

  const handleStageLose = () => {
    playLose(currentStageIndex);
    setDialogue("Time's up or wrong answer! Let's try that again...");
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      setGameState('START');
      setTimeout(() => setGameState('PLAYING'), 100);
    }, 500);
  };

  const renderStage = () => {
    const stage = STAGES[currentStageIndex];
    const props = { stage, onWin: handleStageWin, onLose: handleStageLose };

    switch (stage.type) {
      case 'trivia': return <Trivia {...props} />;
      case 'scramble': return <WordScramble {...props} />;
      case 'memory': return <MemoryMatch {...props} />;
      case 'code': return <CodeCracker {...props} />;
      case 'match': return <MatchPairs {...props} />;
      default: return <div>Unknown Stage</div>;
    }
  };

  const handleRestart = () => {
    playClick(0);
    stopAudio();
    setGameState('START');
    setCurrentStageIndex(0);
    setUnlockedAssets([]);
    setDialogue(null);
    setEnding(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '\\') {
        if (gameState === 'PLAYING') handleStageWin();
        else if (gameState === 'START') handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentStageIndex]);

  return (
    <div className={clsx("h-[100dvh] w-full flex flex-col relative bg-omoriDark overflow-hidden text-sm md:text-base", glitch ? "animate-pulse invert" : "")}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMDAwIi8+PC9zdmc+')]"></div>
      
      <div className="flex flex-col md:flex-row flex-1 w-full h-full relative z-10 p-2 md:p-6 gap-2 md:gap-4 overflow-hidden">
        
        {/* Sidebar - Fix: Made it shrinkable on mobile so it doesn't overlap */}
        {gameState === 'PLAYING' && (
          <div className="w-full md:w-32 lg:w-48 sketchy-border p-2 flex flex-row md:flex-col items-center overflow-x-auto md:overflow-y-auto bg-omoriDark/90 flex-shrink-0 h-[15vh] min-h-[80px] max-h-[120px] md:h-full md:max-h-full">
            <h3 className="hidden md:block text-xs lg:text-sm text-omoriRed mb-4 font-bold text-center uppercase tracking-widest">Memories</h3>
            <div className="flex flex-row md:flex-col gap-2 w-full h-full items-center">
              {unlockedAssets.map((asset, i) => (
                <img key={i} src={asset} alt="memory" className="w-auto h-full md:w-full md:h-24 lg:h-32 object-cover sketchy-border hover:scale-110 transition-transform cursor-pointer flex-shrink-0" />
              ))}
            </div>
          </div>
        )}

        {/* Centered Small Playable Area - Fix: Added my-auto inside to let it properly center without cutting top */}
        <main className="flex-1 flex flex-col items-center justify-start w-full h-full relative overflow-y-auto p-2 pb-24 md:pb-2">
          <div className="w-full max-w-[95%] md:max-w-xl flex flex-col items-center justify-center relative my-auto min-h-max py-8">
            <AnimatePresence mode="wait">
              {gameState === 'START' && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center bg-omoriDark/80 p-8 sketchy-border w-full"
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-widest animate-wobble text-omoriRed">Welcome, Rhucha.</h1>
                  <p className="text-sm md:text-base mb-8 opacity-80">10 Stages. Puzzles and Trivia.<br/>Are you ready?</p>
                  <button 
                    onClick={handleStart}
                    onMouseEnter={() => playHover(0)}
                    className="sketchy-border px-6 py-3 text-lg md:text-xl hover:bg-omoriLight hover:text-omoriDark transition-colors font-bold w-full"
                  >
                    Start Journey
                  </button>
                </motion.div>
              )}

              {gameState === 'PLAYING' && (
                <motion.div
                  key={`stage-${currentStageIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="w-full flex justify-center"
                >
                  {renderStage()}
                </motion.div>
              )}

              {gameState === 'FINAL_LETTER' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full bg-white text-black p-6 md:p-8 sketchy-border shadow-2xl relative text-sm md:text-base"
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-omoriRed">For Rhucha</h1>
                  <div className="prose prose-sm md:prose-base mx-auto font-serif space-y-4">
                    <p>My dearest Rhucha,</p>
                    <p>
                      If you are reading this, you've conquered every stage and unlocked all the memories I hid for you. 
                      Every piece of this puzzle is a reflection of why I love you. 
                    </p>
                    <p>
                      I get lost in your <strong>deep black eyes</strong> every time I look at you. 
                      You have this incredibly <strong>funny and strong personality</strong> that makes every day an adventure.
                      Not only are you breathtakingly beautiful with your <strong>perfect body</strong>, but what truly astounds me is your <strong>caring attitude</strong>.
                    </p>
                    <p>
                      The <strong>insane amounts of empathy and care</strong> you show for everyone around you makes you the brightest light in my life.
                      You are the best thing that has ever happened to me, and I am unimaginably lucky to have you.
                    </p>
                    <p>Forever yours,<br /><strong>Arya</strong></p>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg md:text-xl mb-2 text-center font-bold border-b border-black pb-2">Our Memories</h3>
                    <div className="grid grid-cols-4 gap-1 md:gap-2">
                      {ASSETS.slice(0, 8).map((asset, i) => (
                        <motion.img 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} src={asset} alt="memory" className="w-full h-16 md:h-20 object-cover sketchy-border hover:scale-150 transition-transform z-20 relative" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col gap-2 md:gap-3 items-center">
                    <h3 className="text-base md:text-lg font-bold mb-1">How do you respond?</h3>
                    <button 
                      onMouseEnter={() => playHover(9)} 
                      onClick={() => { playClick(9); setEnding(1); setGameState('ENDING'); }} 
                      className="bg-omoriDark text-white px-4 py-2 w-full font-bold sketchy-border hover:bg-gray-800 text-left text-xs md:text-sm"
                    >
                      1. "I love you too, Arya."
                    </button>
                    <button 
                      onMouseEnter={() => playHover(9)} 
                      onClick={() => { playClick(9); setEnding(2); setGameState('ENDING'); }} 
                      className="bg-omoriDark text-white px-4 py-2 w-full font-bold sketchy-border hover:bg-gray-800 text-left text-xs md:text-sm"
                    >
                      2. "This was the best surprise ever!"
                    </button>
                    <button 
                      onMouseEnter={() => playHover(9)} 
                      onClick={() => { playClick(9); setEnding(3); setGameState('ENDING'); }} 
                      className="bg-omoriDark text-white px-4 py-2 w-full font-bold sketchy-border hover:bg-gray-800 text-left text-xs md:text-sm"
                    >
                      3. *Hug him tightly without saying a word*
                    </button>
                  </div>
                </motion.div>
              )}

              {gameState === 'ENDING' && (
                <motion.div
                  key="ending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center bg-omoriDark/90 p-8 sketchy-border w-full"
                >
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 text-omoriRed animate-wobble">
                    {ending === 1 && "ENDING 1: The Sweetest Words"}
                    {ending === 2 && "ENDING 2: A Joyful Surprise"}
                    {ending === 3 && "ENDING 3: A Warm Embrace"}
                  </h1>
                  <p className="text-sm md:text-lg mb-6">
                    {ending === 1 && "You speak your heart, and the room fades away into a warm, beautiful light. The perfect harmony of your souls shines bright."}
                    {ending === 2 && "Your laughter and joy fill the space, turning the sketchy black-and-white room into a vibrant canvas of colors."}
                    {ending === 3 && "Sometimes words aren't needed. The warmth of your hug speaks volumes, bringing complete peace to your heart."}
                  </p>
                  <Heart size={48} className="mx-auto text-omoriRed animate-pulse mb-8" />
                  
                  <button 
                    onMouseEnter={() => playHover(0)}
                    onClick={handleRestart}
                    className="sketchy-border px-6 py-3 text-sm md:text-lg hover:bg-omoriLight hover:text-omoriDark transition-colors font-bold w-full uppercase"
                  >
                    Go Back / Restart
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {dialogue && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:w-3/4 max-w-xl bg-omoriDark sketchy-border p-3 md:p-4 z-50 flex items-start gap-3 shadow-xl"
          >
            <div className="w-2 h-2 md:w-3 md:h-3 bg-omoriLight rounded-full mt-1.5 flex-shrink-0 animate-ping"></div>
            <p className="text-sm md:text-lg font-bold">{dialogue}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
