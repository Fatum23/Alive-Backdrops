/// <reference types="vite/client" />

interface Window {
	ipcRenderer: import('electron').IpcRenderer & {
		setTitle: (title: string) => void
		quit: () => void
	}
}
