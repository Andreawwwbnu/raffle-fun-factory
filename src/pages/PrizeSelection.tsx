import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrizeSelection = () => {
  const navigate = useNavigate();

  const handlePrizeSelect = (tier: number) => {
    navigate(`/draw/${tier}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
        <div className="prize-card gold text-white">
          <h2 className="text-2xl font-bold mb-2">First Prize 🥇</h2>
          <p className="mb-4">1 Winner</p>
          <Button 
            onClick={() => handlePrizeSelect(1)}
            className="w-full bg-white text-yellow-500 hover:bg-gray-100"
          >
            Draw Now
          </Button>
        </div>
        
        <div className="prize-card silver text-white">
          <h2 className="text-2xl font-bold mb-2">Second Prize 🥈</h2>
          <p className="mb-4">3 Winners</p>
          <Button 
            onClick={() => handlePrizeSelect(2)}
            className="w-full bg-white text-gray-500 hover:bg-gray-100"
          >
            Draw Now
          </Button>
        </div>
        
        <div className="prize-card bronze text-white">
          <h2 className="text-2xl font-bold mb-2">Third Prize 🥉</h2>
          <p className="mb-4">5 Winners</p>
          <Button 
            onClick={() => handlePrizeSelect(3)}
            className="w-full bg-white text-orange-700 hover:bg-gray-100"
          >
            Draw Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrizeSelection;