"use client";

import EventCreationStepper from "@/components/admin/event-creaton-stepper";
import React, { useEffect, useState } from "react";

function CreateEvent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading state
  }

  return (
    <div>
      <EventCreationStepper />
    </div>
  );
}

export default CreateEvent;
