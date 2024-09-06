"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function page() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [blood, setBlood] = useState("");
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bio, setBio] = useState("");
  const [busID, setBusID] = useState("");
  const [routeID, setRouteID] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/admin/add-driver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          phone,
          password,
          birthdate,
          blood,
          license,
          experience: parseInt(experience),
          imageUrl,
          bio,
          busID,
          routeID,
          from,
          to,
          time,
          userOwner: "66422205aa8f86286959afca", // Example userOwner ID
        }),
      });

      if (response.ok) {
        // const data = await response.json();
        // console.log(data);
        // for development
        toast.success("Registration successful");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="flex pt-5 pb-10 flex-col gap-5 w-full"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="birthdate">Birthdate</Label>
            <Input
              id="birthdate"
              type="text"
              required
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="blood">Blood Group</Label>
            <Input
              id="blood"
              type="text"
              required
              value={blood}
              onChange={(e) => setBlood(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="license">License Number</Label>
          <Input
            id="license"
            type="text"
            required
            value={license}
            onChange={(e) => setLicense(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="experience">Experience (years)</Label>
          <Input
            id="experience"
            type="number"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="imageUrl">Profile Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="busID">Bus ID</Label>
            <Input
              id="busID"
              type="text"
              required
              value={busID}
              onChange={(e) => setBusID(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="routeID">Route ID</Label>
            <Input
              id="routeID"
              type="text"
              required
              value={routeID}
              onChange={(e) => setRouteID(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid gap-2">
            <Label htmlFor="from">From</Label>
            <Input
              id="from"
              type="text"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="to">To</Label>
            <Input
              id="to"
              type="text"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time">Departure Time</Label>
          <Input
            id="time"
            type="text"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          ) : (
            "Add Driver"
          )}
        </Button>
      </form>
    </div>
  );
}
