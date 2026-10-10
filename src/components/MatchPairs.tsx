import { useState } from 'react';
import clsx from 'clsx';
import { playHover, playClick } from '../audio';

export default function MatchPairs({ stage, onWin }: any) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const stageIndex = stage.id - 1;
  
  const leftItems = Object.keys(stage.pairs);
  const rightItems = Object.values(stage.pairs) as string[];

  const handleLeftClick = (item: string) => {
    if (matched.includes(item)) return;
    playClick(stageIndex);
    setSelectedLeft(item);
    checkMatch(item, selectedRight);
  };

  const handleRightClick = (item: string) => {
    if (Object.values(stage.pairs).indexOf(item as any) !== -1 && matched.includes(Object.keys(stage.pairs)[Object.values(stage.pairs).indexOf(item as any)])) return;
    playClick(stageIndex);
    setSelectedRight(item);
    checkMatch(selectedLeft, item);
  };

  const checkMatch = (left: string | null, right: string | null) => {
    if (left && right) {
      if (stage.pairs[left] === right) {
        const newMatched = [...matched, left];
        setMatched(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);
        if (newMatched.length === leftItems.length) {
          setTimeout(onWin, 500);
        }
      } else {
        setTimeout(() => {
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center">
      <h2 className="text-3xl mb-2 text-omoriRed">{stage.title}</h2>
      <p className="mb-6 opacity-70">{stage.description}</p>

      <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-8">
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {leftItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleLeftClick(item)}
              onMouseEnter={() => playHover(stageIndex)}
              className={clsx(
                "sketchy-border p-4 text-left transition-colors text-sm md:text-base",
                matched.includes(item) ? "bg-green-900/50 opacity-50" :
                selectedLeft === item ? "bg-omoriLight text-omoriDark" : "hover:bg-white/10"
              )}
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          {rightItems.sort().map((item, i) => {
             const isMatched = matched.some(l => stage.pairs[l] === item);
             return (
              <button
                key={i}
                onClick={() => handleRightClick(item)}
                onMouseEnter={() => playHover(stageIndex)}
                className={clsx(
                  "sketchy-border p-4 text-left transition-colors text-sm md:text-base",
                  isMatched ? "bg-green-900/50 opacity-50" :
                  selectedRight === item ? "bg-omoriLight text-omoriDark" : "hover:bg-white/10"
                )}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
