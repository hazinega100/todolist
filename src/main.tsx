import {createRoot} from 'react-dom/client'
import './index.css'
import { App } from './app/App.tsx'
import {StrictMode} from "react";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</StrictMode>
)
