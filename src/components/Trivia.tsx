import { useState, useEffect } from 'react';
import { playHover, playClick } from '../audio';

export default function Trivia({ stage, onWin, onLose }: any) {
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(stage.timeLimit);
  const stageIndex = stage.id - 1;
  
  useEffect(() => {
    if (stage.timeLimit) {
      setTimeLeft(stage.timeLimit);
      setCurrentQ(0);
    }
  }, [stage]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      onLose();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t: number) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onLose]);

  const handleAnswer = (opt: string) => {
    playClick(stageIndex);
    if (opt === stage.questions[currentQ].a) {
      if (currentQ === stage.questions.length - 1) {
        onWin();
      } else {
        setCurrentQ(q => q + 1);
      }
    } else {
      onLose();
    }
  };

  const q = stage.questions[currentQ];

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
        <h3 className="text-lg md:text-2xl mb-8 animate-wobble">{q.q}</h3>
        <div className="flex flex-col gap-4">
          {q.options.map((opt: string, i: number) => (
            <button
              key={i}
              onMouseEnter={() => playHover(stageIndex)}
              onClick={() => handleAnswer(opt)}
              className="sketchy-border p-4 text-left hover:bg-omoriLight hover:text-omoriDark transition-colors text-xl"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 opacity-50">Question {currentQ + 1} of {stage.questions.length}</p>
    </div>
  );
}
