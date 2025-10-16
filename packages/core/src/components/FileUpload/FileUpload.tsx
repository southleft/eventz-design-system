import * as React from 'react';
import { flushSync } from 'react-dom';
import { AspectRatio } from 'radix-ui';
import { AnimatedCircularProgressIcon, UploadIcon as FileUploadIcon, ErrorIcon } from '../../icons';
import { Button } from '../Button';
import { TextLink } from '../TextLink';
import { InfoPopover } from '../InfoPopover';
import { composeClasses } from '../../utilities/composeClasses/composeClasses';
import { collapseWhitespace } from '../../utilities/collapseWhitespace/collapseWhitespace';
import { mergeDescribedBy } from '../../utilities/mergeDescribedBy/mergeDescribedBy';
import fileThumbnail from './fileThumbnail.png';

type UploadStatus = 'empty' | 'uploading' | 'accepted';

type CallbackPayload = {
  file?: File;
  message: string;
};

type FileUploadCallback = (payload: CallbackPayload) => void;

type ImageFormat = 'photo' | 'poster';

type ImageProperties = {
  supports: string;
  maxFilesize: string;
  maxDimensions: string;
};

type CallbackKey =
  | 'onFileSelected'
  | 'onFileCanceled'
  | 'onFileAccepted'
  | 'onFileChanging'
  | 'onFileError'
  | 'onFileRemoved';

const callbackMessages: Record<CallbackKey, string> = {
  onFileSelected: 'File selected',
  onFileCanceled: 'Upload canceled',
  onFileAccepted: 'File ready',
  onFileChanging: 'Changing file',
  onFileError: 'Upload failed',
  onFileRemoved: 'File removed'
};

const defaultImageProperties: Record<ImageFormat, ImageProperties> = {
  photo: {
    supports: 'PNG and JPG',
    maxFilesize: '5MB',
    maxDimensions: '840px x 840px'
  },
  poster: {
    supports: 'PNG and JPG',
    maxFilesize: '5MB',
    maxDimensions: '840px x 1120px'
  }
};

const baseClasses = `
  inline-flex border-none flex-col gap-1
`;

const labelRowClasses = `
  inline-flex gap-1 text-color-content-default text-xs uppercase
`;

const dropzoneClasses = `
  relative group inline-flex w-full flex-col items-center justify-center gap-4 w-570 rounded-lg border pt-32 pl-4 pr-4 pb-24 transition-colors
  bg-comp-form-color-background-default border-comp-form-color-border-default
  hover:bg-comp-form-color-background-hover hover:border-comp-form-color-hover
  focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-comp-border-focus-ring focus-visible:ring-offset-color-background-default
`;

const focusWithinRingClasses = `
  focus-within:ring-2 focus-within:ring-offset-4 focus-within:ring-comp-border-focus-ring focus-within:ring-offset-color-background-default
`;

const thumbnailClasses = `
  w-[192px] overflow-hidden rounded-lg [&_img]:object-cover [&_img]:size-full
`;

const primaryActionClasses = `
  group-hover:[&_button]:bg-comp-button-primary-color-background-hover
`;

const secondaryActionClasses = `
  group-hover:[&_*]:text-color-content-weak-hover text-color-content-weak cursor-default select-none
`;

const propertiesClasses = `
  flex gap-4 pt-6 border-t border-color-border-subtle text-sm text-color-content-weak
  group-hover:text-color-content-weak-hover group-hover:border-color-border-subtle-hover
`;

const hintClasses = `
  text-color-content-subtle text-xs
`;

const errorClasses = `
  text-color-content-utility-danger-subtle text-xs mt-1 inline-flex gap-2 pl-1 items-center
`;

const invalidStateClasses = `
  data-[invalid=true]:[&_[data-slot=dropzone]]:border-comp-form-color-border-utility-danger
`;

const dragOverStateClasses = `
  data-[drag-over=true]:[&_[data-slot=dropzone]]:bg-comp-form-color-background-hover
  data-[drag-over=true]:[&_[data-slot=dropzone]]:border-comp-form-color-hover
`;

const uploadingStateClasses = `
  data-[uploading=true]:[&_[data-slot=dropzone]]:cursor-progress
`;

const liveRegionMessages = {
  enter: 'Drag files over',
  over: 'Drop now',
  cancel: 'Drag canceled'
} as const;

const uiCopy = {
  empty: { primary: 'Select {NOUN}', secondary: 'Or drop to upload' },
  uploading: { primary: 'Uploading…', secondary: 'Cancel upload' },
  accepted: { primary: 'Change {NOUN}', secondary: 'Remove {NOUN}' }
} as const;

const aspectRatioByFormat: Record<ImageFormat, number> = {
  photo: 1,
  poster: 3 / 4
};

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  imageFormat?: ImageFormat;
  accept?: string;
  showThumbnail?: boolean;
  label?: string;
  ariaLabel?: string;
  hint?: string;
  info?: string;
  error?: string;
  imageProperties?: ImageProperties;
  initialValue?: string;
  resetOnFail?: boolean;
  fileNoun?: string;
  name?: string;
  required?: boolean;
  form?: string;
  onFileSelected?: FileUploadCallback;
  onFileCanceled?: FileUploadCallback;
  onFileAccepted?: FileUploadCallback;
  onFileChanging?: FileUploadCallback;
  onFileError?: FileUploadCallback;
  onFileRemoved?: FileUploadCallback;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      imageFormat = 'photo',
      accept = 'image/png,image/jpeg',
      showThumbnail = true,
      label,
      ariaLabel,
      hint,
      info,
      error,
      imageProperties,
      initialValue,
      resetOnFail = false,
      fileNoun,
      name,
      required,
      form,
      onFileSelected,
      onFileCanceled,
      onFileAccepted,
      onFileChanging,
      onFileError,
      onFileRemoved,
      className,
      ...rest
    },
    ref
  ) => {
    const trimmedLabel = label?.trim();
    const trimmedAriaLabel = ariaLabel?.trim();
    const trimmedHint = hint?.trim();
    const trimmedError = error?.trim();
    const trimmedInfo = info?.trim();
    const trimmedInitialValue = initialValue?.trim();
    const trimmedFileNoun = fileNoun?.trim();

    // const resolvedImageProperties = imageProperties ?? defaultImageProperties[imageFormat];
    const noun = trimmedFileNoun && trimmedFileNoun.length > 0 ? trimmedFileNoun : imageFormat;

    const rootId = React.useId();
    const labelId = trimmedLabel ? `${rootId}-label` : undefined;
    const dropzoneId = `${rootId}-dropzone`;
    const hintId = !trimmedError && trimmedHint ? `${rootId}-hint` : undefined;
    const errorId = trimmedError ? `${rootId}-error` : undefined;
    const infoContentId = trimmedInfo ? `${rootId}-info` : undefined;
    const liveRegionId = `${rootId}-live`;

    const showLabelRow = Boolean(trimmedLabel || trimmedInfo);

    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const currentFileRef = React.useRef<File | undefined>(undefined);
    const currentBlobUrlRef = React.useRef<string | null>(null);

    const [status, setStatus] = React.useState<UploadStatus>('empty');
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [liveMessage, setLiveMessage] = React.useState('');
    const [isInfoOpen, setIsInfoOpen] = React.useState(false);
    const [previewSource, setPreviewSource] = React.useState<string | undefined>();
    const [hasPreviewError, setHasPreviewError] = React.useState(false);
    const [isNonImageFile, setIsNonImageFile] = React.useState(false);
    const [withinRingEnabled, setWithinRingEnabled] = React.useState(false);

    // Global modality detection: enable focus-within ring on first Tab, disable on pointer
    React.useEffect(() => {
      const enableKeyboard = () => setWithinRingEnabled(true);
      const disableForPointer = () => setWithinRingEnabled(false);

      // Capture-phase listeners so we run before focus changes
      window.addEventListener('keydown', enableKeyboard, true);
      window.addEventListener('mousedown', disableForPointer, true);
      window.addEventListener('pointerdown', disableForPointer, true);

      return () => {
        window.removeEventListener('keydown', enableKeyboard, true);
        window.removeEventListener('mousedown', disableForPointer, true);
        window.removeEventListener('pointerdown', disableForPointer, true);
      };
    }, []);

    const acceptTokens = React.useMemo(
      () =>
        accept
          .split(',')
          .map(token => token.trim().toLowerCase())
          .filter(token => token.length > 0),
      [accept]
    );

    const emit = React.useCallback(
      (key: CallbackKey, file?: File) => {
        const callback = {
          onFileSelected,
          onFileCanceled,
          onFileAccepted,
          onFileChanging,
          onFileError,
          onFileRemoved
        }[key];

        if (!callback) return;

        callback({ file, message: callbackMessages[key] });
      },
      [onFileAccepted, onFileCanceled, onFileChanging, onFileError, onFileRemoved, onFileSelected]
    );

    const revokeObjectUrl = React.useCallback(() => {
      const url = currentBlobUrlRef.current;
      if (!url) return;
      URL.revokeObjectURL(url);
      currentBlobUrlRef.current = null;
    }, []);

    const announce = React.useCallback((message: string) => {
      setLiveMessage(prev => (prev === message ? `${message} ` : message));
    }, []);

    const matchesAccept = React.useCallback(
      (file: File) => {
        if (acceptTokens.length === 0) return true;
        const mime = file.type.toLowerCase();
        const extension = file.name.includes('.')
          ? `.${file.name.split('.').pop()!.toLowerCase()}`
          : '';

        return acceptTokens.some(token => {
          if (token.endsWith('/*')) {
            const base = token.replace('/*', '');
            return mime.startsWith(`${base}/`);
          }
          if (token.startsWith('.')) {
            return extension === token;
          }
          return mime === token;
        });
      },
      [acceptTokens]
    );

    const reset = React.useCallback(() => {
      revokeObjectUrl();
      currentFileRef.current = undefined;
      setPreviewSource(undefined);
      setIsNonImageFile(false);
      setHasPreviewError(false);
      setIsDragOver(false);
      setStatus('empty');
      inputRef.current!.value = '';
    }, [revokeObjectUrl]);

    const enterUploadingState = React.useCallback(() => {
      revokeObjectUrl();
      setStatus('uploading');
      setHasPreviewError(false);
      setIsNonImageFile(false);
      setPreviewSource(undefined);
    }, [revokeObjectUrl]);

    const handleFailure = React.useCallback(
      (file: File) => {
        emit('onFileError', file);
        setHasPreviewError(true);
        if (resetOnFail) {
          reset();
        }
      },
      [emit, reset, resetOnFail]
    );

    const beginPreviewDecode = React.useCallback(
      (file: File) => {
        revokeObjectUrl();
        const objectUrl = URL.createObjectURL(file);
        currentBlobUrlRef.current = objectUrl;
        const image = new Image();
        let settled = false;

        const finalizeSuccess = () => {
          if (settled) return;
          settled = true;
          flushSync(() => {
            setPreviewSource(objectUrl);
            setHasPreviewError(false);
            setStatus('accepted');
          });
          emit('onFileAccepted', file);
        };

        const finalizeFailure = () => {
          if (settled) return;
          settled = true;
          flushSync(() => {
            revokeObjectUrl();
            handleFailure(file);
          });
        };

        image.onload = finalizeSuccess;
        image.onerror = finalizeFailure;
        image.src = objectUrl;

        if (typeof image.decode === 'function') {
          image.decode().then(finalizeSuccess).catch(finalizeFailure);
        }
      },
      [emit, handleFailure, revokeObjectUrl]
    );

    const transitionToAccepted = React.useCallback(
      (file: File, isNonImage: boolean) => {
        if (isNonImage) {
          setIsNonImageFile(true);
          setStatus('accepted');
          emit('onFileAccepted', file);
          return;
        }

        beginPreviewDecode(file);
      },
      [beginPreviewDecode, emit]
    );

    const processFile = React.useCallback(
      (file: File) => {
        if (!matchesAccept(file)) {
          emit('onFileError', file);
          return;
        }

        if (status === 'accepted') {
          emit('onFileChanging', file);
        }

        currentFileRef.current = file;
        enterUploadingState();
        emit('onFileSelected', file);

        const isImage = file.type.toLowerCase().startsWith('image/');
        transitionToAccepted(file, !isImage);
      },
      [emit, enterUploadingState, matchesAccept, status, transitionToAccepted]
    );

    const handleDropFiles = React.useCallback(
      (files: FileList | File[] | null | undefined) => {
        const file = files && 'length' in files && files.length > 0 ? files[0] : undefined;
        if (file) processFile(file);
      },
      [processFile]
    );

    const handlePrimaryAction = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      inputRef.current!.click();
    }, []);

    const handleCancel = React.useCallback(() => {
      const file = currentFileRef.current;
      emit('onFileCanceled', file);
      reset();
    }, [emit, reset]);

    const handleRemove = React.useCallback(() => {
      const file = currentFileRef.current;
      emit('onFileRemoved', file);
      reset();
    }, [emit, reset]);

    const resolvedLabelText = trimmedLabel ?? trimmedAriaLabel ?? 'File upload';
    const infoAriaLabel = `${resolvedLabelText} info`;

    const { ['aria-describedby']: externalAriaDescribedBy, ...rootRest } = rest;

    const dropzoneAriaDescribedBy = mergeDescribedBy(
      externalAriaDescribedBy,
      [
        isInfoOpen && infoContentId ? infoContentId : undefined,
        errorId ? errorId : hintId ? hintId : undefined
      ].filter((value): value is string => Boolean(value))
    );

    const dropzoneAriaLabel = trimmedLabel ? undefined : (trimmedAriaLabel ?? 'File upload');

    const baseClassName = collapseWhitespace(
      composeClasses(
        baseClasses,
        invalidStateClasses,
        dragOverStateClasses,
        uploadingStateClasses,
        className
      )
    );
    const labelRowClassName = collapseWhitespace(
      composeClasses(labelRowClasses, !trimmedLabel ? 'sr-only' : undefined)
    );
    const dropzoneClassName = collapseWhitespace(
      composeClasses(dropzoneClasses, withinRingEnabled ? focusWithinRingClasses : undefined)
    );
    const thumbnailClassName = collapseWhitespace(composeClasses(thumbnailClasses));
    const primaryActionClassName = collapseWhitespace(composeClasses(primaryActionClasses));
    const secondaryActionClassName = collapseWhitespace(composeClasses(secondaryActionClasses));
    const propertiesClassName = collapseWhitespace(composeClasses(propertiesClasses));
    const hintClassName = collapseWhitespace(composeClasses(hintClasses));
    const errorClassName = collapseWhitespace(composeClasses(errorClasses));

    const primaryCopy = uiCopy[status].primary.replace('{NOUN}', noun);
    const secondaryCopy = uiCopy[status].secondary.replace('{NOUN}', noun);

    const primaryIcon =
      status === 'uploading' ? (
        <AnimatedCircularProgressIcon aria-hidden="true" />
      ) : (
        <FileUploadIcon aria-hidden="true" />
      );

    const shouldRenderThumbnailFrame = showThumbnail && status !== 'empty';
    const shouldShowPlaceholder =
      !shouldRenderThumbnailFrame ||
      status === 'uploading' ||
      isNonImageFile ||
      hasPreviewError ||
      !previewSource;

    React.useEffect(() => {
      if (trimmedInfo) return;
      setIsInfoOpen(false);
    }, [trimmedInfo]);

    React.useEffect(() => {
      if (!trimmedInitialValue) {
        if (!currentFileRef.current && status === 'accepted') {
          setPreviewSource(undefined);
          setHasPreviewError(false);
          setStatus('empty');
        }
        return;
      }

      if (currentFileRef.current) {
        return;
      }

      revokeObjectUrl();
      setPreviewSource(trimmedInitialValue);
      setHasPreviewError(false);
      setStatus('accepted');
      setIsNonImageFile(false);
    }, [revokeObjectUrl, status, trimmedInitialValue]);

    React.useEffect(
      () => () => {
        revokeObjectUrl();
      },
      [revokeObjectUrl]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.currentTarget.files;
      if (fileList && fileList.length > 0) {
        processFile(fileList[0]);
      }
      event.currentTarget.value = '';
    };

    const handleDragEnter = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(true);
      announce(liveRegionMessages.enter);
    };

    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'copy';
      // Always mark drag-over on this event; redundant calls are harmless and simplify coverage.
      setIsDragOver(true);
      announce(liveRegionMessages.over);
    };

    const handleDragLeave = (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
      announce(liveRegionMessages.cancel);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
      announce(liveRegionMessages.cancel);
      const files = event.dataTransfer.files as FileList | undefined;
      handleDropFiles(files);
    };

    const aspectRatio = aspectRatioByFormat[imageFormat];

    return (
      <div
        ref={ref}
        className={baseClassName}
        data-drag-over={isDragOver ? 'true' : undefined}
        data-uploading={status === 'uploading' ? 'true' : undefined}
        data-accepted={status === 'accepted' ? 'true' : undefined}
        data-invalid={errorId ? 'true' : undefined}
        {...rootRest}
      >
        {showLabelRow ? (
          <div className={labelRowClassName} data-slot="labelRow" id={labelId}>
            {trimmedLabel ?? trimmedAriaLabel ?? ''}
            {trimmedInfo && infoContentId ? (
              <InfoPopover
                ariaLabel={infoAriaLabel}
                contentId={infoContentId}
                onOpenChange={setIsInfoOpen}
              >
                {trimmedInfo}
              </InfoPopover>
            ) : null}
          </div>
        ) : null}

        <div
          id={dropzoneId}
          className={dropzoneClassName}
          data-slot="dropzone"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onKeyDownCapture={() => setWithinRingEnabled(true)}
          onMouseDownCapture={() => setWithinRingEnabled(false)}
          aria-labelledby={trimmedLabel ? labelId : undefined}
          aria-label={dropzoneAriaLabel}
          aria-describedby={dropzoneAriaDescribedBy}
          role="group"
        >
          {shouldRenderThumbnailFrame ? (
            <div className={thumbnailClassName} data-slot="thumbnail">
              <AspectRatio.Root ratio={aspectRatio}>
                <img
                  src={
                    shouldRenderThumbnailFrame && !shouldShowPlaceholder && previewSource
                      ? previewSource
                      : fileThumbnail
                  }
                  alt=""
                  aria-hidden="true"
                  onError={() => setHasPreviewError(true)}
                />
              </AspectRatio.Root>
            </div>
          ) : null}

          <div className={primaryActionClassName} data-slot="primaryAction">
            <Button
              variant="primary"
              startIcon={primaryIcon}
              onClick={handlePrimaryAction}
              loading={status === 'uploading'}
              disabled={status === 'uploading'}
            >
              {primaryCopy}
            </Button>
          </div>

          <div className={secondaryActionClassName} data-slot="secondaryAction">
            {status === 'empty' ? (
              <span>{secondaryCopy}</span>
            ) : (
              <TextLink
                variant="subtle"
                href="#"
                label={secondaryCopy}
                onClick={event => {
                  event.preventDefault();
                  (status === 'uploading' ? handleCancel : handleRemove)();
                }}
              />
            )}
          </div>

          <div className={propertiesClassName} data-slot="properties">
            <span>
              Supports: {(imageProperties ?? defaultImageProperties[imageFormat]).supports}
            </span>
            <span>
              Max filesize: {(imageProperties ?? defaultImageProperties[imageFormat]).maxFilesize}
            </span>
            <span>
              Max dimensions:{' '}
              {(imageProperties ?? defaultImageProperties[imageFormat]).maxDimensions}
            </span>
          </div>
        </div>

        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          id={`${rootId}-input`}
          accept={accept}
          name={name}
          required={required}
          form={form}
          onChange={handleInputChange}
          aria-labelledby={trimmedLabel ? labelId : undefined}
          aria-label={dropzoneAriaLabel}
        />

        {errorId ? (
          <div className={errorClassName} data-slot="error" id={errorId}>
            <span aria-hidden="true">
              <ErrorIcon />
            </span>
            <span>{trimmedError}</span>
          </div>
        ) : hintId ? (
          <div className={hintClassName} data-slot="hint" id={hintId}>
            {trimmedHint}
          </div>
        ) : null}

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          id={liveRegionId}
        >
          {liveMessage}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
