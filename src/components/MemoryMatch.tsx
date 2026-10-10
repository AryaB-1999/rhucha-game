import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { playHover, playClick } from '../audio';

export default function MemoryMatch({ stage, onWin, }: any) {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const stageIndex = stage.id - 1;
  
  useEffect(() => {
    const items = [...stage.items, ...stage.items];
    const shuffled = items
      .map((item, index) => ({ id: index, val: item }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
  }, [stage]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;
    
    playClick(stageIndex);
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].val === cards[second].val) {
        const newSolved = [...solved, first, second];
        setSolved(newSolved);
        setFlipped([]);
        if (newSolved.length === cards.length) {
          setTimeout(onWin, 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl text-center">
      <h2 className="text-3xl mb-2 text-omoriRed">{stage.title}</h2>
      <p className="mb-6 opacity-70">{stage.description}</p>

      <div className="grid grid-cols-4 gap-2 md:gap-4 w-full">
        {cards.map((c, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          return (
            <div
              key={c.id}
              onClick={() => handleCardClick(i)}
              onMouseEnter={() => playHover(stageIndex)}
              className={clsx(
                "h-16 md:h-24 sketchy-border flex items-center justify-center cursor-pointer transition-all duration-300 text-sm md:text-xl font-bold select-none",
                isFlipped ? "bg-omoriLight text-omoriDark" : "bg-omoriDark text-transparent hover:bg-white/10"
              )}
            >
              {isFlipped ? c.val : '?'}
            </div>
          );
        })}
      </div>
    </div>
  );
}
