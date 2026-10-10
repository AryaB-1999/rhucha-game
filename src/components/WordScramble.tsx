import { useState, useEffect } from 'react';
import { playHover, playClick, playType } from '../audio';

const shuffleWord = (word: string) => {
  return word.split('').sort(() => 0.5 - Math.random()).join('');
};

export default function WordScramble({ stage, onWin, onLose }: any) {
  const [currentWIndex, setCurrentWIndex] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(stage.timeLimit);
  const stageIndex = stage.id - 1;

  useEffect(() => {
    if (stage.timeLimit) setTimeLeft(stage.timeLimit);
    setCurrentWIndex(0);
    setInput('');
  }, [stage]);

  useEffect(() => {
    if (stage.words[currentWIndex]) {
      setScrambled(shuffleWord(stage.words[currentWIndex]));
    }
  }, [currentWIndex, stage.words]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      onLose();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t: number) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onLose]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    playClick(stageIndex);
    if (input.toUpperCase() === stage.words[currentWIndex].toUpperCase()) {
      if (currentWIndex === stage.words.length - 1) {
        onWin();
      } else {
        setCurrentWIndex(i => i + 1);
        setInput('');
      }
    } else {
      setInput('');
      // optionally penalize or let them retry
    }
  };

  const handleInputChange = (val: string) => {
    setInput(val);
    playType(stageIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
      <h2 className="text-3xl mb-2 text-omoriRed">{stage.title}</h2>
      <p className="mb-6 opacity-70">{stage.description}</p>
      
      {stage.timeLimit && (
        <div className="text-2xl mb-4 font-bold animate-pulse text-omoriRed">
          Time left: {timeLeft}s
        </div>
      )}

      <div className="sketchy-border p-8 w-full bg-omoriDark/90">
        <h3 className="text-2xl md:text-4xl mb-8 tracking-[1em] font-bold text-center animate-wobble">{scrambled}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="sketchy-border p-4 bg-transparent text-center text-xl md:text-2xl uppercase outline-none focus:border-omoriRed"
            placeholder="TYPE HERE"
          />
          <button 
            type="submit" 
            onMouseEnter={() => playHover(stageIndex)}
            className="sketchy-border p-4 hover:bg-omoriLight hover:text-omoriDark text-xl font-bold"
          >
            SUBMIT
          </button>
        </form>
      </div>
      <p className="mt-4 opacity-50">Word {currentWIndex + 1} of {stage.words.length}</p>
    </div>
  );
}
