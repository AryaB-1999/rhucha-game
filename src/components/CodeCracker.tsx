import { useState } from 'react';
import { playHover, playClick, playType } from '../audio';

export default function CodeCracker({ stage, onWin, }: any) {
  const [code, setCode] = useState(['', '', '', '']);
  const stageIndex = stage.id - 1;

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newCode = [...code];
    newCode[index] = val.slice(-1);
    setCode(newCode);
    playType(stageIndex);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    playClick(stageIndex);
    if (code.join('') === stage.answer) {
      onWin();
    } else {
      // Show error or something
      setCode(['', '', '', '']);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl text-center">
      <h2 className="text-3xl mb-2 text-omoriRed">{stage.title}</h2>
      <p className="mb-6 opacity-70">{stage.description}</p>

      <div className="sketchy-border p-8 w-full bg-omoriDark/90 text-left mb-8">
        <h3 className="text-xl mb-4 font-bold text-omoriRed">Hints:</h3>
        <ul className="list-disc list-inside space-y-2 opacity-80">
          {stage.hints.map((hint: string, i: number) => (
            <li key={i}>{hint}</li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 items-center">
        <div className="flex gap-4">
          {code.map((c, i) => (
            <input
              key={i}
              type="text"
              value={c}
              onChange={(e) => handleChange(i, e.target.value)}
              className="sketchy-border w-10 h-14 md:w-16 md:h-20 text-center text-2xl md:text-4xl bg-transparent focus:bg-omoriLight focus:text-omoriDark transition-colors"
            />
          ))}
        </div>
        <button 
          type="submit" 
          onMouseEnter={() => playHover(stageIndex)}
          className="sketchy-border px-8 py-4 hover:bg-omoriLight hover:text-omoriDark text-xl font-bold"
        >
          UNLOCK
        </button>
      </form>
    </div>
  );
}
