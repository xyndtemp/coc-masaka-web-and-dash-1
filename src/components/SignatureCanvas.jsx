import * as Sentry from "@/overrides/sentry.override";
import { useRef } from "react";
import SignaturePad from "react-signature-canvas";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const SignatureCanvas = ({ onSignatureChange }) => {
  const sigCanvas = useRef();
  const { toast } = useToast();

  const clear = () => {
    sigCanvas.current.clear();
  };

  const save = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }
    const dataURL = sigCanvas.current.toDataURL();
    try {
      const cloudinaryUrl = await uploadToCloudinary(dataURL);
      if (typeof onSignatureChange === "function") {
        onSignatureChange(cloudinaryUrl);
      }
    } catch (error) {
      Sentry.captureException(error);
      toast({
        title: "Failed to upload signature. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border p-4 rounded-md">
      <SignaturePad
        ref={sigCanvas}
        canvasProps={{
          className: "signature-canvas border border-gray-300",
          width: 300,
          height: 150,
        }}
      />
      <div className="mt-2 space-x-2">
        <Button onClick={clear} variant="outline">
          Clear
        </Button>
        <Button onClick={save}>Save Signature</Button>
      </div>
    </div>
  );
};

export default SignatureCanvas;
