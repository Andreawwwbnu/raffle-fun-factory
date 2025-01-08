import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    // Store participant in localStorage
    const participants = JSON.parse(localStorage.getItem("participants") || "[]");
    participants.push({ name, phone });
    localStorage.setItem("participants", JSON.stringify(participants));

    toast.success("Registration successful!");
    navigate("/prizes");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Lucky Draw Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;