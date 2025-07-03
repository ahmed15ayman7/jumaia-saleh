"use client";
import { useState, useRef } from "react";
import FloatingButton from "./FloatingButton";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  isAdmin?: boolean;
  className?: string;
}

export default function EditableText({ value, onSave, isAdmin = false, className = "" }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDoubleClick = () => {
    if (isAdmin) {
      setEditing(true);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  };

  const handleSave = () => {
    setEditing(false);
    if (text !== value) {
      onSave(text);
    }
  };

  return (
    <span className={className} style={{ position: "relative" }}>
      {editing ? (
        <>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full min-h-[48px] border border-gold rounded p-2 text-primary focus:outline-none focus:border-primary"
            dir="auto"
          />
          <FloatingButton onClick={handleSave} />
        </>
      ) : (
        <span onDoubleClick={handleDoubleClick} style={{ cursor: isAdmin ? "pointer" : "default" }}>
          {text}
        </span>
      )}
    </span>
  );
} 