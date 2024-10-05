/**
 * The upload widget API reference details all the parameter options that you can use when configuring the upload widget.
 */
declare namespace cloudinary {
    type WidgetOpenOptions = { files: string[] };

    type CloseOptions = {
        quiet?: boolean;
    };

    type Widget = {
        /**
         * Renders an existing widget currently in memory, but that is not currently displayed.
         */
        open: (source: null | string, options: WidgetOpenOptions) => void;
        /**
         * Closes the widget and removes it from memory.
         */
        close: (options?: CloseOptions) => void;
        /**
         * Updates a widget currently in memory with new options.
         */
        update: (options: Options) => void;
    };

    type Source =
        | 'local'
        | 'url'
        | 'camera'
        | 'dropbox'
        | 'image_search'
        | 'facebook'
        | 'instagram'
        | 'shutterstock'
        | 'google_drive';

    type FileType = 'png' | 'gif' | 'jpeg' | 'pdf' | 'doc' | 'docx' | 'jpg';

    type ResourceType = 'image' | 'auto' | 'video' | 'raw';

    type Options = {
        cloudName: string;
        uploadPreset?: string;
        cropping?: 'server';
        showSkipCropButton?: boolean;
        croppingAspectRatio?: number | null;
        multiple?: boolean;
        singleUploadAutoClose?: boolean;
        maxFiles?: number;
        maxFileSize?: number;
        maxImageWidth?: number;
        maxImageHeight?: number;
        minImageWidth?: number;
        minImageHeight?: number;
        validateMaxWidthHeight?: boolean;
        preBatch?: (
            cb: (opt?: { cancel: boolean }) => void,
            data: FileList
        ) => void;
        croppingValidateDimensions?: boolean;
        croppingShowDimensions?: boolean;
        clientAllowedFormats?: FileType[];
        sources?: Source[];
        resourceType?: ResourceType;
    };

    type ResultEvent =
        | 'abort'
        | 'batch-cancelled'
        | 'close'
        | 'display-changed'
        | 'publicid'
        | 'queues-end'
        | 'queues-start'
        | 'retry'
        | 'show-completed'
        | 'source-changed'
        | 'success'
        | 'tags'
        | 'upload-added';

    export type ResultInfoSuccess = {
        // eslint-disable-next-line camelcase
        public_id: string;
        format?: FileType;
        access_mode: 'public';
        asset_id: string;
        batchId: string;
        bytes: number;
        created_at: string;
        etag: string;
        id: string;
        original_filename: string;
        path: string;
        placeholder: boolean;
        resource_type: ResourceType;
        secure_url: string;
        signature: string;
        tags: string[];
        type: 'upload';
        url: string;
        version: number;
        version_id: string;
    };

    type ResultInfo =
        | ResultInfoSuccess
        | 'shown'
        | 'hidden'
        | 'minimized'
        | 'expanded';

    type Result = {
        event: ResultEvent;
        info: ResultInfo;
    };

    /**
     * Creates a widget object and frame in memory, but does not display it until the open() method of the returned widget object is called.
     * @param options A map of the upload widget parameters to apply. See the parameters section for a full list of options available.
     * @param resultCallback An optional function called for event handling. The callback method has the following signature function(error, result) where error is either null if successful or an error message if there was a failure, while result is a JSON object detailing the triggered event.
     */
    function createUploadWidget(
        options: Options,
        resultCallback: (error: string | null, result: Result) => void
    ): Widget;
}
