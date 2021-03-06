import React from "react";
import { render } from "@testing-library/react";
import Call from "../../pages/visits/[id]";

jest.mock("../../src/hooks/useScript", () => ({
  __esModule: true,
  default: () => [true, false],
}));

describe("call", () => {
  let spy;
  beforeEach(() => {
    spy = jest.fn();

    window.JitsiMeetExternalAPI = spy;
  });

  describe("with a call id", () => {
    beforeEach(() => {
      render(<Call id="TestCallId" />);
    });

    it("configures Jitsi toolbar buttons", () => {
      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
          },
        })
      );
    });

    it("uses the call id as the room name", () => {
      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          roomName: "TestCallId",
        })
      );
    });
  });

  describe("without a call id", () => {
    it("shows an error page", () => {
      render(<Call />);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
