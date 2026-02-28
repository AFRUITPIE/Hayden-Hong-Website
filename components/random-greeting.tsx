"use client";

import { useState } from "react";

const greetings = ["Hey", "Howdy", "What's up", "Hello", "Hi there"];

export function RandomGreeting() {
  const [greeting] = useState(
    () => greetings[Math.floor(Math.random() * greetings.length)]
  );
  return <>{greeting}</>;
}
