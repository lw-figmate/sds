import { useState } from "react";
import { IconAlertTriangle } from "icons";
import { Flex } from "layout";
import {
  Button,
  ButtonDanger,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogDescription,
  DialogModal,
  DialogTitle,
  DialogTrigger,
  InputField,
  Text,
  TextHeading,
  TextSmall,
  TextStrong,
} from "primitives";

const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

export function DangerZoneSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [deleted, setDeleted] = useState(false);

  const isConfirmed = input === CONFIRM_PHRASE;

  const handleDelete = () => {
    if (!isConfirmed) return;
    setDeleted(true);
    setInput("");
    setIsOpen(false);
  };

  if (deleted) {
    return (
      <div
        style={{
          padding: "var(--sds-size-space-500)",
          border: "1px solid var(--sds-color-border-danger-default)",
          borderRadius: "var(--sds-size-radius-200)",
        }}
      >
        <Flex direction="column" gap="300" alignSecondary="center">
          <TextSmall style={{ textAlign: "center" }}>
            Your account has been scheduled for deletion. You have a{" "}
            <TextStrong>30-day grace period</TextStrong> before all data is
            permanently removed.
          </TextSmall>
          <Button variant="neutral" onPress={() => setDeleted(false)}>
            Cancel deletion
          </Button>
        </Flex>
      </div>
    );
  }

  return (
    <Flex direction="column" gap="400">
      <Flex direction="column" gap="100">
        <Flex alignSecondary="center" gap="200">
          <IconAlertTriangle size="16" />
          <TextHeading
            elementType="h2"
            style={{ color: "var(--sds-color-text-danger-default)" }}
          >
            Danger Zone
          </TextHeading>
        </Flex>
        <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
          Permanently delete your account and all associated data. This cannot
          be undone after the 30-day grace period.
        </TextSmall>
      </Flex>

      <div
        style={{
          padding: "var(--sds-size-space-400)",
          border: "1px solid var(--sds-color-border-danger-default)",
          borderRadius: "var(--sds-size-radius-200)",
        }}
      >
        <Flex direction="row" alignSecondary="center" gap="300">
          <Flex direction="column" gap="100" style={{ flex: 1 }}>
            <TextStrong>Delete this account</TextStrong>
            <TextSmall style={{ color: "var(--sds-color-text-default-secondary)" }}>
              Once deleted, all your settings, data, and preferences will be
              removed. You have 30 days to cancel.
            </TextSmall>
          </Flex>
          <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <ButtonDanger>Delete account</ButtonDanger>
            <DialogModal isDismissable>
              <Dialog>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your account after a 30-day grace
                  period. All data, settings, and history will be removed.
                </DialogDescription>
                <DialogBody>
                  <Flex direction="column" gap="300">
                    <Text>
                      To confirm, type{" "}
                      <TextStrong elementType="span">
                        {CONFIRM_PHRASE}
                      </TextStrong>{" "}
                      below:
                    </Text>
                    <InputField
                      label="Type to confirm"
                      value={input}
                      onChange={setInput}
                      placeholder={CONFIRM_PHRASE}
                    />
                    <ButtonGroup align="end">
                      <Button
                        variant="neutral"
                        onPress={() => {
                          setIsOpen(false);
                          setInput("");
                        }}
                      >
                        Cancel
                      </Button>
                      <ButtonDanger
                        isDisabled={!isConfirmed}
                        onPress={handleDelete}
                      >
                        Delete my account
                      </ButtonDanger>
                    </ButtonGroup>
                  </Flex>
                </DialogBody>
              </Dialog>
            </DialogModal>
          </DialogTrigger>
        </Flex>
      </div>
    </Flex>
  );
}
