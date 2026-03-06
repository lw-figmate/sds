import { clsx } from "clsx";
import { IconArrowUp, IconCode, IconImage, IconMic } from "icons";
import { IconButton } from "primitives";
import { useState } from "react";
import {
  TextArea as RACTextArea,
  TextField as RACTextField,
} from "react-aria-components";
import "./aiChatBox.css";

export type AIChatBoxProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onImageClick?: () => void;
  onCodeClick?: () => void;
  onMicClick?: () => void;
  isDisabled?: boolean;
};

export function AIChatBox({
  className,
  placeholder = "What would you like to know?",
  value: controlledValue,
  defaultValue = "",
  onChange,
  onSubmit,
  onImageClick,
  onCodeClick,
  onMicClick,
  isDisabled = false,
}: AIChatBoxProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const hasContent = value.trim().length > 0;

  function handleChange(newValue: string) {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  }

  function handleSubmit() {
    if (!hasContent || isDisabled) return;
    onSubmit?.(value);
    if (!isControlled) setInternalValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className={clsx("ai-chat-box", className)}>
      <RACTextField
        className="ai-chat-box-field"
        value={value}
        onChange={handleChange}
        isDisabled={isDisabled}
        aria-label={placeholder}
      >
        <RACTextArea
          className="ai-chat-box-textarea"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          rows={3}
        />
      </RACTextField>
      <div className="ai-chat-box-toolbar">
        <div className="ai-chat-box-actions">
          <IconButton
            variant="subtle"
            size="small"
            aria-label="Attach image"
            onPress={onImageClick}
            isDisabled={isDisabled}
          >
            <IconImage />
          </IconButton>
          <IconButton
            variant="subtle"
            size="small"
            aria-label="Insert code"
            onPress={onCodeClick}
            isDisabled={isDisabled}
          >
            <IconCode />
          </IconButton>
          <IconButton
            variant="subtle"
            size="small"
            aria-label="Voice input"
            onPress={onMicClick}
            isDisabled={isDisabled}
          >
            <IconMic />
          </IconButton>
        </div>
        <IconButton
          className={clsx(
            "ai-chat-box-send",
            hasContent && "ai-chat-box-send-active",
          )}
          variant="neutral"
          size="small"
          aria-label="Send message"
          onPress={handleSubmit}
          isDisabled={!hasContent || isDisabled}
        >
          <IconArrowUp />
        </IconButton>
      </div>
    </div>
  );
}
