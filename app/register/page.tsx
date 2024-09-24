"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function PageRegister() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно отправить данные на сервер или сохранить их в состоянии
    console.log({ fullName, email, dateOfBirth, source });

    // Например, можно перенаправить на главную страницу после регистрации
    router.push("/");
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Полное имя:</label>
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
          <label htmlFor="dateOfBirth">Год рождения:</label>
          <Input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Источник:</label>
          <div>
            <label>
              <Input
                type="radio"
                value="social_media"
                checked={source === "social_media"}
                onChange={(e) => setSource(e.target.value)}
              />
              Социальные сети
            </label>
            <label>
              <Input
                type="radio"
                value="friends"
                checked={source === "friends"}
                onChange={(e) => setSource(e.target.value)}
              />
              Друзья
            </label>
            <label>
              <Input
                type="radio"
                value="other"
                checked={source === "other"}
                onChange={(e) => setSource(e.target.value)}
              />
              Другое
            </label>
          </div>
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
