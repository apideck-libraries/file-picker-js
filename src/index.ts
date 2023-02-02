export interface FilePickerOptions {
  token: string;
  onSelect?: (file: File) => any;
  onClose?: () => void;
  onReady?: () => void;
  title?: string;
  subTitle?: string;
  showAttribution?: boolean;
  fileToSave?: File | any;
  onConnectionSelect?: (connection: any) => any;
}

const createFilePicker = () => {
  const filePickerIframeUrl = 'https://file-picker-js.apideck.com';
  const createModal = (): HTMLIFrameElement => {
    const modal = document.createElement('iframe');
    modal.id = 'iframe-file-picker';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.border = 'none';
    modal.style.zIndex = '9997';
    modal.src = filePickerIframeUrl;

    return modal;
  };

  return {
    open(options: FilePickerOptions): void {
      const {
        onClose,
        onReady,
        onSelect,
        onConnectionSelect,
        ...otherOptions
      } = options;
      const modal = createModal();
      document.body.appendChild(modal);

      const onMessage = (event: MessageEvent) => {
        const { data } = event;
        if (data?.type === 'on-ready') {
          modal.style.display = 'block';
          modal.contentWindow?.postMessage(otherOptions, filePickerIframeUrl);
          onReady && onReady();
        }

        if (data?.type === 'on-close') {
          onClose && onClose();

          // Remove the iframe from the DOM after transition animation
          setTimeout(() => {
            document.body.removeChild(modal);
            window.removeEventListener('message', onMessage);
          }, 300);
        }

        if (event.data?.type === 'on-file-select') {
          onSelect && onSelect(event.data.file);
        }

        if (event.data?.type === 'on-connection-select') {
          onConnectionSelect && onConnectionSelect(event.data.connection);
        }
      };

      window.addEventListener('message', onMessage);
    },
  };
};

export const FilePicker = createFilePicker();
