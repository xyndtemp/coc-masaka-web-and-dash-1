import React from "react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { UploadCloudIcon } from "lucide-react";
import { loadScript } from "../helpers/load-script";
import * as Sentry from '@/overrides/sentry.override';


const WidgetOptions: cloudinary.Options = {
  cloudName: "dgeska2qh",
  cropping: "server",
  multiple: false,
  singleUploadAutoClose: false,
  maxFiles: 1,
};

let widget: cloudinary.Widget | null;

let widgetScript: Promise<string | void>;

type Props = {
  clientAllowedFormats?: cloudinary.FileType[];
  croppingAspectRatio?: number | null;
  disabled?: boolean;
  file?: string;
  id?: string;
  maxFileSize?: number;
  onChange: (info: cloudinary.ResultInfoSuccess) => void;
  onClose?: () => void;
  publicId?: string;
  resourceType?: cloudinary.ResourceType;
  showSkipCropButton?: boolean;
  sources?: cloudinary.Source[];
  text?: string;
  uploadPreset?: string;
  maxImageWidth?: number;
  maxImageHeight?: number;
  minImageWidth?: number;
  minImageHeight?: number;
  validateMaxWidthHeight?: boolean;
  preBatch?: (cb: (opt?: { cancel: boolean }) => void, data: FileList) => void;
  croppingShowDimensions?: boolean;
  icon?: ReactNode;
  size?: string;
};

const UploadWidget = ({
  clientAllowedFormats = ["png", "gif", "jpeg"],
  croppingAspectRatio = 1.5,
  disabled = false,
  file = "",
  maxFileSize = 5000000,
  onChange,
  publicId,
  resourceType = "auto",
  showSkipCropButton = false,
  sources = ["local", 'camera'],
  text = "Upload",
  uploadPreset,
  id = "upload-widget",
  maxImageHeight,
  maxImageWidth,
  preBatch,
  minImageWidth,
  minImageHeight,
  validateMaxWidthHeight,
  croppingShowDimensions,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    widgetScript = loadScript(
      "https://widget.cloudinary.com/v2.0/global/all.js",
      "cloudinary"
    )
      .then(() => {
        const options = {
          ...WidgetOptions,
          ...{
            clientAllowedFormats,
            croppingAspectRatio,
            maxFileSize,
            publicId,
            resourceType,
            showSkipCropButton,
            sources,
            uploadPreset,
            maxImageHeight,
            maxImageWidth,
            preBatch,
            minImageWidth,
            minImageHeight,
            validateMaxWidthHeight,
            croppingShowDimensions,
          },
        };

        if (widget) {
          widget.update(options);
        } else {
          widget = window.cloudinary?.createUploadWidget(
            options,
            onWidgetChange
          );
        }
      })
      .catch(() => {
        toast({
          title: "Error loading Image Upload Widget, please refresh",
        });
      });

    return () => {
      if (widget) {
        widget.close({ quiet: true });
        widget = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onWidgetChange = (error: string | null, result: cloudinary.Result) => {
    if (error) {
      Sentry.captureException(error);

      return;
    } else if (!result) {
      return;
    }

    if (result.event === "display-changed") {
      setOpen(result.info === "shown");
    } else if (result.event === "success") {
      const { info } = result;

      onChange(info as cloudinary.ResultInfoSuccess);

      widget?.close();
    }
  };

  const onClick = () => {
    let source: cloudinary.Source | null = null;
    const options: cloudinary.WidgetOpenOptions = {
      files: [],
    };

    // Image Edit mode
    if (file) {
      source = "url";
      options.files.push(`https://${config.CDN_PREFIX}/${file}`);
    }

    widgetScript.then(() => {
      widget?.open(source, options);
    });
  };

  return (
    <Button onClick={onClick}>
      <UploadCloudIcon className="w-4 h-4" />
      {text}
    </Button>
  );
};

export default UploadWidget;
