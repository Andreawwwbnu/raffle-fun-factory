import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

const DrawingProcess = () => {
  const navigate = useNavigate();
  const { tier } = useParams();
  const [isDrawing, setIsDrawing] = useState(true);
  const [currentName, setCurrentName] = useState("");
  const [winners, setWinners] = useState<any[]>([]);

  const winnerCount = tier === "1" ? 1 : tier === "2" ? 3 : 5;
  const participants = JSON.parse(localStorage.getItem("participants") || "[]");

  useEffect(() => {
    if (isDrawing) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        setCurrentName(participants[randomIndex].name);
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setIsDrawing(false);
        
        // Select winners
        const selectedWinners = [];
        const participantsCopy = [...participants];
        for (let i = 0; i < winnerCount; i++) {
          if (participantsCopy.length === 0) break;
          const randomIndex = Math.floor(Math.random() * participantsCopy.length);
          selectedWinners.push(participantsCopy.splice(randomIndex, 1)[0]);
        }
        setWinners(selectedWinners);
        
        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Store winners
        const allWinners = JSON.parse(localStorage.getItem("winners") || "{}");
        allWinners[`tier${tier}`] = selectedWinners;
        localStorage.setItem("winners", JSON.stringify(allWinners));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isDrawing, participants, tier, winnerCount]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      {isDrawing ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Drawing Winners...</h2>
          <div className="h-20 overflow-hidden">
            <div className="name-spin text-3xl font-bold">{currentName}</div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8">Congratulations!</h2>
          <div className="space-y-4">
            {winners.map((winner, index) => (
              <div key={index} className="text-2xl font-bold">
                {winner.name}
              </div>
            ))}
          </div>
          <Button 
            onClick={() => navigate("/results")} 
            className="mt-8"
          >
            View All Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default DrawingProcess;