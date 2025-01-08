import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const winners = JSON.parse(localStorage.getItem("winners") || "{}");

  const maskPhone = (phone: string) => {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  };

  const renderWinners = (tier: string, label: string) => {
    const tierWinners = winners[`tier${tier}`] || [];
    return tierWinners.length > 0 ? (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{label}</h2>
        <div className="space-y-2">
          {tierWinners.map((winner: any, index: number) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <p className="font-medium">{winner.name}</p>
              <p className="text-gray-600">{maskPhone(winner.phone)}</p>
            </div>
          ))}
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl font-bold text-center mb-8">Lucky Draw Results</h1>
        
        {renderWinners("1", "First Prize Winners 🥇")}
        {renderWinners("2", "Second Prize Winners 🥈")}
        {renderWinners("3", "Third Prize Winners 🥉")}
        
        <div className="text-center mt-8">
          <Button onClick={() => navigate("/prizes")}>Back to Prizes</Button>
        </div>
      </div>
    </div>
  );
};

export default Results;