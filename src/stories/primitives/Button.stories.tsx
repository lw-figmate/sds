import type { Meta, StoryObj } from "@storybook/react";
import { IconAlertTriangle, IconActivity, IconArrowLeft, IconTrash2 } from "icons";
import { Flex, Section } from "layout";
import {
  Button,
  ButtonDanger,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogModal,
  DialogTitle,
  DialogTrigger,
  Text,
  TextHeading,
} from "primitives";
import { useState } from "react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "SDS Primitives/Buttons",
  parameters: { layout: "centered" },
};
export default meta;

export const StoryButton: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    children: "Hello world",
    variant: "primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "neutral", "subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <Button {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </Button>
  ),
};

export const StoryButtonDanger: StoryObj<typeof ButtonDanger> = {
  name: "Button Danger",
  args: {
    children: "Hello world",
    variant: "danger-primary",
  },
  argTypes: {
    children: {
      control: { type: "text" },
    },
    size: {
      control: { type: "select" },
    },
    variant: {
      control: { type: "select" },
      options: ["danger-primary", "danger-subtle"],
    },
  },
  render: ({ children, ...props }) => (
    <ButtonDanger {...props}>
      <IconArrowLeft />
      {children}
      <IconActivity />
    </ButtonDanger>
  ),
};

export const StoryButtonGroup: StoryObj<typeof ButtonGroup> = {
  name: "Button Group",
  args: {
    align: "center",
  },
  argTypes: {
    align: {
      control: { type: "select" },
      options: ["center", "start", "end", "justify", "stack"],
    },
  },
  render: ({ ...props }) => (
    <ButtonGroup {...props} style={{ width: 300 }}>
      <Button variant="neutral">Cancel</Button>
      <Button variant="primary">Submit</Button>
    </ButtonGroup>
  ),
};

export const StoryButtonDangerMatrix: StoryObj<typeof ButtonDanger> = {
  name: "Button Danger — All Variants",
  parameters: { layout: "centered", controls: { disable: true } },
  render: () => (
    <Section padding="800">
      <Flex direction="column" gap="600">
        <TextHeading>Button Danger — All Variants</TextHeading>

        {/* Medium */}
        <Flex direction="column" gap="200">
          <Text>Medium</Text>
          <Flex direction="row" gap="400" alignSecondary="center">
            <ButtonDanger variant="danger-primary">
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-subtle">
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-primary" isDisabled>
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-subtle" isDisabled>
              <IconTrash2 />
              Delete
            </ButtonDanger>
          </Flex>
        </Flex>

        {/* Small */}
        <Flex direction="column" gap="200">
          <Text>Small</Text>
          <Flex direction="row" gap="400" alignSecondary="center">
            <ButtonDanger variant="danger-primary" size="small">
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-subtle" size="small">
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-primary" size="small" isDisabled>
              <IconTrash2 />
              Delete
            </ButtonDanger>
            <ButtonDanger variant="danger-subtle" size="small" isDisabled>
              <IconTrash2 />
              Delete
            </ButtonDanger>
          </Flex>
        </Flex>

        {/* Labels */}
        <Flex direction="row" gap="400">
          {["Primary", "Subtle", "Primary (disabled)", "Subtle (disabled)"].map(
            (label) => (
              <div key={label} style={{ width: 130 }}>
                <Text>{label}</Text>
              </div>
            ),
          )}
        </Flex>
      </Flex>
    </Section>
  ),
};

export const StoryButtonDangerDeleteConfirmation: StoryObj<typeof ButtonDanger> =
  {
    name: "Button Danger — Delete Confirmation",
    parameters: { layout: "centered", controls: { disable: true } },
    render: () => {
      const [deleted, setDeleted] = useState(false);
      const [isOpen, setIsOpen] = useState(false);

      return (
        <Section padding="800">
          <Flex direction="column" gap="600" alignSecondary="center">
            <TextHeading>Manage Account</TextHeading>
            <Text>
              Permanently delete your account and all associated data.
            </Text>

            {deleted ? (
              <Flex direction="column" gap="200" alignSecondary="center">
                <Text>Account deleted.</Text>
                <Button variant="neutral" onPress={() => setDeleted(false)}>
                  Reset demo
                </Button>
              </Flex>
            ) : (
              <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
                <ButtonDanger variant="danger-primary">
                  <IconTrash2 />
                  Delete account
                </ButtonDanger>
                <DialogModal isDismissable>
                  <Dialog>
                    {({ close }) => (
                      <>
                        <DialogClose onPress={close} />
                        <DialogBody>
                          <Flex direction="column" gap="400">
                            <Flex direction="row" gap="200" alignSecondary="center">
                              <IconAlertTriangle />
                              <DialogTitle>Delete account?</DialogTitle>
                            </Flex>
                            <DialogDescription>
                              This action is permanent and cannot be undone. All
                              your data, settings, and history will be erased
                              immediately.
                            </DialogDescription>
                            <ButtonGroup align="end">
                              <Button variant="neutral" onPress={close}>
                                Cancel
                              </Button>
                              <ButtonDanger
                                variant="danger-primary"
                                onPress={() => {
                                  setDeleted(true);
                                  close();
                                }}
                              >
                                Yes, delete
                              </ButtonDanger>
                            </ButtonGroup>
                          </Flex>
                        </DialogBody>
                      </>
                    )}
                  </Dialog>
                </DialogModal>
              </DialogTrigger>
            )}
          </Flex>
        </Section>
      );
    },
  };
