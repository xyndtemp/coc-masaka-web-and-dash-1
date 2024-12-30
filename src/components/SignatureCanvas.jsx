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

  const uploadToCloudinary = async (dataUrl) => {
    try {
      const formData = new FormData();
      // Convert base64 to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      formData.append('file', blob, 'signature.png');
      formData.append('upload_preset', 'ml_default');

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD;
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }

      const data = await uploadResponse.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const save = async () => {
    if (sigCanvas.current.isEmpty()) {
      toast({
        title: "Please provide a signature first.",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataURL = sigCanvas.current.toDataURL();
      const cloudinaryUrl = await uploadToCloudinary(dataURL);
      
      if (typeof onSignatureChange === "function") {
        onSignatureChange([{
          url: cloudinaryUrl,
          filename: 'signature.png'
        }]);
      }
      
      toast({
        title: "Signature saved successfully",
      });
    } catch (error) {
      Sentry.captureException(error);
      toast({
        title: "Failed to save signature. Please try again.",
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