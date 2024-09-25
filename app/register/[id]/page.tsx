"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PageRegister() {
  const router = useRouter();
  const { id } = useParams();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          dateOfBirth: new Date(dateOfBirth).toISOString(),
          source,
          eventId: id,
        }),
      });

      if (response.ok) {
        console.log("User registered successfully");
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Failed to register user:", errorData.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Регистрация на событие {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full name:</label>
          <Input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Data of birth:</label>
          <Input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Where did you hear about this event:</label>
          <div>
            <label>
              <Input
                type="radio"
                value="social_media"
                checked={source === "social_media"}
                onChange={(e) => setSource(e.target.value)}
              />
              Social media
            </label>
            <label>
              <Input
                type="radio"
                value="friends"
                checked={source === "friends"}
                onChange={(e) => setSource(e.target.value)}
              />
              Friends
            </label>
            <label>
              <Input
                type="radio"
                value="other"
                checked={source === "other"}
                onChange={(e) => setSource(e.target.value)}
              />
              Found myself
            </label>
          </div>
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
