import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as paths from './paths'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let mainWindow: BrowserWindow | null = null
let trayWindow: BrowserWindow | null = null
let wallpaperWindow: BrowserWindow | null = null

const createMainWindow = () => {
	mainWindow = new BrowserWindow({
		center: true,
		width: 900,
		height: 600,
		minWidth: 900,
		minHeight: 600,
		icon: path.join(paths.VITE_PUBLIC, 'icon.jpg'),
		webPreferences: {
			preload: path.join(__dirname, 'preload.mjs'),
		},
	})
	mainWindow.setMenu(null)
	mainWindow.webContents.openDevTools()
	if (paths.VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(
			path.join(paths.VITE_DEV_SERVER_URL, 'src', 'app', 'main', 'main.html')
		)
	} else {
		mainWindow.loadFile(
			path.join(paths.VITE_DIST, 'src', 'app', 'main', 'main.html')
		)
	}
}

app.whenReady().then(() => {
	if (mainWindow === null && !app.isPackaged) {
		createMainWindow()
	}
})

ipcMain.handle('set-title', (event, title) => {
	const webContents = event.sender
	const win = BrowserWindow.fromWebContents(webContents)
	win?.setTitle(title)
})

ipcMain.handle('quit', () => app.quit())
